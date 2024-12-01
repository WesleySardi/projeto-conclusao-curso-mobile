import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FindDependentLocally from './FindDependentLocally';
import NfcManager from 'react-native-nfc-manager';
import { decryptUrlRequest } from '../../services/services';
import { useUser } from '../../contexts/UserContext';
import { Linking } from 'react-native';

jest.mock('react-native-nfc-manager', () => {
  return {
    __esModule: true,
    default: {
      start: jest.fn(),
      setEventListener: jest.fn(),
      registerTagEvent: jest.fn(),
      unregisterTagEvent: jest.fn(),
    },
    NfcEvents: {
      DiscoverTag: 'DiscoverTag',
    },
    Ndef: {
      uri: {
        decodePayload: jest.fn(),
      },
    },
  };
});

jest.mock('../../services/services', () => ({
  decryptUrlRequest: jest.fn(),
}));

jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

jest.mock('../../assets/gifs/nfc_vector.gif', () => 'nfc_vector.gif');
jest.mock('../../assets/imgs/EmergencyCall.png', () => 'EmergencyCall.png');
jest.mock('../../assets/gifs/person_gif.gif', () => 'person_gif.gif');

describe('FindDependentLocally Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useUser.mockReturnValue({ authToken: 'test-token' });
  });

  it('should render initial UI correctly before NFC tag is read', () => {
    const { getByText } = render(<FindDependentLocally />);

    expect(getByText('Aproxime a tag NFC...')).toBeTruthy();
  });
});
