import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Alert, PermissionsAndroid, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import Doctor screens
import DoctorHome from '../DoctorHome';
import DoctorProfile from '../DoctorProfile';
import DoctorMarket from '../PharmacyScreen';
import RecordeScreen from '../RecordeScreen';

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#0F291E',
  medical: '#0EA5E9',
  secondary: '#635d5a',
  background: '#ffffff',
  accent: '#FFB800',
};

const PrescribePlaceholder = () => null;

const DoctorBottomTab = () => {
  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "Vet app needs access to your camera to scan prescriptions.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Permission Denied", "Camera permission is required.");
        return;
      }

      const options: ImagePicker.CameraOptions = {
        mediaType: 'photo',
        includeBase64: false,
      };

      ImagePicker.launchCamera(options, (response) => {
        if (!response.didCancel && !response.errorCode) {
          Alert.alert('Success', 'Prescription Captured!');
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
          if (route.name === 'Clinic') iconName = 'local-hospital';
          else if (route.name === 'Pharmacy') iconName = 'medical-services';
          else if (route.name === 'Profile') iconName = 'account-circle';
          else if (route.name === 'Records') iconName = 'assignment';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.medical,
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
      <Tab.Screen name="Clinic" component={DoctorHome} />
      <Tab.Screen name="Pharmacy" component={DoctorMarket} />
      
      <Tab.Screen 
        name="Prescribe" 
        component={PrescribePlaceholder} 
        options={{
          tabBarLabel: '',
          tabBarButton: (props: any) => (
            <TouchableOpacity
              {...props}
              style={[props.style, styles.cameraButtonContainer]}
              onPress={openCamera}
            >
              <View style={styles.cameraButton}>
                <Icon name="add-a-photo" size={28} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen name="Records" component={RecordeScreen} /> 
      <Tab.Screen name="Profile" component={DoctorProfile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  cameraButtonContainer: { top: -20, justifyContent: 'center', alignItems: 'center' },
  cameraButton: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.medical,
    justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: COLORS.medical,
    shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5
  },
});

export default DoctorBottomTab;
