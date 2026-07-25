// /**
//  * Dark Theme - SmartLink Transit
//  * Based on Color Usage Map from Design System
//  */

// import { colors } from "../tokens/colors";
// import type { Theme } from "./theme.types";

// export const darkTheme = {
//   // Brand Colors
//   primary: colors.brand.green,
//   primaryLight: colors.brand.greenLight,
//   primaryDark: colors.brand.greenDark,
//   accent: colors.brand.gold,
//   accentLight: colors.brand.goldLight,
//   //branding
//   brand: {
//     primary: colors.brand.green,
//     secondary: colors.brand.gold,
//   },

//   background: {
//     primary: colors.backgroundDark.primary,
//     secondary: colors.backgroundDark.secondary,
//   },
//   // Semantic Colors
//   success: colors.semantic.success,
//   successLight: colors.semantic.successLight,
//   warning: colors.semantic.warning,
//   warningLight: colors.semantic.warningLight,
//   error: colors.semantic.error,
//   errorLight: colors.semantic.errorLight,
//   info: colors.semantic.info,
//   infoLight: colors.semantic.infoLight,

//   // Text Colors
//   text: {
//     primary: colors.white,
//     secondary: colors.dark[300],
//     tertiary: colors.dark[400],
//     hint: colors.dark[400],
//     placeholder: colors.dark[400],
//     disabled: colors.dark[500],
//     inverse: colors.neutral[900],
//   },

//   // Surface Colors
//   surface: {
//     background: colors.surfaceDark.background,
//     surface: colors.surfaceDark.surface,
//     surfaceElevated: colors.surfaceDark.surfaceElevated,
//     card: colors.surfaceDark.card,
//     inputBackground: colors.surfaceDark.inputBackground,
//   },

//   // Border Colors
//   border: {
//     default: colors.dark[600],
//     focus: colors.brand.green,
//     error: colors.semantic.error,
//     success: colors.semantic.success,
//     divider: colors.dark[600],
//     input: colors.dark[600],
//   },

//   // Icon Colors
//   icon: {
//     active: colors.brand.green,
//     inactive: colors.dark[400],
//     error: colors.semantic.error,
//     success: colors.semantic.success,
//     warning: colors.semantic.warning,
//     disabled: colors.dark[500],
//   },

//   // Button Colors
//   button: {
//     primary: {
//       background: colors.brand.green,
//       text: colors.white,
//       pressed: colors.brand.greenDark,
//       disabled: colors.dark[600],
//       disabledText: colors.dark[400],
//     },
//     secondary: {
//       border: colors.brand.green,
//       text: colors.brand.green,
//       pressed: colors.brand.greenDark,
//       disabled: colors.dark[600],
//       disabledText: colors.dark[400],
//     },
//     tertiary: {
//       background: colors.dark[700],
//       text: colors.dark[300],
//       pressed: colors.dark[600],
//       disabled: colors.dark[700],
//       disabledText: colors.dark[500],
//     },
//     text: {
//       text: colors.brand.green,
//       pressed: colors.brand.greenDark,
//       disabled: colors.dark[500],
//     },
//   },

//   // Input Colors
//   input: {
//     border: colors.dark[600],
//     borderFocus: colors.brand.green,
//     borderError: colors.semantic.error,
//     borderSuccess: colors.semantic.success,
//     background: colors.dark[700],
//     label: colors.dark[300],
//     labelFocus: colors.brand.green,
//     labelError: colors.semantic.error,
//     labelSuccess: colors.semantic.success,
//     placeholder: colors.dark[400],
//   },

//   // Card Colors
//   card: {
//     background: colors.dark[700],
//     border: colors.dark[600],
//     shadow: colors.black,
//   },

//   // Navigation Colors
//   navigation: {
//     bottomNav: {
//       active: colors.brand.green,
//       inactive: colors.dark[400],
//       background: colors.dark[800],
//       border: colors.dark[600],
//     },
//     topAppBar: {
//       background: colors.dark[800],
//       title: colors.white,
//       icon: colors.white,
//     },
//     drawer: {
//       background: colors.dark[800],
//       divider: colors.dark[600],
//     },
//   },

