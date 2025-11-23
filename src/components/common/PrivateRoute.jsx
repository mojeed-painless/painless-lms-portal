import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A wrapper component that checks for user authentication.
 * If authenticated, it renders the child route (Outlet).
 * If not, it redirects the user to the login page.
 */
const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  // If not authenticated, redirect to login, preserving the current path
  // so the user can be redirected back after successful login.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;