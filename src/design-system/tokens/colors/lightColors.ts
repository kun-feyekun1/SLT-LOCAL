import { palette } from "./palette";
import type { SemanticColorTokens } from "./types";

export const lightColors = {
  background: {
    canvas: palette.neutral[50],
    canvasSubtle: palette.neutral[100],
    surface: palette.neutral[0],
    surfaceSubtle: palette.neutral[50],
    surfaceElevated: palette.neutral[0],
    surfaceSunken: palette.neutral[100],
    inverse: palette.neutral[900],
    disabled: palette.neutral[100],
    brand: palette.brand[600],
    brandSubtle: palette.brand[50],
    accent: palette.accent[400],
    accentSubtle: palette.accent[50],
  },

  text: {
    primary: palette.neutral[900],
    secondary: palette.neutral[700],
    tertiary: palette.neutral[500],
    disabled: palette.neutral[400],
    placeholder: palette.neutral[500],
    inverse: palette.neutral[0],
    brand: palette.brand[700],
    accent: palette.accent[800],
    link: palette.info[700],
    linkHover: palette.info[800],
    linkPressed: palette.info[900],
    onBrand: palette.neutral[0],
    onAccent: palette.neutral[950],
  },

  icon: {
    primary: palette.neutral[800],
    secondary: palette.neutral[600],
    tertiary: palette.neutral[500],
    disabled: palette.neutral[400],
    inverse: palette.neutral[0],
    brand: palette.brand[600],
    accent: palette.accent[700],
    onBrand: palette.neutral[0],
    onAccent: palette.neutral[950],
  },

  border: {
    subtle: palette.neutral[200],
    default: palette.neutral[300],
    strong: palette.neutral[500],
    disabled: palette.neutral[200],
    inverse: palette.neutral[700],
    brand: palette.brand[600],
    accent: palette.accent[500],
    focus: palette.info[600],
  },

  interactive: {
    primary: {
      default: palette.brand[600],
      hover: palette.brand[700],
      pressed: palette.brand[800],
      selected: palette.brand[700],
      disabled: palette.neutral[200],
      foreground: palette.neutral[0],
      foregroundDisabled: palette.neutral[400],
    },

    secondary: {
      default: palette.neutral[0],
      hover: palette.neutral[50],
      pressed: palette.neutral[100],
      selected: palette.brand[50],
      disabled: palette.neutral[50],
      foreground: palette.brand[700],
      foregroundDisabled: palette.neutral[400],
      border: palette.brand[600],
    },

    tertiary: {
      default: palette.common.transparent,
      hover: palette.neutral[100],
      pressed: palette.neutral[200],
      selected: palette.brand[50],
      disabled: palette.common.transparent,
      foreground: palette.brand[700],
      foregroundDisabled: palette.neutral[400],
    },

    destructive: {
      default: palette.error[600],
      hover: palette.error[700],
      pressed: palette.error[800],
      disabled: palette.neutral[200],
      foreground: palette.neutral[0],
      foregroundDisabled: palette.neutral[400],
    },
  },

  status: {
    success: {
      background: palette.success[50],
      backgroundStrong: palette.success[600],
      foreground: palette.success[700],
      foregroundStrong: palette.success[900],
      border: palette.success[300],
      icon: palette.success[600],
    },

    warning: {
      background: palette.warning[50],
      backgroundStrong: palette.warning[500],
      foreground: palette.warning[800],
      foregroundStrong: palette.warning[950],
      border: palette.warning[300],
      icon: palette.warning[600],
    },

    error: {
      background: palette.error[50],
      backgroundStrong: palette.error[600],
      foreground: palette.error[700],
      foregroundStrong: palette.error[900],
      border: palette.error[300],
      icon: palette.error[600],
    },

    info: {
      background: palette.info[50],
      backgroundStrong: palette.info[600],
      foreground: palette.info[700],
      foregroundStrong: palette.info[900],
      border: palette.info[300],
      icon: palette.info[600],
    },

    neutral: {
      background: palette.neutral[100],
      backgroundStrong: palette.neutral[700],
      foreground: palette.neutral[700],
      foregroundStrong: palette.neutral[900],
      border: palette.neutral[300],
      icon: palette.neutral[600],
    },
  },

  input: {
    background: palette.neutral[0],
    backgroundDisabled: palette.neutral[100],
    backgroundReadOnly: palette.neutral[50],
    text: palette.neutral[900],
    placeholder: palette.neutral[500],
    label: palette.neutral[700],
    helperText: palette.neutral[600],
    border: palette.neutral[300],
    borderHover: palette.neutral[500],
    borderFocus: palette.brand[600],
    borderError: palette.error[600],
    icon: palette.neutral[500],
    iconDisabled: palette.neutral[400],
    selection: palette.brand[100],
  },

  navigation: {
    background: palette.neutral[0],
    backgroundElevated: palette.neutral[0],
    active: palette.brand[700],
    inactive: palette.neutral[500],
    activeBackground: palette.brand[50],
    indicator: palette.brand[600],
    border: palette.neutral[200],
  },

  overlay: {
    subtle: "rgba(15, 23, 42, 0.04)",
    default: "rgba(15, 23, 42, 0.08)",
    strong: "rgba(15, 23, 42, 0.16)",
    scrim: "rgba(2, 6, 23, 0.50)",
    scrimStrong: "rgba(2, 6, 23, 0.72)",
    modal: "rgba(2, 6, 23, 0.56)",
  },

  skeleton: {
    base: palette.neutral[200],
    highlight: palette.neutral[100],
  },

  map: {
    routePrimary: palette.brand[600],
    routeAlternative: palette.info[500],
    routeCompleted: palette.neutral[400],
    routeRemaining: palette.brand[700],
    pickup: palette.success[600],
    dropoff: palette.error[600],
    userLocation: palette.info[600],
    vehicleLocation: palette.accent[500],
    geofenceFill: "rgba(26, 122, 60, 0.14)",
    geofenceBorder: palette.brand[600],
    mapOverlay: "rgba(15, 23, 42, 0.12)",
  },

  accessibility: {
    focusRing: palette.info[600],
    focusRingOffset: palette.neutral[0],
    highContrastText: palette.common.black,
    highContrastBackground: palette.common.white,
  },
} as const satisfies SemanticColorTokens;
