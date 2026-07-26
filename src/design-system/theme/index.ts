/**
 * Theme System - SmartLink Transit
 * Provides, barrel exports
 */
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";
import type { Theme } from "./theme.types";

export type ThemeMode = "light" | "dark";

export const themes: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode: ThemeMode): Theme => {
  return themes[mode];
};

export const isLightMode = (mode: ThemeMode): boolean => {
  return mode === "light";
};

export const isDarkMode = (mode: ThemeMode): boolean => {
  return mode === "dark";
};

export { darkTheme, lightTheme };
export type { Theme };
