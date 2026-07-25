// src/features/auth/providers/BiometricAuthProvider.tsx

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { biometricService } from "../services/biometricService";

interface BiometricAuthContextValue {
  isAvailable: boolean;
  isCheckingAvailability: boolean;
  isAuthenticating: boolean;
  authenticate: () => Promise<boolean>;
  refreshAvailability: () => Promise<void>;
}

export const BiometricAuthContext =
  createContext<BiometricAuthContextValue | undefined>(
    undefined,
  );

interface BiometricAuthProviderProps {
  children: React.ReactNode;
}

export function BiometricAuthProvider({
  children,
}: BiometricAuthProviderProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] =
    useState(true);
  const [isAuthenticating, setIsAuthenticating] =
    useState(false);

  const refreshAvailability = useCallback(async () => {
    setIsCheckingAvailability(true);

    try {
      const available =
        await biometricService.isAvailable();

      setIsAvailable(available);
    } finally {
      setIsCheckingAvailability(false);
    }
  }, []);

  useEffect(() => {
    void refreshAvailability();
  }, [refreshAvailability]);

  const authenticate = useCallback(async () => {
    if (!isAvailable) {
      return false;
    }

    setIsAuthenticating(true);

    try {
      return await biometricService.authenticate();
    } finally {
      setIsAuthenticating(false);
    }
  }, [isAvailable]);

  const value = useMemo<BiometricAuthContextValue>(
    () => ({
      isAvailable,
      isCheckingAvailability,
      isAuthenticating,
      authenticate,
      refreshAvailability,
    }),
    [
      isAvailable,
      isCheckingAvailability,
      isAuthenticating,
      authenticate,
      refreshAvailability,
    ],
  );

  return (
    <BiometricAuthContext.Provider value={value}>
      {children}
    </BiometricAuthContext.Provider>
  );
}