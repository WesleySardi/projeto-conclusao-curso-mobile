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

import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

import {useUser} from '../contexts/UserContext';
import {COLORS, FONTS} from '../constants/constants';
import NfcVector from '../assets/gifs/nfc_vector.gif';

import axios from 'axios';

const {width, height} = Dimensions.get('window');

const fontSize_Small = width * 0.035;
const fontSize_Normal = width * 0.045;
const fontSize_Big = width * 0.055;
const fontSize_Gigantic = width * 0.065;

const borderRadius_Main = width * 0.03;

export default function RegisterOrChangeUser({navigation}) {
  const {authToken, isCreate, currentRes, idRes, emergePhone} = useUser();

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
      // STEP 1
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(
          `https://10.0.2.2:8080/home?cpfDep=${currentRes.cpfDep}&emergPhone=${
            '47' + emergePhone
          }`,
          {
            headers: {
              Authorization: authToken,
            },
          },
        ),
      ]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
      }
    } catch (error) {
      console.warn('Falha ao escrever na tag NFC', error);
      Alert.alert('Erro', 'Falha ao escrever na tag NFC');
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
        const response = await axios.post(
          `http://10.0.2.2:8080/api/dependents/`,
          {
            headers: {
              Authorization: authToken,
            },
          },
          newUser,
        );
        console.log('Dependente criado com sucesso!');
        handleWriteNfcTag();
      } catch (error) {
        console.error(error);
      }
    }

    if (!isCreate) {
      var newUser = currentRes;

      newUser.cpfDep = textoCPFInput;
      newUser.nomeDep = textoNomeInput;
      newUser.idadeDep = textoIdadeInput;
      newUser.tipoSanguineo = textoTipoSanguineoInput;
      newUser.generoDep = textoGeneroInput;
      newUser.laudo = textoLaudoInput;

      try {
        const response = await axios.put(
          `http://10.0.2.2:8080/api/dependents/`,
          newUser,
        );
        console.log('Dependente alterado com sucesso!');

        navigation.navigate('Home');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.view1}>
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
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.titleInput}>Idade</Text>
              <TextInput
                placeholder="Idade do dependente"
                placeholderTextColor={COLORS.GREY_MAIN}
                onChangeText={text => setTextoIdadeInput(text)}
                value={textoIdadeInput}
                style={styles.input}
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
              />
            </View>
          </ScrollView>
          <View style={styles.viewButton}>
            <Pressable onPress={changeData} style={styles.pressable}>
              <Text style={styles.titleButton}>Confirmar</Text>
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
  pressable: {
    backgroundColor: COLORS.GREEN_MAIN,
    borderRadius: borderRadius_Main,
    height: height * 0.06,
    justifyContent: 'center',
    width: '100%',
  },
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
