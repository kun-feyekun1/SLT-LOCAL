/**
 * Design System - Shadow / Elevation Tokens
 * SmartLink Transit
 *
 * Cross-platform elevation system for React Native.
 *
 * iOS:
 * - shadowColor
 * - shadowOffset
 * - shadowOpacity
 * - shadowRadius
 *
 * Android:
 * - elevation
 */
import { Platform, type ViewStyle } from "react-native";

// TYPES
export type ShadowDefinition = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

// PRIMITIVE ELEVATION LEVELS
/**
 * Elevation scale.
 *
 * level0 = flat
 * level1 = subtle separation
 * level2 = standard raised surface
 * level3 = floating surface
 * level4 = overlays
 * level5 = prominent overlays
 * level6 = highest normal application elevation
 */
export const shadows = {
  level0: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  level2: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  level3: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  level4: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 8,
  },
  level5: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 12,
  },
  level6: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 16,
  },
} as const satisfies Record<string, ShadowDefinition>;

// COMPONENT ELEVATION
/**
 * Component → elevation mapping.
 *
 * Components should normally use this layer rather than choosing
 * arbitrary shadow levels.
 */
export const componentElevation = {
  // BASIC CONTENT
  flat: 0,
  input: 1,
  card: 2,
  cardPressed: 1,
  cardElevated: 3,

  // ACTIONS
  buttonDefault: 2,
  buttonPressed: 1,
  buttonFloating: 3,
  iconButton: 1,

  // NAVIGATION
  header: 2,
  topNavigation: 3,
  navigationBar: 3,
  bottomNavigation: 3,
  drawer: 4,

  // FLOATING UI
  dropdown: 3,
  popover: 4,
  tooltip: 4,

  // OVERLAYS
  modal: 4,
  dialog: 4,
  bottomSheet: 5,
  toast: 5,
  snackbar: 4,

  // PROMINENT
  fab: 6,

  // TRANSPORTATION / MAP
  mapControl: 3,
  mapCard: 3,
  mapMarker: 2,
  vehicleMarker: 3,
  tripCard: 2,
  floatingMapPanel: 4,
} as const;

// SEMANTIC ELEVATION
/**
 * Generic elevation semantics useful when defining
 * new components.
 */
export const semanticElevation = {
  flat: 0,
  subtle: 1,
  raised: 2,
  floating: 3,
  overlay: 4,
  prominent: 5,
  maximum: 6,
} as const;

// INTERNAL SHADOW MAP
const shadowLevels = {
  0: shadows.level0,
  1: shadows.level1,
  2: shadows.level2,
  3: shadows.level3,
  4: shadows.level4,
  5: shadows.level5,
  6: shadows.level6,
} as const;

// HELPERS
/**
 * Returns a complete cross-platform shadow style.
 *
 * Dark mode can slightly reduce shadow opacity because
 * very strong black shadows are less useful against dark surfaces.
 */
export function getShadow(level: ElevationLevel, darkMode = false): ViewStyle {
  const shadow = shadowLevels[level];
  const opacityMultiplier = darkMode ? 0.7 : 1;

  return {
    shadowColor: shadow.shadowColor,
    shadowOffset: {
      width: shadow.shadowOffset.width,
      height: shadow.shadowOffset.height,
    },
    shadowOpacity: shadow.shadowOpacity * opacityMultiplier,
    shadowRadius: shadow.shadowRadius,
    elevation: shadow.elevation,
  };
}

/**
 * Retrieve shadow using a named component.
 *
 * Example:
 *
 * getComponentShadow("card")
 * getComponentShadow("modal")
 * getComponentShadow("fab", true)
 */
export function getComponentShadow(
  component: ComponentElevationToken,
  darkMode = false
): ViewStyle {
  const level = componentElevation[component];
  return getShadow(level as ElevationLevel, darkMode);
}

/**
 * Platform-aware version.
 *
 * Useful when you explicitly want to avoid sending
 * unused platform shadow properties.
 */
export function getPlatformShadow(
  level: ElevationLevel,
  darkMode = false
): ViewStyle {
  const shadow = shadowLevels[level];
  const opacityMultiplier = darkMode ? 0.7 : 1;

  if (Platform.OS === "android") {
    return {
      elevation: shadow.elevation,
    };
  }

  return {
    shadowColor: shadow.shadowColor,
    shadowOffset: {
      width: shadow.shadowOffset.width,
      height: shadow.shadowOffset.height,
    },
    shadowOpacity: shadow.shadowOpacity * opacityMultiplier,
    shadowRadius: shadow.shadowRadius,
  };
}

// TYPES
export type ShadowTokens = typeof shadows;
export type ShadowToken = keyof typeof shadows;
export type ElevationLevel = keyof typeof shadowLevels;
export type ComponentElevationTokens = typeof componentElevation;
export type ComponentElevationToken = keyof typeof componentElevation;
export type SemanticElevationTokens = typeof semanticElevation;
