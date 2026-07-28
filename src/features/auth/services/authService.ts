import { httpClient, tokenStorage } from "@/services/api";
import type { ApiResponse } from "@/types/api";

import type { AuthSession, AuthUser } from "../types/auth.types";
import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  OtpFormValues,
  SignupFormValues,
} from "../utils/authSchemas";

export const authService = {
  async login(payload: LoginFormValues) {
    const response = await httpClient.post<ApiResponse<AuthSession>>(
      "/auth/login",
      payload,
    );
    await tokenStorage.setTokens(
      response.data.data.accessToken,
      response.data.data.refreshToken,
    );
    return response.data.data;
  },
  async signup(payload: SignupFormValues) {
    const response = await httpClient.post<ApiResponse<AuthSession>>(
      "/auth/signup",
      payload,
    );
    await tokenStorage.setTokens(
      response.data.data.accessToken,
      response.data.data.refreshToken,
    );
    return response.data.data;
  },
  async verifyOtp(payload: OtpFormValues) {
    const response = await httpClient.post<ApiResponse<AuthSession>>(
      "/auth/otp/verify",
      payload,
    );
    await tokenStorage.setTokens(
      response.data.data.accessToken,
      response.data.data.refreshToken,
    );
    return response.data.data;
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
  },
};



// // src/features/auth/services/authService.ts

// import type {
//   AuthSession,
//   LoginRequest,
//   SignupRequest,
//   VerifyOtpRequest,
// } from "../types/auth.types";

// export const authService = {
//   async login(payload: LoginRequest): Promise<AuthSession> {
//     // API request
//     throw new Error("Not implemented");
//   },

//   async signup(payload: SignupRequest): Promise<AuthSession> {
//     // API request
//     throw new Error("Not implemented");
//   },

//   async verifyOtp(payload: VerifyOtpRequest): Promise<AuthSession> {
//     // API request
//     throw new Error("Not implemented");
//   },

//   async me() {
//     // API request
//     throw new Error("Not implemented");
//   },

//   async logout(): Promise<void> {
//     // API request or local token removal
//   },
// };