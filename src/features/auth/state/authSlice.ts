// // src/features/auth/state/authSlice.ts

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import type { AuthSession, AuthUser } from "../types/auth.types";

// interface AuthState {
//   user: AuthUser | null;
//   accessToken: string | null;
//   refreshToken: string | null;
//   isAuthenticated: boolean;
//   isRestoringSession: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   isAuthenticated: false,
//   isRestoringSession: true,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     sessionRestored(state, action: PayloadAction<AuthSession>) {
//       state.user = action.payload.user;
//       state.accessToken = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//       state.isAuthenticated = true;
//       state.isRestoringSession = false;
//     },

//     sessionStarted(state, action: PayloadAction<AuthSession>) {
//       state.user = action.payload.user;
//       state.accessToken = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//       state.isAuthenticated = true;
//     },

//     sessionRestoreFinished(state) {
//       state.isRestoringSession = false;
//     },

//     signedOut(state) {
//       state.user = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.isAuthenticated = false;
//       state.isRestoringSession = false;
//     },
//   },
// });

// export const {
//   sessionRestored,
//   sessionStarted,
//   sessionRestoreFinished,
//   signedOut,
// } = authSlice.actions;

// export const authReducer = authSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession, AuthUser } from "../types/auth.types";
export interface AuthState {
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
    /** * Called when a stored session has been successfully restored. */ sessionRestored(
      state,
      action: PayloadAction<AuthSession>,
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.isAuthenticated = true;
      state.isRestoringSession = false;
    },
    /** * Called after login, registration or token exchange. */ sessionStarted(
      state,
      action: PayloadAction<AuthSession>,
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.isAuthenticated = true;
      state.isRestoringSession = false;
    },
    /** * Called when session restoration finishes without finding * a valid authenticated session. */ sessionRestoreFinished(
      state,
    ) {
      state.isRestoringSession = false;
    },
    /** * Allows the session restoration process to be restarted. */ sessionRestoreStarted(
      state,
    ) {
      state.isRestoringSession = true;
    },
    /** * Updates tokens after a successful refresh operation. */ tokensRefreshed(
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
    },
    /** * Updates the authenticated user without changing tokens. */ currentUserUpdated(
      state,
      action: PayloadAction<AuthUser>,
    ) {
      state.user = action.payload;
    },
    /** * Clears all authentication information. * * Onboarding is intentionally not reset here. */ signedOut(
      state,
    ) {
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
  sessionRestoreStarted,
  tokensRefreshed,
  currentUserUpdated,
  signedOut,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice.reducer;
