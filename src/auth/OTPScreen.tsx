import React, { useEffect, useState } from 'react';
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
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import apiClient from '../api/apiClient';
import { useSendOtp, useVerifyOtp } from '../api/hook/user/auth';
import { useUser } from '../context/UserContext';
import { useThemeColors } from '../context/useTheme';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const OTPScreen = ({ navigation, route }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { setUser, setToken } = useUser();
  const phone = route.params?.phone || '';
  const role = route.params?.role || 'user';
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { mutate: verifyOtp, isPending } = useVerifyOtp({
    onSuccess: (response) => {
      if (response.success) {
        // Set authorization token in apiClient
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Save to context
        setToken(response.data.token);
        setUser(response.data.user);

        // Auto-detect role from backend
        let finalRole = role;
        if (response.data.user?.role === 'DOCTOR') {
          finalRole = 'doctor';
        }

        navigation.reset({
          index: 0,
          routes: [{ name: 'SelectLocation', params: { role: finalRole } }],
        });
      } else {
        Alert.alert("Verification Failed", response.message || "Invalid OTP code.");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Verification Error", 
        error?.response?.data?.message || error.message || "An error occurred during verification. Please try again."
      );
    }
  });

  const { mutate: resendOtp, isPending: isResending } = useSendOtp({
    onSuccess: (response) => {
      if (response.success) {
        setTimer(30);
        if (response.data?.otp) {
          if (Platform.OS === 'android') {
            ToastAndroid.showWithGravityAndOffset(
              `Dev Mode OTP: ${response.data.otp}`,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100
            );
          } else {
            Alert.alert("OTP Sent (Dev Mode)", `Your new verification code is: ${response.data.otp}`);
          }
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Verification code resent.', ToastAndroid.SHORT);
          } else {
            Alert.alert("OTP Sent", "A new verification code has been sent to your number.");
          }
        }
      } else {
        Alert.alert("Resend Failed", response.message || "Could not resend OTP code.");
      }
    },
    onError: (error: any) => {
      Alert.alert(
        "Error", 
        error?.response?.data?.message || error.message || "Failed to reach the server. Please check your connection."
      );
    }
  });

  const handleVerify = () => {
    if (otp.length !== 4) {
      Alert.alert("Invalid OTP", "Please enter the 4-digit verification code.");
      return;
    }
    verifyOtp({ mobile: phone, otp });
  };

  const handleResend = () => {
    if (isResending) return;
    resendOtp({ mobile: phone });
  };

  const isOtpValid = otp.length === 4;

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
              
              {/* OTP Card */}
              <View style={styles.loginCard}>
                <Text style={styles.cardTitle}>Verification</Text>
                <Text style={styles.cardSubtitle}>
                  Enter the 4-digit code sent to{' '}
                  <Text style={styles.phoneHighlight}>+91 {phone}</Text>
                </Text>

                {/* OTP Input Field */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Enter OTP</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="shield-lock-outline" size={20} color="#16A34A" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      placeholder="0000"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={otp}
                      onChangeText={(t) => setOtp(t.replace(/[^0-9]/g, ''))}
                      keyboardType="number-pad"
                      maxLength={4}
                      editable={!isPending}
                      autoFocus
                    />
                  </View>
                </View>

                {/* Resend Action */}
                <View style={styles.resendWrapper}>
                  {isResending ? (
                    <ActivityIndicator size="small" color="#16A34A" />
                  ) : timer > 0 ? (
                    <Text style={styles.timerText}>
                      Resend code in <Text style={styles.timerBold}>{timer}s</Text>
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                      <Text style={styles.resendLink}>Resend OTP</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  style={[styles.loginBtn, { backgroundColor: isOtpValid && !isPending ? '#16A34A' : (COLORS.isDark ? '#1F2937' : '#E5E7EB') }]}
                  onPress={handleVerify}
                  activeOpacity={0.85}
                  disabled={!isOtpValid || isPending}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={[styles.loginBtnText, { color: isOtpValid ? '#FFFFFF' : (COLORS.isDark ? '#4B5563' : '#9CA3AF') }]}>
                      Verify & Continue
                    </Text>
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
    marginBottom: 24,
    lineHeight: 18
  },
  phoneHighlight: {
    fontWeight: '900',
    color: COLORS.primary
  },

  formGroup: {
    marginBottom: 16
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
    marginRight: 12
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    padding: 0,
    letterSpacing: 2
  },

  resendWrapper: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: FONT_SANS
  },
  timerBold: {
    fontWeight: '900',
    color: '#16A34A'
  },
  resendLink: {
    fontSize: 13,
    fontWeight: '900',
    color: '#16A34A',
    fontFamily: FONT_SANS,
    textDecorationLine: 'underline'
  },

  loginBtn: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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


});

export default OTPScreen;
