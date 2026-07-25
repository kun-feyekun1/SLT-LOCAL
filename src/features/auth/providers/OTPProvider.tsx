// src/features/auth/providers/OTPProvider.tsx

import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { authService } from "../services/authService";
import type { OTPRequest } from "../types/auth.types";

interface OTPContextValue {
  phoneNumber: string | null;
  purpose: OTPRequest["purpose"] | null;
  isSending: boolean;
  isVerifying: boolean;
  error: string | null;
  requestOTP: (payload: OTPRequest) => Promise<void>;
  verifyOTP: (code: string) => Promise<void>;
  resetOTP: () => void;
}

export const OTPContext =
  createContext<OTPContextValue | undefined>(undefined);

interface OTPProviderProps {
  children: React.ReactNode;
}

export function OTPProvider({ children }: OTPProviderProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(
    null,
  );
  const [purpose, setPurpose] =
    useState<OTPRequest["purpose"] | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOTP = useCallback(async (payload: OTPRequest) => {
    setIsSending(true);
    setError(null);

    try {
      await authService.requestOTP(payload);

      setPhoneNumber(payload.phoneNumber);
      setPurpose(payload.purpose);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send verification code",
      );

      throw requestError;
    } finally {
      setIsSending(false);
    }
  }, []);

  const verifyOTP = useCallback(
    async (code: string) => {
      if (!phoneNumber) {
        throw new Error("Phone number is missing");
      }

      setIsVerifying(true);
      setError(null);

      try {
        await authService.verifyOTP(phoneNumber, code);
      } catch (verificationError) {
        setError(
          verificationError instanceof Error
            ? verificationError.message
            : "Unable to verify code",
        );

        throw verificationError;
      } finally {
        setIsVerifying(false);
      }
    },
    [phoneNumber],
  );

  const resetOTP = useCallback(() => {
    setPhoneNumber(null);
    setPurpose(null);
    setError(null);
    setIsSending(false);
    setIsVerifying(false);
  }, []);

  const value = useMemo<OTPContextValue>(
    () => ({
      phoneNumber,
      purpose,
      isSending,
      isVerifying,
      error,
      requestOTP,
      verifyOTP,
      resetOTP,
    }),
    [
      phoneNumber,
      purpose,
      isSending,
      isVerifying,
      error,
      requestOTP,
      verifyOTP,
      resetOTP,
    ],
  );

  return (
    <OTPContext.Provider value={value}>
      {children}
    </OTPContext.Provider>
  );
}