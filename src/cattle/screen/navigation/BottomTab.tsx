import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Alert, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import your screens
import HerdScreen from '../HerdScreen';
import HomeScreen from '../Home';
import MarketScreen from '../MarketScreen';
import ProfileScreen from '../ProfileScreen';

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#ffffff',
};

const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const CameraPlaceholder = () => null;

const BottomTabNavigator = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'dashboard';
          else if (route.name === 'Market') iconName = 'storefront';
          else if (route.name === 'Healthcare') iconName = 'health-and-safety';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Community') iconName = 'forum';
          else if (route.name === 'Camera') iconName = 'photo-camera';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          fontFamily: FONT_SERIF,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Market" component={MarketScreen} options={{ tabBarLabel: 'Marketplace' }} />
      
      <Tab.Screen 
        name="Community" 
        component={CameraPlaceholder} 
        options={{
          tabBarLabel: '',
          tabBarButton: (props: any) => (
            <TouchableOpacity 
              {...props} 
              style={[props.style, styles.fabContainer]} 
              onPress={() => navigation.navigate('Community')}
            >
              <View style={styles.fabCircle}>
                <Icon name="forum" size={35} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen name="Healthcare" component={HerdScreen} options={{ tabBarLabel: 'My Herd' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  fabContainer: { top: -20, justifyContent: 'center', alignItems: 'center' },
  fabCircle: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', elevation: 10,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3, shadowRadius: 10,
  },
});

export default BottomTabNavigator;
