import type { PropsWithChildren } from "react";
import { View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

interface SettingsSectionProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        gap: spacing[8],
      }}
    >
      {title ? (
        <View
          style={{
            paddingHorizontal: spacing[4],
            gap: spacing[2],
          }}
        >
          <AppText
            style={{
              color: theme.text.secondary,
              fontSize: 13,
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: 0.7,
            }}
          >
            {title}
          </AppText>

          {description ? (
            <AppText
              style={{
                color: theme.text.tertiary,
                fontSize: 13,
                lineHeight: 18,
              }}
            >
              {description}
            </AppText>
          ) : null}
        </View>
      ) : null}

      <View
        style={{
          overflow: "hidden",
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: theme.border.default,
          backgroundColor: theme.surface.surface,
        }}
      >
        {children}
      </View>
    </View>
  );
}