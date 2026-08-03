import { Redirect } from "expo-router";

import {
  selectAuthRole,
  selectAuthStatus,
} from "@/features/auth/state/authSelectors";
import { selectRequiresOnboarding } from "@/features/onboarding/state/onboardingSelectors";
import { useAppSelector } from "@/store/hooks";

export default function RootIndexRoute() {
  const authStatus = useAppSelector(selectAuthStatus);
  const authRole = useAppSelector(selectAuthRole);
  const requiresOnboarding = useAppSelector(selectRequiresOnboarding);

  /**
   * SessionProvider has not finished checking SecureStore/API.
   */
  if (authStatus === "restoring") {
    return null;
  }

  /**
   * First-time application experience.
   *
   * This runs before login because onboarding belongs to the
   * application lifecycle, not authentication.
   */
  if (requiresOnboarding) {
    return <Redirect href="/(public)/welcome" />;
  }

  /**
   * Returning user with no valid authenticated session.
   */
  if (authStatus === "unauthenticated") {
    return <Redirect href="/(auth)/login" />;
  }

  /**
   * Authenticated role-based routing.
   */
  switch (authRole) {
    case "driver":
      return <Redirect href="/(protected)/driver" />;

    case "operator":
      return <Redirect href="/(protected)/operator" />;

    // case "admin":
    //   return <Redirect href="/(protected)/admin" />;

    case "passenger":
      return <Redirect href="/(tabs)/home" />;

    /**
     * An authenticated session without a valid role is an
     * inconsistent state. Do not silently treat it as passenger.
     */
    default:
      return <Redirect href="/(auth)/login" />;
  }
}
