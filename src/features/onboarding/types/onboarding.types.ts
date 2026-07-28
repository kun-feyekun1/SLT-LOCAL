export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  completedVersion: number;
  completedAt: string | null;
}
export interface CompleteOnboardingPayload {
  version?: number;
}
