// app/(public)/welcome.tsx

import { Redirect } from "expo-router";

import { selectAuthStatus } from "@/features/auth/state/authSelectors";
import { WelcomeScreen } from "@/features/onboarding/screens";
import { selectRequiresOnboarding } from "@/features/onboarding/state/onboardingSelectors";
import { ReduxHydrationLoading } from "@/providers/components/ReduxHydrationLoading";
import { useAppSelector } from "@/store/hooks";

export default function WelcomeRoute() {
  const authStatus = useAppSelector(selectAuthStatus);

  const requiresOnboarding = useAppSelector(selectRequiresOnboarding);

  if (authStatus === "restoring") {
    return <ReduxHydrationLoading />;
  }

  if (authStatus === "authenticated") {
    return <Redirect href="/" />;
  }

  if (!requiresOnboarding) {
    return <Redirect href="/(auth)/login" />;
  }

  return <WelcomeScreen />;
}
