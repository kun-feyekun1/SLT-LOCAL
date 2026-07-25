/**
 * Bottom Navigation Component - SmartLink Transit
 * 4-5 items max, active state with icon and label
 */

import React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

export interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface BottomNavigationProps extends ViewProps {
  /** Navigation items */
  items: NavItem[];
  /** Currently active item key */
  activeKey: string;
  /** Called when item is pressed */
  onItemPress: (key: string) => void;
  /** Additional className */
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeKey,
  onItemPress,
  className,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      className={cn(
        "flex-row h-16 bg-white dark:bg-dark-800 border-t border-neutral-200 dark:border-dark-600",
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = activeKey === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            className="flex-1 items-center justify-center py-1 touch-target"
            onPress={() => onItemPress(item.key)}
            activeOpacity={0.7}
          >
            <View className="items-center">
              {isActive ? item.activeIcon || item.icon : item.icon}
              <Text
                className={cn(
                  "text-navigationLabel font-inter-medium mt-1",
                  isActive
                    ? "text-primary"
                    : "text-neutral-500 dark:text-dark-400",
                )}
              >
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
