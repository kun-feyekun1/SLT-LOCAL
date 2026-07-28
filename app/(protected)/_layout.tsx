import { Stack } from "expo-router";

import { selectAuthRole } from "@/features/auth/state/authSelectors";
import { useAppSelector } from "@/store/hooks";

export default function ProtectedLayout() {
  const role = useAppSelector(selectAuthRole);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={role === "passenger"}>
        <Stack.Screen name="passenger" />
      </Stack.Protected>

      <Stack.Protected guard={role === "driver"}>
        <Stack.Screen name="driver" />
      </Stack.Protected>

      <Stack.Protected guard={role === "operator"}>
        <Stack.Screen name="operator" />
      </Stack.Protected>
    </Stack>
  );
}
