import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { login as loginAction, logout as logoutAction } from '../store/authSlice';
import type { LoginRequest } from '../types/auth.types';
import type { RootState } from '../store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginRequest) => {
    return dispatch(loginAction(credentials));
  };

  const logout = async () => {
    return dispatch(logoutAction());
  };

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