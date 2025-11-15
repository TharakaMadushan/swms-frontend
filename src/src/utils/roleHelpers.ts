import { ROLES } from './constants';

export const isAdmin = (roles: string[]): boolean => {
  return roles.includes(ROLES.ADMIN);
};

export const isManager = (roles: string[]): boolean => {
  return roles.includes(ROLES.MANAGER);
};

export const hasRole = (roles: string[], requiredRole: string): boolean => {
  return roles.includes(requiredRole);
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case ROLES.ADMIN:
      return 'bg-red-100 text-red-800';
    case ROLES.MANAGER:
      return 'bg-blue-100 text-blue-800';
    case ROLES.USER:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};