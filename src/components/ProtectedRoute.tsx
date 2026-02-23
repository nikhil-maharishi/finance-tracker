import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({children}:ProtectedRouteProps) => {
  const isAuth = true; // replace with real auth

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute