


// src/features/auth/providers/SessionProvider.tsx

import {
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";

import {
  sessionRestored,
  sessionRestoreFinished,
} from "@/features/auth/state/authSlice";
import type { AuthSession } from "@/features/auth/types/auth.types";
import { useAppSelector } from "@/store/hooks";
import type { AppDispatch } from "@/store/store";

import { selectIsRestoringSession } from "../state/authSelectors";

/**
 * Replace these functions with your real secure-session service.
 */
async function restoreStoredSession(): Promise<AuthSession | null> {
  /*
   * Eventually:
   *
   * const refreshToken = await SecureStore.getItemAsync("refreshToken");
   *
   * if (!refreshToken) {
   *   return null;
   * }
   *
   * return authApi.refreshSession(refreshToken);
   */

  return null;
}

export function SessionProvider({
  children,
}: PropsWithChildren) {
  const dispatch = useDispatch<AppDispatch>();

  const isRestoringSession = useAppSelector(
    selectIsRestoringSession,
  );

  const restorationStartedRef = useRef(false);

  useEffect(() => {
    if (restorationStartedRef.current) {
      return;
    }

    restorationStartedRef.current = true;

    const restoreSession = async () => {
      try {
        const session = await restoreStoredSession();

        if (session) {
          dispatch(sessionRestored(session));
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

  /*
   * app/index.tsx handles the session loading UI.
   * The provider should continue rendering children so routing
   * logic can read isRestoringSession.
   */
  void isRestoringSession;

  return children;
}