
//  /* Design System - Typography Tokens
//     Based on SmartLink Transit Design System Specification
//     Primary font: Inter
//  */

// import { Platform } from 'react-native';

// export const fontFamily = {
//   inter: {
//     thin: 'Inter-Thin',
//     extraLight: 'Inter-ExtraLight',
//     light: 'Inter-Light',
//     regular: 'Inter-Regular',
//     medium: 'Inter-Medium',
//     semiBold: 'Inter-SemiBold',
//     bold: 'Inter-Bold',
//     extraBold: 'Inter-ExtraBold',
//     black: 'Inter-Black',
//   },
//   fallback: Platform.select({
//     ios: '-apple-system, BlinkMacSystemFont',
//     android: 'System',
//     default: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI',
//   }),
// } as const;

// export const typography = {
//   // Display Styles
//   displayLarge: {
//     fontFamily: fontFamily.inter.bold,
//     fontSize: 40,
//     lineHeight: 48,
//     letterSpacing: -0.5,
//     fontWeight: '700' as const,
//   },
//   displayMedium: {
//     fontFamily: fontFamily.inter.semiBold,
//     fontSize: 32,
//     lineHeight: 40,
//     letterSpacing: -0.5,
//     fontWeight: '600' as const,
//   },

//   // Heading Styles
//   h1: {
//     fontFamily: fontFamily.inter.bold,
//     fontSize: 28,
//     lineHeight: 36,
//     letterSpacing: -0.25,
//     fontWeight: '700' as const,
//   },
//   h2: {
//     fontFamily: fontFamily.inter.semiBold,
//     fontSize: 24,
//     lineHeight: 32,
//     letterSpacing: -0.25,
//     fontWeight: '600' as const,
//   },
//   h3: {
//     fontFamily: fontFamily.inter.semiBold,
//     fontSize: 20,
//     lineHeight: 28,
//     letterSpacing: 0,
//     fontWeight: '600' as const,
//   },
//   h4: {
//     fontFamily: fontFamily.inter.medium,
//     fontSize: 18,
//     lineHeight: 24,
//     letterSpacing: 0,
//     fontWeight: '500' as const,
//   },

//   // Body Styles
//   bodyLarge: {
//     fontFamily: fontFamily.inter.regular,
//     fontSize: 16,
//     lineHeight: 24,
//     letterSpacing: 0,
//     fontWeight: '400' as const,
//   },
//   bodyMedium: {
//     fontFamily: fontFamily.inter.regular,
//     fontSize: 14,
//     lineHeight: 20,
//     letterSpacing: 0.25,
//     fontWeight: '400' as const,
//   },
//   bodySmall: {
//     fontFamily: fontFamily.inter.regular,
//     fontSize: 12,
//     lineHeight: 16,
//     letterSpacing: 0.25,
//     fontWeight: '400' as const,
//   },

//   // Label & Control Styles
//   labelLarge: {
//     fontFamily: fontFamily.inter.medium,
//     fontSize: 14,
//     lineHeight: 20,
//     letterSpacing: 0.5,
//     fontWeight: '500' as const,
//   },
//   labelMedium: {
//     fontFamily: fontFamily.inter.medium,
//     fontSize: 12,
//     lineHeight: 16,
//     letterSpacing: 0.5,
//     fontWeight: '500' as const,
//   },
//   labelSmall: {
//     fontFamily: fontFamily.inter.medium,
//     fontSize: 10,
//     lineHeight: 12,
//     letterSpacing: 0.5,
//     fontWeight: '500' as const,
//   },

//   // Button & Navigation Styles
//   buttonLarge: {
//     fontFamily: fontFamily.inter.semiBold,
//     fontSize: 16,
//     lineHeight: 24,
//     letterSpacing: 0.75,
//     fontWeight: '600' as const,
//   },
//   buttonMedium: {
//     fontFamily: fontFamily.inter.semiBold,
//     fontSize: 14,
//     lineHeight: 20,
//     letterSpacing: 0.75,
//     fontWeight: '600' as const,
//   },
//   buttonSmall: {
//     fontFamily: fontFamily.inter.semiBold,
//     fontSize: 12,
//     lineHeight: 16,
//     letterSpacing: 0.5,
//     fontWeight: '600' as const,
//   },
//   navigationLabel: {
//     fontFamily: fontFamily.inter.medium,
//     fontSize: 10,
//     lineHeight: 12,
//     letterSpacing: 0.5,
//     fontWeight: '500' as const,
//   },

