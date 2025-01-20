import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, guestOnly = false }) => {
  const { user } = useAuth();

  if (guestOnly && user) {
    return <Navigate to="/" />;
  }

  if (!guestOnly && !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
