import { Stack } from "expo-router";

export default function DevLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,

        headerTitleAlign: "center",

        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="animation-lab"
        options={{
          title: "Animation Lab",
        }}
      />

      <Stack.Screen
        name="design-system"
        options={{
          title: "Design System",
        }}
      />
    </Stack>
  );
}
