// Importe StyleSheet do React Native para definir estilos
import { StyleSheet } from 'react-native';

// Cores
export const COLORS = {
  DARK_BLUE: '#1E87C1',
  BLUE_MAIN: '#33A1DE',
  PACIFIC_BLUE: '#1c96d9',
  LIGHT_BLUE: '#66C6FF',
  RED_MAIN: '#FF3333',
  YELLOW_MAIN: '#FFD700',
  GREEN_MAIN: '#4CAF50',
  GREY_MAIN: '#808080',
  LIGHT_GREY: '#E7E7E7',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

// Fontes
export const FONTS = {
  FAMILY: 'Poppins', // Não é necessário adicionar 'sans-serif' para React Native
  TITLE_SIZE: 9,
  CAPTION_SIZE: 7,
  TEXT_SIZE: 6,
  INPUT_SIZE: 12,
  BUTTON_SIZE: 15,
  LABEL_SIZE: 12,
};

// Sombras
export const SHADOWS = {
  SMALL_BOX: {
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 24,
    shadowOpacity: 1,
    elevation: 1, // Adiciona uma sombra equivalente no Android
  },
  LARGE_BOX: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 1,
    elevation: 1,
  },
};

// Tamanho de entrada (Input)
export const INPUTSIZE = {
  INPUT_SIZE: '70%',
};

// Converta valores de tamanho de fonte para um número em React Native
FONTS.TITLE_SIZE = FONTS.TITLE_SIZE * 2; // ou qualquer outro fator de escala que você preferir
FONTS.CAPTION_SIZE = FONTS.CAPTION_SIZE * 2;
FONTS.TEXT_SIZE = FONTS.TEXT_SIZE * 2;
FONTS.INPUT_SIZE = FONTS.INPUT_SIZE * 2;
FONTS.BUTTON_SIZE = FONTS.BUTTON_SIZE * 2;
FONTS.LABEL_SIZE = FONTS.LABEL_SIZE * 2;

// Converta os estilos de sombra para objetos de estilo React Native
SHADOWS.SMALL_BOX = StyleSheet.flatten([SHADOWS.SMALL_BOX]);
SHADOWS.LARGE_BOX = StyleSheet.flatten([SHADOWS.LARGE_BOX]);
