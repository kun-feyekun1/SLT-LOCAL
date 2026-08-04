import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import { tokenStorage } from "@/services/storage/tokenStorage";

import { apiConfig } from "../config";

const AUTHORIZATION_HEADER = "Authorization";
const BEARER_SCHEME = "Bearer";

interface RefreshedTokens {
  accessToken: string;
  refreshToken: string;
}

export type SessionExpiredHandler = () => void | Promise<void>;

export interface RefreshInterceptorOptions {
  onSessionExpired?: SessionExpiredHandler;
}

/**
 * This client intentionally has no auth or refresh interceptors.
 *
 * Otherwise, a failed refresh request could recursively trigger
 * another refresh request and cause an infinite loop.
 */
const refreshHttpClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeoutMs,
  headers: {
    Accept: apiConfig.headers.accept,
  },
});

let activeRefreshPromise: Promise<RefreshedTokens> | null = null;

let activeSessionExpirationPromise: Promise<void> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  source: Record<string, unknown>,
  keys: readonly string[],
): string | null {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return null;
}

/**
 * Supports common token response formats:
 *
 * {
 *   access_token: "...",
 *   refresh_token: "..."
 * }
 *
 * {
 *   accessToken: "...",
 *   refreshToken: "..."
 * }
 *
 * {
 *   access: "...",
 *   refresh: "..."
 * }
 *
 * It also supports a response wrapped inside `data`.
 *
 * Modify only this function when your backend uses a
 * different response structure.
 */
function parseRefreshResponse(
  responseData: unknown,
  currentRefreshToken: string,
): RefreshedTokens {
  if (!isRecord(responseData)) {
    throw new Error("The refresh endpoint returned an invalid response.");
  }

  const payload = isRecord(responseData.data)
    ? responseData.data
    : responseData;

  const accessToken = readString(payload, [
    "access_token",
    "accessToken",
    "access",
  ]);

  const refreshToken =
    readString(payload, ["refresh_token", "refreshToken", "refresh"]) ??
    currentRefreshToken;

  if (!accessToken) {
    throw new Error("The refresh response does not contain an access token.");
  }

  return {
    accessToken,
    refreshToken,
  };
}

function createRefreshRequestBody(
  refreshToken: string,
): Record<string, string> {
  return {
    [apiConfig.auth.refreshTokenRequestField]: refreshToken,
  };
}

function normalizeRequestPath(url: string): string {
  return url.replace(apiConfig.baseURL, "").split("?")[0].replace(/\/+$/, "");
}

function isRefreshEndpoint(requestUrl?: string): boolean {
  if (!requestUrl) {
    return false;
  }

  const requestPath = normalizeRequestPath(requestUrl);

  const refreshPath = apiConfig.auth.refreshPath.replace(/\/+$/, "");

  return requestPath === refreshPath;
}

async function performTokenRefresh(): Promise<RefreshedTokens> {
  const currentRefreshToken = await tokenStorage.getRefreshToken();

  if (!currentRefreshToken) {
    throw new Error(
      "The session cannot be refreshed because no refresh token exists.",
    );
  }

  const response = await refreshHttpClient.post<unknown>(
    apiConfig.auth.refreshPath,
    createRefreshRequestBody(currentRefreshToken),
  );

  const tokens = parseRefreshResponse(response.data, currentRefreshToken);

  await tokenStorage.setTokens(tokens);

  return tokens;
}

/**
 * Ensures that multiple simultaneous 401 responses create
 * only one refresh request.
 *
 * Every failed request waits for the same promise.
 */
function refreshTokensOnce(): Promise<RefreshedTokens> {
  if (!activeRefreshPromise) {
    activeRefreshPromise = performTokenRefresh().finally(() => {
      activeRefreshPromise = null;
    });
  }

  return activeRefreshPromise;
}

async function expireSessionOnce(
  handler?: SessionExpiredHandler,
): Promise<void> {
  if (!activeSessionExpirationPromise) {
    activeSessionExpirationPromise = (async () => {
      await tokenStorage.clearTokens();

      try {
        await handler?.();
      } catch (error) {
        if (__DEV__) {
          console.warn("The session expiration handler failed:", error);
        }
      }
    })().finally(() => {
      activeSessionExpirationPromise = null;
    });
  }

  await activeSessionExpirationPromise;
}

function applyAccessToken(
  request: InternalAxiosRequestConfig,
  accessToken: string,
): void {
  request.headers.set(AUTHORIZATION_HEADER, `${BEARER_SCHEME} ${accessToken}`);
}

export function installRefreshInterceptor(
  client: AxiosInstance,
  options: RefreshInterceptorOptions = {},
): number {
  return client.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const request = error.config;
      const status = error.response?.status;

      if (!request) {
        return Promise.reject(error);
      }

      const shouldIgnoreRefresh =
        request.skipAuth === true ||
        request.skipAuthRefresh === true ||
        isRefreshEndpoint(request.url);

      if (status !== 401 || shouldIgnoreRefresh) {
        return Promise.reject(error);
      }

      /**
       * The retried request also returned 401.
       * The new token is invalid, revoked or no longer authorized.
       */
      if (request._retry) {
        await expireSessionOnce(options.onSessionExpired);

        return Promise.reject(error);
      }

      request._retry = true;

      try {
        const tokens = await refreshTokensOnce();

        applyAccessToken(request, tokens.accessToken);

        return await client.request(request);
      } catch (refreshError) {
        await expireSessionOnce(options.onSessionExpired);

        return Promise.reject(refreshError);
      }
    },
  );
}

export function ejectRefreshInterceptor(
  client: AxiosInstance,
  interceptorId: number,
): void {
  client.interceptors.response.eject(interceptorId);
}
