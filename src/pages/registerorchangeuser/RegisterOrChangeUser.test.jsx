import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterOrChangeUser from './RegisterOrChangeUser';
import { useUser } from '../../contexts/UserContext';
import NfcManager from 'react-native-nfc-manager';
import {
  encryptUrlRequest,
  registerNewDependentRequest,
  updateDependentRequest,
} from '../../services/services';
import Toast from 'react-native-toast-message';

jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('react-native-nfc-manager', () => ({
  __esModule: true,
  default: {
    requestTechnology: jest.fn(),
    cancelTechnologyRequest: jest.fn(),
    ndefHandler: {
      writeNdefMessage: jest.fn(),
    },
    Ndef: {
      textRecord: jest.fn(),
      encodeMessage: jest.fn(),
    },
    NfcTech: {
      Ndef: 'Ndef',
    },
  },
}));

jest.mock('../../services/services', () => ({
  encryptUrlRequest: jest.fn(),
  registerNewDependentRequest: jest.fn(),
  updateDependentRequest: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../../components/backgroundStyle/BubbleBackground', () => 'BubbleBackground');
jest.mock('../../assets/gifs/nfc_vector.gif', () => 'nfc_vector.gif');

describe('RegisterOrChangeUser Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly in create mode', () => {
    useUser.mockReturnValue({
      authToken: 'test-token',
      isCreate: true,
      currentRes: {},
      idRes: 'test-id-res',
      emergePhone: '999999999',
    });

    const { getByText, getByPlaceholderText } = render(<RegisterOrChangeUser />);

    expect(getByText('Cadastrar dependente')).toBeTruthy();
    expect(getByPlaceholderText('CPF do dependente')).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
  });

  it('should render correctly in update mode', () => {
    useUser.mockReturnValue({
      authToken: 'test-token',
      isCreate: false,
      currentRes: {
        cpfDep: '12345678900',
        nomeDep: 'Test Dependent',
        idadeDep: '25',
        tipoSanguineo: 'O+',
        generoDep: 'Masculino',
        laudo: 'Nenhum',
      },
      idRes: 'test-id-res',
      emergePhone: '999999999',
    });

    const { getByText, getByDisplayValue } = render(<RegisterOrChangeUser />);

    expect(getByText('Alterar dependente')).toBeTruthy();
    expect(getByDisplayValue('12345678900')).toBeTruthy();
    expect(getByText('Confirmar')).toBeTruthy();
  });

  it('should handle form input changes', () => {
    useUser.mockReturnValue({
      authToken: 'test-token',
      isCreate: true,
      currentRes: {},
      idRes: 'test-id-res',
      emergePhone: '999999999',
    });

    const { getByPlaceholderText } = render(<RegisterOrChangeUser />);

    const cpfInput = getByPlaceholderText('CPF do dependente');
    fireEvent.changeText(cpfInput, '12345678900');
    expect(cpfInput.props.value).toBe('12345678900');
  });

  it('should submit form and call registerNewDependentRequest in create mode', async () => {
    useUser.mockReturnValue({
      authToken: 'test-token',
      isCreate: true,
      currentRes: {},
      idRes: 'test-id-res',
      emergePhone: '999999999',
    });

    registerNewDependentRequest.mockResolvedValue({
      isOk: true,
    });

    encryptUrlRequest.mockResolvedValue({
      contentResponse: {
        encryptedUrl: 'encrypted-value',
      },
    });

    NfcManager.requestTechnology.mockResolvedValue();
    NfcManager.Ndef.encodeMessage.mockReturnValue('encoded-message');
    NfcManager.ndefHandler.writeNdefMessage.mockResolvedValue();

    const mockNavigate = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <RegisterOrChangeUser navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.changeText(getByPlaceholderText('CPF do dependente'), '12345678900');
    fireEvent.changeText(getByPlaceholderText('Nome do dependente'), 'Test Dependent');
    fireEvent.changeText(getByPlaceholderText('Idade do dependente'), '25');
    fireEvent.changeText(getByPlaceholderText('Tipo sanguíneo do dep...'), 'O+');
    fireEvent.changeText(getByPlaceholderText('Gênero do dependente'), 'Masculino');
    fireEvent.changeText(getByPlaceholderText('Laudo médico do dep...'), 'Nenhum');

    fireEvent.press(getByText('Confirmar'));

    await waitFor(() => {
      expect(registerNewDependentRequest).toHaveBeenCalledWith(
        {
          cpfDep: '12345678900',
          nomeDep: 'Test Dependent',
          idadeDep: '25',
          tipoSanguineo: 'O+',
          generoDep: 'Masculino',
          laudo: 'Nenhum',
          cpfResDep: 'test-id-res',
        },
        'test-token'
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

});
