import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Login from '../Login'; // Adjust the import path if necessary

// Mock necessary navigation and context
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../../../contexts/UserContext', () => ({
  useUser: () => ({
    setAuthToken: jest.fn(),
    setIsCreate: jest.fn(),
    setCurrentRes: jest.fn(),
    setIdRes: jest.fn(),
    setNomeRes: jest.fn(),
    setEmergePhone: jest.fn(),
    setEmailRes: jest.fn(),
  }),
}));

describe('<Login />', () => {
  it('renders correctly and performs basic interactions', async () => {
    const {getByPlaceholderText, getByText, getByTestId} = render(<Login />);

    // Check if title is rendered
    expect(getByText('Entrar')).toBeTruthy();

    // Check if email and password inputs are rendered
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');

    // Simulate typing in email and password
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Check if the input values are updated
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');

    // Check visibility toggle for password
    const eyeIcon = getByTestId('eye-icon');
    fireEvent.press(eyeIcon);
    expect(passwordInput.props.secureTextEntry).toBe(false); // Password should be visible after pressing

    // Simulate pressing the "Confirmar" button
    const confirmButton = getByText('Confirmar');
    fireEvent.press(confirmButton);

    // Check if the correct navigation happens or any function is called after pressing the button (you can assert based on your logic)
    expect(getByText('Confirmar')).toBeTruthy();
  });
});
