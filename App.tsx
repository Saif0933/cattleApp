import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/context/UserContext';
import AppStack from './src/stack/stack';

function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}

export default App;
