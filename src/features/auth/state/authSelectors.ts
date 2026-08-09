// src/features/auth/state/authSelectors.ts

import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export type AuthStatus =
  "restoring" | "authenticated" | "unauthenticated" | "error";

export const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

export const selectAccessToken = createSelector(
  [selectAuth],
  (auth) => auth.accessToken
);

export const selectRefreshToken = createSelector(
  [selectAuth],
  (auth) => auth.refreshToken
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectIsRestoringSession = createSelector(
  [selectAuth],
  (auth) => auth.isRestoringSession
);

export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectIsRestoringSession],
  (isAuthenticated, isRestoringSession): AuthStatus => {
    if (isRestoringSession) {
      return "restoring";
    }

    return isAuthenticated ? "authenticated" : "unauthenticated";
  }
);

export const selectAuthRole = createSelector([selectAuth], (auth) => auth.role);

export const selectIsPassenger = createSelector(
  [selectAuthRole],
  (role) => role === "passenger"
);

export const selectIsDriver = createSelector(
  [selectAuthRole],
  (role) => role === "driver"
);

export const selectIsOperator = createSelector(
  [selectAuthRole],
  (role) => role === "operator"
);

export const selectIsAdmin = createSelector(
  [selectAuthRole],
  (role) => role === "admin"
);
