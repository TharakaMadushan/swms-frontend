import { jwtDecode } from 'jwt-decode';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from './constants';
import type { LoginResponse } from '../types/auth.types';

interface JwtPayload {
  nameid: string;
  email: string;
  name: string;
  role: string | string[];
  exp: number;
}

export const tokenManager = {
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  removeTokens: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  setUser: (user: LoginResponse): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): LoginResponse | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  },

  getUserRoles: (token: string): string[] => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const roles = decoded.role;
      return Array.isArray(roles) ? roles : [roles];
    } catch {
      return [];
    }
  },
};