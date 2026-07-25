/**
 * Design System - Opacity Tokens
 * SmartLink Transit
 */

export const opacity = {
  invisible: 0,

  subtle: 0.04,

  hover: 0.08,

  pressed: 0.12,

  selected: 0.16,

  faint: 0.24,

  disabled: 0.38,

  muted: 0.6,

  strong: 0.8,

  visible: 1,

  overlay: 0.5,

  overlayStrong: 0.72,
} as const;

export type OpacityTokens = typeof opacity;

export type OpacityToken = keyof typeof opacity;
