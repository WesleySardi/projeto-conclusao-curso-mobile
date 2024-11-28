import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS} from '../../constants/constants';
import {authForgotPasswordRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

const ForgotPassword = ({navigation}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = async () => {
    if (email === '') {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Info!',
        text2: 'Digite o seu e-mail.',
        visibilityTime: 3000,
        autoHide: true,
      });

      return;
    }

    setLoading(true);
    const response = await authForgotPasswordRequest(email);

    if (response != null) {
      setEmailSent(true);
      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 5000);
    } else {
      setLoading(false);
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <BubbleBackground />
        <Container>
          {emailSent ? (
            <>
              <TitleEmailSent>
                Acesse o seu e-mail para alterar a senha.
              </TitleEmailSent>
              <FontAwesomeIcon
                icon={faPaperPlane}
                color={COLORS.DARK_BLUE}
                size={width * 0.1}
              />
            </>
          ) : (
            <>
              <ViewTitle>
                <Title>Digite o seu e-mail</Title>
              </ViewTitle>
              <StyledInput
                placeholder="Digite o seu e-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
                maxLength={30}
              />
              <ViewButton>
                <StyledPressable
                  disabled={loading}
                  onPress={() => validateEmail()}
                  loading={loading}>
                  <ButtonText>
                    {loading ? 'Carregando...' : 'Enviar Código'}
                  </ButtonText>
                </StyledPressable>
              </ViewButton>
            </>
          )}
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ViewTitle = styled.View`
  align-items: center;
  width: 100%;
  margin-bottom: ${height * 0.03}px;
`;

const Title = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.06}px;
  font-weight: 600;
`;

const StyledInput = styled.TextInput`
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

const ViewButton = styled.View`
  width: 100%;
`;

const StyledPressable = styled(Pressable)`
  background-color: ${({loading}) =>
    loading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN};
  border-radius: ${width * 0.03}px;
  height: ${height * 0.06}px;
  justify-content: center;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: ${COLORS.WHITE};
  font-size: ${width * 0.06}px;
  font-weight: 600;
  text-align: center;
`;

const TitleEmailSent = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.06}px;
  font-weight: 600;
  width: 300px;
  text-align: center;
  margin-bottom: 20px;
`;

export default ForgotPassword;
