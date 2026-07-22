/**
 * Input Component - SmartLink Transit
 * States: Normal, Focused, Error, Disabled
 */

import React, { forwardRef, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

export type InputState =
  "default" | "focused" | "error" | "success" | "disabled";

interface InputProps extends TextInputProps {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Helper text */
  helper?: string;
  /** Input state */
  state?: InputState;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Show password toggle for password fields */
  isPassword?: boolean;
  /** Additional className */
  className?: string;
  /** Label className */
  labelClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      success,
      helper,
      state = "default",
      leftIcon,
      rightIcon,
      isPassword = false,
      className,
      labelClassName,
      editable = true,
      secureTextEntry: secureTextEntryProp,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(
      secureTextEntryProp || false,
    );

    const getInputStyles = () => {
      const base = "h-14 rounded-8 border-[1.5px] px-4 text-body-medium";

      const stateStyles = {
        default:
          "bg-white dark:bg-dark-700 border-neutral-300 dark:border-dark-600",
        focused: "bg-white dark:bg-dark-700 border-primary",
        error: "bg-error-light dark:bg-error-light/10 border-error",
        success: "bg-success-light dark:bg-success-light/10 border-success",
        disabled:
          "bg-neutral-100 dark:bg-dark-700 border-neutral-200 dark:border-dark-600 opacity-60",
      };

      const currentState = !editable
        ? "disabled"
        : state !== "default"
          ? state
          : isFocused
            ? "focused"
            : "default";

      return cn(base, stateStyles[currentState as InputState], className);
    };

    const getLabelStyles = () => {
      const base = "text-label-large mb-1";

      if (error) return cn(base, "text-error");
      if (success) return cn(base, "text-success");
      if (isFocused) return cn(base, "text-primary");

      return cn(base, "text-neutral-700 dark:text-dark-300");
    };

    const getHelperStyles = () => {
      if (error) return "text-error text-body-small";
      if (success) return "text-success text-body-small";
      return "text-neutral-600 dark:text-dark-400 text-body-small";
    };

    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };

    return (
      <View className="w-full">
        {label && (
          <Text className={cn(getLabelStyles(), labelClassName)}>{label}</Text>
        )}

        <View className="relative flex-row items-center">
          {leftIcon && <View className="absolute left-3 z-10">{leftIcon}</View>}

          <TextInput
            ref={ref}
            className={cn(
              getInputStyles(),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={editable}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={theme.text.placeholder}
            {...props}
          />

          {rightIcon && !isPassword && (
            <View className="absolute right-3">{rightIcon}</View>
          )}

          {isPassword && (
            <TouchableOpacity
              className="absolute right-3"
              onPress={toggleSecureEntry}
            >
              <Text className="text-primary">
                {secureTextEntry ? "SHOW" : "HIDE"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {(error || success || helper) && (
          <Text className={cn("mt-1", getHelperStyles())}>
            {error || success || helper}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = "Input";

export default Input;
