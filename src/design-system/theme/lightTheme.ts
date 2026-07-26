/**
 * Light Theme - SmartLink Transit
 *
 * Complete theme mapping.
 *
 * Architecture:
 *
 * palette
 *   ↓
 * lightColors
 *   ↓
 * createComponentColors(lightColors)
 *   ↓
 * lightTheme
 */
import { createComponentColors, lightColors } from "../tokens/colors";
import type { Theme } from "./theme.types";

const componentColors = createComponentColors(lightColors);

export const lightTheme = {

  //colors TOKEN ACCESS
  //Exposes component color tokens.
  //Exposes of semantic color tokens.

  colors: lightColors,

  components: componentColors,

  // BRAND
  primary: lightColors.interactive.primary.default,
  primaryLight: lightColors.background.brandSubtle,
  primaryDark: lightColors.interactive.primary.pressed,
  accent: lightColors.background.accent,
  accentLight: lightColors.background.accentSubtle,
  brand: {
    primary: lightColors.background.brand,
    secondary: lightColors.background.accent,
  },

  // BACKGROUND
  background: {
    primary: lightColors.background.canvas,
    secondary: lightColors.background.canvasSubtle,
  },

  // STATUS
  success: lightColors.status.success.backgroundStrong,
  successLight: lightColors.status.success.background,
  warning: lightColors.status.warning.backgroundStrong,
  warningLight: lightColors.status.warning.background,
  error: lightColors.status.error.backgroundStrong,
  errorLight: lightColors.status.error.background,
  info: lightColors.status.info.backgroundStrong,
  infoLight: lightColors.status.info.background,

  // TEXT
  text: {
    primary: lightColors.text.primary,
    secondary: lightColors.text.secondary,
    tertiary: lightColors.text.tertiary,
    hint: lightColors.text.tertiary,
    placeholder: lightColors.text.placeholder,
    disabled: lightColors.text.disabled,
    inverse: lightColors.text.inverse,
  },

  // SURFACE
  surface: {
    background: lightColors.background.canvas,
    surface: lightColors.background.surface,
    surfaceElevated: lightColors.background.surfaceElevated,
    card: componentColors.card.background,
    inputBackground: componentColors.input.background,
  },

  // BORDER
  border: {
    default: lightColors.border.default,
    focus: lightColors.border.focus,
    error: lightColors.status.error.border,
    success: lightColors.status.success.border,
    divider: lightColors.border.subtle,
    input: componentColors.input.border,
  },

  // ICON
  icon: {
    active: lightColors.icon.brand,
    inactive: lightColors.icon.tertiary,
    error: lightColors.status.error.icon,
    success: lightColors.status.success.icon,
    warning: lightColors.status.warning.icon,
    disabled: lightColors.icon.disabled,
  },

  // BUTTON
  button: {
    primary: {
      background: componentColors.button.primary.background,
      text: componentColors.button.primary.text,
      pressed: componentColors.button.primary.backgroundPressed,
      disabled: componentColors.button.primary.backgroundDisabled,
      disabledText: componentColors.button.primary.textDisabled,
    },
    secondary: {
      border: componentColors.button.secondary.border,
      text: componentColors.button.secondary.text,
      pressed: componentColors.button.secondary.backgroundPressed,
      disabled: componentColors.button.secondary.backgroundDisabled,
      disabledText: componentColors.button.secondary.textDisabled,
    },
    tertiary: {
      background: lightColors.interactive.tertiary.default,
      text: lightColors.interactive.tertiary.foreground,
      pressed: lightColors.interactive.tertiary.pressed,
      disabled: lightColors.interactive.tertiary.disabled,
      disabledText: lightColors.interactive.tertiary.foregroundDisabled,
    },
    text: {
      text: lightColors.interactive.tertiary.foreground,
      pressed: lightColors.interactive.tertiary.pressed,
      disabled: lightColors.interactive.tertiary.foregroundDisabled,
    },
    destructive: componentColors.button.destructive,
  },

  // INPUT
  input: {
    border: componentColors.input.border,
    borderFocus: componentColors.input.borderFocus,
    borderError: componentColors.input.borderError,
    borderSuccess: lightColors.status.success.border,
    background: componentColors.input.background,
    label: componentColors.input.label,
    labelFocus: lightColors.text.brand,
    labelError: lightColors.status.error.foreground,
    labelSuccess: lightColors.status.success.foreground,
    placeholder: componentColors.input.placeholder,
  },

  // CARD
  card: {
    background: componentColors.card.background,
    border: componentColors.card.border,
    shadow: lightColors.accessibility.highContrastText,
  },

  // NAVIGATION
  navigation: {
    bottomNav: {
      active: componentColors.tabs.activeText,
      inactive: componentColors.tabs.inactiveText,
      background: componentColors.tabs.background,
      border: componentColors.tabs.border,
    },
    topAppBar: {
      background: lightColors.navigation.backgroundElevated,
      title: lightColors.text.primary,
      icon: lightColors.icon.primary,
    },
    drawer: {
      background: lightColors.navigation.background,
      divider: lightColors.navigation.border,
    },
  },

  // COMPONENT TOKENS
  checkbox: componentColors.checkbox,
  switch: componentColors.switch,
  tabs: componentColors.tabs,
  badge: componentColors.badge,
  toast: componentColors.toast,
  modal: componentColors.modal,
  bottomSheet: componentColors.bottomSheet,

  // SPECIALIZED TOKENS
  map: lightColors.map,
  skeleton: lightColors.skeleton,
  accessibility: lightColors.accessibility,

  // GENERAL
  divider: lightColors.border.subtle,
  overlay: {
    light: lightColors.overlay.subtle,
    medium: lightColors.overlay.default,
    dark: lightColors.overlay.strong,
    scrim: lightColors.overlay.scrim,
    scrimHeavy: lightColors.overlay.scrimStrong,
  },

  // SYSTEM
  statusBar: "dark-content" as const,

  // UTILITY
  white: lightColors.accessibility.highContrastBackground,
  black: lightColors.accessibility.highContrastText,
  transparent: "transparent",
} satisfies Theme;

export type LightTheme = typeof lightTheme;
