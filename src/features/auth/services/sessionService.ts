// src/features/auth/services/session.service.ts

import * as SecureStore from "expo-secure-store";

import type { AuthSession } from "../types/auth.types";

const SESSION_KEY = "auth_session";

export const sessionService = {
  async save(session: AuthSession): Promise<void> {
    await SecureStore.setItemAsync(
      SESSION_KEY,
      JSON.stringify(session),
    );
  },

  async read(): Promise<AuthSession | null> {
    const storedSession =
      await SecureStore.getItemAsync(SESSION_KEY);

    if (!storedSession) {
      return null;
    }

    try {
      return JSON.parse(storedSession) as AuthSession;
    } catch {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      return null;
    }
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  },
};