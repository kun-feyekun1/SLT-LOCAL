
import type { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
export type AuthStatus = "restoring" | "authenticated" | "unauthenticated";
/** * Base selector. * * Other selectors should derive their values from this selector * instead of repeatedly accessing state.auth directly. */ export const selectAuth =
  (state: RootState) => state.auth;
export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.user,
);
export const selectAccessToken = createSelector(
  [selectAuth],
  (auth) => auth.accessToken,
);
export const selectRefreshToken = createSelector(
  [selectAuth],
  (auth) => auth.refreshToken,
);
export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated,
);
export const selectIsRestoringSession = createSelector(
  [selectAuth],
  (auth) => auth.isRestoringSession,
);
/** * Provides the status shape expected by the root route without * duplicating status in the Redux state. */ export const selectAuthStatus =
  createSelector(
    [selectIsAuthenticated, selectIsRestoringSession],
    (isAuthenticated, isRestoringSession): AuthStatus => {
      if (isRestoringSession) {
        return "restoring";
      }
      return isAuthenticated ? "authenticated" : "unauthenticated";
    },
  );

/**
 * Assumes AuthUser contains a `role` property. *
 * Example: * role: "passenger" | "driver" | "operator" | "admin"
 */
export const selectAuthRole = createSelector(
  [selectCurrentUser],
  (user) => user?.role ?? null,
);
export const selectIsPassenger = createSelector(
  [selectAuthRole],
  (role) => role === "passenger",
);
export const selectIsDriver = createSelector(
  [selectAuthRole],
  (role) => role === "driver",
);
export const selectIsOperator = createSelector(
  [selectAuthRole],
  (role) => role === "operator",
);
export const selectIsAdmin = createSelector(
  [selectAuthRole],
  (role) => role === "admin",
);
