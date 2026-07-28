
// src/providers/components/ReduxHydrationLoading.tsx

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { spacing } from "@/design-system/tokens";

export function ReduxHydrationLoading() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Restoring application data"
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? "#0F172A"
            : "#F8FAFC",
        },
      ]}
    >
      <ActivityIndicator
        size="large"
        color="#1A7A3C"
      />

      <Text
        style={[
          styles.message,
          {
            color: isDark
              ? "#B0B0B0"
              : "#6B6B6B",
          },
        ]}
      >
        Restoring application data...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[16],
    paddingHorizontal: spacing[24],
  },

  message: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "center",
  },
});

