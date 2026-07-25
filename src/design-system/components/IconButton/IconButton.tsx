// src/design-system/components/AppIconButton/AppIconButton.tsx

import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps } from "react-native";

import { radius, spacing } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

export interface IconButtonProps extends Omit<PressableProps, "children"> {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  selected?: boolean;
  accessibilityLabel: string;
}

export function IconButton({
  icon,
  size = 22,
  selected = false,
  disabled,
  ...props
}: IconButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: selected
          ? theme.primaryLight
          : pressed
            ? theme.overlay.medium
            : theme.surface.surface,
        padding: spacing[8],
        opacity: disabled ? 0.38 : 1,
      })}
    >
      <Ionicons
        name={icon}
        size={size}
        color={
          disabled
            ? theme.icon.disabled
            : selected
              ? theme.icon.active
              : theme.icon.inactive
        }
      />
    </Pressable>
  );
}
