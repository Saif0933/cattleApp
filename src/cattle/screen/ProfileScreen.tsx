import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const ProfileScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const menuOptions = [
    { name: 'Farm Profile', icon: 'business', route: 'FarmProfile', color: '#16A34A' },
    { name: 'Users & Staff', icon: 'people-outline', route: '', color: COLORS.darkGreen },
    { name: 'Payments', icon: 'payment', route: 'Payment', color: '#3B82F6' },
    { name: 'Settings', icon: 'settings', route: 'Settings', color: COLORS.secondary },
    { name: 'Help & Support', icon: 'help-outline', route: 'HelpSupport', color: '#F59E0B' },
    { name: 'About Us', icon: 'info-outline', route: '', color: COLORS.darkGreen }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card Header */}
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }} 
            style={styles.avatar} 
          />
          <View style={styles.profileMeta}>
            <Text style={styles.farmName}>Rashi Farm</Text>
            <Text style={styles.email}>rashi.farm@gmail.com</Text>
          </View>
        </View>

        {/* Menu Options List */}
        <View style={styles.menuList}>
          {menuOptions.map((opt, idx) => (
            <TouchableOpacity 
              key={idx}
              style={styles.menuItem}
              onPress={() => {
                if (opt.route) {
                  navigation.navigate(opt.route);
                } else {
                  Alert.alert(opt.name, `${opt.name} integration is active.`);
                }
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.iconBox, { backgroundColor: opt.color + '0B' }]}>
                <Icon name={opt.icon} size={22} color={opt.color} />
              </View>
              <Text style={styles.menuItemText}>{opt.name}</Text>
              <Icon name="chevron-right" size={20} color={COLORS.secondary} style={{ opacity: 0.5 }} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => navigation.navigate('SelectRole')}
          activeOpacity={0.85}
        >
          <Icon name="logout" size={20} color={COLORS.crimson} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF'
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  scrollContent: { paddingHorizontal: 24, paddingTop: 15, paddingBottom: 50 },
  
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4,
    marginBottom: 25
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  profileMeta: { marginLeft: 16, flex: 1 },
  farmName: { fontSize: 18, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  email: { fontSize: 13, color: COLORS.secondary, marginTop: 4, fontWeight: '600', fontFamily: FONT_SANS },

  menuList: { gap: 14, marginBottom: 30 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  menuItemText: { flex: 1, fontSize: 15, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.crimson + '20',
  },
  logoutText: { fontSize: 15, fontWeight: '900', color: COLORS.crimson, marginLeft: 8, fontFamily: FONT_SANS }
});

export default ProfileScreen;