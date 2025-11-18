import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { login as loginAction, logout as logoutAction } from '../store/authSlice';
import type { LoginRequest, LoginResponse } from '../types/auth.types';
import type { RootState } from '../store';
import type { AsyncThunkAction } from '@reduxjs/toolkit';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state: RootState) => state.auth
  );

  // LOGIN
  const login = async (credentials: LoginRequest) => {
    // Dispatch returns a PayloadAction (fulfilled or rejected)
    const result = await dispatch(loginAction(credentials));

    // Type narrowing helpers
    type ResultType = typeof result;

    if (loginAction.fulfilled.match(result)) {
      return { status: 'fulfilled', payload: result.payload as LoginResponse };
    }

    if (loginAction.rejected.match(result)) {
      return { status: 'rejected', error: result.error.message || 'Login failed' };
    }

    return { status: 'unknown' };
  };

  // LOGOUT
  const logout = async () => {
    return dispatch(logoutAction());
  };

  // ROLE CHECKS
  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => user?.roles.includes(role)) || false;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    hasRole,
    hasAnyRole,
  };
};
