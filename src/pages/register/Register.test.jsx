jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../../services/services', () => ({
  registerResponsibleRequest: jest.fn(),
}));

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from './Register'; // Ajuste o caminho conforme necessário
import Toast from 'react-native-toast-message';
import { registerResponsibleRequest } from '../../services/services';


describe('Register Screen', () => {
    it('deve renderizar corretamente', () => {
      const { getByText } = render(<Register navigation={{ navigate: jest.fn() }} />);
      expect(getByText('Cadastrar')).toBeTruthy();
    });
  });

  it('deve mostrar erro quando campos estão vazios', () => {
    const { getByText } = render(<Register navigation={{ navigate: jest.fn() }} />);
    const confirmButton = getByText('Confirmar');
  
    fireEvent.press(confirmButton);
  
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'Existem campos vazios.',
      visibilityTime: 3000,
      autoHide: true,
    });
  });

  it('deve mostrar erro quando as senhas não coincidem', () => {
    const { getByPlaceholderText, getByText } = render(<Register navigation={{ navigate: jest.fn() }} />);
    
    fireEvent.changeText(getByPlaceholderText('Cpf'), '12345678900');
    fireEvent.changeText(getByPlaceholderText('Nome'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Idade'), '30');
    fireEvent.changeText(getByPlaceholderText('Telefone'), '999999999');
    fireEvent.changeText(getByPlaceholderText('E-mail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirmar senha'), 'password321');
  
    fireEvent.press(getByText('Confirmar'));
  
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      position: 'top',
      text1: 'Erro!',
      text2: 'As senhas não coincidem.',
      visibilityTime: 3000,
      autoHide: true,
    });
  });

  it('deve chamar registerResponsibleRequest quando os inputs são válidos', async () => {
    registerResponsibleRequest.mockResolvedValue({ isOk: true });
  
    const mockNavigate = jest.fn();
  
    const { getByPlaceholderText, getByText } = render(
      <Register navigation={{ navigate: mockNavigate }} />
    );
  
    fireEvent.changeText(getByPlaceholderText('Cpf'), '12345678900');
    fireEvent.changeText(getByPlaceholderText('Nome'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Idade'), '30');
    fireEvent.changeText(getByPlaceholderText('Telefone'), '999999999');
    fireEvent.changeText(getByPlaceholderText('E-mail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirmar senha'), 'password123');
  
    fireEvent.press(getByText('Confirmar'));
  
    await waitFor(() => {
      expect(registerResponsibleRequest).toHaveBeenCalledWith(
        {
          cpfRes: '12345678900',
          nomeRes: 'Test User',
          idadeRes: '30',
          contato1Res: '999999999',
          contato2Res: '',
          contato3Res: '',
          planoAssinado: 1,
          emailRes: 'test@example.com',
          rgRes: '',
          senhaRes: 'password123',
        },
        expect.any(Function)
      );
    });
  
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
  