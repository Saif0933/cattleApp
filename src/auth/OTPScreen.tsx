import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Safety check for StatusBar height
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  medical: '#0EA5E9',
  border: 'rgba(0,0,0,0.05)',
};

const OTPScreen = ({ navigation, route }: any) => {
  const { phone, role } = route.params;
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit verification code.");
      return;
    }

    // Role-Based Redirection Logic
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          
          {/* Top Navigation */}
          <View style={styles.navBar}>
            <TouchableOpacity 
              style={styles.backBtn} 
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back-ios" size={20} color={COLORS.primary} style={{marginLeft: 8}} />
            </TouchableOpacity>
            <View style={styles.securityBadge}>
              <Icon name="lock" size={12} color={COLORS.primary} />
              <Text style={styles.securityText}>SECURE ACCESS</Text>
            </View>
          </View>

          {/* Verification Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Verification</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code we've sent to your registered number 
              <Text style={styles.phoneHighlight}> +91 {phone}</Text>
            </Text>
          </View>

          {/* Boutique OTP Hub */}
          <View style={styles.otpWrapper}>
            <TextInput 
              placeholder="000000"
              placeholderTextColor="rgba(15, 41, 30, 0.1)"
              keyboardType="number-pad"
              style={styles.otpInput}
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              autoFocus
              selectionColor={COLORS.primary}
            />
          </View>

          {/* Premium Verification CTA */}
          <TouchableOpacity 
            style={[
              styles.verifyBtn, 
              { 
                backgroundColor: otp.length === 6 ? COLORS.primary : 'rgba(15, 41, 30, 0.05)',
                elevation: otp.length === 6 ? 12 : 0,
                shadowOpacity: otp.length === 6 ? 0.3 : 0
              }
            ]}
            onPress={handleVerify}
            disabled={otp.length !== 6}
          >
            <Text style={[styles.verifyBtnText, { color: otp.length === 6 ? 'white' : 'rgba(15, 41, 30, 0.3)' }]}>VERIFY & CONTINUE</Text>
            <Icon name="verified-user" size={20} color={otp.length === 6 ? 'white' : 'rgba(15, 41, 30, 0.3)'} />
          </TouchableOpacity>

          {/* Resend Logic */}
          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <View style={styles.timerRow}>
                <Text style={styles.timerLabel}>Resend available in </Text>
                <Text style={styles.timerValue}>{timer}s</Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.resendBtn}
                onPress={() => setTimer(30)}
              >
                <Text style={styles.resendLabel}>I didn't receive a code. </Text>
                <Text style={styles.resendLink}>Resend now</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 28 },
  
  navBar: { 
    marginTop: STATUS_BAR_HEIGHT + 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  backBtn: { 
    width: 48, height: 48, borderRadius: 16, 
    backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2
  },
  securityBadge: { 
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.primary + '08', 
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 
  },
  securityText: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 1, marginLeft: 6 },

  header: { marginTop: 45, marginBottom: 40 },
  title: { fontSize: 48, fontWeight: '900', color: COLORS.primary, letterSpacing: -1.5 },
  subtitle: { fontSize: 15, color: COLORS.secondary, marginTop: 15, lineHeight: 24, opacity: 0.6, fontWeight: '500' },
  phoneHighlight: { fontWeight: '900', color: COLORS.primary, opacity: 1 },

  otpWrapper: { 
    height: 65, backgroundColor: 'white', borderRadius: 20, 
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 5 
  },
  otpInput: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: COLORS.primary, 
    textAlign: 'center', 
    width: '100%', 
    letterSpacing: 20, 
    paddingLeft: 20, // Balances the trailing letterSpacing for perfect centering
  },

  verifyBtn: { 
    marginTop: 30, height: 58, borderRadius: 20, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 }, shadowRadius: 20 
  },
  verifyBtnText: { fontSize: 13, fontWeight: '900', marginRight: 12, letterSpacing: 1.2 },
  
  resendContainer: { marginTop: 35, alignItems: 'center' },
  timerRow: { flexDirection: 'row', alignItems: 'center' },
  timerLabel: { fontSize: 14, color: COLORS.secondary, fontWeight: '600', opacity: 0.5 },
  timerValue: { fontSize: 14, color: COLORS.primary, fontWeight: '900' },
  
  resendBtn: { flexDirection: 'row', alignItems: 'center' },
  resendLabel: { fontSize: 14, color: COLORS.secondary, fontWeight: '600', opacity: 0.5 },
  resendLink: { fontSize: 14, color: COLORS.primary, fontWeight: '900', textDecorationLine: 'underline' }
});

export default OTPScreen;
