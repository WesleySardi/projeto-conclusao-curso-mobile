// useMenuAnimation.test.jsx

import React from 'react';
import { Text, Button, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import useMenuAnimation from './useMenuAnimation';
import { Animated } from 'react-native';

// Mock da animação para evitar execução real
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  // Mock de Animated.timing para executar imediatamente
  RN.Animated.timing = (value, config) => {
    return {
      start: (callback) => {
        value.setValue(config.toValue);
        if (callback) callback();
      },
    };
  };

  return RN;
});

const TestComponent = () => {
  const { menuVisible, toggleMenu, menuHeight } = useMenuAnimation();

  return (
    <View>
      <Text testID="menu-visible">{menuVisible ? 'Visible' : 'Hidden'}</Text>
      <Text testID="menu-height">{menuHeight.__getValue()}</Text>
      <Button title="Toggle Menu" onPress={toggleMenu} testID="toggle-button" />
    </View>
  );
};

describe('useMenuAnimation', () => {
  test('estado inicial está correto', () => {
    const { getByTestId } = render(<TestComponent />);

    const menuVisibleText = getByTestId('menu-visible');
    const menuHeightText = getByTestId('menu-height');

    expect(menuVisibleText.props.children).toBe('Hidden');
    expect(menuHeightText.props.children).toBe(0);
  });

  test('ao abrir o menu, menuVisible e menuHeight são atualizados corretamente', () => {
    const { getByTestId } = render(<TestComponent />);

    const toggleButton = getByTestId('toggle-button');
    const menuVisibleText = getByTestId('menu-visible');
    const menuHeightText = getByTestId('menu-height');

    // Pressiona o botão para abrir o menu
    fireEvent.press(toggleButton);

    expect(menuVisibleText.props.children).toBe('Visible');
    expect(menuHeightText.props.children).toBe(300);
  });

  test('ao fechar o menu, menuVisible e menuHeight são atualizados corretamente', () => {
    const { getByTestId } = render(<TestComponent />);

    const toggleButton = getByTestId('toggle-button');
    const menuVisibleText = getByTestId('menu-visible');
    const menuHeightText = getByTestId('menu-height');

    // Pressiona o botão para abrir o menu
    fireEvent.press(toggleButton);

    expect(menuVisibleText.props.children).toBe('Visible');
    expect(menuHeightText.props.children).toBe(300);

    // Pressiona o botão para fechar o menu
    fireEvent.press(toggleButton);

    expect(menuVisibleText.props.children).toBe('Hidden');
    expect(menuHeightText.props.children).toBe(0);
  });

  test('menuHeight reflete corretamente a interpolação', () => {
    const { getByTestId } = render(<TestComponent />);

    const toggleButton = getByTestId('toggle-button');
    const menuHeightText = getByTestId('menu-height');

    // Estado inicial
    expect(menuHeightText.props.children).toBe(0);

    // Abre o menu
    fireEvent.press(toggleButton);
    expect(menuHeightText.props.children).toBe(300);

    // Fecha o menu
    fireEvent.press(toggleButton);
    expect(menuHeightText.props.children).toBe(0);
  });
});
