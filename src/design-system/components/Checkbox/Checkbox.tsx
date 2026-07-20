/**
 * Checkbox Component - SmartLink Transit
 * 24px size, 4px radius
 */

import React from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { cn } from '../../../lib/cn';
import { useTheme } from '../../hooks/theme/useTheme';

interface CheckboxProps extends TouchableOpacityProps {
  /** Checked state */
  checked: boolean;
  /** Called when checkbox changes */
  onValueChange: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional className */
  className?: string;
  /** Label className */
  labelClassName?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  label,
  disabled = false,
  error = false,
  className,
  labelClassName,
  ...props
}) => {
  const { theme } = useTheme();

  const getCheckboxStyles = () => {
    const base = 'w-6 h-6 rounded-4 border-2 items-center justify-center';
    
    const states = {
      unchecked: 'border-neutral-400 dark:border-dark-500 bg-transparent',
      checked: 'border-primary bg-primary',
      error: 'border-error bg-error-light dark:bg-error-light/10',
      disabled: 'opacity-60',
    };

    let state = 'unchecked';
    if (disabled) state = 'disabled';
    else if (error) state = 'error';
    else if (checked) state = 'checked';

    return cn(base, states[state as keyof typeof states], className);
  };

  const getLabelStyles = () => {
    const base = 'text-body-medium ml-3';
    
    if (disabled) return cn(base, 'text-neutral-500 dark:text-dark-400');
    if (error) return cn(base, 'text-error');
    
    return cn(base, 'text-neutral-900 dark:text-white', labelClassName);
  };

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      className="flex-row items-center"
      {...props}
    >
      <View className={getCheckboxStyles()}>
        {checked && (
          <View className="w-4 h-4 bg-white rounded-1" />
        )}
      </View>
      {label && (
        <Text className={getLabelStyles()}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;