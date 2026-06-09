import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../context/UserContext';
import { useThemeColors } from '../context/useTheme';

const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const MarketplaceProfileScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { user } = useUser();

  const menuItems = [
    { id: '1', title: 'My Orders', icon: 'package-variant-closed', route: 'OrderHistory', color: COLORS.medical || '#0D9488' },
    { id: '2', title: 'Saved Items', icon: 'heart-outline', route: 'SavedItems', color: '#E11D48' },
    { id: '3', title: 'Shipping Addresses', icon: 'map-marker-outline', route: 'UpdateAddress', color: '#2563EB' },
    { id: '4', title: 'Payment Methods', icon: 'credit-card-outline', route: 'PaymentMethods', color: '#D97706' },
    { id: '5', title: 'Help & Support', icon: 'headset', route: 'HelpSupport', color: '#4F46E5' },
    { id: '6', title: 'App Settings', icon: 'cog-outline', route: 'Settings', color: COLORS.secondary },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {user?.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Icon name="pencil" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'AgriMarket User'}</Text>
          <Text style={styles.userEmail}>{user?.email || user?.phone || 'Update your profile'}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>Silver</Text>
              <Text style={styles.statLabel}>Tier</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity 
                style={styles.menuRow}
                onPress={() => item.route && navigation.navigate(item.route)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconBox, { backgroundColor: `${item.color}15` }]}>
                  <Icon name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Icon name="chevron-right" size={24} color={COLORS.secondary} />
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Icon name="logout" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Logout from Marketplace</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.medical || '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SERIF,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '600',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingVertical: 15,
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    marginTop: 35,
    marginBottom: 15,
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    marginTop: 35,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.3)',
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  }
});

export default MarketplaceProfileScreen;
