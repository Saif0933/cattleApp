import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Navigation Components
import BottomTabNavigator from '../cattle/screen/navigation/BottomTab';
import DoctorBottomTab from '../doctor/screen/navigation/DoctorBottomTab';

// Auth Screens
import LoginScreen from '../auth/LoginScreen';
import OnboardingScreen from '../auth/OnboardingScreen';
import OTPScreen from '../auth/OTPScreen';
import SelectLocationScreen from '../auth/SelectLocationScreen';
import SplashScreen from '../auth/SplashScreen';

// Cattle Screens
import AddCattle from '../cattle/screen/AddCattle';
import AnimalDetailsScreen from '../cattle/screen/AnimalDetailsScreen';
import BreedingScreen from '../cattle/screen/BreedingScreen';
import CommunityScreen from '../cattle/screen/CommunityScreen';
import DoctorBookingScreen from '../cattle/screen/DoctorBookingScreen';
import FarmProfileScreen from '../cattle/screen/FarmProfileScreen';
import HealthRecordScreen from '../cattle/screen/HealthRecordScreen';
import HelpSupportScreen from '../cattle/screen/HelpSupportScreen';
import MilkProductionReportScreen from '../cattle/screen/MilkProductionReportScreen';
import OrderHistoryScreen from '../cattle/screen/OrderHistoryScreen';
import OrderSuccessScreen from '../cattle/screen/OrderSuccessScreen';
import OrderSummaryScreen from '../cattle/screen/OrderSummaryScreen';
import OrderTrackingScreen from '../cattle/screen/OrderTrackingScreen';
import PaymentScreen from '../cattle/screen/PaymentScreen';
import PetCareScreen from '../cattle/screen/PetCareScreen';
import ProductDetailsScreen from '../cattle/screen/ProductDetailsScreen';
import ReportsScreen from '../cattle/screen/ReportsScreen';
import SettingsScreen from '../cattle/screen/SettingsScreen';
import SubscriptionScreen from '../cattle/screen/SubscriptionScreen';
import UpdateAddressScreen from '../cattle/screen/UpdateAddressScreen';
import RegisterDoctorScreen from '../cattle/screen/RegisterDoctorScreen';
import MarketplaceHomeScreen from '../marketplace/MarketplaceHomeScreen';
import MarketplaceProductDetails from '../marketplace/MarketplaceProductDetails';
import MarketplaceProfileScreen from '../marketplace/MarketplaceProfileScreen';
import RegisterMarketplaceScreen from '../marketplace/RegisterMarketplaceScreen';
import MarketplaceBottomTab from '../marketplace/navigation/MarketplaceBottomTab';
import MarketplaceCategoriesScreen from '../marketplace/MarketplaceCategoriesScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      
      {/* App Branding & Auth Flow */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
      <Stack.Screen name="RegisterDoctor" component={RegisterDoctorScreen} />

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
      <Stack.Screen name="HealthRecord" component={HealthRecordScreen} />
      <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="MilkProductionReport" component={MilkProductionReportScreen} />
      <Stack.Screen name="FarmProfile" component={FarmProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      
      {/* Marketplace Screens */}
      <Stack.Screen name="MarketplaceHome" component={MarketplaceHomeScreen} />
      <Stack.Screen name="MarketplaceProductDetails" component={MarketplaceProductDetails} />
      <Stack.Screen name="MarketplaceCategories" component={MarketplaceCategoriesScreen} />
      <Stack.Screen name="MarketplaceProfile" component={MarketplaceProfileScreen} />
      <Stack.Screen name="RegisterMarketplace" component={RegisterMarketplaceScreen} />
      <Stack.Screen name="MarketplaceApp" component={MarketplaceBottomTab} />

    </Stack.Navigator>
  );
};

export default AppStack;
