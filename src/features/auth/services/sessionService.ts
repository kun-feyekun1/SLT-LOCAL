// src/features/auth/services/session.service.ts

import { secureStorage } from "@/services/storage/secureStorage";

import type { AuthSession } from "../types/auth.types";

const SESSION_KEY = "auth_session";

export const sessionService = {
  async save(session: AuthSession): Promise<void> {
    await secureStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  async read(): Promise<AuthSession | null> {
    const storedSession = await secureStorage.getItem(SESSION_KEY);

    if (!storedSession) {
      return null;
    }

    try {
      return JSON.parse(storedSession) as AuthSession;
    } catch {
      await secureStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  async clear(): Promise<void> {
    await secureStorage.removeItem(SESSION_KEY);
  },
};