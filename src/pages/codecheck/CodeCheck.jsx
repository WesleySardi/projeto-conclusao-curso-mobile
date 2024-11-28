import React, {useState, useEffect} from 'react';
import {Dimensions, Pressable, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/constants';
import getFunctions from '../../functions/getFunctions';
import {createSmsRequest, smsVerifyRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';

const {width, height} = Dimensions.get('window');

export default function CodeCheck() {
  const {currentRes} = useUser();
  const [smsValue, setSmsValue] = useState();
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  const [smsData] = useState({
    sendDate: '',
    cpfDep: '',
    phoneUser: '',
  });

  const fillData = () => {
    smsData.sendDate = getFunctions.generateTimestamp();
    smsData.phoneUser = '+' + currentRes.contato1Res;
    smsData.cpfDep = currentRes.cpfDep;
    smsHandlerFunction();
  };

  const smsHandlerFunction = async () => {
    const response = await createSmsRequest(smsData);

    if (response.contentResponse != null) {
      return true;
    }
  };

  const smsVerifyFunction = async smsCode => {
    setIsTokenLoading(true);
    const response = await smsVerifyRequest(smsCode, smsData);

    if (response.contentResponse != null)
      return navigation.navigate('ChangePassword');

    setIsTokenLoading(false);
  };

  useEffect(() => {
    fillData();
  }, []);

  return (
    <Container>
      <BubbleBackground />
      <Content>
        <TitleView>
          <Title>Insira o código</Title>
        </TitleView>
        <InputWrapper>
          <TextInput
            placeholder="Código SMS"
            keyboardType="numeric"
            onChangeText={text => setSmsValue(text)}
            value={smsValue}
            style={inputStyle}
          />
          <SendCodeAgainView>
            <Pressable onPress={() => fillData()}>
              <ResendCodeText>Reenviar código</ResendCodeText>
            </Pressable>
          </SendCodeAgainView>
        </InputWrapper>
        <ButtonView>
          <Pressable
            disabled={isTokenLoading}
            onPress={() => {
              if (smsValue.length == 0) {
                Toast.show({
                  type: 'info',
                  position: 'top',
                  text1: 'Info!',
                  text2: 'Digite o código enviado ao seu celular.',
                  visibilityTime: 2000,
                  autoHide: true,
                });
              } else {
                if (smsValue.length >= 7 && smsValue.length < 9) {
                  smsVerifyFunction(smsValue);
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
            style={{
              backgroundColor: isTokenLoading
                ? COLORS.GREY_MAIN
                : COLORS.GREEN_MAIN,
              borderRadius: 10,
              padding: width * 0.02,
              width: '100%',
              justifyContent: 'center',
            }}>
            <TitleButton>
              {isTokenLoading ? 'Carregando...' : 'Confirmar'}
            </TitleButton>
          </Pressable>
        </ButtonView>
      </Content>
    </Container>
  );
}

// Estilização com Styled Components
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Content = styled.View`
  align-items: center;
  width: 60%;
`;

const TitleView = styled.View`
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

const SendCodeAgainView = styled.View`
  align-items: flex-end;
  margin-top: 5px;
`;

const ResendCodeText = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${width * 0.04}px;
  font-weight: bold;
  margin: 4px;
`;

const ButtonView = styled.View`
  width: 100%;
`;

const TitleButton = styled.Text`
  color: ${COLORS.WHITE};
  font-size: ${width * 0.06}px;
  font-weight: 600;
  text-align: center;
`;
