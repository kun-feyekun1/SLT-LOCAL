import type { PropsWithChildren } from "react";
import type { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import type { Edge } from "react-native-safe-area-context";

export interface ScreenProps extends PropsWithChildren {
  scrollable?: boolean;
  padded?: boolean;
  animated?: boolean;
  keyboard?: boolean;
  safeAreaEdges?: Edge[];
  backgroundColor?: string;
  // Outer container style.
  style?: StyleProp<ViewStyle>;
  // Inner content style.
  contentStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: ScrollViewProps;
  refreshing?: boolean;
  onRefresh?: () => void;
}
