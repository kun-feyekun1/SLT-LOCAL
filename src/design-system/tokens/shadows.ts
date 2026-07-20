/**
 * Design System - Elevation & Shadow Tokens
 * Based on SmartLink Transit Design System Specification
 */

import { colors } from './colors';

// Shadow configuration for each elevation level
export const elevation = {
  0: {
    shadowColor: colors.transparent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  1: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  2: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  3: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
  },
  4: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  5: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
  },
  6: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.20,
    shadowRadius: 32,
    elevation: 6,
  },
} as const;

export type ElevationTokens = typeof elevation;
export type ElevationLevel = keyof typeof elevation;

// Component elevation mapping
export const componentElevation = {
  input: elevation[1],
  card: elevation[2],
  buttonDefault: elevation[2],
  buttonPressed: elevation[1],
  dropdown: elevation[3],
  modal: elevation[4],
  bottomSheet: elevation[5],
  fab: elevation[6],
  navigationBar: elevation[3],
  bottomNavigation: elevation[3],
} as const;

// Helper function to get shadow styles with dark mode support
export const getShadow = (
  level: ElevationLevel,
  isDarkMode: boolean = false
) => {
  const shadow = elevation[level];
  const opacityMultiplier = isDarkMode ? 1.5 : 1;
  
  return {
    ...shadow,
    shadowOpacity: shadow.shadowOpacity * opacityMultiplier,
  };
};