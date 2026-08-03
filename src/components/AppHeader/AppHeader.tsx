import { router } from "expo-router";
import { Bell, Settings } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

import { AppText } from "../AppText/AppText";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showActions?: boolean;
};

export const AppHeader = ({
  title,
  subtitle,
  showActions = true,
}: AppHeaderProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <AppText
            variant="displaySmall"
            style={[
              styles.title,
              {
                color: theme.text.primary,
              },
            ]}
          >
            {title}
          </AppText>

          {subtitle ? (
            <AppText
              variant="bodyLarge"
              style={[
                styles.subtitle,
                {
                  color: theme.text.secondary,
                },
              ]}
            >
              {subtitle}
            </AppText>
          ) : null}
        </View>

        {showActions ? (
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open notifications"
              onPress={() => router.push("other/notifications")}
              style={[
                styles.iconButton,
                {
                  backgroundColor: theme.surface.surface,
                  borderColor: theme.border.default,
                },
              ]}
            >
              <Bell color={theme.icon.active} size={20} strokeWidth={2} />
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open settings"
              onPress={() => router.push("/settings")}
              style={[
                styles.iconButton,
                {
                  backgroundColor: theme.surface.surface,
                  borderColor: theme.border.default,
                },
              ]}
            >
              <Settings color={theme.icon.active} size={20} strokeWidth={2} />
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    marginBottom: spacing[24],
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing[16],
  },

  textContainer: {
    flex: 1,
    gap: spacing[8],
  },

  title: {
    lineHeight: 38,
  },

  subtitle: {
    lineHeight: 24,
    maxWidth: 420,
  },

  actions: {
    flexDirection: "row",
    gap: spacing[8],
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
