// src/services/api/queryClient.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
  focusManager,
  MutationCache,
  onlineManager,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { AppState, Platform, type AppStateStatus } from "react-native";

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export type ApiErrorSource = "query" | "mutation";

export interface ApiErrorContext {
  source: ApiErrorSource;
  meta?: Record<string, unknown>;
}

export type ApiErrorReporter = (
  error: unknown,
  context: ApiErrorContext,
) => void;

let globalErrorReporter: ApiErrorReporter | undefined;

export function configureApiErrorReporter(
  reporter: ApiErrorReporter | undefined,
): void {
  globalErrorReporter = reporter;
}

function reportError(error: unknown, context: ApiErrorContext): void {
  try {
    globalErrorReporter?.(error, context);
  } catch (reportingError) {
    if (__DEV__) {
      console.warn("The global API error reporter failed:", reportingError);
    }
  }
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  if (failureCount >= 2) {
    return false;
  }

  if (axios.isCancel(error)) {
    return false;
  }

  /*
   * The API error interceptor converts AxiosError into
   * DerashApiError. Read that status when available.
   */
  if (typeof error === "object" && error !== null && "failure" in error) {
    const failure = error.failure;

    if (
      typeof failure === "object" &&
      failure !== null &&
      "status" in failure
    ) {
      const status = failure.status;

      if (typeof status === "number") {
        return isRetryableStatus(status);
      }
    }
  }

  /*
   * Keep Axios support for requests that bypass the normal
   * API error interceptor.
   */
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === undefined) {
      return true;
    }

    return isRetryableStatus(status);
  }

  /*
   * Retry an unknown error at most once.
   */
  return failureCount < 1;
}

function calculateRetryDelay(attemptIndex: number): number {
  const maximumDelay = 30 * SECOND;

  const exponentialDelay = Math.min(SECOND * 2 ** attemptIndex, maximumDelay);

  /*
   * Jitter prevents many clients from retrying at exactly
   * the same moment after a server outage.
   */
  const jitter = Math.random() * (exponentialDelay / 2);

  return exponentialDelay / 2 + jitter;
}

const queryCache = new QueryCache({
  onError: (error, query) => {
    reportError(error, {
      source: "query",
      meta: query.meta,
    });
  },
});

const mutationCache = new MutationCache({
  onError: (error, _variables, _onMutateResult, mutation) => {
    reportError(error, {
      source: "mutation",
      meta: mutation.meta,
    });
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,

  defaultOptions: {
    queries: {
      /*
       * Generic default for ordinary server data.
       *
       * Live vehicle tracking queries can override this.
       */
      staleTime: 30 * SECOND,

      /*
       * Retain inactive query data for five minutes in memory.
       */
      gcTime: 5 * MINUTE,

      retry: shouldRetryQuery,
      retryDelay: calculateRetryDelay,

      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      networkMode: "online",
      structuralSharing: true,
    },

    mutations: {
      /*
       * Never retry mutations globally because payments,
       * bookings and trip operations may not be idempotent.
       */
      retry: false,
      networkMode: "online",
    },
  },
});

/*
 * This is the missing object causing your crash.
 *
 * PersistQueryClientProvider expects this object to contain:
 * - restoreClient()
 * - persistClient()
 * - removeClient()
 */
export const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "DERASH_QUERY_CACHE",
  throttleTime: 2 * SECOND,
});

let lifecycleInitialized = false;

/**
 * Connect TanStack Query to React Native application focus
 * and network state.
 *
 * Call once during application startup.
 */
export function setupQueryClientLifecycle(): void {
  if (lifecycleInitialized) {
    return;
  }

  lifecycleInitialized = true;

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      const hasConnection = state.isConnected === true;

      const hasInternet = state.isInternetReachable !== false;

      setOnline(hasConnection && hasInternet);
    });
  });

  if (Platform.OS === "web") {
    return;
  }

  focusManager.setEventListener((handleFocus) => {
    const updateFocus = (status: AppStateStatus): void => {
      handleFocus(status === "active");
    };

    updateFocus(AppState.currentState);

    const subscription = AppState.addEventListener("change", updateFocus);

    return () => {
      subscription.remove();
    };
  });
}
