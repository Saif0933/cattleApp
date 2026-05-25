import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../../context/useTheme';

// Import screens
import HerdScreen from '../CattleScreen';
import HomeScreen from '../Home';
import ProfileScreen from '../ProfileScreen';
import ReportsScreen from '../ReportsScreen';

const Tab = createBottomTabNavigator();
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const AddPlaceholder = () => null;

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
      
      {/* Central Floating Add Button */}
      <Tab.Screen 
        name="Add" 
        component={AddPlaceholder} 
        options={{
          tabBarLabel: '',
          tabBarButton: (props: any) => (
            <TouchableOpacity 
              {...props} 
              style={[props.style, styles.fabContainer]} 
              onPress={() => navigation.navigate('AddCattle')}
              activeOpacity={0.8}
            >
              <View style={styles.fabCircle}>
                <Icon name="add" size={32} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="More" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  fabContainer: { top: -20, justifyContent: 'center', alignItems: 'center' },
  fabCircle: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#16A34A',
    justifyContent: 'center', alignItems: 'center', elevation: 4,
    shadowColor: '#16A34A', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8,
  },
});

export default BottomTabNavigator;
