// src/features/auth/hooks/useAuthBootstrap.ts

import { useEffect } from "react";

import { isDerashApiError } from "@/services/errors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useCurrentUserQuery } from "../queries";
import {
  currentUserUpdated,
  signedOut,
} from "../state/authSlice";
import { selectAccessToken, selectIsAuthenticated } from "../state/authSelectors";

/**
 * Determines whether a failed current-user request proves that the
 * local session is no longer valid.
 *
 * Only a genuine authentication failure may invalidate the session.
 *
 * Everything else — a missing route, a server fault, a timeout, or a
 * device that is temporarily offline — says nothing about the
 * validity of the stored credentials, so the user stays signed in
 * and the query can simply be retried later.
 *
 * Note that a 401 normally never reaches this point: the refresh
 * interceptor attempts a token refresh first and only surfaces the
 * error once the refreshed token is also rejected.
 */
function isSessionInvalidError(error: unknown): boolean {
  if (!isDerashApiError(error)) {
    /*
     * A non-API error (for example a programming fault while parsing
     * the response) is not evidence of an expired session.
     */
    return false;
  }

  return error.isUnauthorized();
}


export function useAuthBootstrap() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const currentUserQuery = useCurrentUserQuery({
    enabled: isAuthenticated && Boolean(accessToken),
  });

  useEffect(() => {
    if (!currentUserQuery.isSuccess || !currentUserQuery.data) {
      return;
    }

    dispatch(currentUserUpdated(currentUserQuery.data));
  }, [currentUserQuery.data, currentUserQuery.isSuccess, dispatch]);

  useEffect(() => {
    if (!currentUserQuery.isError) {
      return;
    }

    /*
     * Only an authentication failure invalidates the local session.
     *
     * Loading the current user is an enrichment step, not a
     * credential check. Treating any failure as fatal would sign the
     * user out immediately after a successful login whenever the
     * endpoint is unreachable, missing, or briefly failing.
     */
    if (!isSessionInvalidError(currentUserQuery.error)) {
      return;
    }

    dispatch(signedOut());
  }, [currentUserQuery.error, currentUserQuery.isError, dispatch]);


  return currentUserQuery;
}
