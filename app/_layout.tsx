import "@/styles/global.css";
import { Stack } from "expo-router";

import { RootProviders } from "@/providers/RootProviders";

export default function RootLayout() {
  return (
    <RootProviders>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            animation: "fade",
            gestureEnabled: false,
          }}
        />

        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(protected)" />
        <Stack.Screen name="(dev)" />

        <Stack.Screen
          name="other/notifications"
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="other/saved"
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="profile/details"
          options={{
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="profile/index"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </RootProviders>
  );
}
