// src/bootstrap/AppBootstrap.tsx

import * as SplashScreen from "expo-splash-screen";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

import { selectAuthStatus } from "@/features/auth/state/authSelectors";
import { useAppSelector } from "@/store/hooks";

export function AppBootstrap({ children }: PropsWithChildren) {
  const authStatus = useAppSelector(selectAuthStatus);

  const hasHiddenSplashRef = useRef(false);

  const isAppReady = authStatus !== "restoring";

  useEffect(() => {
    if (!isAppReady || hasHiddenSplashRef.current) {
      return;
    }

    hasHiddenSplashRef.current = true;

    void SplashScreen.hideAsync();
  }, [isAppReady]);

  /**
   * Return nothing while the native splash remains visible.
   */
  if (!isAppReady) {
    return null;
  }

  return children;
}
