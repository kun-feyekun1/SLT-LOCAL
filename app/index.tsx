import { Redirect } from "expo-router";

import { FullScreenLoading } from "@/components/FullScreenLoading";
import {
  selectAuthRole,
  selectAuthStatus,
} from "@/features/auth/state/authSelectors";
import { useAppSelector } from "@/store/hooks";

// Replace this import with the selector from your onboarding/app-preferences state.
import { selectHasCompletedOnboarding } from "@/features/onboarding/state/onboardingSelectors";

/**
 * Root application entry route.
 *
 * Responsibilities:
 * - Wait for application/auth state restoration.
 * - Route first-time users to onboarding.
 * - Route unauthenticated returning users to login.
 * - Route authenticated users according to their role.
 *
 * This file should NOT contain feature UI or business logic.
 */
export default function IndexRoute() {
  const authStatus = useAppSelector(selectAuthStatus);
  const role = useAppSelector(selectAuthRole);
  const hasCompletedOnboarding = useAppSelector(selectHasCompletedOnboarding);

  /**
   * Do not redirect until persisted authentication/application
   * state has finished restoring.
   *
   * Without this guard, the app can briefly redirect to login or
   * onboarding before Redux Persist/session restoration finishes.
   */
  if (authStatus === "bootstrapping") {
    return <FullScreenLoading />;
  }

  /**
   * First application launch.
   *
   * This check intentionally happens before authentication.
   */
  if (!hasCompletedOnboarding) {
    return <Redirect href="/(public)/welcome" />;
  }

  /**
   * Returning user who is not authenticated.
   */
  if (authStatus !== "authenticated") {
    return <Redirect href="/(auth)/login" />;
  }

  /**
   * An authenticated session should normally always have a role.
   *
   * If it does not, sending the user back to login is safer than
   * guessing which protected application they should enter.
   */
  if (!role) {
    return <Redirect href="/(auth)/login" />;
  }

  /**
   * Role-based application routing.
   */
  switch (role) {
    case "driver":
      return <Redirect href="/(protected)/driver/index" />;
      
    case "operator":
      return <Redirect href="/(protected)/operator/index" />;

    case "passenger":
      return <Redirect href="/(tabs)/home" />;

    default:
      return <Redirect href="/(auth)/login" />;
  }
}

// src/app/index.tsx

// import { Redirect } from 'expo-router';

// import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
// import { useAppBootstrap } from '@/features/bootstrap/hooks/useAppBootstrap';

// export default function IndexRoute() {
//   const { isReady, hasSeenWelcome } = useAppBootstrap();
//   const { session, user } = useAuthActions();

//   if (!isReady) {
//     return null;
//   }

//   if (!hasSeenWelcome) {
//     return <Redirect href="/welcome" />;
//   }

//   if (!session) {
//     return <Redirect href="/sign-in" />;
//   }

//   if (!user?.onboardingCompleted) {
//     return <Redirect href="/select-role" />;
//   }

//   return <Redirect href="/home" />;
// }
