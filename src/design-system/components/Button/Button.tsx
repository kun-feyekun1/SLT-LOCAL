// src/design-system/components/AppButton/AppButton.tsx

import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { animation, radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

import { AppText } from "@/components/AppText/AppText";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";

type ButtonSize = "small" | "medium" | "large";

interface AppButtonProps extends Omit<PressableProps, "style"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AppButton({
  label,
  variant = "primary",
  size = "medium",
  loading = false,
  fullWidth = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onPressIn,
  onPressOut,
  style,
  ...props
}: AppButtonProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const isDisabled = disabled || loading;

  const sizeMap: Record<ButtonSize, ViewStyle> = {
    small: {
      minHeight: 36,
      paddingHorizontal: spacing[12],
      paddingVertical: spacing[8],
    },
    medium: {
      minHeight: 44,
      paddingHorizontal: spacing[20],
      paddingVertical: spacing[12],
    },
    large: {
      minHeight: 52,
      paddingHorizontal: spacing[24],
      paddingVertical: spacing[12],
    },
  };

  const textVariantMap = {
    small: "buttonSmall",
    medium: "buttonMedium",
    large: "buttonLarge",
  } as const;

  const getContainerColors = (pressed: boolean): ViewStyle => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: isDisabled
            ? theme.button.primary.disabled
            : pressed
              ? theme.button.primary.pressed
              : theme.button.primary.background,
        };

      case "secondary":
        return {
          backgroundColor: pressed ? theme.primaryLight : "transparent",
          borderWidth: 1,
          borderColor: isDisabled
            ? theme.button.secondary.disabled
            : theme.button.secondary.border,
        };

      case "tertiary":
        return {
          backgroundColor: isDisabled
            ? theme.button.tertiary.disabled
            : pressed
              ? theme.button.tertiary.pressed
              : theme.button.tertiary.background,
        };

      case "text":
        return {
          backgroundColor: pressed ? theme.overlay.medium : "transparent",
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case "primary":
        return isDisabled
          ? theme.button.primary.disabledText
          : theme.button.primary.text;

      case "secondary":
        return isDisabled
          ? theme.button.secondary.disabledText
          : theme.button.secondary.text;

      case "tertiary":
        return isDisabled
          ? theme.button.tertiary.disabledText
          : theme.button.tertiary.text;

      case "text":
        return isDisabled ? theme.button.text.disabled : theme.button.text.text;
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      {...props}
      disabled={isDisabled}
      onPressIn={(event) => {
        scale.value = withTiming(animation.scales.buttonPress, {
          duration: animation.durations.fast,
        });

        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withTiming(1, {
          duration: animation.durations.fast,
        });

        onPressOut?.(event);
      }}
      style={({ pressed }) => [
        {
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          borderRadius: radius.sm,
          gap: spacing[8],
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        sizeMap[size],
        getContainerColors(pressed),
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing[8],
          }}
        >
          {leftIcon}

          <AppText
            variant={textVariantMap[size]}
            style={{ color: getTextColor() }}
          >
            {label}
          </AppText>

          {rightIcon}
        </View>
      )}
    </AnimatedPressable>
  );
}