//   // Special Styles
//   monospace: {
//     fontFamily: Platform.select({
//       ios: 'Menlo',
//       android: 'monospace',
//       default: 'monospace',
//     }),
//     fontSize: 14,
//     lineHeight: 20,
//     letterSpacing: 0,
//     fontWeight: '400' as const,
//   },
//   priceLarge: {
//     fontFamily: fontFamily.inter.bold,
//     fontSize: 32,
//     lineHeight: 40,
//     letterSpacing: -0.5,
//     fontWeight: '700' as const,
//   },
//   priceMedium: {
//     fontFamily: fontFamily.inter.semiBold,
//     fontSize: 20,
//     lineHeight: 28,
//     letterSpacing: 0,
//     fontWeight: '600' as const,
//   },
//   link: {
//     fontFamily: fontFamily.inter.medium,
//     fontSize: 14,
//     lineHeight: 20,
//     letterSpacing: 0,
//     fontWeight: '500' as const,
//   },
// } as const;

// export const zIndex={

// base:0,
// map:10,
// marker:20,
// header:30,
// bottomSheet:40,
// modal:50,
// toast:60,
// }

// export const opacity={

// disabled:0.38,
// hover:0.08,
// pressed:0.12,
// overlay:0.5,
// }

// export const layout={

// headerHeight:56,
// bottomNavHeight:72,
// screenPadding:16,
// }



// export type TypographyTokens = typeof typography;
// export type TypographyVariant = keyof typeof typography;












/**
 * Design System - Typography Tokens
 * SmartLink Transit
 *
 * Primary typeface: Inter
 *
 * Designed for:
 * - React Native
 * - Expo
 * - TypeScript
 * - Accessibility
 * - Responsive UI
 */

import { Platform, type TextStyle } from "react-native";

// ============================================================================
// FONT FAMILY
// ============================================================================

export const fontFamily = {
  inter: {
    thin: "Inter-Thin",
    extraLight: "Inter-ExtraLight",
    light: "Inter-Light",
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
    bold: "Inter-Bold",
    extraBold: "Inter-ExtraBold",
    black: "Inter-Black",
  },

  monospace: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }) as string,

  fallback: Platform.select({
    ios: "System",
    android: "sans-serif",
    default: "system-ui",
  }) as string,
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================

/**
 * Standardized font weights.
 *
 * Avoid arbitrary values such as:
 * fontWeight: "750"
 */
export const fontWeight = {
  thin: "100",
  extraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
} as const satisfies Record<string, TextStyle["fontWeight"]>;

// ============================================================================
// FONT SIZES
// ============================================================================

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  "6xl": 40,
  "7xl": 48,
} as const;

// ============================================================================
// LINE HEIGHT
// ============================================================================

export const lineHeight = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  "2xl": 32,
  "3xl": 36,
  "4xl": 40,
  "5xl": 48,
  "6xl": 56,
} as const;

// ============================================================================
// LETTER SPACING
// ============================================================================

export const letterSpacing = {
  tighter: -0.75,
  tight: -0.5,
  slightlyTight: -0.25,
  normal: 0,
  slightlyWide: 0.25,
  wide: 0.5,
  wider: 0.75,
  widest: 1,
} as const;

// ============================================================================
// TYPOGRAPHY STYLES
// ============================================================================

