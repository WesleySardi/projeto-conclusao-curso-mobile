import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userType, setUserType] = useState([{}, true, '', '', '']);

  const updateUserType = newUserType => {
    setUserType(newUserType);
  };

  return (
    <UserContext.Provider value={{userType, updateUserType}}>
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
