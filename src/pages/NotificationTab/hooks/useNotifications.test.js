import React from 'react';
import { Text, View, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { useNotifications } from './useNotifications'; // Ajuste o caminho
import { useUser } from '../../../contexts/UserContext';
import URLs from '../../../utils/urls';

jest.mock('axios');
jest.mock('../../../contexts/UserContext');

// Componente de Teste que usa o hook
const TestComponent = ({ cpf }) => {
  const { notifications, loading, error, deleteNotification } = useNotifications(cpf);

  return (
    <View>
      {loading && <Text>Carregando...</Text>}
      {error && <Text>{error}</Text>}
      {notifications.map((notification) => (
        <View key={notification.id_notificacao}>
          <Text>{notification.titulo}</Text>
          <Button
            title="Deletar"
            onPress={() => deleteNotification(notification.id_notificacao)}
          />
        </View>
      ))}
      {!loading && !notifications.length && <Text>Sem notificações</Text>}
    </View>
  );
};

describe('useNotifications', () => {
  const mockAuthToken = 'mockAuthToken';

  beforeEach(() => {
    useUser.mockReturnValue({ authToken: mockAuthToken });
  });

  test('deve buscar notificações e renderizar corretamente', async () => {
    const mockResponse = {
      data: {
        isOk: true,
        contentResponse: [{ id_notificacao: 1, titulo: 'Teste', mensagem: 'Mensagem de teste' }],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const { getByText } = render(<TestComponent cpf="mockCpf" />);

    // Verifica o estado inicial
    expect(getByText('Carregando...')).toBeTruthy();

    // Aguarda o carregamento
    await waitFor(() => {
      expect(getByText('Teste')).toBeTruthy();
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${URLs.BASIC}/api/notifications/responsavel/mockCpf`,
      { headers: { Authorization: mockAuthToken } }
    );
  });

  test('deve exibir erro ao falhar na busca de notificações', async () => {
    const mockError = new Error('Erro ao buscar notificações');
    axios.get.mockRejectedValue(mockError);

    const { getByText } = render(<TestComponent cpf="mockCpf" />);

    // Verifica o estado inicial
    expect(getByText('Carregando...')).toBeTruthy();

    // Aguarda o erro
    await waitFor(() => {
      expect(getByText('Erro ao buscar notificações')).toBeTruthy();
    });
  });

  test('deve deletar uma notificação e atualizar o estado', async () => {
    const initialNotifications = [
      { id_notificacao: 1, titulo: 'Teste 1', mensagem: 'Mensagem 1' },
      { id_notificacao: 2, titulo: 'Teste 2', mensagem: 'Mensagem 2' },
    ];

    axios.get.mockResolvedValue({
      data: {
        isOk: true,
        contentResponse: initialNotifications,
      },
    });

    axios.delete.mockResolvedValue({});

    const { getByText, getAllByText } = render(<TestComponent cpf="mockCpf" />);

    // Aguarda o carregamento das notificações
    await waitFor(() => {
      expect(getByText('Teste 1')).toBeTruthy();
      expect(getByText('Teste 2')).toBeTruthy();
    });

    const deleteButtons = getAllByText('Deletar');

    // Simula o clique no botão de deletar
    fireEvent.press(deleteButtons[0]);

    // Aguarda a exclusão da notificação
    await waitFor(() => {
      expect(getByText('Teste 2')).toBeTruthy();
    });

    expect(axios.delete).toHaveBeenCalledWith(
      `${URLs.BASIC}/api/notifications/1`,
      { headers: { Authorization: mockAuthToken } }
    );
  });
});
