// jestSetup.js

// 1. Mock do react-native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.Dimensions = {
    get: jest.fn().mockReturnValue({ width: 400, height: 800 }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  RN.PixelRatio = {
    get: jest.fn().mockReturnValue(2),
    getFontScale: jest.fn().mockReturnValue(1),
    getPixelSizeForLayoutSize: jest.fn().mockReturnValue(16),
    roundToNearestPixel: jest.fn((size) => size),
  };

  return RN;
});

// 2. Mock do react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    Swipeable: ({children, renderLeftActions, renderRightActions}) => (
      <View>
        {renderLeftActions && renderLeftActions()}
        {children}
        {renderRightActions && renderRightActions()}
      </View>
    ),
    RectButton: ({children, ...props}) => (
      <View {...props} testID={props.testID || 'rect-button'}>
        {children}
      </View>
    ),
  };
});

// 3. Mock de NativeSettingsManager
jest.mock('react-native/Libraries/Settings/NativeSettingsManager', () => ({
  getConstants: jest.fn(() => ({})), // Mock para a função `getConstants`
}));

// 4. Mock do FontAwesomeIcon
jest.mock('@fortawesome/react-native-fontawesome', () => {
  return {
    FontAwesomeIcon: () => null, // Retorna null para evitar renderização real
  };
});

// 5. Mock de react-navigation/native
jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  return {
    ...actualNavigation,
    useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
    createNavigationContainerRef: jest.fn(() => ({
      isReady: jest.fn(() => true),
      navigate: jest.fn(),
    })),
  };
});


// Mock do UserContext
jest.mock('./UserContext', () => ({
  useUser: require('./UserContext').useUser,
}));

jest.mock('react-native-toast-message', () => ({
  Toast: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

jest.mock('@react-native-firebase/messaging', () => ({
  default: {
    requestPermission: jest.fn(),
    hasPermission: jest.fn(),
    getToken: jest.fn(),
    onMessage: jest.fn(),
  },
}));

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android', // Pode ser 'ios' ou 'android', dependendo do teste
  select: jest.fn((options) => options.android), // Retorna a opção correta para a plataforma
}));



