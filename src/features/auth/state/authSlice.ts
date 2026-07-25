// src/features/auth/state/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AuthSession, AuthUser } from "../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isRestoringSession: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isRestoringSession: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionRestored(state, action: PayloadAction<AuthSession>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isRestoringSession = false;
    },

    sessionStarted(state, action: PayloadAction<AuthSession>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },

    sessionRestoreFinished(state) {
      state.isRestoringSession = false;
    },

    signedOut(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isRestoringSession = false;
    },
  },
});

export const {
  sessionRestored,
  sessionStarted,
  sessionRestoreFinished,
  signedOut,
} = authSlice.actions;

export const authReducer = authSlice.reducer;