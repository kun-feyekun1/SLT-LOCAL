// src/features/auth/hooks/useAuth.ts

import { router } from "expo-router";
import { useCallback } from "react";

import { useAppDispatch } from "@/store/hooks";

import { authService } from "../services/authService";
import { sessionStarted, signedOut } from "../state/authSlice";

interface SignInValues {
  phoneNumber: string;
  password: string;
}

export function useAuth() {
  const dispatch = useAppDispatch();

  const signIn = useCallback(
    async ({ phoneNumber, password }: SignInValues) => {
      const response = await authService.login({
        phone: phoneNumber.trim(),
        password,
      });

      if (__DEV__) {
        console.log("Authenticated session:", {
          tokenType: response.token_type,
          hasAccessToken: Boolean(response.access_token),
        });
      }

      /*
       * This is the passenger login endpoint, so the
       * authenticated role is passenger.
       *
       * Dispatch before navigation because TabsLayout
       * immediately checks Redux authentication state.
       */
      dispatch(
        sessionStarted({
          accessToken: response.access_token,
          refreshToken: null,
          role: "passenger",
          user: null,
        })
      );

      router.replace("/(tabs)/home");

      return response;
    },
    [dispatch]
  );

  const signOut = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      dispatch(signedOut());
      router.replace("/(auth)/login");
    }
  }, [dispatch]);

  return {
    signIn,
    signOut,
  };
}
