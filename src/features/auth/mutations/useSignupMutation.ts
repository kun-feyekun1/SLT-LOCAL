// src/features/auth/mutations/useSignupMutation.ts

import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { showToast } from "@/features/toast/state/toastSlice";
import { useAppDispatch } from "@/store/hooks";

import { authService } from "../services/authService";
import type { RegisteredUser } from "../types/auth.types";

type SignupVariables = Parameters<typeof authService.signup>[0];

export function useSignupMutation() {
  const dispatch = useAppDispatch();

  return useMutation<RegisteredUser, Error, SignupVariables>({
    mutationKey: ["auth", "signup"],
    mutationFn: authService.signup,

    onSuccess: () => {
      /*
       * Do not normally call sessionStarted here if the account must still
       * be verified with OTP.
       *
       * The user should become authenticated after successful OTP
       * verification, not immediately after submitting registration.
       */
      router.push("/(auth)/otp");
    },

    onError: (error) => {
      console.error("Signup mutation failed:", error);

      dispatch(
        showToast({
          message: error.message || "Signup failed. Please try again.",
        }),
      );
    },
  });
}