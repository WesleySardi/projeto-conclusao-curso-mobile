import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../constants/constants';
import {useUser} from '../../contexts/UserContext';
import {createEmailRequest, emailVerifyRequest} from '../../services/services';

const {width, height} = Dimensions.get('window');

export default function EmailCheck({navigation}) {
  const {currentRes} = useUser();
  const [emailValue, setEmailValue] = useState();
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [emailData] = useState({
    emailCode: '',
    sendDate: '',
    returnDate: '',
    emailUser: '',
    cpfDep: '',
  });

  const fillData = () => {
    emailData.emailUser = currentRes.emailRes;
    emailHandlerFunction();
  };

  const emailHandlerFunction = async () => {
    try {
      const response = await createEmailRequest(emailData);
      if (response) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Sucesso!',
          text2: 'Email enviado com sucesso.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const emailVerifyFunction = async emailCode => {
    console.log(emailCode, 'emailCode');
    setIsTokenLoading(true);
    const response = await emailVerifyRequest(emailCode, emailData);
    setIsTokenLoading(false);
    console.log(response.contentResponse, 'response.contentResponse');
    if (response.contentResponse != null)
      return navigation.navigate('ChangePassword');
  };

  useEffect(() => {
    fillData();
  }, []);

  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Insira o código</Text>
        </View>
        <View style={styles.view3}>
          <View>
            <TextInput
              placeholder="Código do E-mail"
              keyboardType="number-pad"
              onChangeText={text => setEmailValue(text)}
              value={emailValue}
              style={styles.input}
            />
            <View style={styles.viewSendCodeAgain}>
              <Pressable
                onPress={() => fillData()}
                style={styles.pressableSendCodeAgain}>
                <Text style={styles.titleSendCodeAgain}>Reenviar código</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.viewButton}>
          <Pressable
            disabled={isTokenLoading}
            onPress={() => {
              if (emailValue.length == 0) {
                Toast.show({
                  type: 'info',
                  position: 'top',
                  text1: 'Info!',
                  text2: 'Digite o código enviado ao seu E-mail.',
                  visibilityTime: 2000,
                  autoHide: true,
                });
              } else {
                if (emailValue.length == 6) {
                  emailVerifyFunction(emailValue);
                } else {
                  Toast.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Info!',
                    text2: 'Você deve digitar um código de 7 ou 8 números.',
                    visibilityTime: 2000,
                    autoHide: true,
                  });
                }
              }
            }}
            style={() => styles.pressable(isTokenLoading)}>
            <Text style={styles.titleButton}>
              {isTokenLoading ? 'Carregando...' : 'Confirmar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BLUE_MAIN,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    fontSize: width * 0.045,
    height: height * 0.06,
    marginBottom: '5%',
    marginTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    textAlign: 'left',
  },
  pressable: isTokenLoading => ({
    backgroundColor: isTokenLoading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN,
    borderRadius: 10,
    color: COLORS.GREY_MAIN,
    padding: width * 0.02,
    justifyContent: 'center',
    width: '100%',
  }),
  title: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.06,
    fontWeight: '600',
  },
  titleButton: {
    color: COLORS.WHITE,
    fontSize: width * 0.06,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleSendCodeAgain: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    margin: 4,
    textAlign: 'right',
  },
  view1: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  view2: {
    alignItems: 'center',
    width: '60%',
  },
  view3: {
    marginBottom: height * 0.03,
    marginTop: height * 0.03,
    width: '100%',
  },
  viewButton: {
    width: '100%',
  },
  viewTitle: {
    alignItems: 'center',
    width: '100%',
  },
});
