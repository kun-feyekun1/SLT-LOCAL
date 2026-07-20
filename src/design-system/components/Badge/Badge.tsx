/**
 * Badge Component - SmartLink Transit
 * Colors: Primary, Success, Error, Warning, Neutral
 */

import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cn } from '../../../lib/cn';

export type BadgeColor = 'primary' | 'success' | 'error' | 'warning' | 'neutral';

interface BadgeProps extends ViewProps {
  /** Badge label */
  label: string;
  /** Badge color variant */
  color?: BadgeColor;
  /** Additional className */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = 'primary',
  className,
  ...props
}) => {
  const colorStyles = {
    primary: 'bg-primary-light dark:bg-primary/20 text-primary',
    success: 'bg-success-light dark:bg-success/20 text-success',
    error: 'bg-error-light dark:bg-error/20 text-error',
    warning: 'bg-warning-light dark:bg-warning/20 text-warning',
    neutral: 'bg-neutral-200 dark:bg-dark-600 text-neutral-500 dark:text-dark-400',
  };

  return (
    <View
      className={cn(
        'rounded-999 px-2 h-5 items-center justify-center',
        colorStyles[color],
        className
      )}
      {...props}
    >
      <Text className="text-label-small font-inter-medium">
        {label}
      </Text>
    </View>
  );
};

export default Badge;