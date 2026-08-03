// src/features/onboarding/components/OnboardingSlide.tsx

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

import type { OnboardingSlide as OnboardingSlideType } from "../types/onboarding.types";

type OnboardingSlideProps = {
  slide: OnboardingSlideType;
};

export function OnboardingSlide({ slide }: OnboardingSlideProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.illustration,
          {
            backgroundColor: theme.surface.surface,
          },
        ]}
      >
        <Ionicons name={slide.icon} size={72} color={theme.icon.active} />
      </View>

      <View style={styles.textContainer}>
        <AppText variant="displayLarge" style={styles.title}>
          {slide.title}
        </AppText>

        <AppText
          variant="bodyLarge"
          style={[
            styles.description,
            {
              color: theme.text.secondary,
            },
          ]}
        >
          {slide.description}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[24],
    gap: spacing[40],
  },
  illustration: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  textContainer: {
    alignItems: "center",
    gap: spacing[12],
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    lineHeight: 26,
  },
});
