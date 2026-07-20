import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAuthStatus,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/state/authSelectors";
import {
  clearSession,
  setSession,
} from "@/features/auth/state/authSlice";

import type { User } from "@/features/auth/types/auth.types";

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);

  const login = useCallback(
    (userData: User) => {
      dispatch(setSession(userData));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(clearSession());
  }, [dispatch]);

  return {
    user,
    status,
    isAuthenticated,
    isLoading: status === "loading",
    login,
    logout,
  };
}