/**
 * FAB Component - SmartLink Transit
 * Variants: Regular, Small, Extended
 */

import React from 'react';
import {
    Animated,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { cn } from '../../../lib/cn';
import { useTheme } from '../../hooks/theme/useTheme';
import { elevation } from '../../tokens/shadows';

export type FABSize = 'regular' | 'small';
export type FABVariant = 'default' | 'extended';

interface FABProps extends TouchableOpacityProps {
  /** FAB size */
  size?: FABSize;
  /** FAB variant */
  variant?: FABVariant;
  /** Icon to display */
  icon: React.ReactNode;
  /** Label for extended FAB */
  label?: string;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

export const FAB: React.FC<FABProps> = ({
  size = 'regular',
  variant = 'default',
  icon,
  label,
  loading = false,
  disabled = false,
  className,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const getFABStyles = () => {
    const base = 'bg-primary items-center justify-center';
    
    const sizeStyles = {
      regular: {
        container: 'w-14 h-14 rounded-999',
        icon: 'w-6 h-6',
      },
      small: {
        container: 'w-10 h-10 rounded-999',
        icon: 'w-4 h-4',
      },
    };

    const variantStyles = {
      default: '',
      extended: 'rounded-3xl px-4 flex-row gap-2',
    };

    const currentSize = sizeStyles[size];
    const currentVariant = variantStyles[variant];

    const shadowStyles = elevation[6];

    return {
      container: cn(
        base,
        currentSize.container,
        currentVariant,
        disabled && 'opacity-60',
        className
      ),
      icon: cn(currentSize.icon),
      label: 'text-button-medium text-white font-inter-semi-bold',
      shadow: {
        shadowColor: shadowStyles.shadowColor,
        shadowOffset: shadowStyles.shadowOffset,
        shadowOpacity: shadowStyles.shadowOpacity,
        shadowRadius: shadowStyles.shadowRadius,
        elevation: shadowStyles.elevation,
      },
    };
  };

  const styles = getFABStyles();

  if (variant === 'extended') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        className={styles.container}
        style={styles.shadow}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            {icon}
            <Text className={styles.label}>{label}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
        className={styles.container}
        style={styles.shadow}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size={size === 'small' ? 'small' : 'large'} />
        ) : (
          <View className={styles.icon}>{icon}</View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FAB;