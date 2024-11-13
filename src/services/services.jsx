import axios from 'axios';
import Toast from 'react-native-toast-message';

export const authSigninRequest = async (
  emailValue,
  passwordValue,
  setLoading,
) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/login`,
      {
        email: emailValue,
        password: passwordValue,
      },
    );
    setLoading(false);

    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Sucesso!',
      text2: 'Dados válidos.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return response.data;
  } catch (error) {
    setLoading(false);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Dados inválidos.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return null;
  }
};

export const verifyLoginRequest = async (
  emailValue,
  passwordValue,
  authToken,
) => {
  console.log(authToken, 'authToken');
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

// MICROSERVIÇO DE AUTENTICAÇÃO

const verifyAccountIsCreatedRequest = async (
  usernameData,
  passwordData,
  setLoading,
) => {
  try {
    const response = await axios.post(
      `http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/login`,
      {
        username: usernameData,
        password: passwordData,
      },
    );

    return response;
  } catch (error) {
    setLoading(false);
    return null;
  }
};

const tryAuthRegisterRequest = async (emailData, passwordData, setLoading) => {
  try {
    const response = await axios.post(
      `http://zlo-login-microservice-env-2.eba-cm4nxyyj.us-east-1.elasticbeanstalk.com/auth/register`,
      {
        email: emailData,
        password: passwordData,
        role: 'RESPONSÁVEL',
      },
    );

    return response;
  } catch (error) {
    setLoading(false);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Responsável já cadastrado.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return null;
  }
};

const tryCreateResponsibleRequest = async (data, setLoading) => {
  try {
    const response = await axios.post(
      `http://10.0.2.2:8080/api/responsible/create`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    setLoading(false);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Erro inesperado.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return null;
  }
};

export const registerResponsibleRequest = async (data, setLoading) => {
  setLoading(true);

  const responseVerify = await verifyAccountIsCreatedRequest(
    data.emailRes,
    data.senhaRes,
    setLoading,
  );

  if (responseVerify != null) {
    setLoading(false);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Responsável já cadastrado.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return null;
  }

  if (responseVerify == null) {
    responseAuth = await tryAuthRegisterRequest(
      data.emailRes,
      data.senhaRes,
      setLoading,
    );

    if (responseAuth == null) {
      setLoading(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erro!',
        text2: 'Responsável já cadastrado.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return null;
    }

    responseCreate = await tryCreateResponsibleRequest(data, setLoading);

    Toast.show({
      type: responseCreate.data.isOk ? 'success' : 'error',
      position: 'top',
      text1: responseCreate.data.infoMessage,
      text2: responseCreate.data.statusMessage,
      visibilityTime: 3000,
      autoHide: true,
    });

    setLoading(false);
    return responseCreate.data;
  } else {
    setLoading(false);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Responsável já cadastrado.',
      visibilityTime: 3000,
      autoHide: true,
    });
  }
};
