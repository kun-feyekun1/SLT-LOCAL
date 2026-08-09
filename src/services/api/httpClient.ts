import axios from "axios";

import { apiConfig } from "./config";
import {
  ejectAuthInterceptor,
  installAuthInterceptor,
} from "./interceptors/authInterceptor";
import {
  ejectErrorInterceptor,
  installErrorInterceptor,
} from "./interceptors/errorInterceptor";
import {
  ejectRefreshInterceptor,
  installRefreshInterceptor,
  type SessionExpiredHandler,
} from "./interceptors/refreshInterceptor";

export interface HttpClientConfiguration {
  onSessionExpired?: SessionExpiredHandler;
}

/**
 * Application-specific behavior injected during app bootstrap.
 *
 * Keeping this callback outside the interceptor prevents the API
 * infrastructure from directly importing Redux, Expo Router,
 * React Query, or UI code.
 */
let sessionExpiredHandler: SessionExpiredHandler | undefined;

/**
 * Main authenticated HTTP client.
 *
 * Do not globally set Content-Type because Axios must generate
 * the correct multipart boundary when uploading FormData.
 */
export const httpClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeoutMs,

  headers: {
    Accept: apiConfig.headers.accept,
    "X-Derash-Client": "mobile-expo",
  },
});

/**
 * Interceptor installation order is important:
 *
 * 1. Auth interceptor attaches the access token.
 * 2. Refresh interceptor handles recoverable 401 responses.
 * 3. Error interceptor normalizes any final unrecovered error.
 */
const authInterceptorId = installAuthInterceptor(httpClient);

const refreshInterceptorId = installRefreshInterceptor(httpClient, {
  onSessionExpired: async () => {
    await sessionExpiredHandler?.();
  },
});

const errorInterceptorId = installErrorInterceptor(httpClient);

/**
 * Inject application-level session-expiration behavior.
 *
 * Call this once during app startup.
 */
export function configureHttpClient(
  configuration: HttpClientConfiguration
): void {
  sessionExpiredHandler = configuration.onSessionExpired;
}

/**
 * Removes all installed interceptors.
 *
 * Mainly useful for automated tests, hot-reload-safe test setups,
 * or controlled infrastructure teardown.
 */
export function ejectHttpClientInterceptors(): void {
  ejectAuthInterceptor(httpClient, authInterceptorId);

  ejectRefreshInterceptor(httpClient, refreshInterceptorId);

  ejectErrorInterceptor(httpClient, errorInterceptorId);

  sessionExpiredHandler = undefined;
}
