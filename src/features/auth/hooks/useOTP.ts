// src/features/auth/hooks/useOTP.ts

import { useContext } from "react";

import { OTPContext } from "@/features/auth/providers/OTPProvider";

export function useOTP() {
  const context = useContext(OTPContext);

  if (!context) {
    throw new Error("useOTP must be used within OTPProvider");
  }

  return context;
}