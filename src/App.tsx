import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './src/store';
import { ProtectedRoute } from './src/components/common/ProtectedRoute';
import { Login } from './src/pages/Login';
import { ChangePassword } from './src/pages/ChangePassword';
import { Dashboard } from './src/pages/Dashboard';
import { AdminDashboard } from './src/pages/AdminDashboard';
import { UserDashboard } from './src/pages/UserDashboard';
import { AdminUsers } from './src/pages/AdminUsers';
import { NotFound } from './src/pages/NotFound';
import { ROUTES, ROLES } from './src/utils/constants';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#363636',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          
          {/* Protected Routes */}
          <Route
            path={ROUTES.CHANGE_PASSWORD}
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path={ROUTES.USER_DASHBOARD}
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path={ROUTES.ADMIN_USERS}
            element={
              <ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;