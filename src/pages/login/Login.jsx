import React, {useState, useEffect} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
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
    /*const response = await authSigninRequest(
      emailValue,
      passwordValue,
      setIsTokenLoading,
    );*/

    const response =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3ZXNsZXkuc2FyZGlAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1JFU1BPTlPDgVZFTCIsImlhdCI6MTczMjc0MTQ5MiwiZXhwIjoxNzMyODI3ODkyfQ.Acxzly-vas-tsmSMEFQyH7U4VNyyLqV466uJ8I6g-eqzotXH-h2VdAR1P2qkLpQ480iETs4v_-nbnaw6969TiQ';

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
        <Container>
          <ContentWrapper>
            <TitleWrapper>
              <Title>Entrar</Title>
            </TitleWrapper>
            <InputWrapper>
              <TextInputStyled
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={text => setEmailValue(text)}
                value={emailValue}
                placeholderTextColor={COLORS.GREY_MAIN}
              />
              <PasswordWrapper>
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={visibilityButton}>
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faEye : faEyeSlash}
                    color={COLORS.BLUE_MAIN}
                    size={height * 0.03}
                  />
                </Pressable>
                <TextInputStyled
                  placeholder="Senha"
                  placeholderTextColor={COLORS.GREY_MAIN}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={text => setPasswordValue(text)}
                  value={passwordValue}
                />
              </PasswordWrapper>
              <ForgotPasswordWrapper>
                <ForgotPasswordText>Esqueceu a senha? </ForgotPasswordText>
                <Pressable
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <ForgotPasswordLink> Clique aqui!</ForgotPasswordLink>
                </Pressable>
              </ForgotPasswordWrapper>
            </InputWrapper>
            <ButtonWrapper>
              <Pressable
                disabled={isTokenLoading}
                onPress={() => getAuthToken()}
                style={() => buttonStyle(isTokenLoading)}>
                <ButtonText>
                  {isTokenLoading ? 'Carregando...' : 'Confirmar'}
                </ButtonText>
              </Pressable>
            </ButtonWrapper>
          </ContentWrapper>
          <RegisterWrapper>
            <RegisterText>Não possui cadastro? </RegisterText>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <RegisterLink>Clique aqui!</RegisterLink>
            </Pressable>
          </RegisterWrapper>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 100%;
`;

const ContentWrapper = styled.View`
  align-items: center;
  width: 80%;
`;

const TitleWrapper = styled.View`
  align-items: center;
  width: 100%;
`;

const Title = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.06}px;
  font-weight: 600;
`;

const InputWrapper = styled.View`
  margin-bottom: ${height * 0.03}px;
  margin-top: ${height * 0.03}px;
  width: 100%;
`;

const TextInputStyled = styled.TextInput`
  background-color: ${COLORS.WHITE};
  border-color: ${COLORS.BLUE_MAIN};
  border-radius: 10px;
  border-width: 1px;
  color: ${COLORS.BLACK};
  font-size: ${width * 0.045}px;
  height: ${height * 0.06}px;
  margin-bottom: 6%;
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
`;

const PasswordWrapper = styled.View`
  align-items: flex-end;
  width: 100%;
`;

const visibilityButton = {
  height: height * 0.06,
  paddingRight: '5%',
  position: 'absolute',
  justifyContent: 'center',
  zIndex: 1,
};

const ForgotPasswordWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const ForgotPasswordText = styled.Text`
  color: ${COLORS.GREY_MAIN};
  font-size: ${width * 0.04}px;
  font-weight: thin;
`;

const ForgotPasswordLink = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.04}px;
  font-weight: bold;
`;

const ButtonWrapper = styled.View`
  width: 100%;
`;

const buttonStyle = isTokenLoading => ({
  backgroundColor: isTokenLoading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN,
  borderRadius: 10,
  color: COLORS.GREY_MAIN,
  padding: width * 0.02,
  justifyContent: 'center',
  width: '100%',
});

const ButtonText = styled.Text`
  color: ${COLORS.WHITE};
  font-size: ${width * 0.06}px;
  font-weight: 600;
  text-align: center;
`;

const RegisterWrapper = styled.View`
  position: absolute;
  bottom: 20px;
  flex-direction: row;
  justify-content: flex-end;
`;

const RegisterText = styled.Text`
  color: ${COLORS.GREY_MAIN};
  font-size: ${width * 0.04}px;
  font-weight: thin;
`;

const RegisterLink = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.04}px;
  font-weight: bold;
`;
