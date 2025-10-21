import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IsLoading from "./IsLoading";

//fallback to localStorage if Redux state is empty
const getUserFromStorage = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

function PrivateRoute({ allowedRoles = [], children }) {
  const { user } = useSelector((state) => state.auth) || {};
  const currentUser = user || getUserFromStorage();
  const token = localStorage.getItem("token");

  console.log(
    "🔍 PrivateRoute check:",
    currentUser?.role,
    "allowed:",
    allowedRoles
  );
  console.log("User role:", currentUser?.role);
  console.log("Allowed roles:", allowedRoles);


  if (user === undefined && !currentUser) {
    return <IsLoading />;
  }

  // 🚫 No user or no token — kick to login
  if (!currentUser || !token) {
    console.warn("❌ No user or token found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }
  const role = currentUser.role?.toLowerCase();

  // 🚫 Role mismatch — not allowed
  if (!allowedRoles.includes(currentUser.role)) {
    console.warn("⚠️ Role not allowed, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // ✅ Everything’s good — render child route
  return children;
}

export default PrivateRoute;
