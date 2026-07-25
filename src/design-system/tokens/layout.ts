/**
 * Design System - Layout Tokens
 * SmartLink Transit
 */

export const layout = {
  // Screen
  screenPadding: 16,
  screenPaddingCompact: 12,
  screenPaddingLarge: 24,

  // Navigation
  headerHeight: 56,
  bottomNavHeight: 72,
  tabBarHeight: 48,

  // Content
  contentMaxWidth: 1200,
  formMaxWidth: 560,

  // Interactive sizes
  touchTargetMinimum: 44,
  touchTargetComfortable: 48,

  // Icons
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
  iconXLarge: 32,

  // Avatar
  avatarSmall: 32,
  avatarMedium: 40,
  avatarLarge: 56,
  avatarXLarge: 80,

  // Transportation UI
  mapMarkerSize: 40,
  vehicleMarkerSize: 44,
  stopMarkerSize: 32,

  // Bottom sheet
  bottomSheetHandleWidth: 40,
  bottomSheetHandleHeight: 4,
} as const;

export type LayoutTokens = typeof layout;

export type LayoutToken = keyof typeof layout;
