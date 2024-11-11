import axios from 'axios';
import Toast from 'react-native-toast-message';

export const authSigninRequest = async (
  emailValue,
  passwordValue,
  setLoading,
) => {
  try {
    setLoading(true);
    const response = await axios.post(`http://10.0.2.2:8080/auth/signin`, {
      username: emailValue,
      password: passwordValue,
    });
    setLoading(false);

    Toast.show({
      type: response.data.isOk ? 'success' : 'error',
      position: 'top',
      text1: response.data.infoMessage,
      text2: response.data.statusMessage,
      visibilityTime: 3000,
      autoHide: true,
    });

    return response.data;
  } catch (error) {
    setLoading(false);
    console.log('Erro inesperado: ', error);

    return null;
  }
};

export const verifyLoginRequest = async (
  emailValue,
  passwordValue,
  authToken,
) => {
  try {
    const response = await axios.get(
      `http://10.0.2.2:8080/api/responsible/commonuser/findResponsibleCpfAndName/params?emailRes=${emailValue}&senhaRes=${passwordValue}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log('Erro inesperado: ', error);

    return null;
  }
};
