import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AccessRecovery from './AccessRecovery';
import { useUser } from '../../contexts/UserContext';
import { validateEmailRequest } from '../../services/services';
import Toast from 'react-native-toast-message';

jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('../../services/services', () => ({
  validateEmailRequest: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../../components/backgroundStyle/BubbleBackground', () => 'BubbleBackground');

describe('AccessRecovery Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    useUser.mockReturnValue({
      authToken: 'test-token',
      setIsCreate: jest.fn(),
      currentRes: { emailRes: 'test@example.com' },
      setCurrentRes: jest.fn(),
      setIdRes: jest.fn(),
      setNomeRes: jest.fn(),
      setEmergePhone: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(<AccessRecovery />);

    expect(getByText('Digite o seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Digite o seu e-mail')).toBeTruthy();
    expect(getByText('Enviar Código')).toBeTruthy();
  });

  it('should show error when email does not match currentRes.emailRes', () => {
    useUser.mockReturnValue({
      authToken: 'test-token',
      setIsCreate: jest.fn(),
      currentRes: { emailRes: 'test@example.com' },
      setCurrentRes: jest.fn(),
      setIdRes: jest.fn(),
      setNomeRes: jest.fn(),
      setEmergePhone: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(<AccessRecovery />);

    fireEvent.changeText(getByPlaceholderText('Digite o seu e-mail'), 'wrong@example.com');
    fireEvent.press(getByText('Enviar Código'));

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'top',
      text1: 'Info!',
      text2: 'E-mail incorreto.',
      visibilityTime: 3000,
      autoHide: true,
    });
  });

  it('should validate email and navigate to EmailCheck on success', async () => {
    const mockNavigate = jest.fn();
    const mockSetCurrentRes = jest.fn();
    const mockSetIsCreate = jest.fn();
    const mockSetIdRes = jest.fn();
    const mockSetNomeRes = jest.fn();
    const mockSetEmergePhone = jest.fn();

    useUser.mockReturnValue({
      authToken: 'test-token',
      setIsCreate: mockSetIsCreate,
      currentRes: { emailRes: 'test@example.com' },
      setCurrentRes: mockSetCurrentRes,
      setIdRes: mockSetIdRes,
      setNomeRes: mockSetNomeRes,
      setEmergePhone: mockSetEmergePhone,
    });

    validateEmailRequest.mockResolvedValue({
      contentResponse: {
        cpfRes: '12345678900',
        emailRes: 'test@example.com',
      },
    });

    const { getByText } = render(
      <AccessRecovery navigation={{ navigate: mockNavigate }} />
    );

    fireEvent.press(getByText('Enviar Código'));

    await waitFor(() => {
      expect(validateEmailRequest).toHaveBeenCalledWith('test@example.com', 'test-token');
    });

    expect(mockSetCurrentRes).toHaveBeenCalledWith({
      cpfRes: '12345678900',
      emailRes: 'test@example.com',
    });
    expect(mockSetIsCreate).toHaveBeenCalledWith(true);
    expect(mockSetIdRes).toHaveBeenCalledWith('');
    expect(mockSetNomeRes).toHaveBeenCalledWith('');
    expect(mockSetEmergePhone).toHaveBeenCalledWith('');
    expect(mockNavigate).toHaveBeenCalledWith('EmailCheck');
  });

  it('should show error when validateEmailRequest returns null', async () => {
    useUser.mockReturnValue({
      authToken: 'test-token',
      setIsCreate: jest.fn(),
      currentRes: { emailRes: 'test@example.com' },
      setCurrentRes: jest.fn(),
      setIdRes: jest.fn(),
      setNomeRes: jest.fn(),
      setEmergePhone: jest.fn(),
    });

    validateEmailRequest.mockResolvedValue(null);

    const { getByText } = render(<AccessRecovery />);

    fireEvent.press(getByText('Enviar Código'));

    await waitFor(() => {
      expect(validateEmailRequest).toHaveBeenCalledWith('test@example.com', 'test-token');
    });

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Email não vinculado a usuário.',
      visibilityTime: 3000,
      autoHide: true,
    });
  });
});
