import React from 'react';
import { TouchableOpacity, Alert, View, StyleSheet, PermissionsAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';

// Import your screens
import HomeScreen from '../Home';
import MarketScreen from '../MarketScreen';
import HerdScreen from '../HerdScreen';
import ProfileScreen from '../ProfileScreen';

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#0e2819',
  secondary: '#635d5a',
  background: '#ffffff',
  accent: '#E98961',
};

// Placeholder for Camera Screen (it won't actually navigate here because we use tabBarButton)
const CameraPlaceholder = () => null;

const BottomTabNavigator = () => {
  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera to take photos.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos.");
        return;
      }

      const options: ImagePicker.CameraOptions = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage || 'Could not open camera.');
        } else {
          Alert.alert('Success', 'Photo captured!');
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Market') iconName = 'storefront';
          else if (route.name === 'My Herd') iconName = 'pets';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Camera') iconName = 'photo-camera';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          backgroundColor: COLORS.background,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      
      <Tab.Screen 
        name="Camera" 
        component={CameraPlaceholder} 
        options={{
          tabBarLabel: '',
          tabBarButton: (props: any) => {
            return (
              <TouchableOpacity
                {...props}
                style={[props.style, styles.cameraButtonContainer]}
                onPress={openCamera}
              >
                <View style={styles.cameraButton}>
                  <Icon name="photo-camera" size={30} color="white" />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tab.Screen name="My Herd" component={HerdScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  cameraButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default BottomTabNavigator;
