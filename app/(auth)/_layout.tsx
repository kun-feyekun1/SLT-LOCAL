// app/(auth)/_layout.tsx

import { Redirect, Stack } from "expo-router";

import { AuthFlowProvider } from "@/features/auth/providers/AuthFlowProvider";
import { selectAuthStatus } from "@/features/auth/state/authSelectors";
import { ReduxHydrationLoading } from "@/providers/components/ReduxHydrationLoading";
import { useAppSelector } from "@/store/hooks";

export default function AuthLayout() {
  const authStatus = useAppSelector(selectAuthStatus);

  if (authStatus === "restoring") {
    return <ReduxHydrationLoading />;
  }

  if (authStatus === "authenticated") {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <AuthFlowProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            gestureEnabled: false,
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="otp"
          options={{
            gestureEnabled: false,
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen name="phone-login" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="create-profile" />
        <Stack.Screen name="identity-verification" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="account-created" />
      </Stack>
    </AuthFlowProvider>
  );
}
