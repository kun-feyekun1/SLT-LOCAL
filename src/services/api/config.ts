import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

/**
 * Add application-specific Axios request configuration.
 *
 * skipAuth:
 * Prevents the access token from being attached.
 *
 * skipAuthRefresh:
 * Prevents a 401 response from triggering token refresh.
 *
 * _retry:
 * Internal flag used to prevent an infinite refresh loop.
 */
declare module "axios" {
  interface AxiosRequestConfig<D = any> {
    skipAuth?: boolean;
    skipAuthRefresh?: boolean;
  }

  interface InternalAxiosRequestConfig<D = any> {
    skipAuth?: boolean;
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}

const DEFAULT_TIMEOUT_MS = 20_000;

function normalizeBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

function resolveApiUrl(): string {
  const value = process.env.EXPO_PUBLIC_API_URL;

  if (!value) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is missing. Add it to your Expo environment.",
    );
  }

  const normalizedUrl = normalizeBaseUrl(value);

  if (!/^https?:\/\//i.test(normalizedUrl)) {
    throw new Error("EXPO_PUBLIC_API_URL must start with http:// or https://.");
  }

  if (!__DEV__ && !normalizedUrl.startsWith("https://")) {
    throw new Error("Production API communication must use HTTPS.");
  }

  return normalizedUrl;
}

function resolveTimeout(): number {
  const value = process.env.EXPO_PUBLIC_API_TIMEOUT_MS;

  if (!value) {
    return DEFAULT_TIMEOUT_MS;
  }

  const timeout = Number(value);

  if (!Number.isFinite(timeout) || timeout <= 0) {
    throw new Error("EXPO_PUBLIC_API_TIMEOUT_MS must be a positive number.");
  }

  return timeout;
}

function normalizePath(path: string): string {
  const normalized = path.trim();

  if (!normalized) {
    throw new Error("The refresh endpoint cannot be empty.");
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export const apiConfig = {
  baseURL: resolveApiUrl(),

  timeoutMs: resolveTimeout(),

  headers: {
    accept: "application/json",
  },

  auth: {
    /**
     * Replace this with your backend's real refresh endpoint.
     *
     * Examples:
     * /auth/refresh
     * /api/v1/auth/refresh
     * /auth/token/refresh/
     */
    refreshPath: normalizePath(
      process.env.EXPO_PUBLIC_API_REFRESH_PATH ?? "/auth/refresh",
    ),

    /**
     * Change this if your backend expects:
     *
     * refresh
     * refreshToken
     * refresh_token
     */
    refreshTokenRequestField: "refresh_token",
  },
} as const;

export type ApiConfig = typeof apiConfig;

export type ApiRequestConfig<D = unknown> = AxiosRequestConfig<D>;

export type InternalApiRequestConfig<D = unknown> =
  InternalAxiosRequestConfig<D>;
