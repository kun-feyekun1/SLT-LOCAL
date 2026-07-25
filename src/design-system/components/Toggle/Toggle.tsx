/**
 * Toggle Switch Component - SmartLink Transit
 * With 200ms ease-in-out animation
 */

import React, { useEffect, useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

interface ToggleProps extends TouchableOpacityProps {
  /** Toggle value */
  value: boolean;
  /** Called when toggle changes */
  onValueChange: (value: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  disabled = false,
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(value ? 28 : 0)).current;
  const trackColor = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: value ? 28 : 0,
        duration: 200,
        useNativeDriver: true,
        easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t), // ease-in-out
      }),
      Animated.timing(trackColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
        easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      }),
    ]).start();
  }, [value]);

  const trackBackground = trackColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#D4D4D4", "#1A7A3C"],
  });

  const trackDarkBackground = trackColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#3D3D3D", "#1A7A3C"],
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      className={cn("w-14 h-8 rounded-999 justify-center px-1", className)}
      style={{
        backgroundColor: trackBackground as any,
      }}
      {...props}
    >
      <Animated.View
        className="w-6 h-6 rounded-999 bg-white"
        style={{
          transform: [{ translateX }],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        }}
      />
    </TouchableOpacity>
  );
};

export default Toggle;
