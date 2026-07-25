// /**
//  * Light Theme - SmartLink Transit
//  * Based on Color Usage Map from Design System
//  */

// import { colors } from "../tokens/colors";
// import type { Theme } from "./theme.types";

// export const lightTheme = {
//   // Brand Colors
//   primary: colors.brand.green,
//   primaryLight: colors.brand.greenLight,
//   primaryDark: colors.brand.greenDark,
//   accent: colors.brand.gold,
//   accentLight: colors.brand.goldLight,
//   // branding
//   brand: {
//     primary: colors.brand.green,
//     secondary: colors.brand.gold,
//   },

//   background: {
//     primary: colors.backgroundLight.primary,
//     secondary: colors.backgroundLight.secondary,
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
//     primary: colors.neutral[900],
//     secondary: colors.neutral[700],
//     tertiary: colors.neutral[600],
//     hint: colors.neutral[600],
//     placeholder: colors.neutral[600],
//     disabled: colors.neutral[500],
//     inverse: colors.white,
//   },

//   // Surface Colors
//   surface: {
//     background: colors.surface.background,
//     surface: colors.surface.surface,
//     surfaceElevated: colors.surface.surfaceElevated,
//     card: colors.surface.card,
//     inputBackground: colors.surface.inputBackground,
//   },

//   // Border Colors
//   border: {
//     default: colors.neutral[300],
//     focus: colors.brand.green,
//     error: colors.semantic.error,
//     success: colors.semantic.success,
//     divider: colors.neutral[200],
//     input: colors.neutral[300],
//   },

//   // Icon Colors
//   icon: {
//     active: colors.brand.green,
//     inactive: colors.neutral[500],
//     error: colors.semantic.error,
//     success: colors.semantic.success,
//     warning: colors.semantic.warning,
//     disabled: colors.neutral[400],
//   },

//   // Button Colors
//   button: {
//     primary: {
//       background: colors.brand.green,
//       text: colors.white,
//       pressed: colors.brand.greenDark,
//       disabled: colors.neutral[300],
//       disabledText: colors.neutral[500],
//     },
//     secondary: {
//       border: colors.brand.green,
//       text: colors.brand.green,
//       pressed: colors.brand.greenLight,
//       disabled: colors.neutral[300],
//       disabledText: colors.neutral[500],
//     },
//     tertiary: {
//       background: colors.neutral[100],
//       text: colors.neutral[700],
//       pressed: colors.neutral[200],
//       disabled: colors.neutral[100],
//       disabledText: colors.neutral[400],
//     },
//     text: {
//       text: colors.brand.green,
//       pressed: colors.brand.greenLight,
//       disabled: colors.neutral[400],
//     },
//   },

//   // Input Colors
//   input: {
//     border: colors.neutral[300],
//     borderFocus: colors.brand.green,
//     borderError: colors.semantic.error,
//     borderSuccess: colors.semantic.success,
//     background: colors.white,
//     label: colors.neutral[700],
//     labelFocus: colors.brand.green,
//     labelError: colors.semantic.error,
//     labelSuccess: colors.semantic.success,
//     placeholder: colors.neutral[600],
//   },

//   // Card Colors
//   card: {
//     background: colors.white,
//     border: colors.neutral[200],
//     shadow: colors.black,
//   },

//   // Navigation Colors
//   navigation: {
//     bottomNav: {
//       active: colors.brand.green,
//       inactive: colors.neutral[500],
//       background: colors.white,
//       border: colors.neutral[200],
//     },
//     topAppBar: {
//       background: colors.white,
//       title: colors.neutral[900],
//       icon: colors.neutral[900],
//     },
//     drawer: {
//       background: colors.white,
//       divider: colors.neutral[200],
//     },
//   },

//   // Divider
//   divider: colors.neutral[200],

//   // Overlay
//   overlay: {
//     light: colors.overlay.light,
//     medium: colors.overlay.medium,
//     dark: colors.overlay.dark,
//     scrim: colors.overlay.scrim,
//     scrimHeavy: colors.overlay.scrimHeavy,
//   },

//   // Status Bar
//   statusBar: "dark-content" as const,

//   // Utility
//   white: colors.white,
//   black: colors.black,
//   transparent: undefined
// } satisfies Theme;

// export type LightTheme = typeof lightTheme;





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

import {
  createComponentColors,
  lightColors,
} from "../tokens/colors/";

import type { Theme } from "./theme.types";

const componentColors =
  createComponentColors(lightColors);

