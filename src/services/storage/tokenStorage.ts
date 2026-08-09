import { secureStorage } from "./secureStorage";

const TOKEN_KEYS = {
  accessToken: "auth.access-token",
  refreshToken: "auth.refresh-token",
} as const;

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

function normalizeToken(token: string, label: "access" | "refresh"): string {
  const normalizedToken = token.trim();

  if (!normalizedToken) {
    throw new Error(
      `Cannot store ${label} token: token is missing or invalid.`,
    );
  }

  return normalizedToken;
}

export const tokenStorage = {
  async getAccessToken(): Promise<string | null> {
    return secureStorage.getItem(TOKEN_KEYS.accessToken);
  },

  async getRefreshToken(): Promise<string | null> {
    return secureStorage.getItem(TOKEN_KEYS.refreshToken);
  },

  async getTokens(): Promise<{
    accessToken: string | null;
    refreshToken: string | null;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(),
      this.getRefreshToken(),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  },

  async setTokens(tokens: StoredTokens): Promise<void> {
    const accessToken = normalizeToken(tokens.accessToken, "access");
    const refreshToken = normalizeToken(tokens.refreshToken, "refresh");

    await Promise.all([
      secureStorage.setItem(TOKEN_KEYS.accessToken, accessToken),
      secureStorage.setItem(TOKEN_KEYS.refreshToken, refreshToken),
    ]);
  },

  async setAccessToken(accessToken: string): Promise<void> {
    await secureStorage.setItem(
      TOKEN_KEYS.accessToken,
      normalizeToken(accessToken, "access"),
    );
  },

  async setRefreshToken(refreshToken: string): Promise<void> {
    await secureStorage.setItem(
      TOKEN_KEYS.refreshToken,
      normalizeToken(refreshToken, "refresh"),
    );
  },

  async removeAccessToken(): Promise<void> {
    await secureStorage.removeItem(TOKEN_KEYS.accessToken);
  },

  async clearTokens(): Promise<void> {
    await Promise.all([
      secureStorage.removeItem(TOKEN_KEYS.accessToken),
      secureStorage.removeItem(TOKEN_KEYS.refreshToken),
    ]);
  },
};
