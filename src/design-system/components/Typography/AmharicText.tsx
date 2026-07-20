/**
 * Amharic Text Component - SmartLink Transit
 * Special handling for Amharic (አማርኛ) text
 */

import React from 'react';
import { Text, TextProps } from 'react-native';
import { cn } from '../../../lib/cn';

interface AmharicTextProps extends TextProps {
  /** Additional className */
  className?: string;
}

export const AmharicText: React.FC<AmharicTextProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Text
      className={cn(
        'font-inter-regular text-body-medium',
        'min-h-[20px]', // Extra vertical space for diacritics
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
};

// Amharic-specific typography variants
export const AmharicH1 = (props: Omit<AmharicTextProps, 'className'>) => (
  <AmharicText className="text-h1 font-inter-bold" {...props} />
);

export const AmharicH2 = (props: Omit<AmharicTextProps, 'className'>) => (
  <AmharicText className="text-h2 font-inter-semi-bold" {...props} />
);

export const AmharicH3 = (props: Omit<AmharicTextProps, 'className'>) => (
  <AmharicText className="text-h3 font-inter-semi-bold" {...props} />
);

export const AmharicBody = (props: Omit<AmharicTextProps, 'className'>) => (
  <AmharicText className="text-body-large" {...props} />
);

export default AmharicText;