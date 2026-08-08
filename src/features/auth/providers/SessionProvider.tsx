


// src/features/auth/providers/SessionProvider.tsx

import { type PropsWithChildren, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { useAuthBootstrap } from "@/features/auth/hooks/useAuthBootstrap";
import {
  sessionRestored,
  sessionRestoreStarted,
  sessionRestoreFinished,
} from "@/features/auth/state/authSlice";
import { sessionStorage } from "@/services/storage/sessionStorage";
import { tokenStorage } from "@/services/storage/tokenStorage";
import type { AppDispatch } from "@/store/store";

export function SessionProvider({
  children,
}: PropsWithChildren) {
  const dispatch = useDispatch<AppDispatch>();
  useAuthBootstrap();

  const restorationStartedRef = useRef(false);

  useEffect(() => {
    if (restorationStartedRef.current) {
      return;
    }

    restorationStartedRef.current = true;

    const restoreSession = async () => {
      dispatch(sessionRestoreStarted());

      try {
        const [tokens, identity] = await Promise.all([
          tokenStorage.getTokens(),
          sessionStorage.getIdentity(),
        ]);

        if (tokens.accessToken) {
          dispatch(
            sessionRestored({
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
              /*
               * Fall back to "passenger" only when no identity was
               * persisted, which happens for sessions created before
               * the identity store existed.
               */
              role: identity?.role ?? "passenger",
              user: null,
            }),
          );
          return;
        }

        dispatch(sessionRestoreFinished());
      } catch (error) {
        console.error(
          "[SessionProvider] Session restoration failed:",
          error,
        );

        dispatch(sessionRestoreFinished());
      }
    };

    void restoreSession();
  }, [dispatch]);

  return children;
}