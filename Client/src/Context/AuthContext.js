import React, { createContext, useState, useEffect } from "react";
import { decodeToken, getToken, isTokenExpired } from "../Utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      // pass token into decodeToken
      const decoded = decodeToken(token);
      console.log("decoded", decoded);
      setUser((prev) => prev || { role: decoded.role, ...decoded });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
        localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
