// import type { RootState } from "@/store";

// export const selectAuthState = (state: RootState) => state.auth;

// export const selectCurrentUser = (state: RootState) =>
//   state.auth.user;

// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;

// export const selectAuthStatus = (state: RootState) =>
//   state.auth.bootstrapped;


// src/features/auth/state/authSelectors.ts

import type { RootState } from "@/store";

export const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectAccessToken = (state: RootState) =>
  state.auth.accessToken;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsRestoringSession = (state: RootState) =>
  state.auth.isRestoringSession;