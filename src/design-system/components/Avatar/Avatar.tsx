/**
 * Avatar Component - SmartLink Transit
 * Sizes: 32, 40, 48, 56
 */

import React from "react";
import { Image, Text, View, ViewProps } from "react-native";
import { useTheme } from "../../../features/theme/hooks/useTheme";
import { cn } from "../../../lib/cn";

export type AvatarSize = 32 | 40 | 48 | 56;

export interface AvatarProps extends ViewProps {
  /** Avatar size */
  size?: AvatarSize;
  /** Image source */
  source?: { uri: string } | number;
  /** Initials to display when no image */
  initials?: string;
  /** Additional className */
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 48,
  source,
  initials,
  className,
  ...props
}) => {
  const { theme } = useTheme();

  const getSizeStyles = () => {
    return {
      container: cn(
        "rounded-999 overflow-hidden bg-primary-light dark:bg-primary/20",
        `w-${size} h-${size}`,
        className,
      ),
      text: cn(
        "text-primary font-inter-medium",
        size === 32 && "text-label-medium",
        size === 40 && "text-label-large",
        size === 48 && "text-h4",
        size === 56 && "text-h3",
      ),
    };
  };

  const styles = getSizeStyles();

  if (source) {
    return (
      <View className={styles.container} {...props}>
        <Image
          source={source}
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
        />
      </View>
    );
  }

  return (
    <View className={styles.container} {...props}>
      {initials && (
        <Text className={styles.text}>
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      )}
    </View>
  );
};

export default Avatar;
