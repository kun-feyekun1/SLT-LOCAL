/**
 * Typography Component - SmartLink Transit
 * Centralized text component with design system variants
 */

import React from 'react';
import { Text, TextProps } from 'react-native';
import { cn } from '../../../lib/cn';
import { typography, TypographyVariant } from '../../tokens/typography';

export interface TypographyProps extends TextProps {
  /** Typography variant */
  variant?: TypographyVariant;
  /** Text color */
  color?: string;
  /** Additional className */
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'bodyMedium',
  color,
  className,
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    /**
     * Partial by design: the typography token set is the source of truth
     * and may grow ahead of the NativeWind class map. Unmapped variants
     * fall back to bodyMedium rather than breaking the build.
     */
    const variantMap: Partial<Record<TypographyVariant, string>> = {
      displayLarge: 'text-display-large font-inter-bold tracking-tight',
      displayMedium: 'text-display-medium font-inter-semi-bold tracking-tight',
      h1: 'text-h1 font-inter-bold tracking-[-0.25]',
      h2: 'text-h2 font-inter-semi-bold tracking-[-0.25]',
      h3: 'text-h3 font-inter-semi-bold',
      h4: 'text-h4 font-inter-medium',
      bodyLarge: 'text-body-large font-inter-regular',
      bodyMedium: 'text-body-medium font-inter-regular tracking-0.25',
      bodySmall: 'text-body-small font-inter-regular tracking-0.25',
      labelLarge: 'text-label-large font-inter-medium tracking-0.5',
      labelMedium: 'text-label-medium font-inter-medium tracking-0.5',
      labelSmall: 'text-label-small font-inter-medium tracking-0.5',
      buttonLarge: 'text-button-large font-inter-semi-bold tracking-0.75',
      buttonMedium: 'text-button-medium font-inter-semi-bold tracking-0.75',
      buttonSmall: 'text-button-small font-inter-semi-bold tracking-0.5',
      navigationLabel: 'text-label-small font-inter-medium tracking-0.5',
      monospace: 'font-mono text-body-medium',
      priceLarge: 'text-display-medium font-inter-bold tracking-tight',
      priceMedium: 'text-h3 font-inter-semi-bold',
      link: 'text-body-medium font-inter-medium',
    };

    return variantMap[variant] ?? variantMap.bodyMedium ?? "";
  };

  const textColor = color ? `text-[${color}]` : 'text-neutral-900 dark:text-white';

  return (
    <Text
      className={cn(getVariantStyles(), textColor, className)}
      {...props}
    >
      {children}
    </Text>
  );
};

// Convenience exports for common variants
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);
export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);
export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);
export const BodyLarge = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="bodyLarge" {...props} />
);
export const BodyMedium = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="bodyMedium" {...props} />
);
export const BodySmall = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="bodySmall" {...props} />
);

export default Typography;