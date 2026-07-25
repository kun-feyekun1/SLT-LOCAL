// src/design-system/components/AppText/AppText.tsx

import { Text, TextProps, TextStyle } from "react-native";

import { typography, TypographyVariant } from "@/design-system/tokens";
import { useTheme } from "@/features/theme/hooks/useTheme";

type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "hint"
  | "disabled"
  | "inverse"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "info";

interface AppTextProps extends TextProps {
  weight?: 500 | 600 | 700 | 800 | 900;
  variant?: TypographyVariant;
  color?: TextColor;
  align?: TextStyle["textAlign"];
}

export function AppText({
  weight,
  variant = "bodyMedium",
  color = "primary",
  align,
  style,
  ...props
}: AppTextProps) {
  const { theme } = useTheme();

  const colorMap: Record<TextColor, string> = {
    primary: theme.text.primary,
    secondary: theme.text.secondary,
    tertiary: theme.text.tertiary,
    hint: theme.text.hint,
    disabled: theme.text.disabled,
    inverse: theme.text.inverse,
    brand: theme.primary,
    success: theme.success,
    warning: theme.warning,
    error: theme.error,
    info: theme.info,
  };

  return (
    <Text
      {...props}
      style={[
        typography[variant],
        {
          color: colorMap[color],
          textAlign: align,
        },
        style,
      ]}
    />
  );
}



// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectThemeMode, setThemeMode, ThemeMode } from '@/store/slices/themeSlice';
import { lightColors, darkColors, ColorTokens } from '@/design-system/tokens/colors';

// 1. Define the Context shape
interface ThemeContextType {
  colors: ColorTokens;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void; // Bridge to Redux action
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. The Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  
  // GETTER: Consume Redux state via selector
  const mode = useSelector(selectThemeMode);
  
  // Native system preference hook
  const systemColorScheme = useColorScheme();

  // Resolve whether we should render dark theme or light theme
  const isDark = mode === 'system' ? systemColorScheme === 'dark' : mode === 'dark';

  // SETTER BRIDGE: Dispatch Redux action
  const setMode = (newMode: ThemeMode) => {
    dispatch(setThemeMode(newMode));
  };

  // Memoize theme value so children only re-render when actual values change
  const value = useMemo(
    () => ({
      colors: isDark ? darkColors : lightColors,
      isDark,
      mode,
      setMode,
    }),
    [isDark, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// 3. Custom Hook to expose Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};