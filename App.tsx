import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/context/UserContext';

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
import OrderTrackingScreen from './src/cattle/screen/OrderTrackingScreen';
import UpdateAddressScreen from './src/cattle/screen/UpdateAddressScreen';
import OrderHistoryScreen from './src/cattle/screen/OrderHistoryScreen';
import StoreScreen from './src/cattle/screen/StoreScreen';
import StoreStockScreen from './src/cattle/screen/StoreStockScreen';
import HealthRecordScreen from './src/cattle/screen/HealthRecordScreen';
import AnimalDetailsScreen from './src/cattle/screen/AnimalDetailsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
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
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
            <Stack.Screen name="UpdateAddress" component={UpdateAddressScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            <Stack.Screen name="Store" component={StoreScreen} />
            <Stack.Screen name="StoreStock" component={StoreStockScreen} />
            <Stack.Screen name="HealthRecord" component={HealthRecordScreen} />
            <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}

export default App;
