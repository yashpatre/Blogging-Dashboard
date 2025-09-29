import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, isAuthenticated }) {
  console.log("PrivateRoute render - isAuthenticated:", isAuthenticated); // Debug log

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}