// src/features/onboarding/screens/WelcomeScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

export default function WelcomeScreen() {
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background.primary,
          },
        ]}
      >
        <View style={styles.content}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.surface.surface,
              },
            ]}
          >
            <Ionicons name="bus" size={52} color={theme.icon.active} />
          </View>

          <View style={styles.textContainer}>
            <AppText variant="displaySmall">Smart Link Transit</AppText>

            <AppText
              variant="bodyLarge"
              style={{
                color: theme.text.secondary,
                textAlign: "center",
              }}
            >
              Discover routes, track public transport and travel across Addis
              Ababa with confidence.
            </AppText>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(public)/onboarding")}
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.button.primary.background,
              },
            ]}
          >
            <AppText
              variant="buttonLarge"
              style={{
                color: theme.button.primary.text,
              }}
            >
              Get started
            </AppText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(auth)/login")}
            style={[
              styles.secondaryButton,
              {
                borderColor: theme.border.default,
              },
            ]}
          >
            <AppText
              variant="buttonSmall"
              style={{
                color: theme.text.primary,
              }}
            >
              I already have an account
            </AppText>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[24],
    paddingVertical: spacing[32],
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing[0],
    gap: spacing[32],
  },
  iconContainer: {
    width: 112,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  textContainer: {
    alignItems: "center",
    gap: spacing[12],
  },
  actions: {
    gap: spacing[12],
  },
  primaryButton: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    paddingHorizontal: spacing[20],
  },
  secondaryButton: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing[20],
  },
});
