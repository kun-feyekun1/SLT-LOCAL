import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

interface SettingsHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export function SettingsHeader({
  title,
  description,
  showBackButton = true,
}: SettingsHeaderProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        gap: spacing[12],
      }}
    >
      {showBackButton ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={() => router.back()}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.full,
            backgroundColor: pressed
              ? theme.surface.elevated
              : theme.surface.surface,
          })}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={theme.icon.primary}
          />
        </Pressable>
      ) : null}

      <View
        style={{
          gap: spacing[4],
        }}
      >
        <AppText
          style={{
            color: theme.text.primary,
            fontSize: 28,
            fontWeight: "700",
          }}
        >
          {title}
        </AppText>

        {description ? (
          <AppText
            style={{
              color: theme.text.secondary,
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            {description}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}