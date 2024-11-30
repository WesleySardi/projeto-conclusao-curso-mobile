import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import NotificationTab from './NotificationTab'; // Exportação padrão
import { useNotifications } from './hooks/useNotifications'; // Exportação nomeada
import { useUser } from '../../contexts/UserContext'; // Exportação nomeada

jest.mock('./hooks/useNotifications', () => ({
  useNotifications: jest.fn(),
}));

jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('./components/NotificationItem', () => {
  const React = require('react');
  const { Text, Button, View } = require('react-native');
  return ({ notification, onDelete }) => (
    <View>
      <Text>{notification.titulo}</Text>
      <Button
        title="Deletar"
        onPress={() => onDelete(notification.id_notificacao)}
      />
    </View>
  );
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    FlatList: jest.fn(({ data, renderItem }) => (
      <>{data.map((item, index) => renderItem({ item, index }))}</>
    )),
  };
});

describe('NotificationTab', () => {
  const mockNotifications = [
    { id_notificacao: 1, titulo: 'Teste 1', mensagem: 'Mensagem 1' },
    { id_notificacao: 2, titulo: 'Teste 2', mensagem: 'Mensagem 2' },
  ];

  const mockUseNotifications = (state) => {
    useNotifications.mockReturnValue(state);
  };

  beforeEach(() => {
    useUser.mockReturnValue({ currentRes: { cpfRes: 'mockCpf' } });
  });

  test('deve mostrar o indicador de carregamento enquanto carrega notificações', () => {
    mockUseNotifications({
      notifications: [],
      loading: true,
      error: null,
      deleteNotification: jest.fn(),
    });

    const { getByTestId } = render(<NotificationTab />);

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  test('deve mostrar mensagem de erro quando há um erro', () => {
    mockUseNotifications({
      notifications: [],
      loading: false,
      error: 'Erro ao carregar notificações',
      deleteNotification: jest.fn(),
    });

    const { getByText } = render(<NotificationTab />);

    expect(getByText('Erro ao carregar notificações')).toBeTruthy();
  });

  test('deve mostrar mensagem de lista vazia quando não há notificações', () => {
    mockUseNotifications({
      notifications: [],
      loading: false,
      error: null,
      deleteNotification: jest.fn(),
    });

    const { getByText } = render(<NotificationTab />);

    expect(getByText('Nenhuma notificação encontrada.')).toBeTruthy();
  });

  test('deve renderizar notificações corretamente', () => {
    mockUseNotifications({
      notifications: mockNotifications,
      loading: false,
      error: null,
      deleteNotification: jest.fn(),
    });

    const { getByText } = render(<NotificationTab />);

    // Verifica se as notificações são renderizadas
    expect(getByText('Teste 1')).toBeTruthy();
    expect(getByText('Teste 2')).toBeTruthy();
  });

  test('deve chamar a função deleteNotification ao excluir uma notificação', async () => {
    const deleteNotificationMock = jest.fn();

    // Mocka o hook useNotifications
    useNotifications.mockReturnValue({
      notifications: mockNotifications,
      loading: false,
      error: null,
      deleteNotification: deleteNotificationMock,
    });

    const { getAllByText } = render(<NotificationTab />);

    const deleteButtons = getAllByText('Deletar'); // Encontra os botões "Deletar"

    // Simula a exclusão de uma notificação
    fireEvent.press(deleteButtons[0]);

    // Aguarda que a função deleteNotification seja chamada com o ID correto
    await waitFor(() => {
      expect(deleteNotificationMock).toHaveBeenCalledWith(1);
    });
  });
});
