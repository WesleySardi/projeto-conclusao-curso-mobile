import React, {useState, useEffect} from 'react';
import {TextInput, Text, Image, Linking, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
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
    <Container>
      {nfcRead ? (
        <ViewContainer>
          <Image source={PersonGif} style={gifStyleNfc} />
          <Title>Telefone de Emergência</Title>
          <SubTitle>
            Entre em contato com o responsável da pessoa encontrada.
          </SubTitle>
          <Label>Telefone de Emergência:</Label>
          <PhoneInput
            onChangeText={setEmergencyPhone}
            value={maskEmergencyPhone(emergencyPhone)}
            placeholder="Telefone de emergência"
            editable={false}
          />
          <TouchableOpacity onPress={() => handlePhoneCall()}>
            <Image
              source={EmergencyCallImage}
              style={{width: 100, height: 100}}
            />
          </TouchableOpacity>
        </ViewContainer>
      ) : (
        <ViewContainer>
          <Image
            source={NfcVector}
            style={{marginBottom: '20px', width: '300px', height: '300px'}}
          />
          <TitleNfcNear>Aproxime a tag NFC...</TitleNfcNear>
        </ViewContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ViewContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 25px;
  color: ${COLORS.BLACK};
`;

const SubTitle = styled.Text`
  text-align: center;
  font-size: 16px;
  margin-bottom: 25px;
  color: ${COLORS.BLACK};
`;

const Label = styled.Text`
  align-self: center;
  margin-left: 10px;
  margin-bottom: 5px;
  color: ${COLORS.BLACK};
`;

const PhoneInput = styled.TextInput`
  height: 60px;
  font-size: 20px;
  width: 100%;
  text-align: center;
  border-color: #33a1de;
  border-radius: 10px;
  border-width: 1px;
  margin-bottom: 20px;
  padding-horizontal: 10px;
  color: black;
`;

const gifStyleNfc = {
  width: 200,
  height: 200,
};

const TitleNfcNear = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  color: ${COLORS.BLACK};
`;

export default FindDependentLocally;
