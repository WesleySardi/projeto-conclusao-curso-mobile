// HeatmapComponent.test.jsx

import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HeatmapComponent } from './HeatmapComponent';

import { fitToCoordinatesMock } from 'react-native-maps';

jest.mock('../utils/mapUtils', () => ({
  calculateRegion: jest.fn(),
}));

jest.mock('react-native-maps');

describe('HeatmapComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar MapView, Markers e Circles corretamente', () => {
    const originalPoints = [
      { latitude: 10, longitude: 10 },
      { latitude: 20, longitude: 20 },
    ];

    const mapRef = createRef();

    const { getByTestId, getAllByTestId } = render(
      <HeatmapComponent
        originalPoints={originalPoints}
        onMarkerPress={jest.fn()}
        mapRef={mapRef}
      />
    );

    // Verifica se o MapView está presente
    const mapView = getByTestId('map-view');
    expect(mapView).toBeTruthy();

    // Verifica se os Markers estão sendo renderizados
    const markers = getAllByTestId('marker');
    expect(markers.length).toBe(originalPoints.length);

    // Verifica se os Circles estão sendo renderizados (3 círculos por ponto)
    const circles = getAllByTestId('circle');
    expect(circles.length).toBe(originalPoints.length * 3);
  });

  test('deve chamar onMarkerPress com as coordenadas corretas ao pressionar um Marker', () => {
    const originalPoints = [
      { latitude: 10, longitude: 10 },
      { latitude: 20, longitude: 20 },
    ];

    const onMarkerPressMock = jest.fn();
    const mapRef = createRef();

    const { getAllByTestId } = render(
      <HeatmapComponent
        originalPoints={originalPoints}
        onMarkerPress={onMarkerPressMock}
        mapRef={mapRef}
      />
    );

    const markers = getAllByTestId('marker');

    // Simula o pressionamento do primeiro Marker
    fireEvent.press(markers[0]);

    expect(onMarkerPressMock).toHaveBeenCalledWith({ latitude: 10, longitude: 10 });

    // Simula o pressionamento do segundo Marker
    fireEvent.press(markers[1]);

    expect(onMarkerPressMock).toHaveBeenCalledWith({ latitude: 20, longitude: 20 });

    // Verifica se a função foi chamada duas vezes
    expect(onMarkerPressMock).toHaveBeenCalledTimes(2);
  });

  test('deve chamar fitToCoordinates com as coordenadas corretas quando originalPoints são fornecidos', () => {
    const originalPoints = [
      { latitude: 10, longitude: 10 },
      { latitude: 20, longitude: 20 },
    ];

    const mapRef = createRef();

    render(
      <HeatmapComponent
        originalPoints={originalPoints}
        onMarkerPress={jest.fn()}
        mapRef={mapRef}
      />
    );

    // Verifica se fitToCoordinates foi chamado corretamente
    expect(fitToCoordinatesMock).toHaveBeenCalledWith(
      originalPoints.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
      })),
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      }
    );
  });

  test('deve chamar fitToCoordinates novamente quando originalPoints mudam', () => {
    const initialPoints = [
      { latitude: 10, longitude: 10 },
      { latitude: 20, longitude: 20 },
    ];

    const updatedPoints = [
      { latitude: 30, longitude: 30 },
      { latitude: 40, longitude: 40 },
    ];

    const mapRef = createRef();

    const { rerender } = render(
      <HeatmapComponent
        originalPoints={initialPoints}
        onMarkerPress={jest.fn()}
        mapRef={mapRef}
      />
    );

    // Verifica a primeira chamada
    expect(fitToCoordinatesMock).toHaveBeenCalledWith(
      initialPoints.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
      })),
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      }
    );

    // Limpa as chamadas anteriores
    fitToCoordinatesMock.mockClear();

    // Rerenderiza com pontos atualizados
    rerender(
      <HeatmapComponent
        originalPoints={updatedPoints}
        onMarkerPress={jest.fn()}
        mapRef={mapRef}
      />
    );

    // Verifica a segunda chamada
    expect(fitToCoordinatesMock).toHaveBeenCalledWith(
      updatedPoints.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
      })),
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      }
    );
  });
});
