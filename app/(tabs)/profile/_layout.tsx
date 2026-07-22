// src/app/(tabs)/profile-details/_layout.tsx

import { Stack } from "expo-router";

import { useTheme } from "@/features/theme/hooks/useTheme";

export default function ProfileDetailsLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      initialRouteName="profile"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.primary,
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

      <Stack.Screen
        name="profile-settings"
        options={{
          title: "Profile Settings",
        }}
      />
    </Stack>
  );
}