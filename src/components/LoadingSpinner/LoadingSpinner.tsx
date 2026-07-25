import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { spacing } from "@/theme";

export const LoadingSpinner = () => {
  const theme = useTheme();
  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: spacing.lg, alignItems: "center", justifyContent: "center" },
});
