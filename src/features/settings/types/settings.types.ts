import type { ComponentProps, ReactNode } from "react";
import type { Ionicons } from "@expo/vector-icons";

export type SettingsIconName =
  ComponentProps<typeof Ionicons>["name"];

export interface SettingsRowProps {
  title: string;
  description?: string;
  icon?: SettingsIconName;
  iconColor?: string;
  value?: string;
  disabled?: boolean;
  destructive?: boolean;
  showChevron?: boolean;
  rightElement?: ReactNode;
  onPress?: () => void;
  testID?: string;
}

export interface SettingsSwitchRowProps {
  title: string;
  description?: string;
  icon?: SettingsIconName;
  iconColor?: string;
  value: boolean;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
  testID?: string;
}