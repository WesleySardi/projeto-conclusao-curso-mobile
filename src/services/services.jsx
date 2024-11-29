import axios from 'axios';
import Toast from 'react-native-toast-message';
import getFunctions from '../functions/getFunctions';
import URLs from '../utils/urls';
import {isTokenActive} from '../utils/utils';

export const encryptUrlRequest = async (url, authToken) => {
  try {
    const response = await axios.post(`${URLs.BASIC}/api/url/encrypt`, url, {
      headers: {
        Authorization: authToken,
      },
    });

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const decryptUrlRequest = async (url, authToken) => {
  try {
    const response = await axios.post(`${URLs.BASIC}/api/url/decrypt`, url, {
      headers: {
        Authorization: authToken,
      },
    });

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const authSigninRequest = async (
  emailValue,
  passwordValue,
  setLoading,
) => {
  try {
    setLoading(true);
    const response = await axios.post(`${URLs.AUTH}/auth/login`, {
      email: emailValue,
      password: passwordValue,
    });
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

    if (!(await isTokenActive(error.response.status))) return null;

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

export const authForgotPasswordRequest = async emailValue => {
  try {
    const response = await axios.post(`${URLs.AUTH}/auth/forgot-password`, {
      email: emailValue,
    });

    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Sucesso!',
      text2: 'E-mail enviado com sucesso.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return response;
  } catch (error) {
    if (!(await isTokenActive(error.response.status))) return null;

    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Erro ao enviar o e-mail.',
      visibilityTime: 3000,
      autoHide: true,
    });
    return null;
  }
};

export const attCurrentResponsible = async (emailValue, authToken) => {
  try {
    const response = await axios.get(
      `${URLs.BASIC}/api/responsible/commonuser/findByEmail/${emailValue}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (!(await isTokenActive(error.response.status))) return null;

    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Usuário não encontrado.',
      visibilityTime: 3000,
      autoHide: true,
    });

    return null;
  }
};

export const updateDependentRequest = async (newUser, authToken) => {
  try {
    const response = await axios.put(
      `${URLs.BASIC}/api/dependent/commonuser/update`,
      newUser,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const deleteDependentRequest = async (id, authToken) => {
  try {
    const response = await axios.delete(
      `${URLs.BASIC}/api/dependent/commonuser/delete/${id}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const registerNewDependentRequest = async (newUser, authToken) => {
  try {
    const response = await axios.post(
      `${URLs.BASIC}/api/dependent/commonuser/create`,
      newUser,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const findDependentByCpfDepRequest = async (idRes, authToken) => {
  try {
    const response = await axios.get(
      `${URLs.BASIC}/api/dependent/commonuser/findDependentsByCpfRes/${idRes}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (!(await isTokenActive(error.response.status))) return null;

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

export const validateEmailRequest = async (email, authToken) => {
  try {
    const response = await axios.get(
      `${URLs.BASIC}/api/responsible/commonuser/findByEmail/${email}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const smsVerifyRequest = async (smsCode, smsData) => {
  try {
    const response = await axios.get(
      `${
        URLs.BASIC
      }/api/smshandler/commonuser/verifySmsCode?smsCode=${smsCode}&returnDate=${getFunctions.generateTimestamp()}&cpfDep=${
        smsData.cpfDep
      }`,
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const createSmsRequest = async smsData => {
  try {
    const response = await axios.post(
      `${URLs.BASIC}/api/smshandler/commonuser/create`,
      smsData,
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const emailVerifyRequest = async (emailCode, emailData) => {
  try {
    const response = await axios.get(
      `${URLs.BASIC}/api/email/commonuser/verifyEmailCode?email=${emailData.emailUser}&code=${emailCode}`,
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const createEmailRequest = async emailData => {
  try {
    const response = await axios.post(
      `${URLs.BASIC}/api/email/commonuser/create`,
      emailData,
    );

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
    if (!(await isTokenActive(error.response.status))) return null;

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

export const updatePasswordRequest = async (
  authTokenValue,
  newPasswordValue,
) => {
  try {
    const response = await axios.post(`${URLs.AUTH}/auth/reset-password`, {
      token: authTokenValue.replace('Bearer ', ''),
      newPassword: newPasswordValue,
    });

    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Sucesso!',
      text2: 'Senha alterada com sucesso.',
      visibilityTime: 3000,
      autoHide: true,
    });

    return response;
  } catch (error) {
    if (!(await isTokenActive(error.response.status))) return null;

    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Erro ao alterar a senha.',
      visibilityTime: 3000,
      autoHide: true,
    });

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
    const response = await axios.post(`${URLs.AUTH}/auth/login`, {
      username: usernameData,
      password: passwordData,
    });

    return response;
  } catch (error) {
    setLoading(false);
    return null;
  }
};

const tryAuthRegisterRequest = async (emailData, passwordData, setLoading) => {
  try {
    const response = await axios.post(`${URLs.AUTH}/auth/register`, {
      email: emailData,
      password: passwordData,
      role: 'RESPONSAVEL',
    });

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

export const updateResponsibleRequest = async (data, authToken, setLoading) => {
  try {
    setLoading(true);

    const response = await axios.put(
      `${URLs.BASIC}/api/responsible/commonuser/update`,
      data,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

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

    if (!(await isTokenActive(error.response.status))) return null;

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

const tryCreateResponsibleRequest = async (data, setLoading) => {
  try {
    const response = await axios.post(
      `${URLs.BASIC}/api/responsible/create`,
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

    if (!(await isTokenActive(error.response.status))) return null;

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
  console.log("ResponseVerify: ", responseVerify)

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
