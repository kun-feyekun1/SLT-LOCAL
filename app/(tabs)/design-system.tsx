import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Screen from "@/components/ScreenWrapper/ScreenWrapper";
import AnimationCard from "@/design-system/components/ashowcase/AnimationCard";

import { useTheme } from "@/design-system/hooks/theme/useTheme";

import { componentRadius } from "@/design-system/tokens/radius";
import { componentElevation } from "@/design-system/tokens/shadows";
import { spacing } from "@/design-system/tokens/spacing";
import { typography } from "@/design-system/tokens/typography";

export default function DesignSystemScreen() {
  const { theme } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(80),
      },
      {
        scale: withTiming(1.1),
      },
    ],
  }));

  return (
    <Screen>
      {/* Header */}

      <Text
        style={[
          typography.h1,
          {
            color: theme.text.primary,
          },
        ]}
      >
        Design System
      </Text>

      <Text
        style={[
          typography.bodyMedium,
          styles.subtitle,
          {
            color: theme.text.secondary,
          },
        ]}
      >
        Showcase of design tokens, reusable components, and animation primitives
        used throughout the application.
      </Text>

      {/* Theme Colors */}

      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.surface.card,
            borderColor: theme.border.default,
          },
          componentElevation.card,
        ]}
      >
        <Text
          style={[
            typography.h3,
            {
              color: theme.text.primary,
            },
          ]}
        >
          Brand Colors
        </Text>

        <View style={styles.colorRow}>
          <ColorCard label="Primary" color={theme.brand.primary} />
          <ColorCard label="Secondary" color={theme.brand.secondary} />
          <ColorCard label="Success" color={theme.success} />
        </View>
      </View>

      {/* Typography */}

      <View
        style={[
          styles.section,
          {
            backgroundColor: theme.surface.card,
            borderColor: theme.border.default,
          },
          componentElevation.card,
        ]}
      >
        <Text
          style={[
            typography.h2,
            {
              color: theme.text.primary,
            },
          ]}
        >
          Typography
        </Text>

        <Text
          style={[
            typography.h3,
            {
              color: theme.text.primary,
            },
          ]}
        >
          Heading 3
        </Text>

        <Text
          style={[
            typography.bodyLarge,
            {
              color: theme.text.primary,
            },
          ]}
        >
          Body Large
        </Text>

        <Text
          style={[
            typography.bodyMedium,
            {
              color: theme.text.secondary,
            },
          ]}
        >
          Body Medium
        </Text>

        <Text
          style={[
            typography.labelLarge,
            {
              color: theme.text.primary,
            },
          ]}
        >
          Label Large
        </Text>

        <Text
          style={[
            typography.labelMedium,
            {
              color: theme.text.secondary,
            },
          ]}
        >
          Label Medium
        </Text>
      </View>

      {/* Components */}

      <Text
        style={[
          typography.h2,
          styles.componentsTitle,
          {
            color: theme.text.primary,
          },
        ]}
      >
        Components
      </Text>

      <AnimationCard
        title="Slide Animation"
        description="Reusable animation preview card demonstrating design tokens and animation styles."
        animatedStyle={animatedStyle}
        duration={500}
        easing="Ease Out"
        spring="Default"
        distance={80}
        scale={1.1}
        onPlay={() => {}}
      />
    </Screen>
  );
}

interface ColorCardProps {
  label: string;
  color: string;
}

function ColorCard({ label, color }: ColorCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.colorCard,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Text
        style={[
          typography.labelMedium,
          {
            color: theme.button.primary.text,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing[8],
    marginBottom: spacing[24],
  },

  section: {
    marginBottom: spacing[24],
    padding: spacing[16],
    borderRadius: componentRadius.card,
    borderWidth: 1,
  },

  colorRow: {
    flexDirection: "row",
    gap: spacing[12],
    marginTop: spacing[16],
  },

  colorCard: {
    flex: 1,
    height: 72,
    borderRadius: componentRadius.card,
    justifyContent: "center",
    alignItems: "center",
  },

  componentsTitle: {
    marginBottom: spacing[16],
  },
});
