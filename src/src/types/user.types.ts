export interface User {
  userID: number;
  documentEmployeeNo?: string;
  employeeNo?: string;
  fullName: string;
  email: string;
  isTempPassword: boolean;
  isActive: boolean;
  lastLoginDate?: string;
  createdDate: string;
  roles: string[];
}

export interface CreateUserRequest {
  documentEmployeeNo?: string;
  employeeNo?: string;
  fullName: string;
  email: string;
  roleIDs: number[];
}

export interface UpdateUserRequest {
  userID: number;
  documentEmployeeNo?: string;
  employeeNo?: string;
  fullName: string;
  email: string;
  isActive: boolean;
  roleIDs: number[];
}