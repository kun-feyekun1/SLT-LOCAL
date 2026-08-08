import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { semanticSpacing } from "@/design-system/tokens";

export const LoadingSpinner = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={theme.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: semanticSpacing.stack.large,
    alignItems: "center",
    justifyContent: "center",
  },
});
