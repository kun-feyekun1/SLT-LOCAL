// src/features/auth/mutations/useVerifyOtpMutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

import { showToast } from "@/features/toast/state/toastSlice";
import { useAppDispatch } from "@/store/hooks";
import { queryKeys } from "@/utils/queryKeys";

import { authService } from "../services/authService";
import { sessionStarted } from "../state/authSlice";
import type { AuthSession } from "../types/auth.types";

type VerifyOtpVariables = Parameters<typeof authService.verifyOtp>[0];

export function useVerifyOtpMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<AuthSession, Error, VerifyOtpVariables>({
    mutationKey: ["auth", "verify-otp"],
    mutationFn: authService.verifyOtp,

    onSuccess: (session) => {
      dispatch(sessionStarted(session));

      queryClient.setQueryData(queryKeys.me, session.user);

      router.replace("/(tabs)/home");
    },

    onError: (error) => {
      console.error("OTP verification failed:", error);

      dispatch(
        showToast({
          message:
            error.message ||
            "The verification code is invalid or has expired.",
        }),
      );
    },
  });
}