// src/components/AppText/AppText.tsx

import { Text, TextProps, TextStyle } from "react-native";

import { typography, TypographyVariant } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

/**
 * Weight overrides accept the numeric literal or its string form.
 * Both normalize to the string value React Native expects.
 */
export type FontWeightValue =
  | 500
  | 600
  | 700
  | 800
  | 900
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

const normalizeWeight = (weight: FontWeightValue): TextStyle["fontWeight"] =>
  String(weight) as TextStyle["fontWeight"];

export type TextColor =
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

export interface AppTextProps extends TextProps {
  /**
   * Typography token key. The token set in `@/design-system/tokens`
   * is the single source of truth for available variants.
   */
  variant?: TypographyVariant;
  /**
   * Overrides the weight supplied by the typography token.
   * Accepts numeric or string literals so JSX may use either
   * `weight={700}` or `weight="700"`.
   */
  weight?: FontWeightValue;
  /** Semantic text color. Use this instead of hardcoding style colors. */
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
        weight ? { fontWeight: normalizeWeight(weight) } : null,
        style,
      ]}
    />
  );
}

