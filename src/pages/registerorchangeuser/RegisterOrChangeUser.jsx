import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {useUser} from '../../contexts/UserContext';
import {COLORS} from '../../constants/constants';
import NfcVector from '../../assets/gifs/nfc_vector.gif';
import {
  encryptUrlRequest,
  registerNewDependentRequest,
  updateDependentRequest,
} from '../../services/services';
import Toast from 'react-native-toast-message';
import URLs from '../../utils/urls';

const {width, height} = Dimensions.get('window');

const fontSize_Small = width * 0.035;
const fontSize_Normal = width * 0.045;
const fontSize_Big = width * 0.055;
const fontSize_Gigantic = width * 0.065;

const borderRadius_Main = width * 0.03;

export default function RegisterOrChangeUser({navigation}) {
  const {authToken, isCreate, currentRes, idRes, emergePhone} = useUser();
  const [loading, setLoading] = useState(false);

  const [nfcRead, setNfcRead] = useState(false);

  const [textoCPFInput, setTextoCPFInput] = useState(
    isCreate ? '' : currentRes.cpfDep,
  );
  const [textoNomeInput, setTextoNomeInput] = useState(
    isCreate ? '' : currentRes.nomeDep,
  );
  const [textoIdadeInput, setTextoIdadeInput] = useState(
    isCreate ? '' : currentRes.idadeDep,
  );
  const [textoTipoSanguineoInput, setTextoTipoSanguineoInput] = useState(
    isCreate ? '' : currentRes.tipoSanguineo,
  );
  const [textoGeneroInput, setTextoGeneroInput] = useState(
    isCreate ? '' : currentRes.generoDep,
  );
  const [textoLaudoInput, setTextoLaudoInput] = useState(
    isCreate ? '' : currentRes.laudo,
  );

  const writeUrlToNfcTag = async () => {
    let result = false;

    setNfcRead(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      var responseCpfDep = await encryptUrlRequest(
        {url: currentRes.cpfDep},
        authToken,
      );

      var encryptedCpfDep = responseCpfDep.contentResponse.encryptedUrl;

      var responseEmergePhone = await encryptUrlRequest(
        {url: emergePhone},
        authToken,
      );

      var encryptedEmergePhone =
        responseEmergePhone.contentResponse.encryptedUrl;

      var url =
        URLs.ENCRYPT +
        `/home?cpfDep=${encodeURIComponent(
          encryptedCpfDep,
        )}&emergPhone=${encodeURIComponent(encryptedEmergePhone)}`;

      const bytes = Ndef.encodeMessage([Ndef.textRecord(url)]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;

        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Sucesso!',
          text2: 'Dados inseridos com sucesso.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.warn('Falha ao escrever na tag NFC', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erro!',
        text2: 'Falha ao escrever na tag NFC.',
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      NfcManager.cancelTechnologyRequest();
      setNfcRead(false);
      navigation.navigate('Home');
    }

    return result;
  };

  const handleWriteNfcTag = async () => {
    await writeUrlToNfcTag();
  };

  const changeData = async () => {
    setLoading(true);
    if (isCreate) {
      var newUser = {
        cpfDep: textoCPFInput,
        nomeDep: textoNomeInput,
        idadeDep: textoIdadeInput,
        tipoSanguineo: textoTipoSanguineoInput,
        generoDep: textoGeneroInput,
        laudo: textoLaudoInput,
        cpfResDep: idRes,
      };

      try {
        const responseRegister = await registerNewDependentRequest(
          newUser,
          authToken,
        );

        if (responseRegister != null && responseRegister.isOk) {
          handleWriteNfcTag();
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } else {
      var newUser = currentRes;

      newUser.cpfDep = textoCPFInput;
      newUser.nomeDep = textoNomeInput;
      newUser.idadeDep = textoIdadeInput;
      newUser.tipoSanguineo = textoTipoSanguineoInput;
      newUser.generoDep = textoGeneroInput;
      newUser.laudo = textoLaudoInput;

      try {
        const responseUpdate = await updateDependentRequest(newUser, authToken);

        if (responseUpdate != null && responseUpdate.isOk) {
          handleWriteNfcTag();
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.view1}>
      <BubbleBackground />
      {nfcRead ? (
        <View style={styles.viewZloBandStyle}>
          <Image source={NfcVector} style={styles.zloBandStyle} />
          <Text style={styles.titleNfcNear}>Aproxime a tag NFC...</Text>
        </View>
      ) : (
        <View style={styles.view2}>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>
              {isCreate ? 'Cadastrar dependente' : 'Alterar dependente'}
            </Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>CPF</Text>
              <TextInput
                placeholder="CPF do dependente"
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoCPFInput(text)}
                value={textoCPFInput}
                style={styles.input}
                editable={isCreate ? true : false}
                selectTextOnFocus={isCreate ? true : false}
                maxLength={11}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Nome</Text>
              <TextInput
                placeholder="Nome do dependente"
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoNomeInput(text)}
                value={textoNomeInput}
                style={styles.input}
                maxLength={20}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Idade</Text>
              <TextInput
                placeholder="Idade do dependente"
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoIdadeInput(text)}
                value={textoIdadeInput.toString()}
                style={styles.input}
                maxLength={3}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Tipo Sanguíneo</Text>
              <TextInput
                placeholder="Tipo sanguíneo do dep..."
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoTipoSanguineoInput(text)}
                value={textoTipoSanguineoInput}
                style={styles.input}
                maxLength={3}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Gênero</Text>
              <TextInput
                placeholder="Gênero do dependente"
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoGeneroInput(text)}
                value={textoGeneroInput}
                style={styles.input}
                maxLength={15}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Laudo médico</Text>
              <TextInput
                placeholder="Laudo médico do dep..."
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoLaudoInput(text)}
                value={textoLaudoInput}
                style={styles.input}
                maxLength={15}
              />
            </View>
          </ScrollView>
          <View style={styles.viewButton}>
            <Pressable
              disabled={loading}
              onPress={() => changeData()}
              style={() => styles.pressable(loading)}>
              <Text style={styles.titleButton}>
                {loading ? 'Carregando...' : 'Confirmar'}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
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
    borderRadius: borderRadius_Main,
    height: height * 0.06,
    justifyContent: 'center',
    width: '100%',
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
  viewInput: {
    alignItems: 'center',
    width: '100%',
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
