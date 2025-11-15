import React from 'react';
import { ChangePasswordForm } from '../components/auth/ChangePasswordForm';

export const ChangePassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-50 px-4">
      <ChangePasswordForm />
    </div>
  );
};