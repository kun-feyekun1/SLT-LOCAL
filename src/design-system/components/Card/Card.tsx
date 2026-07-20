/**
 * Card Component - SmartLink Transit
 * Variants: Default, Elevated, Outlined
 */

import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../../../lib/cn';
import { useTheme } from '../../hooks/theme/useTheme';

export type CardVariant = 'default' | 'elevated' | 'outlined';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

interface CardProps extends ViewProps {
  /** Card variant */
  variant?: CardVariant;
  /** Card padding size */
  padding?: CardPadding;
  /** Additional className */
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'medium',
  className,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getCardStyles = () => {
    const base = 'rounded-12 bg-white dark:bg-dark-700';
    
    const variants = {
      default: 'bg-card',
      elevated: cn(
        'bg-card',
        'shadow-elevation-2',
        'shadow-color-black',
        'shadow-offset-0-2',
        'shadow-opacity-8',
        'shadow-radius-4',
        'elevation-2'
      ),
      outlined: 'bg-card border border-neutral-200 dark:border-dark-600',
    };

    const paddings = {
      none: 'p-0',
      small: 'p-3',
      medium: 'p-4',
      large: 'p-6',
    };

    return cn(base, variants[variant], paddings[padding], className);
  };

  return (
    <View className={getCardStyles()} {...props}>
      {children}
    </View>
  );
};

export default Card;