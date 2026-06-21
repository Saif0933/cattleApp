import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRegisterBrand } from '../api/hook/marketplace/brands';
import { useThemeColors } from '../context/useTheme';
import { useUser } from '../context/UserContext';
import apiClient from '../api/apiClient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const RegisterMarketplaceScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { setUser, setToken } = useUser();

  const [brandName, setBrandName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [address, setAddress] = useState('');

  const registerBrandMutation = useRegisterBrand({
    onSuccess: (data) => {
      Alert.alert("Registration Successful", "Please log in again to continue as a brand seller.", [
        { 
          text: "OK", 
          onPress: () => {
            // Logout user
            setToken(null);
            setUser(null);
            delete apiClient.defaults.headers.common['Authorization'];
            
            // Redirect to Login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login', params: { role: 'brand' } }],
            });
          }
        }
      ]);
    },
    onError: (error: any) => {
      Alert.alert(
        'Registration Failed',
        error?.response?.data?.message || error.message || 'Unable to register your marketplace account. Please try again.'
      );
    }
  });

  const handleRegister = () => {
    if (!brandName.trim()) {
      Alert.alert('Validation Error', 'Please enter your brand or shop name.');
      return;
    }
    if (!stateName.trim() || !cityName.trim()) {
      Alert.alert('Validation Error', 'Please enter your state and city.');
      return;
    }

    // Auto-generate slug from brand name
    const slug = brandName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const payload: any = {
      brandName: brandName.trim(),
      slug: slug,
      contactEmail: contactEmail.trim() || null,
      contactPhone: contactPhone.trim() || null,
      gstNumber: gstNumber.trim() || null,
      address: address.trim() || null,
      stateName: stateName.trim(),
      cityName: cityName.trim(),
    };

    registerBrandMutation.mutate(payload);
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
          <StatusBar barStyle={COLORS.isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
          
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color={COLORS.surface} />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.formCard}>
                <View style={styles.iconContainer}>
                  <Icon name="storefront-outline" size={40} color={COLORS.medical || '#0D9488'} />
                </View>
                <Text style={styles.cardTitle}>Become a Seller</Text>
                <Text style={styles.cardSubtitle}>
                  Register your brand or shop to start selling on the AgriMarket network.
                </Text>

                {/* Brand Name Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Brand / Shop Name *</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="tag-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Mega Vet Supplies"
                      placeholderTextColor="#9CA3AF"
                      value={brandName}
                      onChangeText={setBrandName}
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Business Email</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="email-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. contact@megavet.com"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      value={contactEmail}
                      onChangeText={setContactEmail}
                    />
                  </View>
                </View>

                {/* Phone Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Business Phone</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="phone-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. +91 9876543210"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="phone-pad"
                      value={contactPhone}
                      onChangeText={setContactPhone}
                    />
                  </View>
                </View>

                {/* GST Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>GST Number (Optional)</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="file-document-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. 22AAAAA0000A1Z5"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="characters"
                      value={gstNumber}
                      onChangeText={setGstNumber}
                    />
                  </View>
                </View>

                {/* Location Layout */}
                <View style={styles.row}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.fieldLabel}>State *</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g. Maharashtra"
                        placeholderTextColor="#9CA3AF"
                        value={stateName}
                        onChangeText={setStateName}
                      />
                    </View>
                  </View>
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
                    <Text style={styles.fieldLabel}>City *</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g. Pune"
                        placeholderTextColor="#9CA3AF"
                        value={cityName}
                        onChangeText={setCityName}
                      />
                    </View>
                  </View>
                </View>

                {/* Address */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Full Address</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="map-marker-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. 123 Main Street"
                      placeholderTextColor="#9CA3AF"
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={[styles.submitBtn, registerBrandMutation.isPending && styles.submitBtnDisabled]}
                  onPress={handleRegister}
                  disabled={registerBrandMutation.isPending}
                  activeOpacity={0.8}
                >
                  {registerBrandMutation.isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitBtnText}>CREATE SELLER ACCOUNT</Text>
                  )}
                </TouchableOpacity>

              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
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
    backgroundColor: COLORS.isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.65)',
  },
  container: { 
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  scrollContent: { 
    flexGrow: 1,
    paddingHorizontal: 20, 
    justifyContent: 'flex-end',
    paddingBottom: 40
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 35,
    padding: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(13, 148, 136, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: COLORS.background,
  },
  inputIcon: {
    marginRight: 10,
  },
  dividerV: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    height: '100%',
  },
  submitBtn: {
    height: 56,
    backgroundColor: COLORS.medical || '#0D9488',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.medical || '#0D9488',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SANS,
    letterSpacing: 1,
  }
});

export default RegisterMarketplaceScreen;
