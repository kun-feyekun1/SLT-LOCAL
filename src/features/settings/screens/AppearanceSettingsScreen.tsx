import { View } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import { spacing } from "@/design-system/tokens";
import type { ThemeMode } from "@/design-system/theme";
import { useTheme } from "@/features/theme/hooks/useTheme";

import { SettingsHeader } from "../components/SettingsHeader";
import { SettingsRow } from "../components/SettingsRow";
import { SettingsSection } from "../components/SettingsSection";

const themeOptions: Array<{
  title: string;
  description: string;
  value: ThemeMode;
}> = [
  {
    title: "System default",
    description:
      "Automatically follow your device appearance",
    value: "system",
  },
  {
    title: "Light",
    description:
      "Always use the light application appearance",
    value: "light",
  },
  {
    title: "Dark",
    description:
      "Always use the dark application appearance",
    value: "dark",
  },
];

export function AppearanceSettingsScreen() {
  const {
    theme,
    mode,
    setThemeMode,
  } = useTheme();

  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing[16],
          paddingTop: spacing[16],
          gap: spacing[24],
          backgroundColor: theme.background.primary,
        }}
      >
        <SettingsHeader
          title="Appearance"
          description="Choose how Smart Link Transit looks on your device."
        />

        <SettingsSection title="Theme">
          {themeOptions.map(option => {
            const selected =
              mode === option.value;

            return (
              <SettingsRow
                key={option.value}
                title={option.title}
                description={option.description}
                icon={
                  option.value === "system"
                    ? "phone-portrait-outline"
                    : option.value === "light"
                      ? "sunny-outline"
                      : "moon-outline"
                }
                showChevron={false}
                rightElement={
                  selected ? (
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 12,
                        backgroundColor:
                          theme.brand.primary,
                      }}
                    >
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor:
                            theme.utility.white,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor:
                          theme.border.strong,
                      }}
                    />
                  )
                }
                onPress={() =>
                  setThemeMode(option.value)
                }
              />
            );
          })}
        </SettingsSection>
      </View>
    </ScreenWrapper>
  );
}