/**
 * Radio Button Component - SmartLink Transit
 * 24px size, 12px selected dot
 */

import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

interface RadioProps extends TouchableOpacityProps {
  /** Selected state */
  selected: boolean;
  /** Called when radio changes */
  onValueChange: (selected: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Label className */
  labelClassName?: string;
}

export const Radio: React.FC<RadioProps> = ({
  selected,
  onValueChange,
  label,
  disabled = false,
  className,
  labelClassName,
  ...props
}) => {
  const { theme } = useTheme();

  const getRadioStyles = () => {
    const base = "w-6 h-6 rounded-999 border-2 items-center justify-center";

    const states = {
      unselected: "border-neutral-400 dark:border-dark-500 bg-transparent",
      selected: "border-primary bg-transparent",
      disabled: "opacity-60",
    };

    let state = "unselected";
    if (disabled) state = "disabled";
    else if (selected) state = "selected";

    return cn(base, states[state as keyof typeof states], className);
  };

  const getLabelStyles = () => {
    const base = "text-body-medium ml-3";

    if (disabled) return cn(base, "text-neutral-500 dark:text-dark-400");

    return cn(base, "text-neutral-900 dark:text-white", labelClassName);
  };

  const handlePress = () => {
    if (!disabled && !selected) {
      onValueChange(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      className="flex-row items-center"
      {...props}
    >
      <View className={getRadioStyles()}>
        {selected && <View className="w-3 h-3 bg-primary rounded-999" />}
      </View>
      {label && <Text className={getLabelStyles()}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default Radio;
