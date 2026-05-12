import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  medical: '#0EA5E9',
  emerald: '#10B981',
  crimson: '#EF4444',
  gold: '#D4AF37',
};

const DoctorProfile = () => {
  const MenuOption = ({ icon, title, subtitle, color = COLORS.primary, showArrow = true }: any) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={[styles.menuIconBox, { backgroundColor: color + '15' }]}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <View style={styles.menuTextContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && (
        <View style={styles.arrowBox}>
          <Icon name="chevron-right" size={18} color={COLORS.secondary} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Cinematic Clinical Hero */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71f153ec7a?auto=format&fit=crop&q=80&w=1200' }}
          style={styles.heroHeader}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.topActions}>
              <TouchableOpacity style={styles.glassBtn}>
                <Icon name="settings" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Floating Executive Doctor Card */}
        <View style={styles.mainContent}>
          <View style={styles.profileFloatingCard}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }} 
                style={styles.avatar}
              />
              <View style={styles.statusDot} />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.userName}>Dr. James Wilson</Text>
              <View style={styles.premiumBadge}>
                <Icon name="verified" size={16} color={COLORS.medical} />
                <Text style={styles.premiumText}>CHIEF MEDICAL OFFICER</Text>
              </View>
            </View>
          </View>

          {/* Executive Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statPill}>
              <Text style={styles.statVal}>1.2k</Text>
              <Text style={styles.statLab}>PATIENTS</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statVal}>8yr</Text>
              <Text style={styles.statLab}>EXP</Text>
            </View>
            <View style={styles.statPill}>
              <View style={styles.row}>
                <Text style={styles.statVal}>4.9</Text>
                <Icon name="star" size={12} color={COLORS.accent} style={{marginLeft: 2}} />
              </View>
              <Text style={styles.statLab}>RATING</Text>
            </View>
          </View>

          {/* Premium Practice Sections */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Practice Management</Text>
              <TouchableOpacity><Text style={styles.editLink}>Update Availability</Text></TouchableOpacity>
            </View>
            <View style={styles.premiumMenuCard}>
              <MenuOption icon="event-note" title="Appointment Schedule" subtitle="Manage your daily visits" color={COLORS.medical} />
              <View style={styles.menuDivider} />
              <MenuOption icon="assignment" title="Medical Records" subtitle="Patient history & prescriptions" color={COLORS.emerald} />
              <View style={styles.menuDivider} />
              <MenuOption icon="groups" title="Patient Owner List" subtitle="Manage your client base" color={COLORS.primary} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Financials & Analytics</Text>
            <View style={styles.premiumMenuCard}>
              <MenuOption icon="account-balance-wallet" title="Earnings Dashboard" subtitle="Track your monthly revenue" color={COLORS.accent} />
              <View style={styles.menuDivider} />
              <MenuOption icon="receipt" title="Invoices & Billing" subtitle="Manage payment status" color={COLORS.secondary} />
            </View>
          </View>

          <TouchableOpacity style={styles.luxuryLogout}>
            <Icon name="swap-horiz" size={20} color={COLORS.medical} />
            <Text style={styles.logoutLabel}>Switch to Owner Mode</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionLabel}>Vet Core Alpha v2.4.0 • Executive Suite</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  heroHeader: { height: 320, width: '100%' },
  heroOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(15, 41, 30, 0.45)', 
    paddingTop: (StatusBar.currentHeight || 0) + 20,
  },
  topActions: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 24 },
  glassBtn: { 
    width: 48, height: 48, borderRadius: 16, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)'
  },
  mainContent: { paddingHorizontal: 24, marginTop: -80, paddingBottom: 80 },
  profileFloatingCard: { 
    backgroundColor: 'white', borderRadius: 35, padding: 25, 
    flexDirection: 'row', alignItems: 'center',
    elevation: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.15, shadowRadius: 25 
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 85, height: 85, borderRadius: 30, borderWidth: 3, borderColor: COLORS.background },
  statusDot: { 
    position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 9, 
    backgroundColor: COLORS.emerald, borderWidth: 3, borderColor: 'white' 
  },
  infoBox: { marginLeft: 20, flex: 1 },
  userName: { fontSize: 24, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5, fontFamily: FONT_SERIF },
  premiumBadge: { 
    flexDirection: 'row', alignItems: 'center', marginTop: 6, 
    backgroundColor: COLORS.medical + '10', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, alignSelf: 'flex-start'
  },
  premiumText: { color: COLORS.medical, fontSize: 9, fontWeight: '900', marginLeft: 6, letterSpacing: 1, fontFamily: FONT_SERIF },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  statPill: { 
    backgroundColor: 'white', width: (width - 68) / 3, paddingVertical: 18, borderRadius: 25, alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10
  },
  statVal: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  statLab: { fontSize: 8, fontWeight: '800', color: COLORS.secondary, marginTop: 4, letterSpacing: 0.5, fontFamily: FONT_SERIF },
  row: { flexDirection: 'row', alignItems: 'center' },
  section: { marginTop: 35 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  sectionHeader: { fontSize: 17, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  editLink: { fontSize: 12, fontWeight: '700', color: COLORS.medical, fontFamily: FONT_SERIF },
  premiumMenuCard: { 
    backgroundColor: 'white', borderRadius: 30, padding: 10,
    elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 15
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  menuIconBox: { width: 50, height: 50, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  menuTextContent: { flex: 1, marginLeft: 15 },
  menuTitle: { fontSize: 16, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SERIF },
  menuSubtitle: { fontSize: 11, fontWeight: '600', color: COLORS.secondary, marginTop: 2, fontFamily: FONT_SERIF },
  arrowBox: { width: 32, height: 32, borderRadius: 10, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  menuDivider: { height: 1, backgroundColor: COLORS.background, marginHorizontal: 20 },
  luxuryLogout: { 
    marginTop: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    backgroundColor: 'white', paddingVertical: 20, borderRadius: 25,
    borderWidth: 1, borderColor: COLORS.medical + '15'
  },
  logoutLabel: { color: COLORS.medical, fontSize: 15, fontWeight: '900', marginLeft: 12, letterSpacing: 0.5, fontFamily: FONT_SERIF },
  versionLabel: { textAlign: 'center', marginTop: 30, color: COLORS.secondary, fontSize: 11, fontWeight: '700', opacity: 0.5, fontFamily: FONT_SERIF }
});

export default DoctorProfile;
