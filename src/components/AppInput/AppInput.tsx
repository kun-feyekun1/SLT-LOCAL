// src/design-system/components/AppInput/AppInput.tsx

import { forwardRef, ReactNode, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

import { AppText } from "../AppText/AppText";

type InputStatus = "default" | "error" | "success";

interface AppInputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(function AppInput(
  {
    label,
    helperText,
    errorMessage,
    successMessage,
    leftIcon,
    rightIcon,
    editable = true,
    style,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);

  const status: InputStatus = errorMessage
    ? "error"
    : successMessage
      ? "success"
      : "default";

  const borderColor =
    status === "error"
      ? theme.input.borderError
      : status === "success"
        ? theme.input.borderSuccess
        : focused
          ? theme.input.borderFocus
          : theme.input.border;

  const labelColor =
    status === "error"
      ? theme.input.labelError
      : status === "success"
        ? theme.input.labelSuccess
        : focused
          ? theme.input.labelFocus
          : theme.input.label;

  const supportingText = errorMessage || successMessage || helperText;

  const supportingTextColor =
    status === "error"
      ? "error"
      : status === "success"
        ? "success"
        : "secondary";

  return (
    <View style={{ gap: spacing[8] }}>
      {label ? (
        <AppText variant="labelLarge" style={{ color: labelColor }}>
          {label}
        </AppText>
      ) : null}

      <View
        style={{
          minHeight: 48,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: spacing[16],
          borderWidth: 1,
          borderColor,
          borderRadius: radius.sm,
          backgroundColor: editable
            ? theme.input.background
            : theme.surface.surface,
          gap: spacing[8],
          opacity: editable ? 1 : 0.6,
        }}
      >
        {leftIcon}

        <TextInput
          ref={ref}
          {...props}
          editable={editable}
          placeholderTextColor={theme.input.placeholder}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          style={[
            {
              flex: 1,
              color: theme.text.primary,
              fontSize: 14,
              lineHeight: 20,
              paddingVertical: spacing[12],
            },
            style,
          ]}
        />

        {rightIcon}
      </View>

      {supportingText ? (
        <AppText variant="bodySmall" color={supportingTextColor}>
          {supportingText}
        </AppText>
      ) : null}
    </View>
  );
});
