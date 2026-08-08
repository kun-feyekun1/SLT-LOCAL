/**
 * Linear Progress Component - SmartLink Transit
 * 4px height, 300ms animation
 */

import React, { useEffect, useRef } from "react";
import { Animated, View, ViewProps } from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

export interface LinearProgressProps extends ViewProps {
  /** Progress value (0-100) */
  value: number;
  /** Determinate or indeterminate */
  indeterminate?: boolean;
  /** Additional className */
  className?: string;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  indeterminate = false,
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const indeterminateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (indeterminate) {
      startIndeterminateAnimation();
    } else {
      Animated.timing(progressAnim, {
        toValue: Math.min(value, 100),
        duration: 300,
        useNativeDriver: false,
        easing: (t) => t * t * t * t, // ease-in
      }).start();
    }
  }, [value, indeterminate]);

  const startIndeterminateAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(indeterminateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(indeterminateAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  const width = indeterminate
    ? indeterminateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["0%", "50%", "100%"],
      })
    : progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
      });

  const translateX = indeterminate
    ? indeterminateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["-100%", "0%", "100%"],
      })
    : "0%";

  return (
    <View
      className={cn(
        "h-1 rounded-2 bg-neutral-200 dark:bg-dark-600 overflow-hidden",
        className,
      )}
      {...props}
    >
      <Animated.View
        className="h-full bg-primary rounded-2"
        style={{
          width: indeterminate ? "50%" : width,
          transform: [{ translateX: indeterminate ? translateX : "0%" }],
        }}
      />
    </View>
  );
};

export default LinearProgress;
