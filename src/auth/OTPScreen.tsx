import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  medical: '#0EA5E9',
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
      // Redirect to Doctor Stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'DoctorApp' }],
      });
    } else {
      // Redirect to Cattle Stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Verification</Text>
            <Text style={styles.subtitle}>We've sent a code to <Text style={{fontWeight: '900', color: COLORS.primary}}>+91 {phone}</Text></Text>
          </View>

          <View style={styles.otpBox}>
            <TextInput 
              placeholder="0 0 0 0 0 0"
              placeholderTextColor={COLORS.secondary + '30'}
              keyboardType="number-pad"
              style={[styles.otpInput, { letterSpacing: 15 }]}
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              autoFocus
            />
          </View>

          <TouchableOpacity 
            style={[styles.verifyBtn, { backgroundColor: otp.length === 6 ? COLORS.primary : COLORS.secondary + '20' }]}
            onPress={handleVerify}
            disabled={otp.length !== 6}
          >
            <Text style={[styles.verifyBtnText, { color: otp.length === 6 ? 'white' : COLORS.secondary + '60' }]}>VERIFY & CONTINUE</Text>
          </TouchableOpacity>

          <View style={styles.resendRow}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend code in <Text style={{color: COLORS.primary, fontWeight: '900'}}>{timer}s</Text></Text>
            ) : (
              <TouchableOpacity onPress={() => setTimer(30)}>
                <Text style={styles.resendText}>Resend OTP</Text>
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
  content: { flex: 1, paddingHorizontal: 30 },
  backBtn: { marginTop: 20, width: 44, height: 44, borderRadius: 15, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  header: { marginTop: 40, marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '900', color: COLORS.primary, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: COLORS.secondary, marginTop: 10, lineHeight: 22, opacity: 0.7 },
  otpBox: { 
    height: 80, backgroundColor: 'white', borderRadius: 24, 
    justifyContent: 'center', alignItems: 'center',
    elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 15 
  },
  otpInput: { fontSize: 28, fontWeight: '900', color: COLORS.primary, textAlign: 'center', width: '100%' },
  verifyBtn: { marginTop: 30, height: 65, borderRadius: 24, justifyContent: 'center', alignItems: 'center', elevation: 10 },
  verifyBtnText: { fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  resendRow: { marginTop: 30, alignItems: 'center' },
  timerText: { fontSize: 14, color: COLORS.secondary, fontWeight: '600' },
  resendText: { fontSize: 14, color: COLORS.primary, fontWeight: '900', textDecorationLine: 'underline' }
});

export default OTPScreen;
