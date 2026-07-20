/**
 * Divider Component - SmartLink Transit
 */

import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../../../lib/cn';

interface DividerProps extends ViewProps {
  /** Inset margin for divider */
  inset?: number | 'none';
  /** Additional className */
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  inset = 'none',
  className,
  ...props
}) => {
  const getInsetStyles = () => {
    if (inset === 'none') return '';
    return `mx-${inset}`;
  };

  return (
    <View
      className={cn(
        'h-[0.5px] bg-neutral-200 dark:bg-dark-600',
        getInsetStyles(),
        className
      )}
      {...props}
    />
  );
};

export default Divider;