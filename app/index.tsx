// import { Redirect } from "expo-router";

// import { FullScreenLoading } from "@/components/FullScreenLoading";
// import {
//   selectAuthRole,
//   selectAuthStatus,
// } from "@/features/auth/state/authSelectors";
// import { useAppSelector } from "@/store/hooks";

// // Replace this import with the selector from your onboarding/app-preferences state.
// import { selectHasCompletedOnboarding } from "@/features/onboarding/state/onboardingSelectors";

// /**
//  * Root application entry route.
//  *
//  * Responsibilities:
//  * - Wait for application/auth state restoration.
//  * - Route first-time users to onboarding.
//  * - Route unauthenticated returning users to login.
//  * - Route authenticated users according to their role.
//  *
//  * This file should NOT contain feature UI or business logic.
//  */
// export default function IndexRoute() {
//   const authStatus = useAppSelector(selectAuthStatus);
//   const role = useAppSelector(selectAuthRole);
//   const hasCompletedOnboarding = useAppSelector(selectHasCompletedOnboarding);

//   /**
//    * Do not redirect until persisted authentication/application
//    * state has finished restoring.
//    *
//    * Without this guard, the app can briefly redirect to login or
//    * onboarding before Redux Persist/session restoration finishes.
//    */
//   if (authStatus === "bootstrapping") {
//     return <FullScreenLoading />;
//   }

//   /**
//    * First application launch.
//    *
//    * This check intentionally happens before authentication.
//    */
//   if (!hasCompletedOnboarding) {
//     return <Redirect href="/(public)/welcome" />;
//   }

//   /**
//    * Returning user who is not authenticated.
//    */
//   if (authStatus !== "authenticated") {
//     return <Redirect href="/(auth)/login" />;
//   }

//   /**
//    * An authenticated session should normally always have a role.
//    *
//    * If it does not, sending the user back to login is safer than
//    * guessing which protected application they should enter.
//    */
//   if (!role) {
//     return <Redirect href="/(auth)/login" />;
//   }

//   /**
//    * Role-based application routing.
//    */
//   switch (role) {
//     case "driver":
//       return <Redirect href="/(protected)/driver/index" />;

//     case "operator":
//       return <Redirect href="/(protected)/operator/index" />;

//     case "passenger":
//       return <Redirect href="/(tabs)/home" />;

//     default:
//       return <Redirect href="/(auth)/login" />;
//   }
// }

// // src/app/index.tsx

// // import { Redirect } from 'expo-router';

// // import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
// // import { useAppBootstrap } from '@/features/bootstrap/hooks/useAppBootstrap';

// // export default function IndexRoute() {
// //   const { isReady, hasSeenWelcome } = useAppBootstrap();
// //   const { session, user } = useAuthActions();

// //   if (!isReady) {
// //     return null;
// //   }

// //   if (!hasSeenWelcome) {
// //     return <Redirect href="/welcome" />;
// //   }

// //   if (!session) {
// //     return <Redirect href="/sign-in" />;
// //   }

// //   if (!user?.onboardingCompleted) {
// //     return <Redirect href="/select-role" />;
// //   }

// //   return <Redirect href="/home" />;
// // }

// import {
//   selectAuthRole,
//   selectAuthStatus,
// } from "@/features/auth/state/authSelectors";
// import { selectRequiresOnboarding } from "@/features/onboarding/state/onboardingSelectors";
// import { ReduxHydrationLoading } from "@/providers/components/ReduxHydrationLoading";
// import { useAppSelector } from "@/store/hooks";
// import { Redirect } from "expo-router";
// export default function RootIndexRoute() {
//   const authStatus = useAppSelector(selectAuthStatus);
//   const authRole = useAppSelector(selectAuthRole);
//   const requiresOnboarding = useAppSelector(selectRequiresOnboarding);
//   if (authStatus === "restoring") {
//     return <ReduxHydrationLoading />;
//   }
//   if (requiresOnboarding) {
//     return <Redirect href="/(public)/welcome" />;
//   }
//   if (authStatus === "unauthenticated") {
//     return <Redirect href="/(auth)/login" />;
//   }
//   switch (authRole) {
//     case "driver":
//       return <Redirect href="/(protected)/driver" />;
//     case "operator":
//       return <Redirect href="/(protected)/operator" />;
//     case "passenger":
//     default:
//       return <Redirect href="/(auth)/login" />;
//   }
// }

// app/index.tsx

import { Redirect } from "expo-router";

import {
  selectAuthRole,
  selectAuthStatus,
} from "@/features/auth/state/authSelectors";
import { selectRequiresOnboarding } from "@/features/onboarding/state/onboardingSelectors";
import { ReduxHydrationLoading } from "@/providers/components/ReduxHydrationLoading";
import { useAppSelector } from "@/store/hooks";

export default function RootIndexRoute() {
  const authStatus = useAppSelector(selectAuthStatus);
  const authRole = useAppSelector(selectAuthRole);
  const requiresOnboarding = useAppSelector(selectRequiresOnboarding);

  /**
   * SessionProvider has not finished checking SecureStore/API.
   */
  if (authStatus === "restoring") {
    return <ReduxHydrationLoading />;
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
