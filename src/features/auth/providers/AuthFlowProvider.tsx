// src/features/auth/providers/AuthFlowProvider.tsx

import React from "react";

import { BiometricAuthProvider } from "./BiometricAuthProvider";
import { OTPProvider } from "./OTPProvider";

interface AuthFlowProviderProps {
  children: React.ReactNode;
}

export function AuthFlowProvider({
  children,
}: AuthFlowProviderProps) {
  return (
    <BiometricAuthProvider>
      <OTPProvider>{children}</OTPProvider>
    </BiometricAuthProvider>
  );
}

// This provider does not create its own Context.
// It simply combines providers needed by authentication screens, and
// so that avoids nesting them manually in _layout.tsx.