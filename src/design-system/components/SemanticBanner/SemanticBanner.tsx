// src/design-system/components/SemanticBanner/SemanticBanner.tsx

import { ReactNode } from "react";
import { View } from "react-native";

import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

import { AppText } from "@/components/AppText/AppText";

type BannerVariant = "success" | "warning" | "error" | "info";

interface SemanticBannerProps {
  title: string;
  message?: string;
  variant: BannerVariant;
  icon?: ReactNode;
}

export function SemanticBanner({
  title,
  message,
  variant,
  icon,
}: SemanticBannerProps) {
  const { theme } = useTheme();

  const variants = {
    success: {
      foreground: theme.success,
      background: theme.successLight,
    },
    warning: {
      foreground: theme.warning,
      background: theme.warningLight,
    },
    error: {
      foreground: theme.error,
      background: theme.errorLight,
    },
    info: {
      foreground: theme.info,
      background: theme.infoLight,
    },
  };

  const currentVariant = variants[variant];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing[12],
        padding: spacing[16],
        borderRadius: radius.md,
        borderLeftWidth: 4,
        borderLeftColor: currentVariant.foreground,
        backgroundColor: currentVariant.background,
      }}
    >
      {icon}

      <View style={{ flex: 1, gap: spacing[4] }}>
        <AppText
          variant="labelLarge"
          style={{
            color: currentVariant.foreground,
          }}
        >
          {title}
        </AppText>

        {message ? (
          <AppText
            variant="bodySmall"
            style={{
              color: currentVariant.foreground,
            }}
          >
            {message}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}
