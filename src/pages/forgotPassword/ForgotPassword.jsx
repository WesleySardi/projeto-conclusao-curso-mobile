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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS} from '../../constants/constants';
import {authForgotPasswordRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons/faPaperPlane';

const {width, height} = Dimensions.get('window');

const ForgotPassword = ({navigation}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const validateEmail = async () => {
    const response = await authForgotPasswordRequest(email);

    if (response != null) {
      setEmailSent(true);

      setTimeout(() => {
        navigation.navigate('Login');
      }, 5000);
    } else {
      return;
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
          {emailSent ? (
            <>
              <Text style={styles.titleEmailSent}>
                Acesse o seu e-mail para alterar a senha.
              </Text>
              <FontAwesomeIcon
                icon={faPaperPlane}
                color={COLORS.DARK_BLUE}
                size={width * 0.1}
              />
            </>
          ) : (
            <>
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
                <Pressable
                  onPress={() => validateEmail()}
                  style={styles.pressable}>
                  <Text style={styles.titleButton}>Enviar Código</Text>
                </Pressable>
              </View>
            </>
          )}
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
  titleEmailSent: {
    color: COLORS.BLUE_MAIN,
    fontSize: width * 0.06,
    fontWeight: '600',
    width: 300,
    textAlign: 'center',
    marginBottom: 20,
  },
  viewTitle: {
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.03,
  },
});

export default ForgotPassword;
