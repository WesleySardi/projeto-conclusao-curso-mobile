import React, {createContext, useContext, useState, useEffect} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const [currentRes, setCurrentRes] = useState({});
  const [isCreate, setIsCreate] = useState(false);
  const [idRes, setIdRes] = useState('');
  const [nomeRes, setNomeRes] = useState('');
  const [emergePhone, setEmergePhone] = useState('');

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
