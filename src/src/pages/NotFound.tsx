import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ROUTES } from '../utils/constants';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={ROUTES.DASHBOARD} className="btn-primary inline-flex items-center gap-2">
          <Home className="h-5 w-5" />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};