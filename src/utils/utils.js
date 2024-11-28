import Toast from 'react-native-toast-message';
import {navigate} from '../utils/NavigationService';

export const isTokenActive = async status => {
  if (status === 403) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Sessão expirada!',
      text2: 'Por favor, faça login novamente.',
      visibilityTime: 3000,
      autoHide: true,
      zIndex: 10000,
    });

    navigate('Login');

    return false;
  }

  return true;
};
