import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSignalR } from '../hooks/useSignalR';
import { ROLES, ROUTES } from '../utils/constants';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Initialize SignalR connection
  useSignalR();

  // Redirect to role-specific dashboard
  if (user?.roles.includes(ROLES.ADMIN)) {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  return <Navigate to={ROUTES.USER_DASHBOARD} replace />;
};