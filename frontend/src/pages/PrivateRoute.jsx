// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('token');

  if (!token) {
    // ✅ No token → redirect to login
    return <Navigate to="/" replace />;
  }


  // ✅ Authenticated → render child component
  return children;
};

export default PrivateRoute;
