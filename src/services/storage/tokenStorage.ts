// //  Safe native token persistence (SecureStore)

// import { secureStorage } from "./secureStorage";

// const TOKEN_KEYS = {
//   accessToken: "auth.access-token",
//   refreshToken: "auth.refresh-token",
// } as const;

// export interface StoredTokens {
//   accessToken: string;
//   refreshToken: string;
// }

// export const tokenStorage = {
//   async getAccessToken(): Promise<string | null> {
//     return secureStorage.getItem(TOKEN_KEYS.accessToken);
//   },

//   async getRefreshToken(): Promise<string | null> {
//     return secureStorage.getItem(TOKEN_KEYS.refreshToken);
//   },

//   async getTokens(): Promise<{
//     accessToken: string | null;
//     refreshToken: string | null;
//   }> {
//     const [accessToken, refreshToken] = await Promise.all([
//       this.getAccessToken(),
//       this.getRefreshToken(),
//     ]);

//     return {
//       accessToken,
//       refreshToken,
//     };
//   },

//   async setTokens(accessToken: string, tokens: StoredTokens): Promise<void> {
//     await Promise.all([
//       secureStorage.setItem(TOKEN_KEYS.accessToken, tokens.accessToken),
//       secureStorage.setItem(TOKEN_KEYS.refreshToken, tokens.refreshToken),
//     ]);
//   },

//   async setAccessToken(accessToken: string): Promise<void> {
//     await secureStorage.setItem(TOKEN_KEYS.accessToken, accessToken);
//   },

//   async clearTokens(): Promise<void> {
//     await Promise.all([
//       secureStorage.removeItem(TOKEN_KEYS.accessToken),
//       secureStorage.removeItem(TOKEN_KEYS.refreshToken),
//     ]);
//   },
// };



// src/services/storage/tokenStorage.ts

import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "derash_access_token";
const REFRESH_TOKEN_KEY = "derash_refresh_token";

export const tokenStorage = {
  async setAccessToken(accessToken: string): Promise<void> {
    if (
      typeof accessToken !== "string" ||
      !accessToken.trim()
    ) {
      throw new Error(
        "Cannot store access token: token is missing or invalid.",
      );
    }

    await SecureStore.setItemAsync(
      ACCESS_TOKEN_KEY,
      accessToken,
    );
  },

  async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  async removeAccessToken(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },

  async setRefreshToken(refreshToken: string): Promise<void> {
    if (
      typeof refreshToken !== "string" ||
      !refreshToken.trim()
    ) {
      throw new Error(
        "Cannot store refresh token: token is missing or invalid.",
      );
    }

    await SecureStore.setItemAsync(
      REFRESH_TOKEN_KEY,
      refreshToken,
    );
  },

  async getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  async clearTokens(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },
};