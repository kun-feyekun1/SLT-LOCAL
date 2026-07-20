/**
 * Light Theme - SmartLink Transit
 * Based on Color Usage Map from Design System
 */

import { colors } from "../tokens/colors";
import type { Theme } from "./theme.types";

export const lightTheme = {
  // Brand Colors
  primary: colors.brand.green,
  primaryLight: colors.brand.greenLight,
  primaryDark: colors.brand.greenDark,
  accent: colors.brand.gold,
  accentLight: colors.brand.goldLight,
  // branding
  brand: {
    primary: colors.brand.green,
    secondary: colors.brand.gold,
  },

  background: {
    primary: colors.backgroundLight.primary,
    secondary: colors.backgroundLight.secondary,
  },
  // Semantic Colors
  success: colors.semantic.success,
  successLight: colors.semantic.successLight,
  warning: colors.semantic.warning,
  warningLight: colors.semantic.warningLight,
  error: colors.semantic.error,
  errorLight: colors.semantic.errorLight,
  info: colors.semantic.info,
  infoLight: colors.semantic.infoLight,

  // Text Colors
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    tertiary: colors.neutral[600],
    hint: colors.neutral[600],
    placeholder: colors.neutral[600],
    disabled: colors.neutral[500],
    inverse: colors.white,
  },

  // Surface Colors
  surface: {
    background: colors.surface.background,
    surface: colors.surface.surface,
    surfaceElevated: colors.surface.surfaceElevated,
    card: colors.surface.card,
    inputBackground: colors.surface.inputBackground,
  },

  // Border Colors
  border: {
    default: colors.neutral[300],
    focus: colors.brand.green,
    error: colors.semantic.error,
    success: colors.semantic.success,
    divider: colors.neutral[200],
    input: colors.neutral[300],
  },

  // Icon Colors
  icon: {
    active: colors.brand.green,
    inactive: colors.neutral[500],
    error: colors.semantic.error,
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    disabled: colors.neutral[400],
  },

  // Button Colors
  button: {
    primary: {
      background: colors.brand.green,
      text: colors.white,
      pressed: colors.brand.greenDark,
      disabled: colors.neutral[300],
      disabledText: colors.neutral[500],
    },
    secondary: {
      border: colors.brand.green,
      text: colors.brand.green,
      pressed: colors.brand.greenLight,
      disabled: colors.neutral[300],
      disabledText: colors.neutral[500],
    },
    tertiary: {
      background: colors.neutral[100],
      text: colors.neutral[700],
      pressed: colors.neutral[200],
      disabled: colors.neutral[100],
      disabledText: colors.neutral[400],
    },
    text: {
      text: colors.brand.green,
      pressed: colors.brand.greenLight,
      disabled: colors.neutral[400],
    },
  },

  // Input Colors
  input: {
    border: colors.neutral[300],
    borderFocus: colors.brand.green,
    borderError: colors.semantic.error,
    borderSuccess: colors.semantic.success,
    background: colors.white,
    label: colors.neutral[700],
    labelFocus: colors.brand.green,
    labelError: colors.semantic.error,
    labelSuccess: colors.semantic.success,
    placeholder: colors.neutral[600],
  },

  // Card Colors
  card: {
    background: colors.white,
    border: colors.neutral[200],
    shadow: colors.black,
  },

  // Navigation Colors
  navigation: {
    bottomNav: {
      active: colors.brand.green,
      inactive: colors.neutral[500],
      background: colors.white,
      border: colors.neutral[200],
    },
    topAppBar: {
      background: colors.white,
      title: colors.neutral[900],
      icon: colors.neutral[900],
    },
    drawer: {
      background: colors.white,
      divider: colors.neutral[200],
    },
  },

  // Divider
  divider: colors.neutral[200],

  // Overlay
  overlay: {
    light: colors.overlay.light,
    medium: colors.overlay.medium,
    dark: colors.overlay.dark,
    scrim: colors.overlay.scrim,
    scrimHeavy: colors.overlay.scrimHeavy,
  },

  // Status Bar
  statusBar: "dark-content" as const,

  // Utility
  white: colors.white,
  black: colors.black,
} satisfies Theme;

export type LightTheme = typeof lightTheme;
