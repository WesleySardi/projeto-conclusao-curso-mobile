import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

import axios from 'axios';

import {COLORS} from '../constants/constants';

import {useUser} from '../contexts/UserContext';

const {width, height} = Dimensions.get('window');

export default function EmailCheck({navigation}) {
  const {
    authToken,
    setAuthToken,
    isCreate,
    setIsCreate,
    currentRes,
    setCurrentRes,
    idRes,
    setIdRes,
    nomeRes,
    setNomeRes,
    emergePhone,
    setEmergePhone,
  } = useUser();
  const [emailValue, setEmailValue] = useState();

  const [emailData] = useState({
    cpfRes: '',
    emailUser: '',
  });

  useEffect(() => {
    fillData();
  }, []);

  const fillData = () => {
    emailData.emailUser = currentRes.emailRes; // Adicionar o e-mail que será enviado o código
    emailData.cpfRes = currentRes.cpfRes; // Adicionar o CPF do RESPONSÁVEL
    emailHandlerFunction();
  };

  const emailHandlerFunction = async () => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:8080/api/emailhandler/',
        {
          headers: {
            Authorization: authToken,
          },
        },
        emailData,
      );
      //if (response) return alert('E-mail reenviado com sucesso!')
    } catch (error) {
      console.error(error);
    }
  };

  const emailVerifyFunction = async emailCode => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/emailhandler/verifyEmailCode?email=${emailData.emailUser}&code=${emailCode}`,
      );
      if (response) return navigation.navigate('ChangePassword');
    } catch (error) {
      console.error(error);
      alert(
        'Valor inválido. Tente novamente ou reenvie o código caso necessário.',
      );
    }
  };

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
                onPress={fillData}
                style={styles.pressableSendCodeAgain}>
                <Text style={styles.titleSendCodeAgain}>Reenviar código</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.viewButton}>
          <Pressable
            onPress={() => {
              if (emailValue.length == 0) {
                alert('Digite o código enviado ao seu E-mail.');
              } else {
                if (emailValue.length == 6) {
                  emailVerifyFunction(emailValue);
                } else {
                  // alert('O Você deve digitar um código de 7 ou 8 números.')
                }
              }
            }}
            style={styles.pressable}>
            <Text style={styles.titleButton}>Confirmar</Text>
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
  pressable: {
    backgroundColor: COLORS.GREEN_MAIN,
    borderRadius: 10,
    color: COLORS.GREY_MAIN,
    padding: width * 0.02,
    justifyContent: 'center',
    width: '100%',
  },
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
