/**
 * Chip Component - SmartLink Transit
 * States: Default, Selected, Disabled
 */

import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { cn } from '../../../lib/cn';

export interface ChipProps extends TouchableOpacityProps {
  /** Chip label */
  label: string;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  disabled = false,
  className,
  ...props
}) => {
  const getChipStyles = () => {
    const base = 'h-8 rounded-8 px-3 items-center justify-center';
    
    const states = {
      default: 'bg-neutral-100 dark:bg-dark-700',
      selected: 'bg-primary-light dark:bg-primary/20 border border-primary border-[1.5px]',
      disabled: 'bg-neutral-200 dark:bg-dark-600 opacity-60',
    };

    const currentState = disabled ? 'disabled' : selected ? 'selected' : 'default';

    return cn(base, states[currentState as keyof typeof states], className);
  };

  const getTextStyles = () => {
    const base = 'text-label-medium font-inter-medium';
    
    if (disabled) return cn(base, 'text-neutral-400 dark:text-dark-500');
    if (selected) return cn(base, 'text-primary');
    
    return cn(base, 'text-neutral-700 dark:text-dark-300');
  };

  return (
    <TouchableOpacity
      className={getChipStyles()}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text className={getTextStyles()}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Chip;