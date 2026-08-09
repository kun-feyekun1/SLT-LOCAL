import { secureStorage } from "./secureStorage";

/**
 * Identity metadata that must survive an application restart.
 *
 * Tokens live in `tokenStorage`. This module stores only the
 * non-secret identity attributes that the app needs before the
 * first authenticated request completes, so a driver or operator
 * is not temporarily treated as a passenger on cold start.
 */
const SESSION_KEY = "auth.session-identity";

export type StoredAuthRole = "passenger" | "driver" | "operator" | "admin";

export interface StoredSessionIdentity {
  role: StoredAuthRole;
  userId?: number;
}

function isRole(value: unknown): value is StoredAuthRole {
  return (
    value === "passenger" ||
    value === "driver" ||
    value === "operator" ||
    value === "admin"
  );
}

export const sessionStorage = {
  /**
   * Returns the persisted identity, or null when nothing valid
   * is stored. Corrupt entries are removed rather than thrown,
   * because a bad cache must never block application startup.
   */
  async getIdentity(): Promise<StoredSessionIdentity | null> {
    const raw = await secureStorage.getItem(SESSION_KEY);

    if (!raw) {
      return null;
    }

    try {
      const value = JSON.parse(raw) as Record<string, unknown>;

      if (!isRole(value.role)) {
        await secureStorage.removeItem(SESSION_KEY);

        return null;
      }

      return {
        role: value.role,
        userId: typeof value.userId === "number" ? value.userId : undefined,
      };
    } catch {
      await secureStorage.removeItem(SESSION_KEY);

      return null;
    }
  },

  async setIdentity(identity: StoredSessionIdentity): Promise<void> {
    await secureStorage.setItem(SESSION_KEY, JSON.stringify(identity));
  },

  async clearIdentity(): Promise<void> {
    await secureStorage.removeItem(SESSION_KEY);
  },
};
