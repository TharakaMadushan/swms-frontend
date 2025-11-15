/// <reference types="vite/client" />

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001';
export const HUB_URL = import.meta.env.VITE_HUB_URL || 'https://localhost:7001/hubs/notification';

export const TOKEN_KEY = 'swms_access_token';
export const REFRESH_TOKEN_KEY = 'swms_refresh_token';
export const USER_KEY = 'swms_user';

export const ROUTES = {
  LOGIN: '/login',
  CHANGE_PASSWORD: '/change-password',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  USER_DASHBOARD: '/user/dashboard',
  ADMIN_USERS: '/admin/users',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
} as const;

export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  USER: 'User',
} as const;