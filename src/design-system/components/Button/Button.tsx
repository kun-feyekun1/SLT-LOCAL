/**
 * Button Component - SmartLink Transit
 * Variants: Primary, Secondary, Tertiary, Text
 * States: Default, Pressed, Disabled, Loading
 */

import React from 'react';
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { cn } from '../../../lib/cn';
import { useTheme } from '../../hooks/theme/useTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';
export type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps extends TouchableOpacityProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button label */
  label: string;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Icon to display before label */
  leftIcon?: React.ReactNode;
  /** Icon to display after label */
  rightIcon?: React.ReactNode;
  /** Additional className for styling */
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  label,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();

  // Get button styles based on variant and state
  const getButtonStyles = () => {
    const base = 'flex-row items-center justify-center rounded-8';
    const sizes = {
      large: 'h-14 px-6',
      medium: 'h-12 px-5',
      small: 'h-10 px-4',
    };

    const variants = {
      primary: {
        background: disabled ? 'bg-neutral-300' : loading ? 'bg-primary' : 'bg-primary',
        pressed: 'bg-primary-dark',
        text: disabled ? 'text-neutral-500' : 'text-white',
      },
      secondary: {
        background: disabled ? 'bg-transparent' : 'bg-transparent',
        pressed: 'bg-primary-light',
        text: disabled ? 'text-neutral-500' : 'text-primary',
        border: 'border border-primary border-[1.5px]',
      },
      tertiary: {
        background: disabled ? 'bg-neutral-200' : 'bg-neutral-100',
        pressed: 'bg-neutral-200',
        text: disabled ? 'text-neutral-400' : 'text-neutral-700',
      },
      text: {
        background: 'bg-transparent',
        pressed: 'bg-primary-light',
        text: disabled ? 'text-neutral-400' : 'text-primary',
      },
    };

    const variantStyles = variants[variant];
    const sizeStyles = sizes[size];

    return {
      container: cn(
        base,
        sizeStyles,
        variantStyles.background,
        variantStyles.border,
        disabled && 'opacity-60',
        className
      ),
      text: cn(
        variantStyles.text,
        size === 'large' && 'text-button-large',
        size === 'medium' && 'text-button-medium',
        size === 'small' && 'text-button-small',
        'font-inter-semi-bold'
      ),
    };
  };

  const styles = getButtonStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={styles.container}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFFFFF' : '#1A7A3C'}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text className={styles.text}>{label}</Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;