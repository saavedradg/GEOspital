import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ThemeColors,
  lightColors,
  darkColors,
  shadow,
  shadowDark,
} from '@/constants/theme';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  shadow: typeof shadow;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'auto',
  isDark: false,
  colors: lightColors,
  shadow: shadow,
  setMode: () => {},
});

const THEME_KEY = 'geospital_theme_mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('auto');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then(saved => {
      if (saved === 'light' || saved === 'dark' || saved === 'auto') {
        setModeState(saved);
      }
      setLoaded(true);
    });
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(THEME_KEY, newMode);
  }, []);

  const isDark =
    mode === 'dark' || (mode === 'auto' && systemScheme === 'dark');

  const colors = isDark ? darkColors : lightColors;
  const currentShadow = isDark ? shadowDark : shadow;

  return (
    <ThemeContext.Provider
      value={{ mode, isDark, colors, shadow: currentShadow, setMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
