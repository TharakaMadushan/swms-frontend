import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../types/api.types';
import type {
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest,
} from '../types/auth.types';
import { tokenManager } from '../utils/tokenManager';

export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/api/auth/login',
      credentials
    );
    
    if (response.data.success && response.data.data) {
      const { accessToken, refreshToken } = response.data.data;
      tokenManager.setTokens(accessToken, refreshToken);
      tokenManager.setUser(response.data.data);
    }
    
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse<boolean>> => {
    const response = await axiosInstance.post<ApiResponse<boolean>>(
      '/api/auth/change-password',
      data
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/api/auth/logout');
    } finally {
      tokenManager.removeTokens();
    }
  },

  getCurrentUser: (): LoginResponse | null => {
    return tokenManager.getUser();
  },

  isAuthenticated: (): boolean => {
    const token = tokenManager.getAccessToken();
    if (!token) return false;
    return !tokenManager.isTokenExpired(token);
  },
};