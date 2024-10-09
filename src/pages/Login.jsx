import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

import BubbleBackground from '../components/BubbleBackground';

import {COLORS, FONTS} from '../constants/constants'

import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import {useUser} from '../contexts/UserContext';

const {width, height} = Dimensions.get('window');

export default function Login({navigation}) {
  const {userType, updateUserType} = useUser();

  const [startAnimation, setStartAnimation] = useState(false)

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setStartAnimation(true)
  }, [])

  const verifyLogin = async () => {
    if ((emailValue && passwordValue) != '') {
      try {
        const response = await axios.get(`http://IPv4:8080/api/responsibles/findResponsiblesCpfAndName/params?emailRes=${emailValue}&senhaRes=${passwordValue}`);
        let idRes = response.data[0][0]
        let nomeRes = response.data[0][1]
        let emergePhone = response.data[0][2]

        if (response) {
          updateUserType([{}, true, idRes, nomeRes, emergePhone]);
          navigation.navigate('Home');
        } else {
         console.log("Erro na verificação do login!")
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Preencha os campos!")
    }
  };

  return (
    <View style={styles.view1}>
      <BubbleBackground></BubbleBackground>
      <View style={styles.view2}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Entrar</Text>
        </View>
        <View style={styles.view3}>
          <View>
            <TextInput
              placeholder='E-mail'
              keyboardType='email-address'
              onChangeText={text => setEmailValue(text)}
              value={emailValue}
              style={styles.input}
              placeholderTextColor={COLORS.GREY_MAIN}
            />
            <View style={styles.viewInputs}>
              <Pressable
                onPress={
                  isPasswordVisible
                    ? () => setIsPasswordVisible(false)
                    : () => setIsPasswordVisible(true)
                }
                style={styles.pressableVisible}>
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  color={COLORS.BLUE_MAIN}
                  style={styles.iconVisible}
                  size={height * 0.03}
                />
              </Pressable>
              <TextInput
                placeholder='Senha'
                placeholderTextColor={COLORS.GREY_MAIN}
                secureTextEntry={isPasswordVisible ? false : true}
                onChangeText={text => setPasswordValue(text)}
                value={passwordValue}
                style={styles.input}
              />
            </View>
            <View style={styles.viewSendCodeAgain}>
              <Text style={styles.textForgotPassword1}>Esqueceu a senha? </Text>
              <Pressable style={styles.pressableSendCodeAgain} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.textForgotPassword2}>Clique aqui!</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.viewButton}>
          <Pressable onPress={verifyLogin} style={styles.pressable}>
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
    color: COLORS.BLACK,
    fontSize: width * 0.045,
    height: height * 0.06,
    marginBottom: '6%',
    paddingLeft: '5%',
    paddingRight: '5%',
    width: '100%',
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
  textForgotPassword1: {
    color: COLORS.GREY_MAIN,
    fontSize: width * 0.04,
    fontWeight: 'thin',
  },
  textForgotPassword2: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  view1: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  view2: {
    alignItems: 'center',
    width: '80%'
  },
  view3: {
    marginBottom: height * 0.03,
    marginTop: height * 0.03,
    width: '100%'
  },
  viewButton: {
    width: '100%',
  },
  viewSendCodeAgain: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewTitle: {
    alignItems: 'center',
    width: '100%',
  },
  viewInputs: {
    alignItems: 'flex-end',
    width: '100%',
  },
  pressableVisible: {
    height: height * 0.06,
    paddingRight: '5%',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
  },
});
