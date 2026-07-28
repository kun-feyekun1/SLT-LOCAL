import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CURRENT_ONBOARDING_VERSION } from "../constants/onboarding.constants";
import type {
  CompleteOnboardingPayload,
  OnboardingState,
} from "../types/onboarding.types";
const initialState: OnboardingState = {
  hasCompletedOnboarding: false,
  completedVersion: 0,
  completedAt: null,
};
const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    completeOnboarding(
      state,
      action: PayloadAction<CompleteOnboardingPayload | undefined>,
    ) {
      state.hasCompletedOnboarding = true;
      state.completedVersion =
        action.payload?.version ?? CURRENT_ONBOARDING_VERSION;
      state.completedAt = new Date().toISOString();
    },
    /** * Useful for development, testing, or an explicit * "Show onboarding again" setting. */ resetOnboarding(
      state,
    ) {
      state.hasCompletedOnboarding = false;
      state.completedVersion = 0;
      state.completedAt = null;
    },
  },
});
export const { completeOnboarding, resetOnboarding } = onboardingSlice.actions;
export const onboardingReducer = onboardingSlice.reducer;
export default onboardingSlice.reducer;
