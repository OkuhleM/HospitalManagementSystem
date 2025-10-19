import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Optional: fallback to localStorage if Redux state is empty
const getUserFromStorage = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

function PrivateRoute({ allowedRoles = [], children }) {
  // Get user from Redux state
  const { user } = useSelector((state) => state.auth) || {};

  // Fallback to localStorage
  const currentUser = user || getUserFromStorage();

  // If no user or no token, redirect to login
  if (!currentUser || !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed, redirect to login or landing page
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/login" replace />;
  }

  // If allowed, render children (dashboard)
  return children;
}

export default PrivateRoute;