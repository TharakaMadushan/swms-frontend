import axiosInstance from './axiosConfig';
import type { ApiResponse } from '../types/api.types';
import type { DashboardStats } from '../types/dashboard.types';
import type { Notification } from '../types/notification.types';

export const userService = {
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await axiosInstance.get<ApiResponse<DashboardStats>>(
      '/api/user/dashboard'
    );
    return response.data;
  },

  getNotifications: async (
    pageSize: number = 20,
    pageNumber: number = 1
  ): Promise<ApiResponse<Notification[]>> => {
    const response = await axiosInstance.get<ApiResponse<Notification[]>>(
      '/api/user/notifications',
      {
        params: { pageSize, pageNumber },
      }
    );
    return response.data;
  },

  getUnreadCount: async (): Promise<ApiResponse<number>> => {
    const response = await axiosInstance.get<ApiResponse<number>>(
      '/api/user/notifications/unread-count'
    );
    return response.data;
  },

  markNotificationAsRead: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await axiosInstance.post<ApiResponse<boolean>>(
      `/api/user/notifications/${id}/mark-read`
    );
    return response.data;
  },

  markAllNotificationsAsRead: async (): Promise<ApiResponse<boolean>> => {
    const response = await axiosInstance.post<ApiResponse<boolean>>(
      '/api/user/notifications/mark-all-read'
    );
    return response.data;
  },
};