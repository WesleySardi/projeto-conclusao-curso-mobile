import React, {useState} from 'react';
import {Dimensions, TextInput, ScrollView, View} from 'react-native';
import {useUser} from '../../contexts/UserContext';
import {COLORS} from '../../constants/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {updatePasswordRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export default function ChangePassword({navigation}) {
  const {authToken} = useUser();
  const [textoNovaSenhaInput, setTextoNovaSenhaInput] = useState('');
  const [textoRepSenhaInput, setTextoRepSenhaInput] = useState('');
  const [isNovaSenhaVisible, setIsNovaSenhaVisible] = useState(false);
  const [isRepSenhaVisible, setIsRepSenhaVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeData = async () => {
    if (textoNovaSenhaInput !== textoRepSenhaInput) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Info!',
        text2: 'Senhas diferentes!',
        visibilityTime: 3000,
        autoHide: true,
      });
    } else {
      setLoading(true);
      const response = await updatePasswordRequest(
        authToken,
        textoRepSenhaInput,
      );

      if (response != null) {
        setLoading(false);
        navigation.navigate('Home');
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <BubbleBackground />
      <Content>
        <TitleContainer>
          <Title>Alterar Senha</Title>
        </TitleContainer>
        <ScrollView style={{marginBottom: '8%', marginTop: '5%', width: '70%'}}>
          <InputSection>
            <Label>Nova senha</Label>
            <InputWrapper>
              <VisibilityButton
                onPress={() => setIsNovaSenhaVisible(prev => !prev)}>
                <FontAwesomeIcon
                  icon={isNovaSenhaVisible ? faEye : faEyeSlash}
                  color={COLORS.BLUE_MAIN}
                  size={height * 0.03}
                />
              </VisibilityButton>
              <TextInput
                placeholder="Digite sua nova senha"
                placeholderTextColor={COLORS.GREY_MAIN}
                secureTextEntry={!isNovaSenhaVisible}
                onChangeText={setTextoNovaSenhaInput}
                value={textoNovaSenhaInput}
                style={inputStyle}
              />
            </InputWrapper>

            <Label>Confirme a nova senha</Label>
            <InputWrapper>
              <VisibilityButton
                onPress={() => setIsRepSenhaVisible(prev => !prev)}>
                <FontAwesomeIcon
                  icon={isRepSenhaVisible ? faEye : faEyeSlash}
                  color={COLORS.BLUE_MAIN}
                  size={height * 0.03}
                />
              </VisibilityButton>
              <TextInput
                placeholder="Confirme a nova senha"
                placeholderTextColor={COLORS.GREY_MAIN}
                secureTextEntry={!isRepSenhaVisible}
                onChangeText={setTextoRepSenhaInput}
                value={textoRepSenhaInput}
                style={inputStyle}
              />
            </InputWrapper>
          </InputSection>
        </ScrollView>
        <ButtonWrapper>
          <ConfirmButton
            disabled={loading}
            onPress={changeData}
            loading={loading}>
            <ButtonText>{loading ? 'Carregando...' : 'Confirmar'}</ButtonText>
          </ConfirmButton>
        </ButtonWrapper>
      </Content>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const Content = styled.View`
  align-items: center;
  height: 65%;
`;

const TitleContainer = styled.View`
  border-bottom-color: ${COLORS.GREY_MAIN};
  border-bottom-width: 1px;
  height: 12%;
  justify-content: center;
  width: 70%;
`;

const Title = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${height * 0.029}px;
  font-weight: 600;
  text-align: center;
`;

const InputSection = styled.View`
  margin-bottom: 8%;
`;

const Label = styled.Text`
  color: ${COLORS.BLUE_MAIN};
  font-size: ${height * 0.023}px;
  font-weight: thin;
  margin-top: 3%;
  margin-bottom: 3%;
  width: 80%;
`;

const InputWrapper = styled.View`
  align-items: flex-end;
  width: 100%;
`;

const inputStyle = {
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
};

const VisibilityButton = styled.Pressable`
  height: ${height * 0.06}px;
  padding-right: 5%;
  position: absolute;
  justify-content: center;
  z-index: 1;
`;

const ButtonWrapper = styled.View`
  align-items: center;
  border-top-color: ${COLORS.GREY_MAIN};
  border-top-width: 1px;
  height: 18%;
  justify-content: center;
  width: 70%;
`;

const ConfirmButton = styled.Pressable`
  background-color: ${({loading}) =>
    loading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN};
  border-radius: 10px;
  color: ${COLORS.GREY_MAIN};
  padding: ${width * 0.02}px;
  justify-content: center;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: ${COLORS.WHITE};
  font-size: ${height * 0.029}px;
  font-weight: 600;
  text-align: center;
`;
