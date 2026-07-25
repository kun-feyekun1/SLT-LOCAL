// src/features/auth/providers/SessionProvider.tsx

import React, { useEffect, useRef } from "react";

import { useAppDispatch } from "@/store/hooks";

import { sessionService } from "../services/sessionService";
import {
  sessionRestored,
  sessionRestoreFinished,
} from "../state/authSlice";

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({
  children,
}: SessionProviderProps) {
  const dispatch = useAppDispatch();
  const hasRestoredSession = useRef(false);

  useEffect(() => {
    if (hasRestoredSession.current) {
      return;
    }

    hasRestoredSession.current = true;

    async function restoreSession() {
      try {
        const session = await sessionService.read();

        if (session) {
          dispatch(sessionRestored(session));
          return;
        }

        dispatch(sessionRestoreFinished());
      } catch {
        dispatch(sessionRestoreFinished());
      }
    }

    void restoreSession();
  }, [dispatch]);

  return <>{children}</>;
}