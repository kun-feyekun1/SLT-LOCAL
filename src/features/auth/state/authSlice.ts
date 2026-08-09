// src/features/auth/state/authSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthRole, AuthUser } from "../types/auth.types";

export interface AuthState {
  user: AuthUser | null;
  role: AuthRole | null;

  accessToken: string | null;
  refreshToken: string | null;

  isAuthenticated: boolean;
  isRestoringSession: boolean;
}

const initialState: AuthState = {
  user: null,
  role: null,

  accessToken: null,
  refreshToken: null,

  isAuthenticated: false,
  isRestoringSession: true,
};

interface SessionStartedPayload {
  accessToken: string;
  refreshToken?: string | null;
  role: AuthRole;
  user?: AuthUser | null;
}

interface SessionRestoredPayload {
  accessToken: string;
  refreshToken?: string | null;
  role: AuthRole;
  user?: AuthUser | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    sessionStarted(state, action: PayloadAction<SessionStartedPayload>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.role = action.payload.role;
      state.user = action.payload.user ?? null;

      state.isAuthenticated = true;
      state.isRestoringSession = false;
    },

    sessionRestored(state, action: PayloadAction<SessionRestoredPayload>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.role = action.payload.role;
      state.user = action.payload.user ?? null;

      state.isAuthenticated = true;
      state.isRestoringSession = false;
    },

    sessionRestoreStarted(state) {
      state.isRestoringSession = true;
    },

    sessionRestoreFinished(state) {
      state.isRestoringSession = false;

      if (!state.accessToken) {
        state.isAuthenticated = false;
        state.role = null;
        state.user = null;
      }
    },

    tokensRefreshed(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken?: string | null;
      }>,
    ) {
      state.accessToken = action.payload.accessToken;

      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }

      state.isAuthenticated = true;
    },

    currentUserUpdated(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;

      if (action.payload.role) {
        state.role = action.payload.role;
      }
    },

    signedOut(state) {
      state.user = null;
      state.role = null;
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
  sessionRestoreStarted,
  tokensRefreshed,
  currentUserUpdated,
  signedOut,
} = authSlice.actions;

export const authReducer = authSlice.reducer;

export default authSlice.reducer;
