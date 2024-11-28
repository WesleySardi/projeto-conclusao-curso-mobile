module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-animatable|@fortawesome/react-native-fontawesome|@react-native|@react-native-community|@testing-library/react-native|@react-native-toast-message)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/src/testUtils/'],
};
