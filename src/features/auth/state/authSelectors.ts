import type { RootState } from "@/store";

export const selectAuthState = (state: RootState) => state.auth;

export const selectCurrentUser = (state: RootState) =>
  state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectAuthStatus = (state: RootState) =>
  state.auth.bootstrapped;