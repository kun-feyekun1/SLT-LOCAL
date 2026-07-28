// src/components/ScreenWrapper/Screen.types.ts

import type { PropsWithChildren } from "react";
import type { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

export interface ScreenProps extends PropsWithChildren {
  /**
   * Renders the screen content inside a ScrollView.
   *
   * Recommended for forms and screens whose content may exceed the
   * available screen height.
   *
   * @default true
   */
  scrollable?: boolean;

  /**
   * Applies the default horizontal and vertical screen padding.
   *
   * @default true
   */
  padded?: boolean;

  /**
   * Enables keyboard avoidance through KeyboardAvoidingView.
   *
   * Recommended for screens containing TextInput components.
   *
   * @default true
   */
  keyboard?: boolean;

  /**
   * Optional vertical offset applied by KeyboardAvoidingView.
   *
   * Useful when the screen has a visible native header or another fixed
   * element above the content.
   *
   * @default 0
   */
  keyboardVerticalOffset?: number;

  /**
   * Safe-area edges applied by SafeAreaView.
   *
   * @default ["top", "bottom"]
   */
  safeAreaEdges?: Edge[];

  /**
   * Overrides the default theme background colour.
   */
  backgroundColor?: string;

  /**
   * Style applied to the outer SafeAreaView.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style applied to the inner content View.
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * Props forwarded to the internal ScrollView.
   *
   * These can override default keyboard behaviour, content padding,
   * scroll indicators and other ScrollView settings.
   */
  scrollViewProps?: ScrollViewProps;

  /**
   * Whether pull-to-refresh is currently active.
   */
  refreshing?: boolean;

  /**
   * Enables pull-to-refresh when provided.
   */
  onRefresh?: () => void;

  /**
   * Retained for compatibility with existing screens.
   *
   * ScreenWrapper does not currently perform its own animations.
   */
  animated?: boolean;
}
