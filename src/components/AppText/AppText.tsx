// src/design-system/components/AppText/AppText.tsx

import { Text, TextProps, TextStyle } from "react-native";

import { typography, TypographyVariant } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "hint"
  | "disabled"
  | "inverse"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "info";

interface AppTextProps extends TextProps {
  weight?: 500 | 600 | 700 | 800 | 900;
  variant?: TypographyVariant;
  color?: TextColor;
  align?: TextStyle["textAlign"];
}

export function AppText({
  weight,
  variant = "bodyMedium",
  color = "primary",
  align,
  style,
  ...props
}: AppTextProps) {
  const { theme } = useTheme();

  const colorMap: Record<TextColor, string> = {
    primary: theme.text.primary,
    secondary: theme.text.secondary,
    tertiary: theme.text.tertiary,
    hint: theme.text.hint,
    disabled: theme.text.disabled,
    inverse: theme.text.inverse,
    brand: theme.primary,
    success: theme.success,
    warning: theme.warning,
    error: theme.error,
    info: theme.info,
  };

  return (
    <Text
      {...props}
      style={[
        typography[variant],
        {
          color: colorMap[color],
          textAlign: align,
        },
        style,
      ]}
    />
  );
}
