/**
 * Design System - Color Tokens
 * Based on SmartLink Transit Design System Specification
 * All values extracted from the design document
 */

export const colors = {
  // Brand Colors
  brand: {
    green: '#1A7A3C',
    greenLight: '#E8F5ED',
    greenDark: '#0F5C2E',
    gold: '#F5A623',
    goldLight: '#FFF8E7',
  },
  backgroundLight: {
    primary: "#F8FAFC",
    secondary: "#F1F5F9",
  },

  backgroundDark: {
    primary: "#0F172A",
    secondary: "#1E293B",
  },

  // Semantic Colors
  semantic: {
    success: '#34A853',
    successLight: '#E6F4EA',
    warning: '#FBBC04',
    warningLight: '#FEF7E0',
    error: '#EA4335',
    errorLight: '#FCE8E6',
    info: '#1A73E8',
    infoLight: '#E8F0FE',
  },

  // Neutral Colors - Light Mode
  neutral: {
    50: '#FAF8F6',
    100: '#F5F3F0',
    200: '#E8E8E8',
    300: '#D4D4D4',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#6B6B6B',
    700: '#4A4A4A',
    800: '#2D2D2D',
    900: '#1A1A1A',
  },

  // Neutral Colors - Dark Mode
  dark: {
    300: '#B0B0B0',
    400: '#7A7A7A',
    500: '#5A5A5A',
    600: '#3D3D3D',
    700: '#2D2D2D',
    800: '#1A1A1A',
    900: '#0D0D0D',
  },

  // Surface Colors
  surface: {
    background: '#F5F3F0',
    surface: '#FAF8F6',
    surfaceElevated: '#FFFFFF',
    card: '#FFFFFF',
    inputBackground: '#FFFFFF',
  },

  // Dark Mode Surface
  surfaceDark: {
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceElevated: '#2D2D2D',
    card: '#2D2D2D',
    inputBackground: '#2D2D2D',
  },

  // Overlay Colors
  overlay: {
    light: 'rgba(0,0,0,0.04)',
    medium: 'rgba(0,0,0,0.08)',
    dark: 'rgba(0,0,0,0.16)',
    scrim: 'rgba(0,0,0,0.50)',
    scrimHeavy: 'rgba(0,0,0,0.70)',
  },

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorTokens = typeof colors;