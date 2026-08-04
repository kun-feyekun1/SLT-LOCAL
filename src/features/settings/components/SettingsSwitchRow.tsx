import { Switch } from "react-native";

import { useTheme } from "@/features/theme/hooks/useTheme";

import { SettingsRow } from "./SettingsRow";
import type { SettingsSwitchRowProps } from "../types/settings.types";

export function SettingsSwitchRow({
  title,
  description,
  icon,
  iconColor,
  value,
  disabled = false,
  onValueChange,
  testID,
}: SettingsSwitchRowProps) {
  const { theme } = useTheme();

  return (
    <SettingsRow
      testID={testID}
      title={title}
      description={description}
      icon={icon}
      iconColor={iconColor}
      disabled={disabled}
      showChevron={false}
      rightElement={
        <Switch
          value={value}
          disabled={disabled}
          accessibilityLabel={title}
          onValueChange={onValueChange}
          trackColor={{
            false: theme.border.strong,
            true: theme.brand.primary,
          }}
          thumbColor={theme.utility.white}
          ios_backgroundColor={theme.border.strong}
        />
      }
    />
  );
}