//   // Divider
//   divider: colors.dark[600],

//   // Overlay
//   overlay: {
//     light: "rgba(255,255,255,0.04)",
//     medium: "rgba(255,255,255,0.08)",
//     dark: "rgba(255,255,255,0.16)",
//     scrim: "rgba(0,0,0,0.50)",
//     scrimHeavy: "rgba(0,0,0,0.70)",
//   },

//   // Status Bar
//   statusBar: "light-content" as const,

//   // Utility
//   white: colors.white,
//   black: colors.black,
//   transparent: undefined
// } satisfies Theme;

// export type DarkTheme = typeof darkTheme;







/**
 * Dark Theme - SmartLink Transit
 *
 * Complete theme mapping.
 *
 * Architecture:
 *
 * palette
 *   ↓
 * darkColors
 *   ↓
 * createComponentColors(darkColors)
 *   ↓
 * darkTheme
 */

import {
  createComponentColors,
  darkColors,
} from "../tokens/colors/";

import type { Theme } from "./theme.types";

const componentColors =
  createComponentColors(darkColors);

export const darkTheme = {
  // ==========================================================================
  // COMPLETE TOKEN ACCESS
  // ==========================================================================

  /**
   * Exposes 100% of semantic color tokens.
   */
  colors: darkColors,

  /**
   * Exposes 100% of component color tokens.
   */
  components: componentColors,

  // ==========================================================================
  // BRAND
  // ==========================================================================

  primary:
    darkColors.interactive.primary.default,

  primaryLight:
    darkColors.text.brand,

  primaryDark:
    darkColors.interactive.primary.pressed,

  accent:
    darkColors.background.accent,

  accentLight:
    darkColors.background.accentSubtle,

  brand: {
    primary:
      darkColors.background.brand,

    secondary:
      darkColors.background.accent,
  },

  // ==========================================================================
  // BACKGROUND
  // ==========================================================================

  background: {
    primary:
      darkColors.background.canvas,

    secondary:
      darkColors.background.canvasSubtle,
  },

  // ==========================================================================
  // STATUS
  // ==========================================================================

  success:
    darkColors.status.success.backgroundStrong,

  successLight:
    darkColors.status.success.background,

  warning:
    darkColors.status.warning.backgroundStrong,

  warningLight:
    darkColors.status.warning.background,

  error:
    darkColors.status.error.backgroundStrong,

  errorLight:
    darkColors.status.error.background,

  info:
    darkColors.status.info.backgroundStrong,

  infoLight:
    darkColors.status.info.background,

  // ==========================================================================
  // TEXT
  // ==========================================================================

  text: {
    primary:
      darkColors.text.primary,

    secondary:
      darkColors.text.secondary,

    tertiary:
      darkColors.text.tertiary,

    hint:
      darkColors.text.tertiary,

    placeholder:
      darkColors.text.placeholder,

    disabled:
      darkColors.text.disabled,

    inverse:
      darkColors.text.inverse,
  },

  // ==========================================================================
  // SURFACE
  // ==========================================================================

  surface: {
    background:
      darkColors.background.canvas,

    surface:
      darkColors.background.surface,

    surfaceElevated:
      darkColors.background.surfaceElevated,

    card:
      componentColors.card.background,

    inputBackground:
      componentColors.input.background,
  },

  // ==========================================================================
  // BORDER
  // ==========================================================================

  border: {
    default:
      darkColors.border.default,

    focus:
      darkColors.border.focus,

    error:
      darkColors.status.error.border,

    success:
      darkColors.status.success.border,

    divider:
      darkColors.border.subtle,

    input:
      componentColors.input.border,
  },

  // ==========================================================================
  // ICON
  // ==========================================================================

  icon: {
    active:
      darkColors.icon.brand,

    inactive:
      darkColors.icon.tertiary,

    error:
      darkColors.status.error.icon,

    success:
      darkColors.status.success.icon,

    warning:
      darkColors.status.warning.icon,

    disabled:
      darkColors.icon.disabled,
  },

  // ==========================================================================
  // BUTTON
  // ==========================================================================

  button: {
    primary: {
      background:
        componentColors.button.primary.background,

      text:
        componentColors.button.primary.text,

      pressed:
        componentColors.button.primary.backgroundPressed,

      disabled:
        componentColors.button.primary.backgroundDisabled,

      disabledText:
        componentColors.button.primary.textDisabled,
    },

    secondary: {
      border:
        componentColors.button.secondary.border,

      text:
        componentColors.button.secondary.text,

      pressed:
        componentColors.button.secondary.backgroundPressed,

      disabled:
        componentColors.button.secondary.backgroundDisabled,

      disabledText:
        componentColors.button.secondary.textDisabled,
    },

    tertiary: {
      background:
        darkColors.interactive.tertiary.default,

      text:
        darkColors.interactive.tertiary.foreground,

      pressed:
        darkColors.interactive.tertiary.pressed,

      disabled:
        darkColors.interactive.tertiary.disabled,

      disabledText:
        darkColors.interactive.tertiary
          .foregroundDisabled,
    },

    text: {
      text:
        darkColors.interactive.tertiary.foreground,

      pressed:
        darkColors.interactive.tertiary.pressed,

      disabled:
        darkColors.interactive.tertiary
          .foregroundDisabled,
    },

    destructive:
      componentColors.button.destructive,
  },

  // ==========================================================================
  // INPUT
  // ==========================================================================

  input: {
    border:
      componentColors.input.border,

    borderFocus:
      componentColors.input.borderFocus,

    borderError:
      componentColors.input.borderError,

    borderSuccess:
      darkColors.status.success.border,

    background:
      componentColors.input.background,

    label:
      componentColors.input.label,

    labelFocus:
      darkColors.text.brand,

    labelError:
      darkColors.status.error.foreground,

    labelSuccess:
      darkColors.status.success.foreground,

    placeholder:
      componentColors.input.placeholder,
  },

  // ==========================================================================
  // CARD
  // ==========================================================================

  card: {
    background:
      componentColors.card.background,

    border:
      componentColors.card.border,

    shadow:
      darkColors.accessibility.highContrastBackground,
  },

  // ==========================================================================
  // NAVIGATION
  // ==========================================================================

  navigation: {
    bottomNav: {
      active:
        componentColors.tabs.activeText,

      inactive:
        componentColors.tabs.inactiveText,

      background:
        componentColors.tabs.background,

      border:
        componentColors.tabs.border,
    },

    topAppBar: {
      background:
        darkColors.navigation.backgroundElevated,

      title:
        darkColors.text.primary,

      icon:
        darkColors.icon.primary,
    },

    drawer: {
      background:
        darkColors.navigation.background,

      divider:
        darkColors.navigation.border,
    },
  },

  // ==========================================================================
  // COMPONENT TOKENS
  // ==========================================================================

  checkbox:
    componentColors.checkbox,

  switch:
    componentColors.switch,

  tabs:
    componentColors.tabs,

  badge:
    componentColors.badge,

  toast:
    componentColors.toast,

  modal:
    componentColors.modal,

  bottomSheet:
    componentColors.bottomSheet,

  // ==========================================================================
  // SPECIALIZED TOKENS
  // ==========================================================================

  map:
    darkColors.map,

  skeleton:
    darkColors.skeleton,

  accessibility:
    darkColors.accessibility,

  // ==========================================================================
  // GENERAL
  // ==========================================================================

  divider:
    darkColors.border.subtle,

  overlay: {
    light:
      darkColors.overlay.subtle,

    medium:
      darkColors.overlay.default,

    dark:
      darkColors.overlay.strong,

    scrim:
      darkColors.overlay.scrim,

    scrimHeavy:
      darkColors.overlay.scrimStrong,
  },

  // ==========================================================================
  // SYSTEM
  // ==========================================================================

  statusBar:
    "light-content" as const,

  // ==========================================================================
  // UTILITY
  // ==========================================================================

  white:
    darkColors.accessibility
      .highContrastText,

  black:
    darkColors.accessibility
      .highContrastBackground,

  transparent:
    "transparent",
} satisfies Theme;

export type DarkTheme =
  typeof darkTheme;

