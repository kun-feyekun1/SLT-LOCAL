import { Theme, ThemeMode, darkTheme, lightTheme } from "@/design-system/theme";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ThemePreference = "light" | "dark" | "system";

interface ThemeContextType {
  colors: any;
  theme: Theme;
  mode: ThemeMode;
  preference: ThemePreference;
  isDark: boolean;
  isLight: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setThemePreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialPreference?: ThemePreference;
}

export function ThemeProvider({
  children,
  initialPreference = "system",
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();

  const [preference, setPreference] =
    useState<ThemePreference>(initialPreference);

  const mode: ThemeMode = useMemo(() => {
    if (preference === "system") {
      return systemColorScheme === "dark" ? "dark" : "light";
    }

    return preference;
  }, [preference, systemColorScheme]);

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme) as Theme,
    [mode],
  );

  const setThemePreference = useCallback((newPreference: ThemePreference) => {
    setPreference(newPreference);
  }, []);

  const setThemeMode = useCallback((newMode: ThemeMode) => {
    setPreference(newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(mode === "light" ? "dark" : "light");
  }, [mode]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      mode,
      preference,
      isDark: mode === "dark",
      isLight: mode === "light",
      toggleTheme,
      setThemeMode,
      setThemePreference,
    }),
    [theme, mode, preference, toggleTheme, setThemeMode, setThemePreference],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
