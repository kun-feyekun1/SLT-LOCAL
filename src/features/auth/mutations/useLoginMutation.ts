// src/features/auth/mutations/useLoginMutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

import { showToast } from "@/features/toast/state/toastSlice";
import { useAppDispatch } from "@/store/hooks";
import { queryKeys } from "@/utils/queryKeys";

import { authService } from "../services/authService";
import { sessionStarted } from "../state/authSlice";

type LoginVariables = Parameters<typeof authService.login>[0];
type LoginResult = Awaited<ReturnType<typeof authService.login>>;

export function useLoginMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<LoginResult, Error, LoginVariables>({
    mutationKey: ["auth", "login"],
    mutationFn: authService.login,

    onSuccess: async (session) => {
      dispatch(
        sessionStarted({
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          role: session.role,
          user: session.user,
        }),
      );

      if (session.user) {
        queryClient.setQueryData(queryKeys.me, session.user);
      }

      router.replace("/(tabs)/home");
    },

    onError: (error) => {
      console.error("Login mutation failed:", error);

      dispatch(
        showToast({
          message:
            error.message ||
            "Login failed. Check your details and try again.",
        }),
      );
    },
  });
}