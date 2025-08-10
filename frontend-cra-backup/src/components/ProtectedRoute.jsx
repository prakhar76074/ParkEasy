// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/auth" />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Convert requiredRole into an array
    let allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    // If "BOTH" is in the list, add USER and HOST automatically
    if (allowedRoles.includes("BOTH")) {
      allowedRoles = [...allowedRoles, "USER", "HOST"];
    }

    // Check if user has at least one matching role
    if (!payload.roles || !payload.roles.some(role => allowedRoles.includes(role))) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/auth" />;
  }
};

export default ProtectedRoute;
