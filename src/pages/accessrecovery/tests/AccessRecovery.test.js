/*import React from 'react';
import {render} from '../../../testUtils/test-utils';
import AccessRecovery from '../AccessRecovery';

import {Platform} from 'react-native';

describe('AccessRecovery', () => {
  it('deve renderizar corretamente com Platform.OS = ios', () => {
    const {getByText} = render(<AccessRecovery />);

    // Verifique se o comportamento esperado ocorre para iOS
    expect(getByText('Digite o seu e-mail')).toBeTruthy();
    // Outros testes podem ser realizados aqui para garantir que o comportamento da UI está correto
  });

  it('deve renderizar corretamente com Platform.OS = android', () => {
    // Mudando o mock para Android temporariamente
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }));

    const {getByText} = render(<AccessRecovery />);

    // Verifique se o comportamento esperado ocorre para Android
    expect(getByText('Digite o seu e-mail')).toBeTruthy();
    // Outros testes podem ser feitos para garantir que a UI se comporta conforme esperado
  });
});*/
