
// Design System - Border Radius Tokens

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export type RadiusTokens = typeof radius;

// Component radius mapping
export const componentRadius = {
 button: radius.sm,
 fab: radius.full,
 card: radius.md,
 input: radius.sm,
 bottomSheet: radius.lg,
 modal: radius.md,
 chip: radius.sm,
 badge: radius.full,
 avatar: radius.full,
 mapMarker: radius.sm
};
