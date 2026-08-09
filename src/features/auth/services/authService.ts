import { httpClient } from "@/services/api";
import { sessionStorage } from "@/services/storage/sessionStorage";
import { tokenStorage } from "@/services/storage/tokenStorage";
import type { ApiResponse } from "@/types/api";

import type {
  AuthRole,
  AuthSession,
  AuthUser,
  LoginRequest,
  LoginResponse,
  OTPRequest,
  RegisteredUser,
  RegisterUserRequest,
} from "../types/auth.types";
import type {
  ForgotPasswordFormValues,
  OtpFormValues,
} from "../utils/authSchemas";

export interface AuthenticatedSessionResult {
  accessToken: string;
  refreshToken: string | null;
  tokenType: string;
  role: AuthRole;
  user: AuthUser | null;
}

function readRefreshToken(response: LoginResponse): string | null {
  const refreshTokenCandidates = [
    response.refresh_token,
    response.refreshToken,
    response.refresh,
  ];

  for (const candidate of refreshTokenCandidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }

  return null;
}

function readTokenType(response: LoginResponse): string {
  if (typeof response.token_type === "string" && response.token_type.trim()) {
    return response.token_type;
  }

  return "bearer";
}

function readRole(source: unknown): AuthRole {
  if (typeof source !== "object" || source === null) {
    return "passenger";
  }

  const role = (source as { role?: unknown }).role;

  if (
    role === "passenger" ||
    role === "driver" ||
    role === "operator" ||
    role === "admin"
  ) {
    return role;
  }

  return "passenger";
}

async function persistTokens(
  accessToken: string,
  refreshToken: string | null,
): Promise<void> {
  if (refreshToken) {
    await tokenStorage.setTokens({
      accessToken,
      refreshToken,
    });
    return;
  }

  await tokenStorage.setAccessToken(accessToken);
}

/**
 * Persist the identity separately from the tokens so a cold start
 * can restore the correct role before the first authenticated
 * request resolves.
 */
async function persistIdentity(
  role: AuthRole,
  user: AuthUser | null,
): Promise<void> {
  const numericUserId = user ? Number(user.id) : Number.NaN;

  await sessionStorage.setIdentity({
    role,
    userId: Number.isFinite(numericUserId) ? numericUserId : undefined,
  });
}

export const authService = {
  async login(payload: LoginRequest): Promise<AuthenticatedSessionResult> {
    const response = await httpClient.post<LoginResponse>(
      "/api/users/login",
      payload,
    );

    const accessToken = response.data.access_token;

    if (!accessToken) {
      throw new Error(
        "Login succeeded, but the server did not return an access token."
      );
    }
    const refreshToken = readRefreshToken(response.data);
    const role = readRole(response.data);

    await persistTokens(accessToken, refreshToken);
    await persistIdentity(role, null);

    return {
      accessToken,
      refreshToken,
      tokenType: readTokenType(response.data),
      role,
      user: null,
    };
  },

  async signup(payload: RegisterUserRequest): Promise<RegisteredUser> {
    const response = await httpClient.post<RegisteredUser>(
      "/api/users/register",
      payload,
    );

    return response.data;
  },

  async requestOTP(payload: OTPRequest): Promise<void> {
    await httpClient.post("/auth/otp/request", payload);
  },

  async verifyOtp(payload: OtpFormValues): Promise<AuthSession> {
    const response = await httpClient.post<ApiResponse<AuthSession>>(
      "/auth/otp/verify",
      payload,
    );

    const session = response.data.data;

    await persistTokens(session.accessToken, session.refreshToken);
    await persistIdentity(readRole(session.user), session.user);

    return session;
  },

  async verifyOTP(phoneNumber: string, code: string): Promise<AuthSession> {
    const response = await httpClient.post<ApiResponse<AuthSession>>(
      "/auth/otp/verify",
      {
        phoneNumber,
        code,
      },
    );

    const session = response.data.data;

    await persistTokens(session.accessToken, session.refreshToken);
    await persistIdentity(readRole(session.user), session.user);

    return session;
  },

  async forgotPassword(payload: ForgotPasswordFormValues) {
    await httpClient.post<ApiResponse<{ accepted: boolean }>>(
      "/auth/password/forgot",
      payload,
    );
  },

  async me() {
    const response = await httpClient.get<ApiResponse<AuthUser>>("/me");

    return response.data.data;
  },

  async logout() {
    await tokenStorage.clearTokens();
    await sessionStorage.clearIdentity();
  },
};
