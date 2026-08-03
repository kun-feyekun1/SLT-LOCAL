// src/features/auth/mutations/useLogoutMutation.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

import { showToast } from "@/features/toast/state/toastSlice";
import { useAppDispatch } from "@/store/hooks";
import { queryKeys } from "@/utils/queryKeys";

import { authService } from "../services/authService";
import { signedOut } from "../state/authSlice";

export function useLogoutMutation() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationKey: ["auth", "logout"],
    mutationFn: authService.logout,

    onSuccess: () => {
      dispatch(signedOut());

      queryClient.removeQueries({
        queryKey: queryKeys.me,
      });

      /*
       * Remove other private cached data here as the application grows.
       */
      queryClient.removeQueries({
        predicate: (query) => {
          const rootKey = query.queryKey[0];

          return [
            "trips",
            "wallet",
            "tickets",
            "notifications",
            "savedPlaces",
          ].includes(String(rootKey));
        },
      });

      router.replace("/(auth)/login");
    },

    onError: (error) => {
      console.error("Logout mutation failed:", error);

      dispatch(
        showToast({
          message: error.message || "Logout failed. Please try again.",
        }),
      );
    },
  });
}