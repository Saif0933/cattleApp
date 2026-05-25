import { useColorScheme } from 'react-native';

export const useThemeColors = () => {
  const isDark = false;

  return {
    isDark,
    primary: '#16A34A', // Vibrant grass green from flowchart buttons
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
};

