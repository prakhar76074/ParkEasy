// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/auth" />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (!payload.roles || !payload.roles.includes(requiredRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/auth" />;
  }
};

export default ProtectedRoute;