export const lightTheme = {
  // ==========================================================================
  // COMPLETE TOKEN ACCESS
  // ==========================================================================

  /**
   * Exposes 100% of semantic color tokens.
   *
   * theme.colors.background.surface
   * theme.colors.text.primary
   * theme.colors.interactive.primary.default
   * theme.colors.map.routePrimary
   * theme.colors.skeleton.base
   */
  colors: lightColors,

  /**
   * Exposes 100% of component color tokens.
   *
   * theme.components.button.primary.background
   * theme.components.toast.success.background
   * theme.components.modal.backdrop
   */
  components: componentColors,

  // ==========================================================================
  // BRAND
  // ==========================================================================

  primary:
    lightColors.interactive.primary.default,

  primaryLight:
    lightColors.background.brandSubtle,

  primaryDark:
    lightColors.interactive.primary.pressed,

  accent:
    lightColors.background.accent,

  accentLight:
    lightColors.background.accentSubtle,

  brand: {
    primary:
      lightColors.background.brand,

    secondary:
      lightColors.background.accent,
  },

  // ==========================================================================
  // BACKGROUND
  // ==========================================================================

  background: {
    primary:
      lightColors.background.canvas,

    secondary:
      lightColors.background.canvasSubtle,
  },

  // ==========================================================================
  // STATUS
  // ==========================================================================

  success:
    lightColors.status.success.backgroundStrong,

  successLight:
    lightColors.status.success.background,

  warning:
    lightColors.status.warning.backgroundStrong,

  warningLight:
    lightColors.status.warning.background,

  error:
    lightColors.status.error.backgroundStrong,

  errorLight:
    lightColors.status.error.background,

  info:
    lightColors.status.info.backgroundStrong,

  infoLight:
    lightColors.status.info.background,

  // ==========================================================================
  // TEXT
  // ==========================================================================

  text: {
    primary:
      lightColors.text.primary,

    secondary:
      lightColors.text.secondary,

    tertiary:
      lightColors.text.tertiary,

    hint:
      lightColors.text.tertiary,

    placeholder:
      lightColors.text.placeholder,

    disabled:
      lightColors.text.disabled,

    inverse:
      lightColors.text.inverse,
  },

  // ==========================================================================
  // SURFACE
  // ==========================================================================

  surface: {
    background:
      lightColors.background.canvas,

    surface:
      lightColors.background.surface,

    surfaceElevated:
      lightColors.background.surfaceElevated,

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
      lightColors.border.default,

    focus:
      lightColors.border.focus,

    error:
      lightColors.status.error.border,

    success:
      lightColors.status.success.border,

    divider:
      lightColors.border.subtle,

    input:
      componentColors.input.border,
  },

  // ==========================================================================
  // ICON
  // ==========================================================================

  icon: {
    active:
      lightColors.icon.brand,

    inactive:
      lightColors.icon.tertiary,

    error:
      lightColors.status.error.icon,

    success:
      lightColors.status.success.icon,

    warning:
      lightColors.status.warning.icon,

    disabled:
      lightColors.icon.disabled,
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
        lightColors.interactive.tertiary.default,

      text:
        lightColors.interactive.tertiary.foreground,

      pressed:
        lightColors.interactive.tertiary.pressed,

      disabled:
        lightColors.interactive.tertiary.disabled,

      disabledText:
        lightColors.interactive.tertiary
          .foregroundDisabled,
    },

    text: {
      text:
        lightColors.interactive.tertiary.foreground,

      pressed:
        lightColors.interactive.tertiary.pressed,

      disabled:
        lightColors.interactive.tertiary
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
      lightColors.status.success.border,

    background:
      componentColors.input.background,

    label:
      componentColors.input.label,

    labelFocus:
      lightColors.text.brand,

    labelError:
      lightColors.status.error.foreground,

    labelSuccess:
      lightColors.status.success.foreground,

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
      lightColors.accessibility.highContrastText,
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
        lightColors.navigation.backgroundElevated,

      title:
        lightColors.text.primary,

      icon:
        lightColors.icon.primary,
    },

    drawer: {
      background:
        lightColors.navigation.background,

      divider:
        lightColors.navigation.border,
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
    lightColors.map,

  skeleton:
    lightColors.skeleton,

  accessibility:
    lightColors.accessibility,

  // ==========================================================================
  // GENERAL
  // ==========================================================================

  divider:
    lightColors.border.subtle,

  overlay: {
    light:
      lightColors.overlay.subtle,

    medium:
      lightColors.overlay.default,

    dark:
      lightColors.overlay.strong,

    scrim:
      lightColors.overlay.scrim,

    scrimHeavy:
      lightColors.overlay.scrimStrong,
  },

  // ==========================================================================
  // SYSTEM
  // ==========================================================================

  statusBar:
    "dark-content" as const,

  // ==========================================================================
  // UTILITY
  // ==========================================================================

  white:
    lightColors.accessibility
      .highContrastBackground,

  black:
    lightColors.accessibility
      .highContrastText,

  transparent:
    "transparent",
} satisfies Theme;

export type LightTheme =
  typeof lightTheme;