export const typography = {
  // --------------------------------------------------------------------------
  // DISPLAY
  // --------------------------------------------------------------------------

  displayLarge: {
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize["6xl"],
    lineHeight: lineHeight["5xl"],
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.bold,
  },

  displayMedium: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize["5xl"],
    lineHeight: lineHeight["4xl"],
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.semiBold,
  },

  displaySmall: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["3xl"],
    letterSpacing: letterSpacing.slightlyTight,
    fontWeight: fontWeight.semiBold,
  },

  // --------------------------------------------------------------------------
  // HEADINGS
  // --------------------------------------------------------------------------

  h1: {
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["3xl"],
    letterSpacing: letterSpacing.slightlyTight,
    fontWeight: fontWeight.bold,
  },

  h2: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["2xl"],
    letterSpacing: letterSpacing.slightlyTight,
    fontWeight: fontWeight.semiBold,
  },

  h3: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight.xl,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.semiBold,
  },

  h4: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },

  h5: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },

  h6: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.medium,
  },

  // --------------------------------------------------------------------------
  // BODY
  // --------------------------------------------------------------------------

  bodyLarge: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },

  bodyMedium: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.regular,
  },

  bodySmall: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.regular,
  },

  // --------------------------------------------------------------------------
  // LABELS
  // --------------------------------------------------------------------------

  labelLarge: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.wide,
    fontWeight: fontWeight.medium,
  },

  labelMedium: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    letterSpacing: letterSpacing.wide,
    fontWeight: fontWeight.medium,
  },

  labelSmall: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wide,
    fontWeight: fontWeight.medium,
  },

  // --------------------------------------------------------------------------
  // BUTTONS
  // --------------------------------------------------------------------------

  buttonLarge: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.wider,
    fontWeight: fontWeight.semiBold,
  },

  buttonMedium: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.wider,
    fontWeight: fontWeight.semiBold,
  },

  buttonSmall: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    letterSpacing: letterSpacing.wide,
    fontWeight: fontWeight.semiBold,
  },

  // --------------------------------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------------------------------

  navigationLabel: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wide,
    fontWeight: fontWeight.medium,
  },

  navigationTitle: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.semiBold,
  },

  // --------------------------------------------------------------------------
  // INPUT
  // --------------------------------------------------------------------------

  input: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },

  inputLabel: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.medium,
  },

  helperText: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.regular,
  },

  placeholder: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },

  // --------------------------------------------------------------------------
  // LINKS
  // --------------------------------------------------------------------------

  link: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },

  linkSmall: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },

  // --------------------------------------------------------------------------
  // PRICE / FINANCIAL
  // --------------------------------------------------------------------------

  priceLarge: {
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize["5xl"],
    lineHeight: lineHeight["4xl"],
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.bold,
  },

  priceMedium: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight.xl,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.semiBold,
  },

  priceSmall: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.semiBold,
  },

  // --------------------------------------------------------------------------
  // TRANSPORTATION
  // --------------------------------------------------------------------------

  routeNumber: {
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.bold,
  },

  stopName: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.medium,
  },

  arrivalTime: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight.xl,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.semiBold,
  },

  eta: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.semiBold,
  },

  // --------------------------------------------------------------------------
  // BADGES / CHIPS
  // --------------------------------------------------------------------------

  badge: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wide,
    fontWeight: fontWeight.semiBold,
  },

  chip: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.medium,
  },

  // --------------------------------------------------------------------------
  // CAPTION
  // --------------------------------------------------------------------------

  caption: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    letterSpacing: letterSpacing.slightlyWide,
    fontWeight: fontWeight.regular,
  },

  overline: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.widest,
    fontWeight: fontWeight.semiBold,
  },

  // --------------------------------------------------------------------------
  // MONOSPACE
  // --------------------------------------------------------------------------

  monospace: {
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },

  monospaceSmall: {
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    letterSpacing: letterSpacing.normal,
    fontWeight: fontWeight.regular,
  },
} as const satisfies Record<string, TextStyle>;

// ============================================================================
// HELPERS
// ============================================================================

export function getTypography(
  variant: TypographyVariant,
): (typeof typography)[TypographyVariant] {
  return typography[variant];
}

// ============================================================================
// TYPES
// ============================================================================

export type FontFamilyTokens = typeof fontFamily;

export type FontWeightTokens = typeof fontWeight;

export type FontSizeTokens = typeof fontSize;

export type LineHeightTokens = typeof lineHeight;

export type LetterSpacingTokens = typeof letterSpacing;

export type TypographyTokens = typeof typography;

export type TypographyVariant =
  keyof typeof typography;

export type FontWeight =
  keyof typeof fontWeight;

export type FontSize =
  keyof typeof fontSize;

export type LineHeight =
  keyof typeof lineHeight;

export type LetterSpacing =
  keyof typeof letterSpacing;
