import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import {useNavigation} from '@react-navigation/native';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const [currentRes, setCurrentRes] = useState({});
  const [isCreate, setIsCreate] = useState(false);
  const [idRes, setIdRes] = useState('');
  const [nomeRes, setNomeRes] = useState('');
  const [emergePhone, setEmergePhone] = useState('');
  const [emailRes, setEmailRes] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Login');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('state', state => {
      if (state.data.state && state.data.state.routes.length > 0) {
        const newScreen = state.data.state.routes[state.data.state.index].name;
        if (newScreen !== currentScreen) {
          setCurrentScreen(newScreen);
        }
      }
    });

    return unsubscribe;
  }, [navigation, currentScreen]);

  return (
    <UserContext.Provider
      value={{
        authToken,
        setAuthToken,
        isCreate,
        setIsCreate,
        currentRes,
        setCurrentRes,
        idRes,
        setIdRes,
        nomeRes,
        setNomeRes,
        emergePhone,
        setEmergePhone,
        currentScreen,
        emailRes,
        setEmailRes,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
