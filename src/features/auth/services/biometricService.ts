// src/features/auth/services/biometric.service.ts

import * as LocalAuthentication from "expo-local-authentication";

export const biometricService = {
  async isAvailable(): Promise<boolean> {
    const hasHardware =
      await LocalAuthentication.hasHardwareAsync();

    const isEnrolled =
      await LocalAuthentication.isEnrolledAsync();

    return hasHardware && isEnrolled;
  },

  async authenticate(): Promise<boolean> {
    const result =
      await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your identity",
        cancelLabel: "Cancel",
        fallbackLabel: "Use account password",
        disableDeviceFallback: false,
      });

    return result.success;
  },
};