// src/components/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute: React.FC = () => {
  const authContext = useContext(AuthContext);

  return authContext?.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
