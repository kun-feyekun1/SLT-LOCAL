// src/features/onboarding/components/OnboardingPagination.tsx

import { StyleSheet, View } from "react-native";

import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

type OnboardingPaginationProps = {
  total: number;
  activeIndex: number;
};

export function OnboardingPagination({
  total,
  activeIndex,
}: OnboardingPaginationProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const active = index === activeIndex;

        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: active ? 24 : 8,
                backgroundColor: active
                  ? theme.icon.active
                  : theme.border.default,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[8],
  },
  dot: {
    height: 8,
    borderRadius: radius.full,
  },
});
