import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import NotificationItem from './NotificationItem'; // ajuste o caminho conforme necessário
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('NotificationItem', () => {
  let mockNavigation;
  let mockOnDelete;

  beforeEach(() => {
    mockNavigation = {navigate: jest.fn()};
    mockOnDelete = jest.fn();
    useNavigation.mockReturnValue(mockNavigation);
  });

  test('deve renderizar corretamente com as props fornecidas', () => {
    const notification = {
      id_notificacao: 1,
      titulo: 'Teste de Notificação',
      mensagem: 'Essa é uma mensagem de teste',
    };
  
    const {getByText, getByTestId} = render(
      <NotificationItem notification={notification} onDelete={mockOnDelete} />
    );

  
    expect(getByText('Teste de Notificação')).toBeTruthy();
    expect(getByText('Essa é uma mensagem de teste')).toBeTruthy();
    expect(getByTestId('delete-button')).toBeTruthy();
  });

  test('deve chamar onDelete quando o botão de deletar é pressionado', () => {
    const notification = {
      id_notificacao: 2,
      titulo: 'Notificação para Deletar',
      mensagem: 'Clique no botão de deletar.',
    };

    const {getByTestId} = render(
      <NotificationItem notification={notification} onDelete={mockOnDelete} />
    );

    fireEvent.press(getByTestId('delete-button'));

    expect(mockOnDelete).toHaveBeenCalledWith(2);
  });

  test('deve navegar para a página do mapa quando o botão de mapa é pressionado', () => {
    const notification = {
      id_notificacao: 3,
      titulo: 'Notificação com Mapa',
      mensagem: 'Clique para navegar ao mapa.',
      cpfDependente: '12345678900',
    };

    const {getByTestId} = render(
      <NotificationItem notification={notification} onDelete={mockOnDelete} />
    );

    fireEvent.press(getByTestId('map-button'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('HeatmapPage', {
      cpf: '12345678900',
    });
  });

  test('não deve renderizar o botão de mapa se cpfDependente não existir', () => {
    const notification = {
      id_notificacao: 4,
      titulo: 'Notificação sem Mapa',
      mensagem: 'Essa notificação não possui dependente.',
    };

    const {queryByTestId} = render(
      <NotificationItem notification={notification} onDelete={mockOnDelete} />
    );

    expect(queryByTestId('map-button')).toBeNull();
  });
});
