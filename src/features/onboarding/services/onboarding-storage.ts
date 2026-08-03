// src/features/onboarding/services/onboarding-storage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_COMPLETED_KEY =
  "@smart-link-transit/onboarding-completed";

export async function getOnboardingCompleted(): Promise<boolean> {
  try {
    const storedValue = await AsyncStorage.getItem(
      ONBOARDING_COMPLETED_KEY,
    );

    return storedValue === "true";
  } catch (error) {
    console.error(
      "Failed to read onboarding state:",
      error,
    );

    return false;
  }
}

export async function completeOnboarding(): Promise<void> {
  try {
    await AsyncStorage.setItem(
      ONBOARDING_COMPLETED_KEY,
      "true",
    );
  } catch (error) {
    console.error(
      "Failed to save onboarding state:",
      error,
    );

    throw error;
  }
}

export async function resetOnboarding(): Promise<void> {
  await AsyncStorage.removeItem(
    ONBOARDING_COMPLETED_KEY,
  );
}