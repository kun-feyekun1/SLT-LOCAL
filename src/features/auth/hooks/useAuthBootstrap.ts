// src/features/auth/hooks/useAuthBootstrap.ts

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";

import { useCurrentUserQuery } from "../queries";
import {
  currentUserUpdated,
  sessionRestoreFinished,
  signedOut,
} from "../state/authSlice";

export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  const currentUserQuery = useCurrentUserQuery({
    enabled: true,
  });

  useEffect(() => {
    if (!currentUserQuery.isSuccess || !currentUserQuery.data) {
      return;
    }

    dispatch(currentUserUpdated(currentUserQuery.data));
    dispatch(sessionRestoreFinished());
  }, [currentUserQuery.data, currentUserQuery.isSuccess, dispatch]);

  useEffect(() => {
    if (!currentUserQuery.isError) {
      return;
    }

    /*
     * If authService.me() returns 401 because the token is invalid,
     * clear the local authenticated state.
     */
    dispatch(signedOut());
    dispatch(sessionRestoreFinished());
  }, [currentUserQuery.isError, dispatch]);

  return currentUserQuery;
}
