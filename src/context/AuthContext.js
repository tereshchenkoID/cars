import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { auth } = useSelector(state => state.auth)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(true)
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)