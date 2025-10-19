import React, { createContext, useState, useEffect } from "react";
import { decodeToken, getToken, isTokenExpired } from "../Utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken();
      console.log('decoded', decoded)
      setUser(decoded);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};