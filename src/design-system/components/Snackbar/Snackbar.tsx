/**
 * Snackbar/Toast Component - SmartLink Transit
 * 8px radius, elevation 3
 */

import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Text,
    TouchableOpacity,
    ViewProps
} from 'react-native';
import { cn } from '../../../lib/cn';
import { useTheme } from '../../hooks/theme/useTheme';
import { elevation } from '../../tokens/shadows';

export type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface SnackbarAction {
  label: string;
  onPress: () => void;
}

interface SnackbarProps extends ViewProps {
  /** Visibility state */
  visible: boolean;
  /** Snackbar message */
  message: string;
  /** Snackbar variant */
  variant?: SnackbarVariant;
  /** Action button */
  action?: SnackbarAction;
  /** Duration in ms (0 for indefinite) */
  duration?: number;
  /** Called when snackbar is dismissed */
  onDismiss?: () => void;
  /** Position of snackbar */
  position?: 'top' | 'bottom';
  /** Additional className */
  className?: string;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  variant = 'default',
  action,
  duration = 3000,
  onDismiss,
  position = 'bottom',
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(position === 'bottom' ? 100 : -100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (visible) {
      // Show snackbar
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 12,
          bounciness: 4,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss
      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          dismissSnackbar();
        }, duration);
      }
    } else {
      dismissSnackbar();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible]);

  const dismissSnackbar = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'bottom' ? 100 : -100,
        duration: 300,
        useNativeDriver: true,
        easing: (t) => t * t * t, // ease-in
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  };

  const variantStyles = {
    default: 'bg-neutral-900 dark:bg-dark-800',
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-info',
  };

  const textColorStyles = {
    default: 'text-white',
    success: 'text-white',
    error: 'text-white',
    warning: 'text-neutral-900',
    info: 'text-white',
  };

  const actionColorStyles = {
    default: 'text-gold',
    success: 'text-white',
    error: 'text-white',
    warning: 'text-neutral-900',
    info: 'text-white',
  };

  if (!visible) return null;

  return (
    <Animated.View
      className={cn(
        'absolute left-4 right-4 rounded-8 px-4 py-3 flex-row items-center justify-between',
        variantStyles[variant],
        className
      )}
      style={{
        ...(position === 'bottom' ? { bottom: 80 } : { top: 60 }),
        transform: [{ translateY }],
        opacity,
        shadowColor: elevation[3].shadowColor,
        shadowOffset: elevation[3].shadowOffset,
        shadowOpacity: elevation[3].shadowOpacity,
        shadowRadius: elevation[3].shadowRadius,
        elevation: elevation[3].elevation,
      }}
      {...props}
    >
      <Text
        className={cn('text-body-medium flex-1', textColorStyles[variant])}
        numberOfLines={2}
      >
        {message}
      </Text>
      
      {action && (
        <TouchableOpacity
          onPress={() => {
            action.onPress();
            dismissSnackbar();
          }}
          className="ml-4"
        >
          <Text
            className={cn(
              'text-button-medium font-inter-semi-bold',
              actionColorStyles[variant]
            )}
          >
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Snackbar;