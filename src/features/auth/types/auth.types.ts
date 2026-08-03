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
}

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthStatus = "restoring" | "authenticated" | "unauthenticated";

export type AuthRole = "passenger" | "driver" | "operator" | "admin" | null;

interface AuthState {
  status: AuthStatus;
  role: AuthRole;
  accessToken: string | null;
  tokenType: string | null;
}

const initialState: AuthState = {
  status: "restoring",
  role: null,
  accessToken: null,
  tokenType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSucceeded(
      state,
      action: PayloadAction<{
        accessToken: string;
        tokenType: string;
        role: Exclude<AuthRole, null>;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType;
      state.role = action.payload.role;
      state.status = "authenticated";
    },

    restoreSucceeded(
      state,
      action: PayloadAction<{
        accessToken: string | null;
        role?: AuthRole;
      }>
    ) {
      state.accessToken = action.payload.accessToken;

      if (action.payload.accessToken) {
        state.status = "authenticated";
        state.role = action.payload.role ?? "passenger";
      } else {
        state.status = "unauthenticated";
        state.role = null;
      }
    },

    logoutSucceeded(state) {
      state.status = "unauthenticated";
      state.role = null;
      state.accessToken = null;
      state.tokenType = null;
    },
  },
});

export const { loginSucceeded, restoreSucceeded, logoutSucceeded } =
  authSlice.actions;

export default authSlice.reducer;
