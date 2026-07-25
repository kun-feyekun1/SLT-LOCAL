import { palette } from "./palette";
import type { SemanticColorTokens } from "./types";

export const darkColors = {
  background: {
    canvas: palette.neutral[950],
    canvasSubtle: palette.neutral[900],
    surface: palette.neutral[900],
    surfaceSubtle: palette.neutral[800],
    surfaceElevated: palette.neutral[800],
    surfaceSunken: palette.neutral[950],
    inverse: palette.neutral[0],
    disabled: palette.neutral[800],
    brand: palette.brand[500],
    brandSubtle: palette.brand[950],
    accent: palette.accent[400],
    accentSubtle: palette.accent[950],
  },

  text: {
    primary: palette.neutral[50],
    secondary: palette.neutral[300],
    tertiary: palette.neutral[400],
    disabled: palette.neutral[600],
    placeholder: palette.neutral[500],
    inverse: palette.neutral[950],
    brand: palette.brand[300],
    accent: palette.accent[300],
    link: palette.info[300],
    linkHover: palette.info[200],
    linkPressed: palette.info[100],
    onBrand: palette.neutral[0],
    onAccent: palette.neutral[950],
  },

  icon: {
    primary: palette.neutral[100],
    secondary: palette.neutral[300],
    tertiary: palette.neutral[400],
    disabled: palette.neutral[600],
    inverse: palette.neutral[950],
    brand: palette.brand[300],
    accent: palette.accent[300],
    onBrand: palette.neutral[0],
    onAccent: palette.neutral[950],
  },

  border: {
    subtle: palette.neutral[800],
    default: palette.neutral[700],
    strong: palette.neutral[500],
    disabled: palette.neutral[800],
    inverse: palette.neutral[300],
    brand: palette.brand[400],
    accent: palette.accent[400],
    focus: palette.info[400],
  },

  interactive: {
    primary: {
      default: palette.brand[500],
      hover: palette.brand[400],
      pressed: palette.brand[600],
      selected: palette.brand[400],
      disabled: palette.neutral[800],
      foreground: palette.neutral[0],
      foregroundDisabled: palette.neutral[600],
    },

    secondary: {
      default: palette.neutral[900],
      hover: palette.neutral[800],
      pressed: palette.neutral[700],
      selected: palette.brand[950],
      disabled: palette.neutral[900],
      foreground: palette.brand[300],
      foregroundDisabled: palette.neutral[600],
      border: palette.brand[400],
    },

    tertiary: {
      default: palette.common.transparent,
      hover: palette.neutral[800],
      pressed: palette.neutral[700],
      selected: palette.brand[950],
      disabled: palette.common.transparent,
      foreground: palette.brand[300],
      foregroundDisabled: palette.neutral[600],
    },

    destructive: {
      default: palette.error[500],
      hover: palette.error[400],
      pressed: palette.error[600],
      disabled: palette.neutral[800],
      foreground: palette.neutral[0],
      foregroundDisabled: palette.neutral[600],
    },
  },

  status: {
    success: {
      background: palette.success[950],
      backgroundStrong: palette.success[500],
      foreground: palette.success[300],
      foregroundStrong: palette.success[100],
      border: palette.success[700],
      icon: palette.success[400],
    },

    warning: {
      background: palette.warning[950],
      backgroundStrong: palette.warning[500],
      foreground: palette.warning[300],
      foregroundStrong: palette.warning[100],
      border: palette.warning[700],
      icon: palette.warning[400],
    },

    error: {
      background: palette.error[950],
      backgroundStrong: palette.error[500],
      foreground: palette.error[300],
      foregroundStrong: palette.error[100],
      border: palette.error[700],
      icon: palette.error[400],
    },

    info: {
      background: palette.info[950],
      backgroundStrong: palette.info[500],
      foreground: palette.info[300],
      foregroundStrong: palette.info[100],
      border: palette.info[700],
      icon: palette.info[400],
    },

    neutral: {
      background: palette.neutral[800],
      backgroundStrong: palette.neutral[500],
      foreground: palette.neutral[300],
      foregroundStrong: palette.neutral[100],
      border: palette.neutral[700],
      icon: palette.neutral[400],
    },
  },

  input: {
    background: palette.neutral[900],
    backgroundDisabled: palette.neutral[800],
    backgroundReadOnly: palette.neutral[900],
    text: palette.neutral[50],
    placeholder: palette.neutral[500],
    label: palette.neutral[300],
    helperText: palette.neutral[400],
    border: palette.neutral[700],
    borderHover: palette.neutral[500],
    borderFocus: palette.brand[400],
    borderError: palette.error[400],
    icon: palette.neutral[400],
    iconDisabled: palette.neutral[600],
    selection: palette.brand[800],
  },

  navigation: {
    background: palette.neutral[950],
    backgroundElevated: palette.neutral[900],
    active: palette.brand[300],
    inactive: palette.neutral[500],
    activeBackground: palette.brand[950],
    indicator: palette.brand[400],
    border: palette.neutral[800],
  },

  overlay: {
    subtle: "rgba(255, 255, 255, 0.04)",
    default: "rgba(255, 255, 255, 0.08)",
    strong: "rgba(255, 255, 255, 0.16)",
    scrim: "rgba(0, 0, 0, 0.60)",
    scrimStrong: "rgba(0, 0, 0, 0.80)",
    modal: "rgba(0, 0, 0, 0.68)",
  },

  skeleton: {
    base: palette.neutral[800],
    highlight: palette.neutral[700],
  },

  map: {
    routePrimary: palette.brand[400],
    routeAlternative: palette.info[400],
    routeCompleted: palette.neutral[600],
    routeRemaining: palette.brand[300],
    pickup: palette.success[400],
    dropoff: palette.error[400],
    userLocation: palette.info[400],
    vehicleLocation: palette.accent[400],
    geofenceFill: "rgba(73, 172, 112, 0.20)",
    geofenceBorder: palette.brand[400],
    mapOverlay: "rgba(0, 0, 0, 0.24)",
  },

  accessibility: {
    focusRing: palette.info[400],
    focusRingOffset: palette.neutral[950],
    highContrastText: palette.common.white,
    highContrastBackground: palette.common.black,
  },
} as const satisfies SemanticColorTokens;
