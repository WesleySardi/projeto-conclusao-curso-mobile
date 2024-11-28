import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from '../contexts/UserContext';

const customRender = (ui, options) =>
  render(
    <NavigationContainer>
      <UserProvider>{ui}</UserProvider>
    </NavigationContainer>,
    options,
  );

export * from '@testing-library/react-native';
export {customRender as render};
