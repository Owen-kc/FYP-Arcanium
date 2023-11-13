import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const login = (user) => {
    setAuthUser(user);
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
