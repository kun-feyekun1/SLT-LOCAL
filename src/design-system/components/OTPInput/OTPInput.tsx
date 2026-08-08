/**
 * OTP Input Component - SmartLink Transit
 * Auto-advances after each digit
 */

import React, { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";
import { typography } from "../../tokens/typography";

export interface OTPInputProps {
  /** Number of OTP digits */
  length?: number;
  /** Called when OTP is complete */
  onComplete?: (otp: string) => void;
  /** Called when OTP changes */
  onChange?: (otp: string) => void;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Additional className */
  className?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  error = false,
  disabled = false,
  autoFocus = false,
  className,
}) => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handleChangeText = (text: string, index: number) => {
    if (disabled) return;

    // Only allow single digit
    const digit = text.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChange?.(otpString);

    // Auto-advance to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (otpString.length === length) {
      onComplete?.(otpString);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (disabled) return;

    // Handle backspace
    if (e.nativeEvent.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  const getInputStyles = (index: number) => {
    const isFocused = focusedIndex === index;
    const hasValue = !!otp[index];

    const base = "w-12 h-14 rounded-8 border-[1.5px] text-center";

    const stateStyles = {
      default: "border-neutral-300 dark:border-dark-600",
      focused: "border-primary",
      error: "border-error bg-error-light dark:bg-error-light/10",
      disabled:
        "bg-neutral-100 dark:bg-dark-700 border-neutral-200 dark:border-dark-600 opacity-60",
      value: "border-neutral-400 dark:border-dark-500",
    };

    let state = "default";
    if (disabled) state = "disabled";
    else if (error) state = "error";
    else if (isFocused) state = "focused";
    else if (hasValue) state = "value";

    return cn(base, stateStyles[state as keyof typeof stateStyles], className);
  };

  return (
    <View className="flex-row gap-2 justify-center">
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          className={getInputStyles(index)}
          value={otp[index]}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          selectTextOnFocus
          style={{
            fontSize: typography.displayMedium.fontSize,
            fontFamily: typography.displayMedium.fontFamily,
            fontWeight: typography.displayMedium.fontWeight,
            color: disabled ? theme.text.disabled : theme.text.primary,
          }}
        />
      ))}
    </View>
  );
};

export default OTPInput;
