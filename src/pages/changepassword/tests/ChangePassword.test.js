import React from 'react';
import {render} from '@testing-library/react-native';
import ChangePassword from '../ChangePassword'; // Ajuste o caminho conforme necessário

describe('ChangePassword', () => {
  it('renders the title "Alterar Senha"', () => {
    const {getByText} = render(<ChangePassword />);

    // Verifica se o título "Alterar Senha" está presente
    expect(getByText('Alterar Senha')).toBeTruthy();
  });
});
