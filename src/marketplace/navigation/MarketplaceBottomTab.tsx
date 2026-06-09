import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../../context/useTheme';

// Import Marketplace Screens
import MarketplaceHomeScreen from '../MarketplaceHomeScreen';
import MarketplaceCategoriesScreen from '../MarketplaceCategoriesScreen';
import MarketplaceCartScreen from '../MarketplaceCartScreen';
import MarketplaceProfileScreen from '../MarketplaceProfileScreen';

const Tab = createBottomTabNavigator();
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const MarketplaceBottomTab = () => {
  const COLORS = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'storefront-outline';
          
          if (route.name === 'Home') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'view-grid' : 'view-grid-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }

          return <Icon name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: COLORS.medical || '#0D9488',
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 12,
          paddingTop: 10,
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          fontFamily: FONT_SANS,
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MarketplaceHomeScreen} 
        options={{ tabBarLabel: 'Shop' }} 
      />
      <Tab.Screen 
        name="Categories" 
        component={MarketplaceCategoriesScreen} 
        options={{ tabBarLabel: 'Categories' }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={MarketplaceCartScreen} 
        options={{ tabBarLabel: 'Cart' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={MarketplaceProfileScreen} 
        options={{ tabBarLabel: 'Profile' }} 
      />
    </Tab.Navigator>
  );
};

export default MarketplaceBottomTab;
