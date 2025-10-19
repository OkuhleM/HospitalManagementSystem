import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user: contextUser } = useContext(AuthContext);
  const reduxUser = useSelector((state) => state.auth.user);
  const user = contextUser || reduxUser;

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;