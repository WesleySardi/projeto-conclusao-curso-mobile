import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../constants/constants';
import {useUser} from '../../contexts/UserContext';
import {validateEmailRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

const AccessRecovery = ({navigation}) => {
  const {
    authToken,
    setIsCreate,
    currentRes,
    setCurrentRes,
    setIdRes,
    setNomeRes,
    setEmergePhone,
  } = useUser();
  const [email, setEmail] = useState(currentRes.emailRes);
  const [loading, setLoading] = useState(false);

  const validateEmail = async () => {
    if (email !== currentRes.emailRes) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Info!',
        text2: 'E-mail incorreto.',
        visibilityTime: 3000,
        autoHide: true,
      });

      return;
    }

    try {
      setLoading(true);
      const response = await validateEmailRequest(email, authToken);

      if (response !== null) {
        setCurrentRes({
          cpfRes: response.contentResponse.cpfRes,
          emailRes: response.contentResponse.emailRes,
        });
        setIsCreate(true);
        setIdRes('');
        setNomeRes('');
        setEmergePhone('');

        setLoading(false);
        navigation.navigate('EmailCheck');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Erro!',
          text2: 'Email não vinculado a usuário.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log('Error: ', error);
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
          <ViewTitle>
            <Title>Digite o seu e-mail</Title>
          </ViewTitle>
          <Input
            placeholder="Digite o seu e-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <ViewButton>
            <Pressable
              disabled={loading}
              onPress={() => validateEmail()}
              style={() => pressableStyle(loading)}>
              <TitleButton>
                {loading ? 'Carregando...' : 'Enviar Código'}
              </TitleButton>
            </Pressable>
          </ViewButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const pressableStyle = loading => ({
  backgroundColor: loading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN,
  borderRadius: 10,
  padding: width * 0.02,
  justifyContent: 'center',
  width: '100%',
});

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Input = styled.TextInput`
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

const TitleButton = styled.Text`
  color: ${COLORS.WHITE};
  font-size: ${width * 0.06}px;
  font-weight: 600;
  text-align: center;
`;

const Title = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.06}px;
  font-weight: 600;
`;

const ViewTitle = styled.View`
  align-items: center;
  width: 100%;
  margin-bottom: ${height * 0.03}px;
`;

const ViewButton = styled.View`
  width: 100%;
`;

export default AccessRecovery;
