
/**
 * Design System - Z-Index Tokens
 * SmartLink Transit
 */

export const zIndex = {
  base: 0,

  map: 10,

  mapOverlay: 15,

  marker: 20,

  floating: 25,

  header: 30,

  navigation: 35,

  bottomSheet: 40,

  dropdown: 45,

  modal: 50,

  popover: 55,

  toast: 60,

  tooltip: 70,

  critical: 100,
} as const;

export type ZIndexTokens = typeof zIndex;

export type ZIndexToken =
  keyof typeof zIndex;
