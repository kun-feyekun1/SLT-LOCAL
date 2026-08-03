import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { AppText } from "@/components/AppText/AppText";
import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

import type { SettingsRowProps } from "../types/settings.types";

export function SettingsRow({
  title,
  description,
  icon,
  iconColor,
  value,
  disabled = false,
  destructive = false,
  showChevron = true,
  rightElement,
  onPress,
  testID,
}: SettingsRowProps) {
  const { theme } = useTheme();

  const titleColor = destructive
    ? theme.semantic.error
    : disabled
      ? theme.text.disabled
      : theme.text.primary;

  const resolvedIconColor = destructive
    ? theme.semantic.error
    : iconColor ?? theme.icon.primary;

  return (
    <Pressable
      testID={testID}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={title}
      accessibilityHint={description}
      accessibilityState={{
        disabled,
      }}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: description ? 72 : 58,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing[16],
        paddingVertical: spacing[12],
        gap: spacing[12],
        opacity: disabled ? 0.55 : 1,
        backgroundColor:
          pressed && onPress
            ? theme.surface.elevated
            : theme.surface.surface,
      })}
    >
      {icon ? (
        <View
          style={{
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.md,
            backgroundColor: destructive
              ? `${theme.semantic.error}14`
              : theme.surface.elevated,
          }}
        >
          <Ionicons
            name={icon}
            size={20}
            color={resolvedIconColor}
          />
        </View>
      ) : null}

      <View
        style={{
          flex: 1,
          gap: spacing[2],
        }}
      >
        <AppText
          style={{
            color: titleColor,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {title}
        </AppText>

        {description ? (
          <AppText
            style={{
              color: disabled
                ? theme.text.disabled
                : theme.text.secondary,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            {description}
          </AppText>
        ) : null}
      </View>

      {value ? (
        <AppText
          numberOfLines={1}
          style={{
            maxWidth: 120,
            color: theme.text.secondary,
            fontSize: 14,
          }}
        >
          {value}
        </AppText>
      ) : null}

      {rightElement}

      {showChevron && onPress ? (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={theme.icon.secondary}
        />
      ) : null}
    </Pressable>
  );
}