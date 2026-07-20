// src/app/(public)/_layout.tsx

import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: '#F8FAFC',
        },
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="about" />
      <Stack.Screen name="help" />
      <Stack.Screen name="privacy-policy" />
      <Stack.Screen name="terms-of-service" />
    </Stack>
  );
}