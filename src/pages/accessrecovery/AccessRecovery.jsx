import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Dimensions,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../constants/constants';
import {useUser} from '../../contexts/UserContext';
import {validateEmailRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';

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

  const validateEmail = async () => {
    try {
      const response = await validateEmailRequest(email, authToken);

      if (response != null) {
        setCurrentRes({
          cpfRes: response.contentResponse.cpfRes,
          emailRes: response.contentResponse.emailRes,
        });
        setIsCreate(true);
        setIdRes('');
        setNomeRes('');
        setEmergePhone('');

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
        <View style={styles.container}>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>Digite o seu e-mail</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Digite o seu e-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <View style={styles.viewButton}>
            <Pressable onPress={() => validateEmail()} style={styles.pressable}>
              <Text style={styles.titleButton}>Enviar Código</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
