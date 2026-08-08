/**
 * Design System - Component Barrel
 *
 * Convention:
 * - Every component folder owns an `index.ts` that exports the component
 *   and its props type.
 * - This barrel re-exports FOLDERS only, never files directly, so the
 *   folder barrel stays the single public surface for each component.
 */

export * from "./Animated";
export * from "./Avatar";
export * from "./Badge";
export * from "./BottomNavigation";
export * from "./BottomSheet";
export * from "./Button";
export * from "./Card/Card";
export * from "./Checkbox";
export * from "./Chip";
export * from "./Dialog";
export * from "./Divider/Divider";
export * from "./FAB";
export * from "./IconButton/IconButton";
export * from "./Input";
export * from "./OTPInput";
export * from "./Progress";
export * from "./Radio";
export * from "./SearchField";
export * from "./SemanticBanner";
export * from "./Snackbar";
export * from "./Toggle";
export * from "./Typography";
