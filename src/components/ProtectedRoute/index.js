import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useStateContext();

  if (user.role == process.env.REACT_APP_USER_ROLE) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
