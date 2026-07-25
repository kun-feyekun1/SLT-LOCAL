/**
 * Circular Progress Component - SmartLink Transit
 * Continuous rotation animation
 */

import React, { useEffect, useRef } from "react";
import { Animated, View, ViewProps } from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

interface CircularProgressProps extends ViewProps {
  /** Size of the progress indicator */
  size?: number;
  /** Progress value (0-100) */
  value?: number;
  /** Determinate or indeterminate */
  indeterminate?: boolean;
  /** Stroke width */
  strokeWidth?: number;
  /** Additional className */
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 40,
  value = 0,
  indeterminate = true,
  strokeWidth = 4,
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (indeterminate) {
      startRotationAnimation();
    } else {
      Animated.timing(progressAnim, {
        toValue: Math.min(value, 100),
        duration: 300,
        useNativeDriver: false,
        easing: (t) => t * t * t * t,
      }).start();
    }
  }, [value, indeterminate]);

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  };

  const rotate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = indeterminate ? 0.75 : Math.min(value, 100) / 100;

  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View
      className={cn("items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <Animated.View
        style={{
          transform: [{ rotate: indeterminate ? rotate : "0deg" }],
        }}
      >
        <View style={{ width: size, height: size }}>
          {/* Background circle */}
          <View
            className="absolute"
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: "#E8E8E8",
            }}
          />

          {/* Progress circle */}
          <View
            className="absolute"
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: "#1A7A3C",
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              transform: [{ rotate: "-90deg" }],
            }}
          />

          {/* Dash array circle for determinate */}
          {!indeterminate && (
            <View
              className="absolute"
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: "#1A7A3C",
                borderStyle: "solid",
                transform: [{ rotate: "-90deg" }],
              }}
            >
              <View
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: strokeWidth,
                  borderColor: "#1A7A3C",
                  borderStyle: "dashed",
                  borderDasharray: [circumference],
                  borderDashoffset: strokeDashoffset,
                }}
              />
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default CircularProgress;
