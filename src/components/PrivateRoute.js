import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If token exists, render the protected component; otherwise, redirect to login
  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
