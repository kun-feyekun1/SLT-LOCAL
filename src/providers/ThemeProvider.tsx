/**
 * Theme Provider - SmartLink Transit
 * Provides theme context for the entire application
 */

import { Theme, ThemeMode, darkTheme, lightTheme } from "@/design-system/theme";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode,
}) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    initialMode || (systemColorScheme === "dark" ? "dark" : "light"),
  );

  const theme = useMemo(() => {
    return mode === "dark" ? darkTheme : lightTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (!initialMode) {
      setMode(systemColorScheme === "dark" ? "dark" : "light");
    }
  }, [systemColorScheme, initialMode]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      toggleTheme,
      setThemeMode,
    }),
    [theme, mode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
