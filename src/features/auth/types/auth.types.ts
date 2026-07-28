
// src/features/auth/types/auth.types.ts

export interface AuthUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredLanguage: "en" | "am";
  role: "passenger" | "driver" | "operator" | "admin";
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
