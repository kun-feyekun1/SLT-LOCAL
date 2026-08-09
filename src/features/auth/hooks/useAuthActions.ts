import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

import { useAppDispatch } from "@/store/hooks";

import { authService } from "../services/authService";
import { signedOut } from "../state/authSlice";
import type { RegisteredUser, RegisterUserRequest } from "../types/auth.types";

export function useSignup() {
  return useMutation<RegisteredUser, Error, RegisterUserRequest>({
    mutationFn: authService.signup,
  });
}

/**
 * Logout as a mutation so screens get `isPending` for button state.
 * Session teardown order is intentional:
 *   1. clear tokens (authService)
 *   2. clear Redux session
 *   3. drop cached server state
 *   4. navigate to the auth stack
 */
export function useLogout() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await authService.logout();
    },
    onSettled: () => {
      dispatch(signedOut());
      queryClient.clear();
      router.replace("/(auth)/login");
    },
  });
}
