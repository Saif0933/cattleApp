import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSendOtp } from '../api/hook/user/auth';
import { useThemeColors } from '../context/useTheme';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const LoginScreen = ({ navigation, route }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const role = route.params?.role || 'cattle';

  const [phone, setPhone] = useState('');

  const { mutate: sendOtp, isPending } = useSendOtp({
    onSuccess: (response) => {
      if (response.success) {
        if (response.data?.otp) {
          Alert.alert("Verification OTP (Dev Mode)", `Use OTP code: ${response.data.otp}`);
        }
        navigation.navigate('OTP', { phone: phone.trim(), role });
      } else {
        Alert.alert("Failed to Send OTP", response.message || "Something went wrong.");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Connection Error", 
        error?.response?.data?.message || error.message || "Failed to reach the server. Please check your network connection."
      );
    }
  });

  const handleLogin = () => {
    if (phone.trim().length < 10) return;
    sendOtp({ mobile: phone.trim() });
  };

  const isValid = phone.trim().length >= 10;

  return (
    <ImageBackground
      source={require('../../assets/cattle_farm.png')}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
          
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              




              {/* Welcome Back Card */}
              <View style={styles.loginCard}>
                <Text style={styles.cardTitle}>Welcome Back!</Text>
                <Text style={styles.cardSubtitle}>Login to continue managing your cattle</Text>

                {/* Mobile Input Field */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Mobile Number</Text>
                  <View style={styles.inputWrapper}>
                    {/* Icon prefix */}
                    <Icon name="cellphone" size={20} color="#16A34A" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    {/* Country Code */}
                    <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
                    <TextInput
                      placeholder="Enter 10-digit number"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={phone}
                      onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ''))}
                      keyboardType="phone-pad"
                      maxLength={10}
                      editable={!isPending}
                    />
                  </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={[styles.loginBtn, { backgroundColor: isValid && !isPending ? '#16A34A' : (COLORS.isDark ? '#1F2937' : '#E5E7EB') }]}
                  onPress={handleLogin}
                  activeOpacity={0.85}
                  disabled={!isValid || isPending}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={[styles.loginBtnText, { color: isValid ? '#FFFFFF' : (COLORS.isDark ? '#4B5563' : '#9CA3AF') }]}>
                      Login
                    </Text>
                  )}
                </TouchableOpacity>

              </View>

              {/* Data Protection Alert Box */}
              <View style={styles.safetyBox}>
                <View style={styles.shieldIconContainer}>
                  <Icon name="shield-check-outline" size={28} color="#16A34A" />
                </View>
                <View style={styles.safetyTextContainer}>
                  <Text style={styles.safetyTitle}>Your data is safe with us</Text>
                  <Text style={styles.safetySubtitle}>
                    We never share your information with anyone.
                  </Text>
                </View>
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
    backgroundColor: COLORS.isDark ? 'rgba(10, 30, 20, 0.75)' : 'rgba(255, 255, 255, 0.15)',
  },
  container: { 
    flex: 1,
  },
  scrollContent: { 
    flexGrow: 1,
    paddingHorizontal: 20, 
    justifyContent: 'flex-end',
    paddingTop: height * 0.12,
    paddingBottom: 80
  },


  loginCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    textAlign: 'center'
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24
  },

  formGroup: {
    marginBottom: 20
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    marginBottom: 8
  },
  inputWrapper: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: COLORS.background
  },
  inputIcon: {
    marginRight: 10
  },
  dividerV: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginRight: 10
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    padding: 0
  },

  loginBtn: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '900',
    fontFamily: FONT_SANS
  },

  safetyBox: {
    backgroundColor: COLORS.isDark ? 'rgba(22, 163, 74, 0.15)' : '#EBF5ED',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.isDark ? 'rgba(22, 163, 74, 0.3)' : '#D4E2D8',
    marginBottom: 10
  },
  shieldIconContainer: {
    marginRight: 12
  },
  safetyTextContainer: {
    flex: 1
  },
  safetyTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SANS
  },
  safetySubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginTop: 2
  }
});

export default LoginScreen;
