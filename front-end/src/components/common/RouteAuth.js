import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RouteAuth = ({ isProtected, redirectTo = '/', children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading state while authentication initializes
  }

  if (isProtected && !user) {
    return <Navigate to="/log-in" replace />; // Redirect unauthenticated users to login
  }

  if (!isProtected && user) {
    return <Navigate to={redirectTo} replace />; // Redirect authenticated users away from public routes
  }

  return children; // Render the children components if the access is allowed
};

export default RouteAuth;
