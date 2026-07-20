
 // Design System - Spacing Tokens
 // Based on 8-point grid system 

export const spacing = {
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
} as const;

export type SpacingTokens = typeof spacing;

// Spacing usage guidelines
export const spacingGuidelines = {
  screenPadding: {
    horizontal: spacing[16],
    vertical: spacing[16],
  },
  cardPadding: {
    horizontal: spacing[16],
    vertical: spacing[16],
  },
  sectionSpacing: spacing[24],
  inputPadding: {
    horizontal: spacing[16],
    vertical: spacing[12],
  },
  buttonPadding: {
    horizontal: spacing[24],
    vertical: spacing[12],
  },
  listItem: {
    horizontal: spacing[16],
    vertical: spacing[12],
  },
  iconToText: spacing[8],
  labelToInput: spacing[8],
  stackSpacing: spacing[16],
  buttonToButton: spacing[8],
} as const;