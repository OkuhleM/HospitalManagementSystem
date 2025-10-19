import { jwtDecode } from 'jwt-decode';
export const getToken = () => localStorage.getItem("token");

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};