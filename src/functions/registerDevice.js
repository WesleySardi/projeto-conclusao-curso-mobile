import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {Platform, PermissionsAndroid, Alert, Linking} from 'react-native';
import URLs from '../utils/urls';
import { findDevicesOfResponsible } from '../services/services';


const registerDevice = async (cpf, authToken) => {
  if (!authToken) {
    console.log('Authentication token is missing.');
    return;
  }

  // Número máximo de tentativas para solicitar permissão
  const MAX_PERMISSION_ATTEMPTS = 2;

  const requestNotificationPermission = async (attempt = 1) => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          if (attempt < MAX_PERMISSION_ATTEMPTS) {
            return await requestNotificationPermission(attempt + 1);
          } else {
            Alert.alert(
              'Permissão Necessária',
              'Para receber notificações, por favor, habilite as permissões nas configurações do aplicativo.',
              [
                {text: 'Cancelar', style: 'cancel'},
                {
                  text: 'Abrir Configurações',
                  onPress: () => Linking.openSettings(),
                },
              ],
              {cancelable: false},
            );
            return false;
          }
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Permissão Necessária',
            'Para receber notificações, por favor, habilite as permissões nas configurações do aplicativo.',
            [
              {text: 'Cancelar', style: 'cancel'},
              {
                text: 'Abrir Configurações',
                onPress: () => Linking.openSettings(),
              },
            ],
            {cancelable: false},
          );
          return false;
        }
      } catch (err) {
        console.log('Erro ao solicitar permissões de notificações.');
        return false;
      }
    }
    return true;
  };

  const sendDeviceTokenToServer = async (cpf, deviceToken) => {
    try {
      const response = await axios.post(
        `${URLs.BASIC}/api/devicestorage`,
        {
          tokenDispositivo: deviceToken,
          cpfResponsavel: cpf,
        },
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        console.log('Device token registrado com sucesso.');
      } else {
        console.log('Falha ao registrar device token.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log('Device token já está registrado.');
      } else {
        console.log('Erro ao enviar device token para o servidor.');
      }
    }
  };

  const getAndRegisterToken = async () => {
    try {
      const currentToken = await messaging().getToken();

      if (!currentToken) {
        console.log('No device token available.');
        return;
      }

      const response = await findDevicesOfResponsible(cpf, authToken)

      if (response.status === 200 && response.data.isOk) {
        const serverTokens = response.data.contentResponse.map(
          device => device.tokenDispositivo,
        );

        if (serverTokens.includes(currentToken)) {
          console.log('Device token is already registered.');
          return;
        } else {
          console.log('Device token not found on server. Registering...');
          await sendDeviceTokenToServer(cpf, currentToken);
        }
      } else {
        console.log('Failed to fetch device tokens.');
        console.log("Device token: " + currentToken)
        await sendDeviceTokenToServer(cpf, currentToken);
      }
      if(response === null){
        if(response.data.status === 404 && currentToken){
          await sendDeviceTokenToServer(cpf, currentToken);
        }

      }
    } catch (error) {
      console.log('Error during device registration initialization.');
    }
  };

  const initialize = async () => {
    const permissionGranted = await requestNotificationPermission();

    if (permissionGranted) {
      await getAndRegisterToken();
    } else {
      console.log(
        'Permissão de notificações não concedida. Não registrando o token.',
      );
    }
  };

  await initialize();

  const unsubscribe = messaging().onTokenRefresh(async newToken => {
    console.log('Device token refreshed:', newToken);
    await sendDeviceTokenToServer(cpf, newToken);
  });

  return unsubscribe;
};

export default registerDevice;
