import { mmkvStorage } from "./mmkvStorage";

const PREFERENCE_KEYS = {
  themeMode: "preferences.theme-mode",
  language: "preferences.language",
  onboardingCompleted: "preferences.onboarding-completed",
  selectedCityId: "preferences.selected-city-id",
} as const;

export type ThemeMode = "light" | "dark" | "system";
export type AppLanguage = "en" | "am";

export const preferencesStorage = {
  getThemeMode(): ThemeMode {
    return (
      mmkvStorage.getString(
        PREFERENCE_KEYS.themeMode,
      ) as ThemeMode | null
    ) ?? "system";
  },

  setThemeMode(mode: ThemeMode): void {
    mmkvStorage.set(PREFERENCE_KEYS.themeMode, mode);
  },

  getLanguage(): AppLanguage {
    return (
      mmkvStorage.getString(
        PREFERENCE_KEYS.language,
      ) as AppLanguage | null
    ) ?? "en";
  },

  setLanguage(language: AppLanguage): void {
    mmkvStorage.set(
      PREFERENCE_KEYS.language,
      language,
    );
  },

  hasCompletedOnboarding(): boolean {
    return (
      mmkvStorage.getBoolean(
        PREFERENCE_KEYS.onboardingCompleted,
      ) ?? false
    );
  },

  setOnboardingCompleted(completed: boolean): void {
    mmkvStorage.set(
      PREFERENCE_KEYS.onboardingCompleted,
      completed,
    );
  },

  getSelectedCityId(): string | null {
    return mmkvStorage.getString(
      PREFERENCE_KEYS.selectedCityId,
    );
  },

  setSelectedCityId(cityId: string): void {
    mmkvStorage.set(
      PREFERENCE_KEYS.selectedCityId,
      cityId,
    );
  },
};