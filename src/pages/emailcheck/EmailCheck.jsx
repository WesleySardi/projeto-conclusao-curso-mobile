import React, {useState, useEffect} from 'react';
import {Dimensions, Pressable, TextInput, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../constants/constants';
import {useUser} from '../../contexts/UserContext';
import {createEmailRequest, emailVerifyRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export default function EmailCheck({navigation}) {
  const {currentRes} = useUser();
  const [emailValue, setEmailValue] = useState('');
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
    setIsTokenLoading(true);
    const response = await emailVerifyRequest(emailCode, emailData);
    setIsTokenLoading(false);

    if (response.contentResponse != null)
      return navigation.navigate('ChangePassword');
  };

  useEffect(() => {
    fillData();
  }, []);

  return (
    <ViewContainer>
      <BubbleBackground />
      <ViewContent>
        <ViewTitle>
          <Title>Insira o código</Title>
        </ViewTitle>
        <ViewInput>
          <TextInput
            placeholder="Código do E-mail"
            keyboardType="number-pad"
            onChangeText={text => setEmailValue(text)}
            value={emailValue}
            style={inputStyle}
          />
          <ViewResendCode>
            <Pressable onPress={() => fillData()} style={pressableResendCode}>
              <ResendCodeText>Reenviar código</ResendCodeText>
            </Pressable>
          </ViewResendCode>
        </ViewInput>
        <ViewButton>
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
                    text2: 'Você deve digitar um código de 6 números.',
                    visibilityTime: 2000,
                    autoHide: true,
                  });
                }
              }
            }}
            style={() => pressableStyle(isTokenLoading)}>
            <ButtonTitle>
              {isTokenLoading ? 'Carregando...' : 'Confirmar'}
            </ButtonTitle>
          </Pressable>
        </ViewButton>
      </ViewContent>
    </ViewContainer>
  );
}

const pressableStyle = isTokenLoading => ({
  backgroundColor: isTokenLoading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN,
  borderRadius: 10,
  color: COLORS.GREY_MAIN,
  padding: width * 0.02,
  justifyContent: 'center',
  width: '100%',
});

const inputStyle = {
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
};

const ViewContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 100%;
`;

const ViewContent = styled.View`
  align-items: center;
  width: 60%;
`;

const ViewTitle = styled.View`
  align-items: center;
  width: 100%;
`;

const Title = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.06}px;
  font-weight: 600;
`;

const ViewInput = styled.View`
  margin-bottom: ${height * 0.03}px;
  margin-top: ${height * 0.03}px;
  width: 100%;
`;

const ViewResendCode = styled.View`
  margin-top: 4%;
`;

const ResendCodeText = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.04}px;
  font-weight: bold;
  text-align: right;
`;

const ViewButton = styled.View`
  width: 100%;
`;

const ButtonTitle = styled.Text`
  color: ${COLORS.WHITE};
  font-size: ${width * 0.06}px;
  font-weight: 600;
  text-align: center;
`;

const pressableResendCode = styled.View`
  margin: 4%;
`;
