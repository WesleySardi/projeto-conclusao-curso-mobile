import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {COLORS} from '../constants/constants';

import {useUser} from '../contexts/UserContext';

const {width, height} = Dimensions.get('window');

const AccessRecovery = ({navigation}) => {
  const {
    authToken,
    setAuthToken,
    isCreate,
    setIsCreate,
    currentRes,
    setCurrentRes,
    idRes,
    setIdRes,
    nomeRes,
    setNomeRes,
    emergePhone,
    setEmergePhone,
  } = useUser();

  const [email, setEmail] = useState('');

  const validateEmail = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/responsible/findByEmail/${email}`,
      );
      if (response) {
        setCurrentRes({
          cpfRes: response.data.cpfRes,
          emailRes: response.data.emailRes,
        });
        setIsCreate(true);
        setIdRes('');
        setNomeRes('');
        setEmergePhone('');

        navigation.navigate('EmailCheck');
      } else {
        alert('Email não vinculado a usuário');
      }
    } catch (error) {
      alert('Error: ', error);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Digite o seu E-mail</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite o seu e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={styles.viewButton}>
        <Pressable onPress={validateEmail} style={styles.pressable}>
          <Text style={styles.titleButton}>Enviar Código</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
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
  },
  pressable: {
    backgroundColor: COLORS.GREEN_MAIN,
    borderRadius: 10,
    color: COLORS.GREY_MAIN,
    padding: width * 0.02,
    justifyContent: 'center',
    width: '100%',
  },
  viewButton: {
    width: '100%',
  },
  titleButton: {
    color: COLORS.WHITE,
    fontSize: width * 0.06,
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.06,
    fontWeight: '600',
  },
  viewTitle: {
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.03,
  },
});

export default AccessRecovery;
