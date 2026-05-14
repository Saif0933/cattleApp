import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  glass: 'rgba(255, 255, 255, 0.9)',
  emerald: '#10B981',
  crimson: '#EF4444',
  gold: '#D4AF37',
};

const ProfileScreen = ({ navigation }: any) => {
  const MenuOption = ({ icon, title, subtitle, color = COLORS.primary, showArrow = true, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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
        
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=1200' }}
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

        <View style={styles.mainContent}>
          <View style={styles.profileFloatingCard}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }} 
                style={styles.avatar}
              />
              <View style={styles.statusDot} />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.userName}>Rashi Cattle</Text>
              <View style={styles.premiumBadge}>
                <Icon name="stars" size={16} color={COLORS.accent} />
                <Text style={styles.premiumText}>PLATINUM MEMBER</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statPill}>
              <Text style={styles.statVal}>24</Text>
              <Text style={styles.statLab}>LISTINGS</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statVal}>182</Text>
              <Text style={styles.statLab}>TRADES</Text>
            </View>
            <View style={styles.statPill}>
              <View style={styles.row}>
                <Text style={styles.statVal}>4.9</Text>
                <Icon name="star" size={12} color={COLORS.accent} style={{marginLeft: 2}} />
              </View>
              <Text style={styles.statLab}>RATING</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Business Profile</Text>
              <TouchableOpacity><Text style={styles.editLink}>Edit</Text></TouchableOpacity>
            </View>
            <View style={styles.premiumMenuCard}>
              <MenuOption icon="account-balance-wallet" title="Wallet & Earnings" subtitle="View your marketplace revenue" color={COLORS.emerald} />
              <View style={styles.menuDivider} />
              <MenuOption icon="inventory-2" title="My Herd Inventory" subtitle="Manage livestock & birds" color={COLORS.primary} />
              <View style={styles.menuDivider} />
              <MenuOption icon="insights" title="Market Insights" subtitle="Track local price trends" color={COLORS.accent} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Account & Settings</Text>
            <View style={styles.premiumMenuCard}>
              <MenuOption icon="verified-user" title="Security & Privacy" subtitle="Two-factor authentication active" color={COLORS.secondary} />
              <View style={styles.menuDivider} />
              <MenuOption icon="notifications-active" title="Notifications" subtitle="Alerts for new listings & sales" color={COLORS.primary} />
              <View style={styles.menuDivider} />
              <MenuOption 
                icon="local-shipping" 
                title="My Shipping Address" 
                subtitle="Manage your delivery locations" 
                color={COLORS.primary} 
                showArrow={true} 
                onPress={() => navigation.navigate('UpdateAddress')}
              />
              <View style={styles.menuDivider} />
              <MenuOption icon="help-center" title="Support Center" subtitle="24/7 dedicated elite support" color={COLORS.secondary} />
            </View>
          </View>

          <TouchableOpacity style={styles.luxuryLogout} onPress={() => {navigation.navigate("SelectRole")}}>
            <Icon name="power-settings-new" size={20} color={COLORS.crimson} />
            <Text style={styles.logoutLabel}>Secure Sign Out</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionLabel}>Cattle Alpha v2.4.0 • Built for Elite Traders</Text>
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
    backgroundColor: 'rgba(15, 41, 30, 0.4)', 
    paddingTop: (StatusBar.currentHeight ?? 0) + 20,
  },
  topActions: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 24 },
  glassBtn: { 
    width: 48, height: 48, borderRadius: 16, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)'
  },
  mainContent: { 
    paddingHorizontal: 24, 
    marginTop: -80, 
    paddingBottom: 80 
  },
  profileFloatingCard: { 
    backgroundColor: 'white', 
    borderRadius: 35, 
    padding: 25, 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 25, shadowColor: '#000', 
    shadowOffset: { width: 0, height: 15 }, 
    shadowOpacity: 0.15, shadowRadius: 25 
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 85, height: 85, borderRadius: 30, borderWidth: 3, borderColor: COLORS.background },
  statusDot: { 
    position: 'absolute', bottom: -2, right: -2, 
    width: 18, height: 18, borderRadius: 9, 
    backgroundColor: COLORS.emerald, borderWidth: 3, borderColor: 'white' 
  },
  infoBox: { marginLeft: 20, flex: 1 },
  userName: { fontSize: 24, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5, fontFamily: FONT_SERIF },
  premiumBadge: { 
    flexDirection: 'row', alignItems: 'center', 
    marginTop: 6, backgroundColor: COLORS.primary + '08', 
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, alignSelf: 'flex-start'
  },
  premiumText: { color: COLORS.accent, fontSize: 9, fontWeight: '900', marginLeft: 6, letterSpacing: 1, fontFamily: FONT_SERIF },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 },
  statPill: { 
    backgroundColor: 'white', width: (width - 68) / 3, 
    paddingVertical: 18, borderRadius: 25, alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10
  },
  statVal: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  statLab: { fontSize: 8, fontWeight: '800', color: COLORS.secondary, marginTop: 4, letterSpacing: 0.5, fontFamily: FONT_SERIF },
  row: { flexDirection: 'row', alignItems: 'center' },
  section: { marginTop: 35 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  sectionHeader: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  editLink: { fontSize: 13, fontWeight: '700', color: COLORS.accent, fontFamily: FONT_SERIF },
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
    borderWidth: 1, borderColor: COLORS.crimson + '15'
  },
  logoutLabel: { color: COLORS.crimson, fontSize: 15, fontWeight: '900', marginLeft: 12, letterSpacing: 0.5, fontFamily: FONT_SERIF },
  versionLabel: { textAlign: 'center', marginTop: 30, color: COLORS.secondary, fontSize: 11, fontWeight: '700', opacity: 0.5, fontFamily: FONT_SERIF }
});

export default ProfileScreen;