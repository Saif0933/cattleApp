import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  medical: '#0EA5E9',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  emerald: '#10B981',
};

const SelectRoleScreen = ({ navigation }: any) => {
  const RoleCard = ({ title, subtitle, icon, color, role }: any) => (
    <TouchableOpacity 
      style={styles.roleCard}
      onPress={() => navigation.navigate('Login', { role })}
    >
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
        <Icon name={icon} size={40} color={color} />
      </View>
      <View style={styles.roleText}>
        <Text style={styles.roleTitle}>{title}</Text>
        <Text style={styles.roleSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.arrowCircle}>
        <Icon name="arrow-forward" size={20} color={COLORS.secondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.brand}>Cattle <Text style={{color: COLORS.accent}}>Elite</Text></Text>
        <Text style={styles.instruction}>Please select your account type to continue</Text>
      </View>

      <View style={styles.cardContainer}>
        <RoleCard 
          title="Cattle Partner" 
          subtitle="Manage your herd and explore the livestock marketplace" 
          icon="pets" 
          color={COLORS.emerald}
          role="cattle"
        />
        
        <View style={styles.spacer} />

        <RoleCard 
          title="Doctor Expert" 
          subtitle="Provide veterinary care and manage your clinic" 
          icon="local-hospital" 
          color={COLORS.medical}
          role="doctor"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>By continuing, you agree to our</Text>
        <Text style={styles.terms}>Terms of Service & Privacy Policy</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 30 },
  header: { marginTop: height * 0.1, marginBottom: 50 },
  welcome: { fontSize: 18, fontWeight: '600', color: COLORS.secondary, letterSpacing: 1 },
  brand: { fontSize: 42, fontWeight: '900', color: COLORS.primary, marginTop: 5, letterSpacing: -1 },
  instruction: { fontSize: 14, color: COLORS.secondary, marginTop: 15, lineHeight: 22, opacity: 0.7 },
  cardContainer: { flex: 1 },
  roleCard: { 
    backgroundColor: 'white', 
    borderRadius: 35, 
    padding: 25, 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20
  },
  iconBox: { width: 80, height: 80, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  roleText: { flex: 1, marginLeft: 20 },
  roleTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary },
  roleSubtitle: { fontSize: 12, color: COLORS.secondary, marginTop: 4, lineHeight: 18 },
  arrowCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  spacer: { height: 24 },
  footer: { marginBottom: 40, alignItems: 'center' },
  footerText: { fontSize: 12, color: COLORS.secondary, opacity: 0.6 },
  terms: { fontSize: 12, color: COLORS.primary, fontWeight: '800', marginTop: 4 }
});

export default SelectRoleScreen;
