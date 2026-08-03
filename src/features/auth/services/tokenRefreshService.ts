//Use a separate Axios instance for refresh.
//This avoids the refresh request itself entering the normal interceptor and creating an infinite loop.import axios from "axios";

import { tokenStorage } from "@/services/storage/tokenStorage";
import axios from "axios";

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

const refreshClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 20_000,
});

let refreshPromise: Promise<string> | null = null;

async function performRefresh(): Promise<string> {
  const refreshToken = await tokenStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token is unavailable.");
  }

  const response = await refreshClient.post<RefreshResponse>("/auth/refresh", {
    refreshToken,
  });

  const nextAccessToken = response.data.accessToken;
  const nextRefreshToken = response.data.refreshToken ?? refreshToken;

  await tokenStorage.setTokens({
    accessToken: nextAccessToken,
    refreshToken: nextRefreshToken,
  });

  return nextAccessToken;
}

export const tokenRefreshService = {
  async refreshAccessToken(): Promise<string> {
    if (!refreshPromise) {
      refreshPromise = performRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    return refreshPromise;
  },
};
