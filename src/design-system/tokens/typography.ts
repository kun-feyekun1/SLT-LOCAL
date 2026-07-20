
 /* Design System - Typography Tokens
    Based on SmartLink Transit Design System Specification
    Primary font: Inter
 */

import { Platform } from 'react-native';

export const fontFamily = {
  inter: {
    thin: 'Inter-Thin',
    extraLight: 'Inter-ExtraLight',
    light: 'Inter-Light',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
    black: 'Inter-Black',
  },
  fallback: Platform.select({
    ios: '-apple-system, BlinkMacSystemFont',
    android: 'System',
    default: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI',
  }),
} as const;

export const typography = {
  // Display Styles
  displayLarge: {
    fontFamily: fontFamily.inter.bold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.5,
    fontWeight: '700' as const,
  },
  displayMedium: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
    fontWeight: '600' as const,
  },

  // Heading Styles
  h1: {
    fontFamily: fontFamily.inter.bold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.25,
    fontWeight: '700' as const,
  },
  h2: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.25,
    fontWeight: '600' as const,
  },
  h3: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: '600' as const,
  },
  h4: {
    fontFamily: fontFamily.inter.medium,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '500' as const,
  },

  // Body Styles
  bodyLarge: {
    fontFamily: fontFamily.inter.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontFamily: fontFamily.inter.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontFamily: fontFamily.inter.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    fontWeight: '400' as const,
  },

  // Label & Control Styles
  labelLarge: {
    fontFamily: fontFamily.inter.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
  },
  labelMedium: {
    fontFamily: fontFamily.inter.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
  },
  labelSmall: {
    fontFamily: fontFamily.inter.medium,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
  },

  // Button & Navigation Styles
  buttonLarge: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.75,
    fontWeight: '600' as const,
  },
  buttonMedium: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.75,
    fontWeight: '600' as const,
  },
  buttonSmall: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '600' as const,
  },
  navigationLabel: {
    fontFamily: fontFamily.inter.medium,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
  },

  // Special Styles
  monospace: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '400' as const,
  },
  priceLarge: {
    fontFamily: fontFamily.inter.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
    fontWeight: '700' as const,
  },
  priceMedium: {
    fontFamily: fontFamily.inter.semiBold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    fontWeight: '600' as const,
  },
  link: {
    fontFamily: fontFamily.inter.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '500' as const,
  },
} as const;

export const zIndex={

base:0,
map:10,
marker:20,
header:30,
bottomSheet:40,
modal:50,
toast:60,
}

export const opacity={

disabled:0.38,
hover:0.08,
pressed:0.12,
overlay:0.5,
}

export const layout={

headerHeight:56,
bottomNavHeight:72,
screenPadding:16,
}



export type TypographyTokens = typeof typography;
export type TypographyVariant = keyof typeof typography;