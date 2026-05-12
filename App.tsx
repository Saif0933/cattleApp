import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation Components
import BottomTabNavigator from './src/cattle/screen/navigation/BottomTab';
import DoctorBottomTab from './src/doctor/screen/navigation/DoctorBottomTab';

// Auth Screens
import SelectRoleScreen from './src/auth/SelectRoleScreen';
import LoginScreen from './src/auth/LoginScreen';
import OTPScreen from './src/auth/OTPScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {/* Auth Flow */}
          <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />

          {/* Main App Redirections */}
          <Stack.Screen name="MainApp" component={BottomTabNavigator} />
          <Stack.Screen name="DoctorApp" component={DoctorBottomTab} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
