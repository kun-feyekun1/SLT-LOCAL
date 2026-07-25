// import { useCallback } from "react";

// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import {
//   selectAuthStatus,
//   selectCurrentUser,
//   selectIsAuthenticated,
// } from "@/features/auth/state/authSelectors";
// import {
//   clearSession,
//   setSession,
// } from "@/features/auth/state/authSlice";

// import type { User } from "@/features/auth/types/auth.types";

// export function useAuth() {
//   const dispatch = useAppDispatch();

//   const user = useAppSelector(selectCurrentUser);
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);
//   const status = useAppSelector(selectAuthStatus);

//   const login = useCallback(
//     (userData: User) => {
//       dispatch(setSession(userData));
//     },
//     [dispatch],
//   );

//   const logout = useCallback(() => {
//     dispatch(clearSession());
//   }, [dispatch]);

//   return {
//     user,
//     status,
//     isAuthenticated,
//     isLoading: status === "loading",
//     login,
//     logout,
//   };
// }

// src/features/auth/hooks/useAuth.ts

import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { authService } from "../services/authService";
import {
  sessionStarted,
  signedOut,
} from "../state/authSlice";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsRestoringSession,
} from "../state/authSelectors";
import type { LoginCredentials } from "../types/auth.types";

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isRestoringSession = useAppSelector(selectIsRestoringSession);

  const signIn = useCallback(
    async (credentials: LoginCredentials) => {
      const session = await authService.login(credentials);

      dispatch(sessionStarted(session));

      return session;
    },
    [dispatch],
  );

  const signOut = useCallback(async () => {
    dispatch(signedOut());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isRestoringSession,
    signIn,
    signOut,
  };
}