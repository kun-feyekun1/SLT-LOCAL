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
        console.log("[AUTH] Login succeeded", {
          tokenType: response.token_type,
          hasAccessToken: Boolean(response.access_token),
        });
      }

      dispatch(
        sessionStarted({
          accessToken: response.access_token,
          refreshToken: null,
          role: "passenger",
          user: null,
        }),
      );

      // router.replace(
      //   "/(protected)/(passenger)/(tabs)/home",
      // );

      return response;
    },
    [dispatch],
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