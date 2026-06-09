
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useThemeColors } from '../context/useTheme';

const { height } = Dimensions.get('window');

const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const FONT_SANS =
  Platform.OS === 'ios'
    ? 'Helvetica Neue'
    : 'sans-serif-medium';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
];

const SelectLocationScreen = ({
  navigation,
  route,
}: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const role = route.params?.role || 'cattle';

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const filteredStates = INDIAN_STATES.filter(
    state =>
      state
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // ============================================
  // REDIRECT
  // ============================================

  const handleProceed = () => {
    setLoading(false);

    if (role === 'doctor') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DoctorApp' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }
  };

  // ============================================
  // REQUEST LOCATION PERMISSION
  // ============================================

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'CattleCare needs access to your location.',
          buttonPositive: 'Allow',
          buttonNegative: 'Cancel',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // ============================================
  // AUTO LOCATION
  // ============================================

  const handleAutoLocation = async () => {
    let positionResolved = false;

    const proceedWithFallback = () => {
      if (!positionResolved) {
        positionResolved = true;
        setLoading(false);
        handleProceed();
      }
    };

    // Fallback timer: if GPS lock takes more than 1.5 seconds, navigate to app using defaults.
    const fallbackTimer = setTimeout(() => {
      proceedWithFallback();
    }, 1500);

    try {
      setLoading(true);

      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        clearTimeout(fallbackTimer);
        proceedWithFallback();
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          clearTimeout(fallbackTimer);
          if (!positionResolved) {
            positionResolved = true;
            console.log('Current Location:', position);
            setLoading(false);
            handleProceed();
          }
        },
        error => {
          console.log('Location Error:', error);
          clearTimeout(fallbackTimer);
          proceedWithFallback();
        },
        {
          enableHighAccuracy: false,
          timeout: 1500,
          maximumAge: 10000,
        },
      );
    } catch (error) {
      console.log(error);
      clearTimeout(fallbackTimer);
      proceedWithFallback();
    }
  };

  // ============================================
  // MANUAL LOCATION
  // ============================================

  const handleSelectState = (stateName: string) => {
    setModalVisible(false);
    setSearchQuery('');
    handleProceed();
  };

  return (
    <ImageBackground
      source={require('../../assets/cattle_farm.png')}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={COLORS.isDark ? "light-content" : "dark-content"}
            backgroundColor="transparent"
            translucent
          />

          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>
                Select Location
              </Text>
            </View>

            <View style={styles.cardsContainer}>
              {/* FIND LOCATION */}

              <TouchableOpacity
                style={styles.roleCard}
                onPress={handleAutoLocation}
                activeOpacity={0.9}
                disabled={loading}
              >
                <View
                  style={[
                    styles.avatarContainer,
                    {
                      backgroundColor:
                        '#E2F0D9',
                    },
                  ]}
                >
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color="#16A34A"
                    />
                  ) : (
                    <Icon
                      name="crosshairs-gps"
                      size={32}
                      color="#16A34A"
                    />
                  )}
                </View>

                <View style={styles.roleInfo}>
                  <Text style={styles.roleName}>
                    Find my location
                  </Text>

                  <Text
                    style={
                      styles.roleDescription
                    }
                  >
                    Automatically fetch your
                    current GPS coordinates.
                  </Text>
                </View>

                <Icon
                  name="chevron-right"
                  size={26}
                  color="#16A34A"
                />
              </TouchableOpacity>

              {/* OTHER LOCATION */}

              <TouchableOpacity
                style={styles.roleCard}
                onPress={() =>
                  setModalVisible(true)
                }
              >
                <View
                  style={[
                    styles.avatarContainer,
                    {
                      backgroundColor:
                        '#D9ECF0',
                    },
                  ]}
                >
                  <Icon
                    name="map-marker-radius-outline"
                    size={32}
                    color="#0284C7"
                  />
                </View>

                <View style={styles.roleInfo}>
                  <Text style={styles.roleName}>
                    Other location
                  </Text>

                  <Text
                    style={
                      styles.roleDescription
                    }
                  >
                    Manually enter your address
                    or search on map.
                  </Text>
                </View>

                <Icon
                  name="chevron-right"
                  size={26}
                  color="#0284C7"
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Choose State
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setModalVisible(false)
                }
              >
                <Icon
                  name="close"
                  size={24}
                  color="#4B5563"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.searchWrapper}>
              <Icon
                name="magnify"
                size={20}
                color="#9CA3AF"
              />

              <TextInput
                placeholder="Search State..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <FlatList
              data={filteredStates}
              keyExtractor={item => item}
              style={{
                maxHeight: height * 0.4,
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stateItem}
                  onPress={() =>
                    handleSelectState(item)
                  }
                >
                  <Text
                    style={
                      styles.stateNameText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const getStyles = (COLORS: any) =>
  StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    backgroundImageStyle: {
      transform: [{ scale: 1.22 }],
    },

    overlay: {
      flex: 1,
      backgroundColor: COLORS.isDark ? 'rgba(10, 30, 20, 0.75)' : 'rgba(255,255,255,0.15)',
    },

    container: {
      flex: 1,
    },

    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },

    titleSection: {
      alignItems: 'center',
      marginBottom: 32,
    },

    title: {
      fontSize: 32,
      fontWeight: '900',
      color: COLORS.isDark ? '#FFFFFF' : '#0F291E',
      fontFamily: FONT_SERIF,
    },

    cardsContainer: {
      gap: 16,
    },

    roleCard: {
      backgroundColor: COLORS.surface,
      borderRadius: 24,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
    },

    avatarContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },

    roleInfo: {
      flex: 1,
      marginLeft: 16,
    },

    roleName: {
      fontSize: 18,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
    },

    roleDescription: {
      fontSize: 12,
      fontWeight: '700',
      color: COLORS.secondary,
      marginTop: 4,
    },

    modalBackdrop: {
      flex: 1,
      backgroundColor:
        'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },

    modalCard: {
      backgroundColor: COLORS.surface,
      borderRadius: 24,
      padding: 24,
    },

    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },

    modalTitle: {
      fontSize: 22,
      fontWeight: '900',
      color: COLORS.primary,
    },

    searchWrapper: {
      height: 48,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      backgroundColor: COLORS.background,
      marginBottom: 16,
    },

    searchInput: {
      flex: 1,
      marginLeft: 8,
      color: COLORS.primary,
    },

    stateItem: {
      paddingVertical: 14,
    },

    stateNameText: {
      fontSize: 15,
      fontWeight: '700',
      color: COLORS.primary,
    },
  });

export default SelectLocationScreen;
