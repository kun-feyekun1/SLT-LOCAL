import { QueryClient } from "@tanstack/react-query";

import { ApiError } from "@/lib/api/ApiError";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 10 * 60_000,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        if (error instanceof ApiError) {
          if (error.status >= 400 && error.status < 500) {
            return false;
          }
        }

        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
