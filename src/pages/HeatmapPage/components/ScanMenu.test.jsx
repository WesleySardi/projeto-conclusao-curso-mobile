// ScanMenu.test.jsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScanMenu from './ScanMenu';

// Mock da função calculateRegion
jest.mock('../utils/mapUtils', () => ({
  calculateRegion: jest.fn(),
}));

describe('ScanMenu', () => {
  const mockPoints = [
    {
      latitude: 10,
      longitude: 10,
      scanDateTime: 1633072800, // 01/10/2021 @ 12:00am (UTC)
      scanName: 'Scan 1',
    },
    {
      latitude: 20,
      longitude: 20,
      scanDateTime: 1633159200, // 02/10/2021 @ 12:00am (UTC)
      scanName: 'Scan 2',
    },
  ];

  const mockOnItemPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o título corretamente', () => {
    const { getByText } = render(<ScanMenu points={mockPoints} onItemPress={mockOnItemPress} />);
    expect(getByText('Histórico de Scans')).toBeTruthy();
  });

  test('deve renderizar a lista de pontos corretamente', () => {
    const { getAllByTestId } = render(<ScanMenu points={mockPoints} onItemPress={mockOnItemPress} />);
    const items = getAllByTestId('scan-item');
    expect(items.length).toBe(mockPoints.length);
  });

  test('deve exibir o nome e a data formatada para cada ponto', () => {
    const { getByText } = render(<ScanMenu points={mockPoints} onItemPress={mockOnItemPress} />);
    
    mockPoints.forEach(point => {
      // Verifica se o nome do scan está presente
      expect(getByText(point.scanName)).toBeTruthy();
      
      // Formata a data para comparar
      const formattedDate = new Date(point.scanDateTime * 1000).toLocaleString();
      expect(getByText(formattedDate)).toBeTruthy();
    });
  });

  test('deve chamar onItemPress com as coordenadas corretas ao pressionar um item', () => {
    const { getAllByTestId } = render(<ScanMenu points={mockPoints} onItemPress={mockOnItemPress} />);
    const items = getAllByTestId('scan-item');

    // Pressiona o primeiro item
    fireEvent.press(items[0]);
    expect(mockOnItemPress).toHaveBeenCalledWith({ latitude: 10, longitude: 10 });

    // Pressiona o segundo item
    fireEvent.press(items[1]);
    expect(mockOnItemPress).toHaveBeenCalledWith({ latitude: 20, longitude: 20 });

    // Verifica se a função foi chamada duas vezes
    expect(mockOnItemPress).toHaveBeenCalledTimes(2);
  });

  test('não deve renderizar itens quando a lista está vazia', () => {
    const { queryByTestId } = render(<ScanMenu points={[]} onItemPress={mockOnItemPress} />);
    const items = queryByTestId('scan-item');
    expect(items).toBeNull();
  });
});
