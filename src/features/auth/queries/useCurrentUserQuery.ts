// src/features/auth/queries/useCurrentUserQuery.ts

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/utils/queryKeys";

import { authService } from "../services/authService";
import type { AuthUser } from "../types/auth.types";

type UseCurrentUserQueryOptions = {
  enabled?: boolean;
};

export function useCurrentUserQuery({
  enabled = true,
}: UseCurrentUserQueryOptions = {}) {
  return useQuery<AuthUser, Error>({
    queryKey: queryKeys.me,
    queryFn: authService.me,
    enabled,
    retry: false,

    // The authenticated user can remain fresh briefly.
    staleTime: 30 * 1000,

    // Keep it cached long enough to avoid unnecessary recreation.
    gcTime: 5 * 60 * 1000,
  });
}