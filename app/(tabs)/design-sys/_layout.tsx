// src/app/(tabs)/profile-details/_layout.tsx

import { Stack } from "expo-router";

import { useTheme } from "@/features/theme/hooks/useTheme";

export default function systemDesignLayoutDemo() {
  const { theme } = useTheme();

  return (
    <Stack
      initialRouteName="design-system-demo"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.primary,
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="design-system-demo"
        options={{
          title: "design",
        }}
      />

      <Stack.Screen
        name="design-system"
        options={{
          title: "design-system",
        }}
      />
      <Stack.Screen
        name="design-systems"
        options={{
          title: "design-systems",
        }}
      />
    </Stack>
  );
}
