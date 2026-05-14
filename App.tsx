import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation Components
import BottomTabNavigator from './src/cattle/screen/navigation/BottomTab';
import DoctorBottomTab from './src/doctor/screen/navigation/DoctorBottomTab';

// Auth Screens
import LoginScreen from './src/auth/LoginScreen';
import OTPScreen from './src/auth/OTPScreen';
import SelectRoleScreen from './src/auth/SelectRoleScreen';
import AddCattle from './src/cattle/screen/AddCattle';
import DoctorBookingScreen from './src/cattle/screen/DoctorBookingScreen';
import BreedingScreen from './src/cattle/screen/BreedingScreen';
import SubscriptionScreen from './src/cattle/screen/SubscriptionScreen';
import PetCareScreen from './src/cattle/screen/PetCareScreen';
import OrderSummaryScreen from './src/cattle/screen/OrderSummaryScreen';
import PaymentScreen from './src/cattle/screen/PaymentScreen';
import OrderSuccessScreen from './src/cattle/screen/OrderSuccessScreen';

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
          <Stack.Screen name="AddCattle" component={AddCattle} />
          <Stack.Screen name="DoctorBooking" component={DoctorBookingScreen} />
          <Stack.Screen name="Breeding" component={BreedingScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="PetCare" component={PetCareScreen} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
