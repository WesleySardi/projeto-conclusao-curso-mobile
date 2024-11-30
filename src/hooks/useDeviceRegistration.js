import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {useUser} from '../contexts/UserContext';
import {Platform, PermissionsAndroid} from 'react-native';
import URLs from '../utils/urls';

const useDeviceRegistration = cpf => {
  const {authToken} = useUser();

  useEffect(() => {
    if (!authToken) {
      console.error('Authentication token is missing.');
      return;
    }

    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        // Android 13+
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Permissão para Notificações',
              message: 'Este aplicativo precisa enviar notificações para você.',
              buttonNeutral: 'Perguntar depois',
              buttonNegative: 'Não permitir',
              buttonPositive: 'Permitir',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permissão de notificações concedida');
            return true;
          } else {
            console.log('Permissão de notificações negada');
            return false;
          }
        } catch (err) {
          console.warn('Erro ao solicitar permissões de notificações:', err);
          return false;
        }
      }
      return true;
    };

    const getAndRegisterToken = async () => {
      try {
        const currentToken = await messaging().getToken();
        console.log('Current Device Token:', currentToken);

        if (!currentToken) {
          console.warn('No device token available.');
          return;
        }

        const response = await axios.get(
          `${URLs.BASIC}/api/devicestorage/${cpf}`,
          {
            headers: {
              Authorization: authToken,
            },
          },
        );

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
          console.error('Failed to fetch device tokens:', response.data);
          await sendDeviceTokenToServer(cpf, currentToken);
        }
      } catch (error) {
        console.error(
          'Error during device registration initialization:',
          error,
        );
      }
    };

    const sendDeviceTokenToServer = async (cpf, deviceToken) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/devicestorage`,
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
          console.error('Falha ao registrar device token:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.warn('Device token já está registrado.');
        } else {
          console.error('Erro ao enviar device token para o servidor:', error);
        }
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

    initialize();

    const unsubscribe = messaging().onTokenRefresh(async newToken => {
      console.log('Device token refreshed:', newToken);
      await sendDeviceTokenToServer(cpf, newToken);
    });

    return () => {
      unsubscribe();
    };
  }, [authToken, cpf]);
};

export default useDeviceRegistration;
