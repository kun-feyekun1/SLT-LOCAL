// src/features/auth/hooks/useAuthActions.ts

import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

import { showToast } from "@/features/toast/state/toastSlice";
import { useAppDispatch } from "@/store/hooks";
import { queryKeys } from "@/utils/queryKeys";

import { authService } from "../services/authService";
import {
  currentUserUpdated,
  sessionRestoreFinished,
  sessionStarted,
  signedOut,
} from "../state/authSlice";
import type {
  AuthSession,
  AuthUser,
} from "../types/auth.types";

/**
 * Checks whether the currently stored authentication session is valid.
 *
 * This assumes authService.me() returns the currently authenticated user.
 */
export function useBootstrapAuth() {
  const dispatch = useAppDispatch();

  const query = useQuery<AuthUser, Error>({
    queryKey: queryKeys.me,
    queryFn: authService.me,
    retry: false,
    gcTime: 0,
    staleTime: 0,
    enabled: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      dispatch(currentUserUpdated(query.data));
      dispatch(sessionRestoreFinished());
    }
  }, [dispatch, query.data, query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      dispatch(sessionRestoreFinished());
    }
  }, [dispatch, query.isError]);

  return query;
}

/**
 * Logs the user in and stores the complete session in Redux.
 */
export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation<
    AuthSession,
    Error,
    Parameters<typeof authService.login>[0]
  >({
    mutationFn: authService.login,

    onSuccess: (session) => {
      dispatch(sessionStarted(session));

      router.replace("/(tabs)/home");
    },

    onError: () => {
      dispatch(
        showToast({ message: "Login failed. Check your details and try again." }),
      );
    },
  });
}

/**
 * Registers a new user and stores the returned authentication session.
 */
export function useSignup() {
  const dispatch = useAppDispatch();

  return useMutation<
    AuthSession,
    Error,
    Parameters<typeof authService.signup>[0]
  >({
    mutationFn: authService.signup,

    onSuccess: (session) => {
      dispatch(sessionStarted(session));

      router.replace("/(auth)/otp");
    },

    onError: () => {
      dispatch(
        showToast({ message: "Signup failed. Please try again." }),
      );
    },
  });
}

/**
 * Verifies an OTP and stores the verified authentication session.
 */
export function useVerifyOtp() {
  const dispatch = useAppDispatch();

  return useMutation<
    AuthSession,
    Error,
    Parameters<typeof authService.verifyOtp>[0]
  >({
    mutationFn: authService.verifyOtp,

    onSuccess: (session) => {
      dispatch(sessionStarted(session));

      router.replace("/(tabs)/home");
    },

    onError: () => {
      dispatch(
        showToast({ message: "Invalid verification code." }),
      );
    },
  });
}

/**
 * Logs the user out and clears the Redux authentication state.
 */
export function useLogout() {
  const dispatch = useAppDispatch();

  return useMutation<void, Error, void>({
    mutationFn: authService.logout,

    onSuccess: () => {
      dispatch(signedOut());

      router.replace("/(auth)/login");
    },

    onError: () => {
      dispatch(
        showToast({ message: "Logout failed. Please try again." }),
      );
    },
  });
}