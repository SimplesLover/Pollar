import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { light as lightColors, dark as darkColors } from '../design/colors';

const ThemeContext = createContext({
  themeMode: 'system',
  setThemeMode: () => {},
  toggleTheme: () => {},
  resetToSystem: () => {},
  isDark: false,
  resolvedScheme: 'light',
  palette: lightColors,
});

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('system');
  const systemScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('theme_mode');
        if (saved) setThemeMode(saved);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (themeMode && typeof themeMode === 'string') {
      AsyncStorage.setItem('theme_mode', themeMode).catch(() => {});
    }
  }, [themeMode]);

  // Toggle between light and dark; if on system, toggle to the opposite of current system
  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'system') {
        return systemScheme === 'dark' ? 'light' : 'dark';
      }
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  const resetToSystem = () => setThemeMode('system');

  const resolvedScheme = themeMode === 'system' ? (systemScheme || 'light') : themeMode;
  const isDark = resolvedScheme === 'dark';
  const palette = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleTheme, resetToSystem, isDark, resolvedScheme, palette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}