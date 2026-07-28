import type { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { CURRENT_ONBOARDING_VERSION } from "../constants/onboarding.constants";
export const selectOnboarding = (state: RootState) => state.onboarding;
export const selectHasCompletedOnboarding = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.hasCompletedOnboarding,
);
export const selectCompletedOnboardingVersion = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.completedVersion,
);
export const selectOnboardingCompletedAt = createSelector(
  [selectOnboarding],
  (onboarding) => onboarding.completedAt,
);
/** * Returns true when: * - onboarding has never been completed, or * - the application requires a newer onboarding version. */ export const selectRequiresOnboarding =
  createSelector(
    [selectHasCompletedOnboarding, selectCompletedOnboardingVersion],
    (hasCompleted, completedVersion) =>
      !hasCompleted || completedVersion < CURRENT_ONBOARDING_VERSION,
  );
