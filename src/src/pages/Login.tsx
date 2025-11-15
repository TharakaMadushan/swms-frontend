import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <LoginForm />
    </div>
  );
};