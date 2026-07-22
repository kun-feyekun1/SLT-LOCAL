// src/features/theme/components/ThemeSelector.tsx

import { Pressable, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import type { ThemeMode } from "@/design-system/theme";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

const options: Array<{
  label: string;
  value: ThemeMode;
}> = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

export function ThemeSelector() {
  const { theme, mode, setThemeMode } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        padding: spacing[4],
        borderRadius: radius.md,
        backgroundColor: theme.surface.surface,
      }}
    >
      {options.map((option) => {
        const selected = mode === option.value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{
              selected,
            }}
            onPress={() => {
              setThemeMode(option.value);
            }}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.sm,
              backgroundColor: selected
                ? theme.primary
                : pressed
                  ? theme.overlay.medium
                  : theme.transparent,
            })}
          >
            <AppText
              variant="labelLarge"
              color={selected ? "inverse" : "secondary"}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
