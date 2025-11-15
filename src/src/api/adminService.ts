import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../types/api.types';
import type { User, CreateUserRequest, UpdateUserRequest } from '../types/user.types';

export const adminService = {
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await axiosInstance.get<ApiResponse<User[]>>('/api/admin/users');
    return response.data;
  },

  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get<ApiResponse<User>>(`/api/admin/users/${id}`);
    return response.data;
  },

  createUser: async (data: CreateUserRequest): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.post<ApiResponse<User>>('/api/admin/users', data);
    return response.data;
  },

  updateUser: async (id: number, data: UpdateUserRequest): Promise<ApiResponse<boolean>> => {
    const response = await axiosInstance.put<ApiResponse<boolean>>(
      `/api/admin/users/${id}`,
      data
    );
    return response.data;
  },

  deleteUser: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await axiosInstance.delete<ApiResponse<boolean>>(
      `/api/admin/users/${id}`
    );
    return response.data;
  },

  deactivateUser: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await axiosInstance.post<ApiResponse<boolean>>(
      `/api/admin/users/${id}/deactivate`
    );
    return response.data;
  },

  resendTemporaryPassword: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await axiosInstance.post<ApiResponse<boolean>>(
      `/api/admin/users/${id}/resend-password`
    );
    return response.data;
  },
};