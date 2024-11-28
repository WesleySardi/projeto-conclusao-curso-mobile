// Mockando o Platform.OS diretamente
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios', // ou 'android', dependendo da plataforma que você deseja testar
}));

// Mockando o useNavigation do react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    createNavigationContainerRef: jest.fn().mockReturnValue({
      isReady: jest.fn().mockReturnValue(true),
      navigate: jest.fn(),
    }),
  };
});
