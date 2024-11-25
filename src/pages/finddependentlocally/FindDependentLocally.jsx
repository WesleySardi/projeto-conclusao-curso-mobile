import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../constants/constants';
import NfcVector from '../../assets/gifs/nfc_vector.gif';
import EmergencyCallImage from '../../assets/imgs/EmergencyCall.png';
import PersonGif from '../../assets/gifs/person_gif.gif';
import NfcManager, {Ndef, NfcEvents} from 'react-native-nfc-manager';
import {decryptUrlRequest} from '../../services/services';
import {useUser} from '../../contexts/UserContext';

const FindDependentLocally = () => {
  const {authToken} = useUser();
  const [nfcRead, setNfcRead] = useState(false);
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const maskEmergencyPhone = phone => {
    return phone
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

  const getParamsFromUrl = url => {
    let params = {};
    let queryString = url.split('?')[1];
    if (queryString) {
      let pairs = queryString.split('&');
      pairs.forEach(pair => {
        let [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
      });
    }
    return params;
  };

  const handlePhoneCall = () => {
    const phoneNumber = `tel:+55${emergencyPhone}`;
    Linking.openURL(phoneNumber).catch(err =>
      console.error('Ocorreu um erro ao tentar fazer a chamada', err),
    );
  };

  const decryptUrl = async url => {
    var responseEmergePhone = await decryptUrlRequest(url, authToken);

    if (responseEmergePhone.contentResponse != null) {
      return responseEmergePhone.contentResponse.decryptedUrl;
    }
    return null;
  };

  const readNfcTag = async () => {
    try {
      await NfcManager.start();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, async tag => {
        try {
          const ndefRecords = tag.ndefMessage;
          if (ndefRecords && ndefRecords[0]) {
            let parsedUrl = Ndef.uri.decodePayload(ndefRecords[0].payload);

            const params = getParamsFromUrl(parsedUrl);

            var decryptedEmergPhone = await decryptUrl({
              url: params.emergPhone,
            });

            if (decryptedEmergPhone != null) {
              setEmergencyPhone(decryptedEmergPhone);
            } else {
              setEmergencyPhone(null);
            }
            setNfcRead(true);
          }
        } finally {
          NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
          NfcManager.unregisterTagEvent().catch(() => 0);
        }
      });
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('Falha ao ler a tag NFC', ex);
      Alert.alert('Erro', 'Falha ao ler a tag NFC');
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  useEffect(() => {
    readNfcTag();
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    };
  }, []);

  return (
    <View style={styles.container}>
      {nfcRead ? (
        <View style={styles.container}>
          <Image source={PersonGif} style={styles.gifStyleNfc} />
          <Text style={styles.title}>Telefone de Emergência</Text>
          <Text style={styles.subTitle}>
            Entre em contato com o responsável da pessoa encontrada.
          </Text>
          <Text style={styles.label}>Telefone de Emergência:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmergencyPhone}
            value={maskEmergencyPhone(emergencyPhone)}
            placeholderTextColor={COLORS.GREY_MAIN}
            placeholder="Telefone de emergência"
            editable={false}
          />
          <TouchableOpacity onPress={() => handlePhoneCall()}>
            <Image
              source={EmergencyCallImage}
              style={{width: 100, height: 100}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Image source={NfcVector} style={styles.zloBandStyle} />
          <Text style={styles.titleNfcNear}>Aproxime a tag NFC...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 60,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    borderColor: '#33A1DE',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
  label: {
    alignSelf: 'center',
    marginLeft: 10,
    marginBottom: 5,
    color: COLORS.BLACK,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 25,
    color: COLORS.BLACK,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
    color: COLORS.BLACK,
  },
  gifStyleNfc: {
    width: 200,
    height: 200,
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

export default FindDependentLocally;
