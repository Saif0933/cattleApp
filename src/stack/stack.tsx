import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigation Components
import BottomTabNavigator from '../cattle/screen/navigation/BottomTab';
import DoctorBottomTab from '../doctor/screen/navigation/DoctorBottomTab';

// Auth Screens
import LoginScreen from '../auth/LoginScreen';
import OTPScreen from '../auth/OTPScreen';
import SelectRoleScreen from '../auth/SelectRoleScreen';
import AddCattle from '../cattle/screen/AddCattle';
import DoctorBookingScreen from '../cattle/screen/DoctorBookingScreen';
import BreedingScreen from '../cattle/screen/BreedingScreen';
import SubscriptionScreen from '../cattle/screen/SubscriptionScreen';
import PetCareScreen from '../cattle/screen/PetCareScreen';
import OrderSummaryScreen from '../cattle/screen/OrderSummaryScreen';
import PaymentScreen from '../cattle/screen/PaymentScreen';
import OrderSuccessScreen from '../cattle/screen/OrderSuccessScreen';
import OrderTrackingScreen from '../cattle/screen/OrderTrackingScreen';
import UpdateAddressScreen from '../cattle/screen/UpdateAddressScreen';
import OrderHistoryScreen from '../cattle/screen/OrderHistoryScreen';
import StoreScreen from '../cattle/screen/StoreScreen';
import StoreStockScreen from '../cattle/screen/StoreStockScreen';
import HealthRecordScreen from '../cattle/screen/HealthRecordScreen';
import AnimalDetailsScreen from '../cattle/screen/AnimalDetailsScreen';
import CommunityScreen from '../cattle/screen/CommunityScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
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
      <Stack.Screen name="Community" component={CommunityScreen} />

    </Stack.Navigator>
  );
};

export default AppStack;
