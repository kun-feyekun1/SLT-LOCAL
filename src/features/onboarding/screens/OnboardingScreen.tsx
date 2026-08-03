// src/features/onboarding/screens/OnboardingScreen.tsx

import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import ScreenWrapper from "@/components/ScreenWrapper";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

import { OnboardingPagination } from "../components/OnboardingPagination";
import { OnboardingSlide } from "../components/OnboardingSlide";
import { onboardingSlides } from "../constants/onboarding-slides";
import { completeOnboarding } from "../services/onboarding-storage";

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const currentSlide = onboardingSlides[currentIndex];

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === onboardingSlides.length - 1;

  function handleBack() {
    if (isFirstSlide) {
      router.back();
      return;
    }

    setCurrentIndex((current) => current - 1);
  }

  async function handleFinish() {
    if (isCompleting) {
      return;
    }

    try {
      setIsCompleting(true);

      await completeOnboarding();

      router.replace("/(auth)/signup");
    } catch {
      setIsCompleting(false);
    }
  }

  function handleNext() {
    if (isLastSlide) {
      void handleFinish();
      return;
    }

    setCurrentIndex((current) => current + 1);
  }

  async function handleSkip() {
    await handleFinish();
  }

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
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            onPress={handleBack}
            hitSlop={12}
          >
            <AppText
              variant="buttonMedium"
              style={{
                color: theme.text.primary,
              }}
            >
              Back
            </AppText>
          </Pressable>

          {!isLastSlide && (
            <Pressable
              accessibilityRole="button"
              onPress={() => void handleSkip()}
              hitSlop={12}
            >
              <AppText
                variant="buttonMedium"
                style={{
                  color: theme.text.secondary,
                }}
              >
                Skip
              </AppText>
            </Pressable>
          )}
        </View>

        <OnboardingSlide slide={currentSlide} />

        <View style={styles.footer}>
          <OnboardingPagination
            total={onboardingSlides.length}
            activeIndex={currentIndex}
          />

          <Pressable
            accessibilityRole="button"
            disabled={isCompleting}
            onPress={handleNext}
            style={[
              styles.button,
              {
                backgroundColor: theme.button.primary.background,
                opacity: isCompleting ? 0.6 : 1,
              },
            ]}
          >
            <AppText
              variant="buttonLarge"
              style={{
                color: theme.button.primary.text,
              }}
            >
              {isLastSlide
                ? isCompleting
                  ? "Preparing..."
                  : "Create account"
                : "Next"}
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
    paddingHorizontal: spacing[10],
    paddingTop: spacing[16],
    paddingBottom: spacing[24],
  },
  header: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    gap: spacing[24],
  },
  button: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    paddingHorizontal: spacing[20],
  },
});
