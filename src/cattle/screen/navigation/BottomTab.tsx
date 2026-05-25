import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../../context/useTheme';

// Import screens
import HerdScreen from '../CattleScreen';
import HomeScreen from '../Home';
import ProfileScreen from '../ProfileScreen';
import ReportsScreen from '../ReportsScreen';
import CommunityScreen from '../CommunityScreen';

const Tab = createBottomTabNavigator();
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const BottomTabNavigator = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'dashboard';
          else if (route.name === 'Cattle') iconName = 'pets';
          else if (route.name === 'Community') iconName = 'forum';
          else if (route.name === 'Reports') iconName = 'assessment';
          else if (route.name === 'More') iconName = 'menu';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: COLORS.secondary + '90',
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1.5,
          borderTopColor: COLORS.border,
          elevation: 4,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '900',
          fontFamily: FONT_SANS,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cattle" component={HerdScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="More" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  // No custom FAB styles needed
});

export default BottomTabNavigator;
