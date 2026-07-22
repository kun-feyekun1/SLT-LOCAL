import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { Play } from "lucide-react-native";

import { componentRadius } from "@/design-system/tokens/radius";
import { componentElevation } from "@/design-system/tokens/shadows";
import { spacing } from "@/design-system/tokens/spacing";
import { typography } from "@/design-system/tokens/typography";

import { useTheme } from "@/features/theme/hooks/useTheme";

interface AnimationCardProps {
  title: string;
  description: string;

  animatedStyle: any;

  onPlay: () => void;

  duration: number;

  easing: string;

  spring?: string;

  distance?: number;

  scale?: number;
}

export default function AnimationCard({
  title,
  description,
  animatedStyle,
  onPlay,
  duration,
  easing,
  spring,
  distance,
  scale,
}: AnimationCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface.card,
          borderColor: theme.border.default,
        },
        componentElevation.card,
      ]}
    >
      {/* Header */}

      <View style={styles.header}>
        <Text
          style={[
            typography.h3,
            {
              color: theme.text.primary,
            },
          ]}
        >
          {title}
        </Text>

        <Pressable
          onPress={onPlay}
          style={({ pressed }) => [
            styles.button,
            {
              opacity: pressed ? 0.85 : 1,
              backgroundColor: theme.button.primary.background,
            },
          ]}
        >
          <Play size={18} color={theme.button.primary.text} />

          <Text
            style={[
              typography.buttonMedium,
              {
                color: theme.button.primary.text,
              },
            ]}
          >
            Play
          </Text>
        </Pressable>
      </View>

      {/* Description */}

      <Text
        style={[
          typography.bodyMedium,
          styles.description,
          {
            color: theme.text.secondary,
          },
        ]}
      >
        {description}
      </Text>

      {/* Animated Preview */}

      <View
        style={[
          styles.preview,
          {
            backgroundColor: theme.surface.surface,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.demoBox,
            animatedStyle,
            {
              backgroundColor: theme.brand.primary,
            },
          ]}
        >
          <Text
            style={[
              typography.buttonMedium,
              {
                color: "#FFFFFF",
              },
            ]}
          >
            Demo
          </Text>
        </Animated.View>
      </View>

      {/* Token Information */}

      <View style={styles.infoContainer}>
        <InfoRow label="Duration" value={`${duration} ms`} />

        <InfoRow label="Easing" value={easing} />

        {spring && <InfoRow label="Spring" value={spring} />}

        {distance !== undefined && (
          <InfoRow label="Distance" value={`${distance}px`} />
        )}

        {scale !== undefined && (
          <InfoRow label="Scale" value={scale.toString()} />
        )}
      </View>
    </View>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.infoRow}>
      <Text
        style={[
          typography.labelMedium,
          {
            color: theme.text.secondary,
          },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          typography.labelLarge,
          {
            color: theme.text.primary,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[24],

    borderRadius: componentRadius.card,

    borderWidth: 1,

    overflow: "hidden",
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    padding: spacing[16],
  },

  description: {
    paddingHorizontal: spacing[16],

    marginBottom: spacing[16],
  },

  preview: {
    height: 180,

    justifyContent: "center",

    alignItems: "center",
  },

  demoBox: {
    width: 120,

    height: 120,

    borderRadius: componentRadius.card,

    justifyContent: "center",

    alignItems: "center",
  },

  button: {
    flexDirection: "row",

    alignItems: "center",

    gap: spacing[8],

    paddingHorizontal: spacing[16],

    paddingVertical: spacing[8],

    borderRadius: componentRadius.button,
  },

  infoContainer: {
    padding: spacing[16],

    gap: spacing[12],
  },

  infoRow: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
});
