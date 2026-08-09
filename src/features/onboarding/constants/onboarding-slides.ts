// src/features/onboarding/constants/onboarding-slides.ts

import type { OnboardingSlide } from "../types/onboarding.types";

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "discover",
    title: "Discover nearby transport",
    description:
      "Find bus stops, terminals and available routes around your current location.",
    icon: "location-outline",
  },
  {
    id: "track",
    title: "Track your journey",
    description:
      "View vehicle positions, route progress and estimated arrival times.",
    icon: "bus-outline",
  },
  {
    id: "alerts",
    title: "Stay informed",
    description:
      "Receive service alerts, route changes and important trip notifications.",
    icon: "notifications-outline",
  },
];
