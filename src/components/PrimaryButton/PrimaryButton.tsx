import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
}

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isGhost = variant === "ghost";

  const textColor = isPrimary ? theme.button.primary.text : theme.text.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      onPress={onPress}
      android_ripple={
        isDisabled
          ? undefined
          : {
              color: theme.border.default,
            }
      }
      style={[
        styles.button,

        isPrimary && {
          backgroundColor: theme.button.primary.background,
          borderColor: theme.button.primary.background,
          borderWidth: 1,
        },

        isSecondary && {
          backgroundColor: "transparent",
          borderColor: theme.border.default,
          borderWidth: 1,
        },

        isGhost && {
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
        },

        isDisabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator size="small" color={textColor} /> : null}

        <AppText
          variant={isPrimary ? "buttonLarge" : "buttonSmall"}
          style={{
            color: textColor,
            textAlign: "center",
          }}
        >
          {loading ? "Please wait..." : label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 52,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    paddingHorizontal: spacing[20],
    overflow: "hidden",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[8],
  },

  disabled: {
    opacity: 0.5,
  },
});
