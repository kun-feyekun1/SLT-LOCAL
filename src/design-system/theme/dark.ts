/**
 * Dark Theme - SmartLink Transit
 * Based on Color Usage Map from Design System
 */

import { colors } from "../tokens/colors";
import type { Theme } from "./theme.types";

export const darkTheme = {
  // Brand Colors
  primary: colors.brand.green,
  primaryLight: colors.brand.greenLight,
  primaryDark: colors.brand.greenDark,
  accent: colors.brand.gold,
  accentLight: colors.brand.goldLight,
  //branding
  brand: {
    primary: colors.brand.green,
    secondary: colors.brand.gold,
  },

  background: {
    primary: colors.backgroundDark.primary,
    secondary: colors.backgroundDark.secondary,
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
    primary: colors.white,
    secondary: colors.dark[300],
    tertiary: colors.dark[400],
    hint: colors.dark[400],
    placeholder: colors.dark[400],
    disabled: colors.dark[500],
    inverse: colors.neutral[900],
  },

  // Surface Colors
  surface: {
    background: colors.surfaceDark.background,
    surface: colors.surfaceDark.surface,
    surfaceElevated: colors.surfaceDark.surfaceElevated,
    card: colors.surfaceDark.card,
    inputBackground: colors.surfaceDark.inputBackground,
  },

  // Border Colors
  border: {
    default: colors.dark[600],
    focus: colors.brand.green,
    error: colors.semantic.error,
    success: colors.semantic.success,
    divider: colors.dark[600],
    input: colors.dark[600],
  },

  // Icon Colors
  icon: {
    active: colors.brand.green,
    inactive: colors.dark[400],
    error: colors.semantic.error,
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    disabled: colors.dark[500],
  },

  // Button Colors
  button: {
    primary: {
      background: colors.brand.green,
      text: colors.white,
      pressed: colors.brand.greenDark,
      disabled: colors.dark[600],
      disabledText: colors.dark[400],
    },
    secondary: {
      border: colors.brand.green,
      text: colors.brand.green,
      pressed: colors.brand.greenDark,
      disabled: colors.dark[600],
      disabledText: colors.dark[400],
    },
    tertiary: {
      background: colors.dark[700],
      text: colors.dark[300],
      pressed: colors.dark[600],
      disabled: colors.dark[700],
      disabledText: colors.dark[500],
    },
    text: {
      text: colors.brand.green,
      pressed: colors.brand.greenDark,
      disabled: colors.dark[500],
    },
  },

  // Input Colors
  input: {
    border: colors.dark[600],
    borderFocus: colors.brand.green,
    borderError: colors.semantic.error,
    borderSuccess: colors.semantic.success,
    background: colors.dark[700],
    label: colors.dark[300],
    labelFocus: colors.brand.green,
    labelError: colors.semantic.error,
    labelSuccess: colors.semantic.success,
    placeholder: colors.dark[400],
  },

  // Card Colors
  card: {
    background: colors.dark[700],
    border: colors.dark[600],
    shadow: colors.black,
  },

  // Navigation Colors
  navigation: {
    bottomNav: {
      active: colors.brand.green,
      inactive: colors.dark[400],
      background: colors.dark[800],
      border: colors.dark[600],
    },
    topAppBar: {
      background: colors.dark[800],
      title: colors.white,
      icon: colors.white,
    },
    drawer: {
      background: colors.dark[800],
      divider: colors.dark[600],
    },
  },

  // Divider
  divider: colors.dark[600],

  // Overlay
  overlay: {
    light: "rgba(255,255,255,0.04)",
    medium: "rgba(255,255,255,0.08)",
    dark: "rgba(255,255,255,0.16)",
    scrim: "rgba(0,0,0,0.50)",
    scrimHeavy: "rgba(0,0,0,0.70)",
  },

  // Status Bar
  statusBar: "light-content" as const,

  // Utility
  white: colors.white,
  black: colors.black,
} satisfies Theme;

export type DarkTheme = typeof darkTheme;
