import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider } from './src/context/useTheme';
import AppStack from './src/stack/stack';

// Initialize QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ThemeProvider>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          </ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
