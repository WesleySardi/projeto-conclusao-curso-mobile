import React from 'react';
import { Text, View, Button } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
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
});
