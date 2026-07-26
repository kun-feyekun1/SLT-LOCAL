/**
 * Design System - Border Radius Tokens
 * SmartLink Transit
 *
 * Primitive radius scale + semantic component mappings.
 */

// PRIMITIVE RADIUS SCALE
export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  full: 999,
} as const;

// COMPONENT RADIUS
/**
 * Semantic radius assignments.
 *
 * Components should generally consume these instead
 * of selecting arbitrary primitive radius values.
 */
export const componentRadius = {
  // ACTIONS
  button: radius.sm,
  buttonSmall: radius.sm,
  buttonLarge: radius.md,
  iconButton: radius.full,
  fab: radius.full,

  // INPUTS
  input: radius.sm,
  textArea: radius.sm,
  searchInput: radius.full,
  select: radius.sm,
  checkbox: radius.xs,
  radio: radius.full,
  switch: radius.full,

  // CONTENT
  card: radius.md,
  cardElevated: radius.lg,
  image: radius.sm,
  thumbnail: radius.sm,
  avatar: radius.full,

  // NAVIGATION
  navigationItem: radius.sm,
  tab: radius.sm,
  activeTab: radius.sm,

  // OVERLAYS
  modal: radius.lg,
  dialog: radius.lg,
  bottomSheet: radius.xl,
  popover: radius.md,
  dropdown: radius.md,
  tooltip: radius.sm,
  toast: radius.md,
  snackbar: radius.md,

  // SMALL UI
  chip: radius.full,
  badge: radius.full,
  tag: radius.full,
  skeleton: radius.sm,
  progress: radius.full,

  // TRANSPORTATION / MAP
  mapMarker: radius.full,
  mapControl: radius.md,
  mapCard: radius.lg,
  vehicleMarker: radius.full,
  stopMarker: radius.full,
  routeBadge: radius.sm,
  fareBadge: radius.sm,
  tripCard: radius.lg,

  // MEDIA
  media: radius.md,
  mediaLarge: radius.lg,
  profileImage: radius.full,
} as const;

// SEMANTIC RADIUS
/**
 * Generic semantic categories useful when creating
 * new components that do not yet have a component mapping.
 */
export const semanticRadius = {
  control: radius.sm,
  container: radius.md,
  elevatedContainer: radius.lg,
  overlay: radius.lg,
  prominent: radius.xl,
  pill: radius.full,
  circular: radius.full,
} as const;

// HELPERS
export function getRadius(token: RadiusToken): (typeof radius)[RadiusToken] {
  return radius[token];
}

export function getComponentRadius(
  component: ComponentRadiusToken
): (typeof componentRadius)[ComponentRadiusToken] {
  return componentRadius[component];
}

// TYPES
export type RadiusTokens = typeof radius;
export type RadiusToken = keyof typeof radius;
export type ComponentRadiusTokens = typeof componentRadius;
export type ComponentRadiusToken = keyof typeof componentRadius;
export type SemanticRadiusTokens = typeof semanticRadius;
