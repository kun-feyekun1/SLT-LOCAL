// src/design-system/components/AppDivider/AppDivider.tsx

import { View } from "react-native";

import { spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

export interface DividerProps {
  spacingVertical?: keyof typeof spacing;
}

export function Divider({ spacingVertical = 8 }: DividerProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        height: 1,
        marginVertical: spacing[spacingVertical],
        backgroundColor: theme.divider,
      }}
    />
  );
}
