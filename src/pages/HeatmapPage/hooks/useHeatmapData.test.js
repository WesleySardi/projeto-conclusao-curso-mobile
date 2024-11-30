// useHeatmapData.test.jsx

import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { render, act } from '@testing-library/react-native';
import axios from 'axios';
import { useHeatmapData } from './useHeatmapData';
import { useUser } from '../../../contexts/UserContext'; // Ajuste o caminho conforme necessário

// Mock do UserContext
jest.mock('../../../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

// Mock do axios
jest.mock('axios');

const TestComponent = ({ cpf }) => {
  const { originalPoints, loading, error } = useHeatmapData(cpf);

  return (
    <View>
      {loading && <Text testID="loading">Loading...</Text>}
      {error && <Text testID="error">{error}</Text>}
      <FlatList
        data={originalPoints}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View testID="point-item">
            <Text>{item.scanName}</Text>
            <Text>{new Date(item.scanDateTime * 1000).toLocaleString()}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

describe('useHeatmapData', () => {
  const mockedUseUser = useUser;

  const mockCpf = '12345678900';

  const mockDataSuccess = {
    isOk: true,
    contentResponse: [
      { latitude: 10, longitude: 10, scanDateTime: 1633072800, scanName: 'Scan 1' },
      { latitude: 20, longitude: 20, scanDateTime: 1633159200, scanName: 'Scan 2' },
    ],
  };

  const mockDataEmpty = {
    isOk: true,
    contentResponse: [],
  };

  const mockDataError = {
    isOk: false,
    contentResponse: null,
  };

  const mockDataWithInvalidPoints = {
    isOk: true,
    contentResponse: [
      { latitude: 10, longitude: 10, scanDateTime: 1633072800, scanName: 'Scan 1' },
      { latitude: 'invalid', longitude: 20, scanDateTime: 1633159200, scanName: 'Scan 2' }, // Inválido
      { latitude: 30, longitude: null, scanDateTime: 1633245600, scanName: 'Scan 3' }, // Inválido
    ],
  };

  beforeAll(() => {
    // Mock da função toLocaleString para garantir consistência nos testes
    jest.spyOn(Date.prototype, 'toLocaleString').mockReturnValue('10/01/2021, 00:00:00');
  });

  afterAll(() => {
    // Restaurar todas as mocks
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    // Resetar os mocks antes de cada teste
    axios.mockReset();
    mockedUseUser.mockReturnValue({
      authToken: 'mocked-auth-token',
    });
  });

  test('deve recuperar e processar dados corretamente', async () => {
    axios.get.mockResolvedValueOnce({ data: mockDataSuccess });

    const { getByTestId, queryByTestId, findAllByTestId } = render(<TestComponent cpf={mockCpf} />);

    // Verifica o estado inicial
    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('error')).toBeNull();

    // Aguarda a atualização após a requisição
    await act(async () => {});

    // Verifica o estado após a requisição
    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();

    // Verifica se os pontos estão sendo renderizados
    const items = await findAllByTestId('point-item');
    expect(items.length).toBe(mockDataSuccess.contentResponse.length);

    // Verifica se os pontos estão ordenados corretamente (descendente por scanDateTime)
    expect(items[0].props.children[0].props.children).toBe('Scan 2');
    expect(items[1].props.children[0].props.children).toBe('Scan 1');
  });

  test('deve lidar com resposta de erro da API', async () => {
    axios.get.mockResolvedValueOnce({ data: mockDataError });

    const { getByTestId, queryByTestId, findByTestId } = render(<TestComponent cpf={mockCpf} />);

    // Verifica o estado inicial
    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('error')).toBeNull();

    // Aguarda a atualização após a requisição
    await act(async () => {});

    // Verifica o estado após a requisição
    expect(queryByTestId('loading')).toBeNull();
    const errorText = await findByTestId('error');
    expect(errorText).toBeTruthy();
    expect(errorText.props.children).toBe('Não há um histórico de scans para esse usuário.');
  });

  test('deve lidar com erro de rede', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { getByTestId, queryByTestId, findByTestId } = render(<TestComponent cpf={mockCpf} />);

    // Verifica o estado inicial
    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('error')).toBeNull();

    // Aguarda a atualização após a requisição
    await act(async () => {});

    // Verifica o estado após a requisição
    expect(queryByTestId('loading')).toBeNull();
    const errorText = await findByTestId('error');
    expect(errorText).toBeTruthy();
    expect(errorText.props.children).toBe('Network Error');
  });

  test('deve lidar com dados vazios', async () => {
    axios.get.mockResolvedValueOnce({ data: mockDataEmpty });

    const { getByTestId, queryByTestId, queryAllByTestId } = render(<TestComponent cpf={mockCpf} />);

    // Verifica o estado inicial
    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('error')).toBeNull();

    // Aguarda a atualização após a requisição
    await act(async () => {});

    // Verifica o estado após a requisição
    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();

    // Verifica se não há pontos renderizados
    const items = queryAllByTestId('point-item');
    expect(items.length).toBe(0);
  });

  test('deve filtrar pontos inválidos', async () => {
    axios.get.mockResolvedValueOnce({ data: mockDataWithInvalidPoints });

    const { getByTestId, queryByTestId, findAllByTestId } = render(<TestComponent cpf={mockCpf} />);

    // Verifica o estado inicial
    expect(getByTestId('loading')).toBeTruthy();
    expect(queryByTestId('error')).toBeNull();

    // Aguarda a atualização após a requisição
    await act(async () => {});

    // Verifica o estado após a requisição
    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();

    // Verifica se apenas os pontos válidos estão sendo renderizados
    const items = await findAllByTestId('point-item');
    expect(items.length).toBe(1);
    expect(items[0].props.children[0].props.children).toBe('Scan 1');
  });
});
