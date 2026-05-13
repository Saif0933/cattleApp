import React, { useState } from 'react';
import {
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

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

// Safety check for StatusBar height
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  emerald: '#10B981',
  border: 'rgba(0,0,0,0.05)',
};

const LoginScreen = ({ navigation, route }: any) => {
  const role = route.params?.role || 'user';
  const [phone, setPhone] = useState('');

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
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{role.toUpperCase()} MODE</Text>
            </View>
          </View>

          {/* Immersive Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.title}>Cattle <Text style={{color: COLORS.accent}}>Elite</Text></Text>
            <Text style={styles.subtitle}>Please enter your phone number to access your {role} dashboard.</Text>
          </View>

          {/* Premium Phone Input */}
          <View style={styles.inputWrapper}>
            <View style={styles.countryPill}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.code}>+91</Text>
              <View style={styles.inputDivider} />
            </View>
            <TextInput 
              placeholder="9334804356"
              placeholderTextColor="rgba(15, 41, 30, 0.2)"
              keyboardType="phone-pad"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
              autoFocus
            />
          </View>

          {/* High-Impact CTA */}
          <TouchableOpacity 
            style={[
              styles.loginBtn, 
              { 
                backgroundColor: phone.length === 10 ? COLORS.primary : 'rgba(15, 41, 30, 0.05)',
                elevation: phone.length === 10 ? 12 : 0,
                shadowOpacity: phone.length === 10 ? 0.3 : 0
              }
            ]}
            disabled={phone.length !== 10}
            onPress={() => navigation.navigate('OTP', { phone, role })}
          >
            <Text style={[styles.loginBtnText, { color: phone.length === 10 ? 'white' : 'rgba(15, 41, 30, 0.3)' }]}>SEND VERIFICATION CODE</Text>
            <Icon name="navigate-next" size={24} color={phone.length === 10 ? 'white' : 'rgba(15, 41, 30, 0.3)'} />
          </TouchableOpacity>

          {/* Trust Indicators */}
          <View style={styles.footerInfo}>
            <Icon name="security" size={14} color={COLORS.secondary} style={{opacity: 0.5}} />
            <Text style={styles.footerText}>Secure 256-bit encrypted authentication</Text>
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
  roleBadge: { 
    backgroundColor: COLORS.primary + '08', 
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 
  },
  roleText: { fontSize: 10, fontWeight: '900', color: COLORS.primary, letterSpacing: 1, fontFamily: FONT_SERIF },

  header: { marginTop: 45, marginBottom: 40 },
  welcomeText: { fontSize: 18, fontWeight: '600', color: COLORS.secondary, opacity: 0.8, fontFamily: FONT_SERIF },
  title: { fontSize: 48, fontWeight: '900', color: COLORS.primary, letterSpacing: -1.5, marginTop: 4, fontFamily: FONT_SERIF },
  subtitle: { fontSize: 14, color: COLORS.secondary, marginTop: 15, lineHeight: 22, opacity: 0.6, fontWeight: '500', fontFamily: FONT_SERIF },

  inputWrapper: { 
    height: 75, backgroundColor: 'white', borderRadius: 24, 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20,
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 
  },
  countryPill: { flexDirection: 'row', alignItems: 'center' },
  flag: { fontSize: 22 },
  code: { fontSize: 18, fontWeight: '800', color: COLORS.primary, marginLeft: 10, fontFamily: FONT_SERIF },
  inputDivider: { width: 1, height: 30, backgroundColor: COLORS.background, marginHorizontal: 20 },
  input: { flex: 1, fontSize: 16, fontWeight: '900', color: COLORS.primary, letterSpacing: 3, fontFamily: FONT_SERIF },

  loginBtn: { 
    marginTop: 35, height: 70, borderRadius: 24, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 15 }, shadowRadius: 25 
  },
  loginBtnText: { fontSize: 13, fontWeight: '900', marginRight: 12, letterSpacing: 1.2, fontFamily: FONT_SERIF },
  
  footerInfo: { marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 11, color: COLORS.secondary, marginLeft: 8, fontWeight: '700', opacity: 0.4, fontFamily: FONT_SERIF }
});

export default LoginScreen;
