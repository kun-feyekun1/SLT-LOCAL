import "@/styles/global.css";
import { Stack } from "expo-router";

import { AuthGate } from "@/navigation/AuthGate";
import { RootProviders } from "@/providers/RootProviders";

export default function RootLayout() {
  return (
    <RootProviders>
      <AuthGate>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="saved" />
          <Stack.Screen name="settings" />
        </Stack>
      </AuthGate>
    </RootProviders>
  );
}
