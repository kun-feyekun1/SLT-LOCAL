import * as SecureStore from "expo-secure-store";

export type AuthRole = "passenger" | "driver" | "operator";

export interface StoredAuthSession {
  accessToken: string;
  role: AuthRole;
  userId?: number;
}

const SESSION_KEY = "darash.auth.session.v1";

function isRole(value: unknown): value is AuthRole {
  return (
    value === "passenger" ||
    value === "driver" ||
    value === "operator"
  );
}

export async function readStoredSession(): Promise<StoredAuthSession | null> {
  const raw = await SecureStore.getItemAsync(SESSION_KEY);
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as Record<string, unknown>;

    if (
      typeof value.accessToken !== "string" ||
      !isRole(value.role)
    ) {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      return null;
    }

    return {
      accessToken: value.accessToken,
      role: value.role,
      userId:
        typeof value.userId === "number"
          ? value.userId
          : undefined,
    };
  } catch {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    return null;
  }
}

export async function writeStoredSession(
  session: StoredAuthSession,
): Promise<void> {
  await SecureStore.setItemAsync(
    SESSION_KEY,
    JSON.stringify(session),
  );
}

export async function clearStoredSession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

export async function getAccessToken(): Promise<string | null> {
  return (await readStoredSession())?.accessToken ?? null;
}
