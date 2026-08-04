export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  completedVersion: number;
  completedAt: string | null;
}
export interface CompleteOnboardingPayload {
  version?: number;
}

import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

export type OnboardingIconName = ComponentProps<
  typeof Ionicons
>["name"];

export type OnboardingSlide = {
  id: string;
  title: string;
  description: string;
  icon: OnboardingIconName;
};