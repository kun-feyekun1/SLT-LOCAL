/**
 * Design System - Spacing Tokens
 * SmartLink Transit
 *
 * Core spacing system based primarily on a 4px / 8px grid.
 *
 * Use primitive spacing tokens for low-level layout and
 * semantic spacing tokens for standardized application patterns.
 */

// PRIMITIVE SPACING SCALE
export const spacing = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 14,
  8: 16,
  10: 20,
  12: 24,
  14: 28,
  16: 32,
  20: 40,
  24: 48,
  28: 56,
  32: 64,
  36: 72,
  40: 80,
  48: 96,
  56: 112,
  64: 128,
} as const;

// SEMANTIC SPACING
/**
 * Semantic spacing should be preferred for recurring
 * application-level layout patterns.
 */
export const semanticSpacing = {
  // SCREEN
  screen: {
    horizontalCompact: spacing[6],  // 12
    horizontal: spacing[8],         // 16
    horizontalLarge: spacing[12],   // 24
    verticalCompact: spacing[8],    // 16
    vertical: spacing[12],          // 24
    verticalLarge: spacing[16],     // 32
  },

  // SECTIONS
  section: {
    compact: spacing[8],            // 16
    default: spacing[12],           // 24
    large: spacing[16],             // 32
    extraLarge: spacing[24],        // 48
  },

  // CONTENT STACKS
  stack: {
    tiny: spacing[2],               // 4
    small: spacing[4],              // 8
    medium: spacing[6],             // 12
    default: spacing[8],            // 16
    large: spacing[12],             // 24
    extraLarge: spacing[16],        // 32
  },

  // INLINE CONTENT
  inline: {
    tiny: spacing[1],               // 2
    small: spacing[2],              // 4
    medium: spacing[4],             // 8
    large: spacing[6],              // 12
    extraLarge: spacing[8],         // 16
  },

  // CARD
  card: {
    compact: spacing[6],            // 12
    default: spacing[8],            // 16
    large: spacing[12],             // 24
    gap: spacing[8],
    headerGap: spacing[4],
    footerGap: spacing[6],
  },

  // FORM
  form: {
    fieldGap: spacing[8],           // 16
    sectionGap: spacing[12],        // 24
    labelToInput: spacing[4],       // 8
    inputToHelper: spacing[2],      // 4
    actionGap: spacing[4],          // 8
  },

  // INPUT
  input: {
    horizontal: spacing[8],         // 16
    vertical: spacing[6],           // 12
    iconGap: spacing[4],            // 8
    prefixGap: spacing[4],
    suffixGap: spacing[4],
  },

  // BUTTON
  button: {
    horizontalSmall: spacing[6],    // 12
    horizontalMedium: spacing[8],   // 16
    horizontalLarge: spacing[12],   // 24
    verticalSmall: spacing[4],      // 8
    verticalMedium: spacing[6],     // 12
    verticalLarge: spacing[8],      // 16
    iconGap: spacing[4],            // 8
    groupGap: spacing[4],           // 8
  },

  // LIST
  list: {
    itemHorizontal: spacing[8],     // 16
    itemVertical: spacing[6],       // 12
    itemGap: spacing[4],            // 8
    sectionGap: spacing[12],        // 24
  },

  // NAVIGATION
  navigation: {
    horizontal: spacing[8],
    vertical: spacing[4],
    itemGap: spacing[4],
    iconToLabel: spacing[2],
  },

  // MODAL
  modal: {
    padding: spacing[12],           // 24
    sectionGap: spacing[8],         // 16
    actionGap: spacing[4],          // 8
  },

  // BOTTOM SHEET
  bottomSheet: {
    horizontal: spacing[8],         // 16
    vertical: spacing[8],           // 16
    headerGap: spacing[6],
    contentGap: spacing[8],
  },

  // CHIPS / BADGES
  chip: {
    horizontal: spacing[6],
    vertical: spacing[2],
    iconGap: spacing[2],
  },
  badge: {
    horizontal: spacing[4],
    vertical: spacing[1],
    iconGap: spacing[2],
  },

  // EMPTY / ERROR STATES
  state: {
    iconToTitle: spacing[8],
    titleToDescription: spacing[4],
    descriptionToAction: spacing[12],
  },

  // TRANSPORTATION
  transport: {
    routeItemGap: spacing[6],
    stopGap: spacing[8],
    stopMarkerToContent: spacing[6],
    vehicleInfoGap: spacing[4],
    fareInfoGap: spacing[4],
    tripSectionGap: spacing[12],
    mapControlGap: spacing[4],
    mapEdgePadding: spacing[8],
    floatingControlOffset: spacing[8],
  },
} as const;

// LEGACY / CONVENIENCE COMPONENT MAPPING
/**
 * Keeps simple component-level access available while
 * semanticSpacing provides the more comprehensive system.
 */
export const componentSpacing = {
  screenPadding: semanticSpacing.screen.horizontal,
  cardPadding: semanticSpacing.card.default,
  sectionSpacing: semanticSpacing.section.default,
  inputHorizontal: semanticSpacing.input.horizontal,
  inputVertical: semanticSpacing.input.vertical,
  buttonHorizontal: semanticSpacing.button.horizontalLarge,
  buttonVertical: semanticSpacing.button.verticalMedium,
  listItemHorizontal: semanticSpacing.list.itemHorizontal,
  listItemVertical: semanticSpacing.list.itemVertical,
  iconToText: semanticSpacing.inline.medium,
  labelToInput: semanticSpacing.form.labelToInput,
  stackSpacing: semanticSpacing.stack.default,
  buttonToButton: semanticSpacing.button.groupGap,
} as const;

// HELPERS
export function getSpacing(
  token: SpacingToken,
): (typeof spacing)[SpacingToken] {
  return spacing[token];
}

// TYPES
export type SpacingTokens = typeof spacing;
export type SpacingToken = keyof typeof spacing;
export type SemanticSpacingTokens = typeof semanticSpacing;
export type ComponentSpacingTokens = typeof componentSpacing;