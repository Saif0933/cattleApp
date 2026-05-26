import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const LIGHT_COLORS = {
  isDark: false,
  primary: '#16A34A', // Vibrant grass green
  darkGreen: '#0F291E', // Dark forest green for titles and headings
  secondary: '#556B60', // Soft text / body labels
  accent: '#16A34A',
  background: '#F5F7F5', // Tinted clean background
  surface: '#FFFFFF',
  border: 'rgba(15,41,30,0.08)',
  card: '#FFFFFF',
  text: '#0F291E',
  subText: '#556B60',
  white: '#FFFFFF',
  black: '#000000',
  emerald: '#16A34A',
  crimson: '#EF4444',
  medical: '#3B82F6',
  gold: '#F59E0B',
  glass: 'rgba(255, 255, 255, 0.9)',
};

const DARK_COLORS = {
  isDark: true,
  primary: '#16A34A',
  darkGreen: '#E6EFEA', // Light forest green tint for dark mode headings
  secondary: '#A7B7B0', // Soft text for dark mode
  accent: '#16A34A',
  background: '#0B1511', // Dark forest green background
  surface: '#12201A', // Dark card container
  border: 'rgba(255, 255, 255, 0.08)',
  card: '#12201A',
  text: '#E6EFEA',
  subText: '#A7B7B0',
  white: '#FFFFFF',
  black: '#000000',
  emerald: '#16A34A',
  crimson: '#EF4444',
  medical: '#3B82F6',
  gold: '#F59E0B',
  glass: 'rgba(18, 32, 26, 0.9)',
};

type ThemeContextType = {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  colors: typeof LIGHT_COLORS;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  useEffect(() => {
    setIsDark(systemScheme === 'dark');
  }, [systemScheme]);

  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  return React.createElement(
    ThemeContext.Provider,
    { value: { isDark, setIsDark, colors } },
    children
  );
};

export const useThemeColors = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return LIGHT_COLORS;
  }
  return context.colors;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
