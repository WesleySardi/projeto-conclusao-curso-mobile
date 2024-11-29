import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import {COLORS} from '../../constants/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {useUser} from '../../contexts/UserContext';
import {
  attCurrentResponsible,
  authSigninRequest,
} from '../../services/services';
import useDeviceRegistration from '../../hooks/useDeviceRegistration';
import registerDevice from '../../functions/registerDevice';

const {width, height} = Dimensions.get('window');

export default function Login({navigation}) {
  const {
    setAuthToken,
    setIsCreate,
    setCurrentRes,
    setIdRes,
    setNomeRes,
    setEmergePhone,
    setEmailRes,
  } = useUser();
  const [_, setStartAnimation] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  const getAuthToken = async () => {
    const response = await authSigninRequest(
      emailValue,
      passwordValue,
      setIsTokenLoading,
    );

    if (response != null) {
      setAuthToken('Bearer ' + response);
      setEmailRes(emailValue);
      findCurrentResponsible('Bearer ' + response);
    }
  };
  
  const findCurrentResponsible = async token => {
    const response = await attCurrentResponsible(emailValue, token);

    if (response.contentResponse != null && response.isOk) {
      setCurrentRes(response.contentResponse);
      setIsCreate(true);
      setIdRes(response.contentResponse.cpfRes);
      setNomeRes(response.contentResponse.nomeRes);
      setEmergePhone(response.contentResponse.contato1Res);
      registerDevice(response.contentResponse.cpfRes, token)
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <BubbleBackground />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>Entrar</Text>
            </View>
            <View style={styles.view3}>
              <View>
                <TextInput
                  placeholder="E-mail"
                  keyboardType="email-address"
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
                    placeholder="Senha"
                    placeholderTextColor={COLORS.GREY_MAIN}
                    secureTextEntry={isPasswordVisible ? false : true}
                    onChangeText={text => setPasswordValue(text)}
                    value={passwordValue}
                    style={styles.input}
                  />
                </View>
                <View style={styles.viewSendCodeAgain}>
                  <Text style={styles.textForgotPassword1}>
                    Esqueceu a senha?{' '}
                  </Text>
                  <Pressable
                    style={styles.pressableSendCodeAgain}
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.textForgotPassword2}>Clique aqui!</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={styles.viewButton}>
              <Pressable
                disabled={isTokenLoading}
                onPress={() => getAuthToken()}
                style={() => styles.pressable(isTokenLoading)}>
                <Text style={styles.titleButton}>
                  {isTokenLoading ? 'Carregando...' : 'Confirmar'}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.viewRegister}>
            <Text style={styles.textRegister1}>Não possui cadastro? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.textRegister2}>Clique aqui!</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  viewSendCodeAgain: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  view1: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  view2: {
    alignItems: 'center',
    width: '80%',
  },
  view3: {
    marginBottom: height * 0.03,
    marginTop: height * 0.03,
    width: '100%',
  },
  viewButton: {
    width: '100%',
  },
  viewRegister: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textRegister1: {
    color: COLORS.GREY_MAIN,
    fontSize: width * 0.04,
    fontWeight: 'thin',
  },
  textRegister2: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.04,
    fontWeight: 'bold',
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
