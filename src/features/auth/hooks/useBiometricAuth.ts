// src/features/auth/hooks/useBiometricAuth.ts

import { useContext } from "react";

import { BiometricAuthContext } from "../providers/BiometricAuthProvider";

export function useBiometricAuth() {
  const context = useContext(BiometricAuthContext);

  if (!context) {
    throw new Error(
      "useBiometricAuth must be used within BiometricAuthProvider",
    );
  }

  return context;
}