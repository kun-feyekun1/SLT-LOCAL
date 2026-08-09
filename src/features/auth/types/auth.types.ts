// src/features/auth/types/auth.types.ts

export type AuthRole = "passenger" | "driver" | "operator" | "admin";

export interface AuthUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredLanguage: "en" | "am";
  role: AuthRole;
}

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
}

export interface OTPRequest {
  phoneNumber: string;
  purpose: "login" | "register" | "reset-password";
}

export interface RegisterUserRequest {
  name: string;
  last_name: string;
  phone: string;
  email?: string;
  password: string;
}

export interface RegisteredUser {
  id: number;
  name: string;
  last_name: string;
  phone: string;
  email?: string;
  is_active: boolean;
  created_at: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer" | string;
  refresh_token?: string;
  refreshToken?: string;
  refresh?: string;
}
