export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userID: number;
  fullName: string;
  email: string;
  employeeNo: string;
  roles: string[];
  isTempPassword: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}