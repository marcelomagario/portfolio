import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Se o token não existir, redireciona para a página de login.
    return <Navigate to="/login" replace />;
  }

  // Se o token existir, renderiza a página que ele está protegendo.
  return <>{children}</>;
};

export default ProtectedRoute;