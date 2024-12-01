module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './__mocks__/jestSetup.js', // Adicione este arquivo
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-animatable|@fortawesome/react-native-fontawesome|@react-native|@react-native-community|@testing-library/react-native|@react-native-toast-message)/)',
  ],
  moduleNameMapper: {
    '^react-native-toast-message$': '<rootDir>/node_modules/react-native-toast-message/lib/index.js',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/src/testUtils/'],
  
  // Adicione as configurações de cobertura
  collectCoverage: true, // Ativar coleta de cobertura
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Inclua todos os arquivos na pasta src
    '!src/**/*.d.ts', // Exclua arquivos de definição de tipos
    '!src/**/index.{js,ts}', // Exclua arquivos de índice, se necessário
    '!src/testUtils/**', // Exclua sua pasta de utilitários de teste
    '!src/**/**/styles.js',
    '!src/**/constants/**'
  ],
  coverageDirectory: 'coverage', // Pasta onde os relatórios serão salvos
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Relatórios em diferentes formatos
};
