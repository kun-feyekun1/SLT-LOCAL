// src/components/AppText/AppText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme'; // Adjust path if needed

interface AppTextProps extends TextProps {
  muted?: boolean;
  size?: number;
  weight?: '400' | '500' | '600' | '700' | 'bold' | 'normal';
  variant?: string;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  muted,
  size = 14,
  weight = '400',
  style,
  ...props
}) => {
  const theme = useAppTheme();

  // Safe fallback if theme is undefined during error boundary rendering
  const textColor = muted
    ? (theme?.colors?.textMuted ?? '#666666')
    : (theme?.colors?.text ?? '#000000');

  return (
    <Text
      {...props}
      style={[
        {
          color: textColor,
          fontSize: size,
          lineHeight: size + 6,
          fontWeight: weight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};