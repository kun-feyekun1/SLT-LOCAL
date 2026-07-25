import { AuthFlowProvider } from "@/features/auth/providers/AuthFlowProvider";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <AuthFlowProvider>
      <Stack screenOptions={{ headerShown: false }}>
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
          name="register"
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="otp-verification"
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack>
    </AuthFlowProvider>

    //   screenOptions={{
    //     headerShown: false,
    //     animation: "slide_from_right",
    //     gestureEnabled: true,
    //   }}
    // >
    // <Stack.Screen
    //   name="index"
    //   options={{
    //     gestureEnabled: false,
    //     animation: "fade",
    //   }}
    // />

    // <Stack.Screen
    //   name="login"
    //   options={{
    //     animation: "slide_from_right",
    //   }}
    // />

    // <Stack.Screen
    //   name="register"
    //   options={{
    //     animation: "slide_from_right",
    //   }}
    // />

    // <Stack.Screen
    //   name="otp-verification"
    //   options={{
    //     gestureEnabled: false,
    //   }}
    // />
  );
}
