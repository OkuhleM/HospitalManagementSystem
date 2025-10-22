import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IsLoading from "./IsLoading";

const getUserFromStorage = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

function PrivateRoute({ allowedRoles = [], children }) {
  const { user } = useSelector((state) => state.auth) || {};
  const currentUser = user || getUserFromStorage();
  const token = localStorage.getItem("token");

  console.log("🔍 PrivateRoute check:", user, currentUser?.role, "allowed:", allowedRoles);

  if (!currentUser && token) {
    console.log("🕓 Waiting for user hydration...");
    return <IsLoading />;
  }

  if (!currentUser || !token) {
    console.warn("❌ No user or token found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  const role = currentUser.role?.toLowerCase();
  if (!allowedRoles.map(r => r.toLowerCase()).includes(role)) {
    console.warn(`⚠️ Role '${role}' not allowed, redirecting to /login`);
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
