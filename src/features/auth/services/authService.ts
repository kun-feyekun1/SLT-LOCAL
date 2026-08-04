import { httpClient } from "@/services/api";
import { tokenStorage } from "@/services/storage/tokenStorage";
import type { ApiResponse } from "@/types/api";

import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisteredUser,
  RegisterUserRequest,
} from "../types/auth.types";
import type { ForgotPasswordFormValues } from "../utils/authSchemas";

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
      "/api/users/login",
      payload
    );

    const accessToken = response.data.access_token;

    if (!accessToken) {
      throw new Error(
        "Login succeeded, but the server did not return an access token."
      );
    }

    await tokenStorage.setAccessToken(accessToken);

    return response.data;
  },

  async signup(payload: RegisterUserRequest): Promise<RegisteredUser> {
    const response = await httpClient.post<RegisteredUser>(
      "/api/users/register",
      payload
    );

    return response.data;
  },

  // async verifyOtp(payload: OtpFormValues) {
  //   const response = await httpClient.post<ApiResponse<AuthSession>>(
  //     "/auth/otp/verify",
  //     payload,
  //   );

  //   await tokenStorage.setTokens(
  //     response.data.data.accessToken,
  //     response.data.data.refreshToken,
  //   );

  //   return response.data.data;
  // },

  async forgotPassword(payload: ForgotPasswordFormValues) {
    await httpClient.post<ApiResponse<{ accepted: boolean }>>(
      "/auth/password/forgot",
      payload
    );
  },

  async me() {
    const response = await httpClient.get<ApiResponse<AuthUser>>("/me");

    return response.data;
  },

  async logout() {
    await tokenStorage.clearTokens();
  },
};
