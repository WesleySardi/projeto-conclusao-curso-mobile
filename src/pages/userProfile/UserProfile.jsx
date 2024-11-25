import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../constants/constants';
import {updateResponsibleRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import {useUser} from '../../contexts/UserContext';

const {width, height} = Dimensions.get('window');
const fontSize_Small = width * 0.035;
const fontSize_Normal = width * 0.045;
const fontSize_Big = width * 0.055;
const borderRadius_Main = width * 0.03;

export default function UserProfile({navigation}) {
  const {authToken, currentRes} = useUser();
  const [cpfValue, setCpfValue] = useState(currentRes.cpfRes);
  const [nameValue, setNameValue] = useState(currentRes.nomeRes);
  const [idadeValue, setIdadeValue] = useState(currentRes.idadeRes);
  const [emailValue, setEmailValue] = useState(currentRes.emailRes);
  const [telValue, setTelValue] = useState(currentRes.contato1Res);
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (!cpfValue || !nameValue || !idadeValue || !emailValue || !telValue) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erro!',
        text2: 'Existem campos vazios.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (validateFields()) {
      const response = await updateResponsibleRequest(
        {
          cpfRes: cpfValue,
          nomeRes: nameValue,
          idadeRes: idadeValue,
          contato1Res: telValue,
          contato2Res: '',
          contato3Res: '',
          planoAssinado: 1,
          emailRes: emailValue,
          rgRes: '',
        },
        authToken,
        setLoading,
      );

      if (response.contentResponse != null && response.isOk) {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={styles.view1}>
      <BubbleBackground />
      <View style={styles.view2}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Perfil de Usuário</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.viewInputs}>
            <Text style={styles.titleInput}>CPF</Text>
            <TextInput
              placeholder="Cpf"
              placeholderTextColor={COLORS.GREY_MAIN}
              keyboardType="numeric"
              onChangeText={text => setCpfValue(text)}
              value={cpfValue}
              style={styles.input}
              editable={false}
              maxLength={11}
            />
          </View>
          <View style={styles.viewInputs}>
            <Text style={styles.titleInput}>E-mail</Text>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={COLORS.GREY_MAIN}
              keyboardType="email-address"
              onChangeText={text => setEmailValue(text)}
              value={emailValue}
              style={styles.input}
              editable={false}
              maxLength={30}
            />
          </View>
          <View style={styles.viewInputs}>
            <Text style={styles.titleInput}>Nome</Text>
            <TextInput
              placeholder="Nome"
              placeholderTextColor={COLORS.GREY_MAIN}
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={text => setNameValue(text)}
              value={nameValue}
              style={styles.input}
              maxLength={20}
            />
          </View>
          <View style={styles.viewInputs}>
            <Text style={styles.titleInput}>Idade</Text>
            <TextInput
              placeholder="Idade"
              placeholderTextColor={COLORS.GREY_MAIN}
              keyboardType="numeric"
              onChangeText={text => setIdadeValue(text)}
              value={idadeValue.toString()}
              style={styles.input}
              maxLength={3}
            />
          </View>
          <View style={styles.viewInputs}>
            <Text style={styles.titleInput}>Telefone</Text>
            <TextInput
              placeholder="Telefone"
              placeholderTextColor={COLORS.GREY_MAIN}
              keyboardType="numeric"
              onChangeText={text => setTelValue(text)}
              value={telValue}
              style={styles.input}
              maxLength={11}
            />
          </View>
          <View style={styles.viewChangePassword}>
            <Pressable
              disabled={loading}
              style={() => styles.pressableChangePassword(loading)}
              onPress={async () => navigation.navigate('AccessRecovery')}>
              <Text style={styles.titleButton}>
                {loading ? 'Carregando...' : 'Alterar senha'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.viewButton}>
          <Pressable
            disabled={loading}
            style={() => styles.pressable(loading)}
            onPress={async () => handleRegister()}>
            <Text style={styles.titleButton}>
              {loading ? 'Carregando...' : 'Confirmar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: COLORS.BLUE_MAIN,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    fontSize: fontSize_Small,
    height: height * 0.06,
    paddingLeft: '4%',
    marginBottom: '5%',
    backgroundColor: COLORS.WHITE,
    width: '80%',
  },
  pressable: loading => ({
    backgroundColor: loading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN,
    borderRadius: 10,
    color: COLORS.GREY_MAIN,
    padding: width * 0.02,
    justifyContent: 'center',
    width: '100%',
  }),
  pressableChangePassword: loading => ({
    backgroundColor: loading ? COLORS.GREY_MAIN : COLORS.DARK_BLUE,
    borderRadius: 10,
    color: COLORS.GREY_MAIN,
    padding: width * 0.02,
    justifyContent: 'center',
    width: '80%',
  }),
  scrollView: {
    marginBottom: '5%',
    marginTop: '5%',
    width: '70%',
  },
  title: {
    color: COLORS.BLUE_MAIN,
    fontSize: fontSize_Big,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleButton: {
    color: COLORS.WHITE,
    fontSize: fontSize_Big,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleInput: {
    color: COLORS.BLUE_MAIN,
    fontSize: fontSize_Normal,
    fontWeight: 'thin',
    marginTop: '3%',
    marginBottom: '3%',
    width: '80%',
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  view2: {
    alignItems: 'center',
    height: '65%',
  },
  viewButton: {
    alignItems: 'center',
    borderTopColor: COLORS.GREY_MAIN,
    borderTopWidth: 1,
    height: '18%',
    justifyContent: 'center',
    width: '70%',
  },
  viewChangePassword: {
    alignItems: 'center',
    height: '18%',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
  },
  viewInputs: {
    alignItems: 'center',
    width: '100%',
  },
  viewVisibility: {
    alignItems: 'flex-end',
    width: '80%',
  },
  pressableVisible: {
    height: height * 0.06,
    paddingRight: '5%',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
  },
  viewTitle: {
    borderBottomColor: COLORS.GREY_MAIN,
    borderBottomWidth: 1,
    height: '12%',
    justifyContent: 'center',
    width: '70%',
  },
  viewZloBandStyle: {
    alignItems: 'center',
  },
  titleNfcNear: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.BLACK,
  },
  zloBandStyle: {
    marginBottom: 20,
    width: 300,
    height: 300,
  },
});
