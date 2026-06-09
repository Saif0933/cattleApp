import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetListedAnimalsByLocation } from '../../api/hook/animal/listing';
import { useGetDoctorsByLocation } from '../../api/hook/doctor';
import { useUser } from '../../context/UserContext';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const ProfileScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { user, setUser, setToken, address } = useUser();

  // Fetch listings to compute user stats dynamically
  const { data: listingsResponse, isLoading } = useGetListedAnimalsByLocation(
    { latitude: 18.5204, longitude: 73.8567, limit: 100 }
  );

  const listings = listingsResponse?.data?.listings || [];
  const userCattle = listings.filter(item => item.ownerId === user?.id);
  const userCattleCount = userCattle.length;
  const totalDailyMilk = userCattle.reduce((sum, item) => sum + (item.animal?.dailyMilkProdLtr || 0), 0);

  // Fetch doctors dynamically by location (Pune coordinates as default)
  const { data: doctorsResponse, isLoading: isDoctorsLoading } = useGetDoctorsByLocation({
    latitude: 18.5204,
    longitude: 73.8567,
    limit: 50
  });

  const doctorsList = doctorsResponse?.data?.doctors || [];

  const handleBooking = (docName: string, fee: number) => {
    Alert.alert(
      "Confirm Appointment",
      `Would you like to request an appointment with ${docName} for ₹${fee}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: () => {
            Alert.alert("Appointment Confirmed", `Your appointment with ${docName} has been requested successfully!`);
          }
        }
      ]
    );
  };

  const menuSections = [
    {
      title: 'FARM MANAGEMENT',
      options: [
        { name: 'Farm Profile', icon: 'business', route: 'FarmProfile', color: '#16A34A' },
        { name: 'Milk Reports', icon: 'assessment', route: 'MilkProductionReport', color: '#8B5CF6' },
        { name: 'Order History', icon: 'receipt-long', route: 'OrderHistory', color: '#3B82F6' },
      ]
    },
    {
      title: 'VETERINARIAN SERVICES',
      options: [
        { name: 'Book a Doctor', icon: 'medical-services', route: 'DoctorBooking', color: '#06B6D4' },
      ]
    },
    {
      title: 'MARKETPLACE PARTNER',
      options: [
        { name: 'Register as Brand/Seller', icon: 'storefront', route: 'RegisterMarketplace', color: '#10B981' },
      ]
    },
    {
      title: 'APP PREFERENCES',
      options: [
        { name: 'Cattle Subscription', icon: 'stars', route: 'Subscription', color: '#F59E0B' },
        { name: 'Settings & Security', icon: 'settings', route: 'Settings', color: '#6B7280' },
        { name: 'Help & Support', icon: 'contact-support', route: 'HelpSupport', color: '#14B8A6' },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account & Settings</Text>
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
          <Icon name="notifications-none" size={24} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card Header */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeaderRow}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }} 
                style={styles.avatar} 
              />
              <View style={styles.editBadge}>
                <Icon name="edit" size={12} color="#0D9488" />
              </View>
            </View>
            <View style={styles.profileMeta}>
              <View style={styles.titleRow}>
                <Text style={styles.farmName}>{user?.name || 'Farmer'}</Text>
                <View style={styles.proPill}>
                  <Text style={styles.proText}>{user?.role || 'PRO'}</Text>
                </View>
              </View>
              <Text style={styles.email}>{user?.email || 'No email associated'}</Text>
              <View style={styles.locationRow}>
                <Icon name="place" size={14} color="rgba(255, 255, 255, 0.7)" style={{ marginRight: 4 }} />
                <Text style={styles.locationText}>
                  {address?.city ? `${address.city}, ${address.state}` : 'Pune, MH'}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statNumber}>
                  {isLoading ? '...' : userCattleCount}
                </Text>
                <Text style={styles.statLabel}>Cattle</Text>
              </View>
              <View style={styles.statDividerVertical} />
              <View style={styles.statCol}>
                <Text style={styles.statNumber}>
                  {isLoading ? '...' : `${totalDailyMilk} L`}
                </Text>
                <Text style={styles.statLabel}>Milk/Day</Text>
              </View>
              <View style={styles.statDividerVertical} />
              <View style={styles.statCol}>
                <Text style={styles.statNumber}>{user?.status || 'Active'}</Text>
                <Text style={styles.statLabel}>Member</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Premium Membership Banner */}
        <View style={styles.primeBanner}>
          <View style={styles.primeLeft}>
            <Icon name="verified" size={24} color="#F59E0B" style={{ marginRight: 10 }} />
            <View>
              <Text style={styles.primeTitle}>Cattle Prime Active</Text>
              <Text style={styles.primeSub}>Auto-renews on 15 Dec 2026</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={20} color="#F59E0B" />
        </View>


        {/* Menu Options Sections */}
        {menuSections.map((section, sIdx) => (
          <View key={sIdx} style={styles.sectionContainer}>
            <Text style={styles.sectionTitleLabel}>{section.title}</Text>
            <View style={styles.menuGroup}>
              {section.options.map((opt, idx) => (
                <TouchableOpacity 
                  key={idx}
                  style={[
                    styles.menuItem,
                    idx === section.options.length - 1 && { borderBottomWidth: 0 }
                  ]}
                  onPress={() => {
                    if (opt.route) {
                      navigation.navigate(opt.route);
                    } else {
                      Alert.alert(opt.name, `${opt.name} feature is currently active.`);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconBox, { backgroundColor: opt.color + '15' }]}>
                    <Icon name={opt.icon} size={22} color={opt.color} />
                  </View>
                  <Text style={styles.menuItemText}>{opt.name}</Text>
                  <Icon name="keyboard-arrow-right" size={20} color={COLORS.secondary} style={{ opacity: 0.7 }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => {
            Alert.alert("Sign Out", "Are you sure you want to sign out?", [
              { text: "Cancel", style: "cancel" },
              { 
                text: "Sign Out", 
                style: "destructive", 
                onPress: () => {
                  setUser(null);
                  setToken(null);
                  navigation.replace('Login');
                }
              }
            ]);
          }}
          activeOpacity={0.8}
        >
          <Icon name="logout" size={20} color={COLORS.crimson} />
          <Text style={styles.logoutText}>Sign Out Account</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: COLORS.background
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 50 },
  
  profileCard: {
    backgroundColor: '#0D9488',
    padding: 20,
    borderRadius: 28,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: { 
    width: 72, 
    height: 72, 
    borderRadius: 36, 
    borderWidth: 2, 
    borderColor: '#FFFFFF',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0D9488',
  },
  profileMeta: { marginLeft: 16, flex: 1 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  farmName: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SERIF },
  proPill: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  proText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#0F291E',
  },
  email: { fontSize: 13, color: '#FFFFFF', opacity: 0.8, marginTop: 4, fontFamily: FONT_SANS },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    fontFamily: FONT_SANS,
  },

  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statCol: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SANS,
  },
  statLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.6,
    marginTop: 2,
    fontFamily: FONT_SANS,
  },
  statDividerVertical: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },

  primeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  primeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primeTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#D97706',
    fontFamily: FONT_SANS,
  },
  primeSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: FONT_SANS,
  },

  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitleLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.secondary,
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconBox: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 14 
  },
  menuItemText: { flex: 1, fontSize: 14, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SANS },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
    marginTop: 10,
    marginBottom: 20,
  },
  logoutText: { fontSize: 15, fontWeight: '900', color: COLORS.crimson, marginLeft: 8, fontFamily: FONT_SANS },

  doctorSection: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
  },
  doctorScrollContent: {
    gap: 12,
    paddingRight: 20,
  },
  doctorCardMini: {
    width: 140,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  docMiniHeader: {
    position: 'relative',
    marginBottom: 8,
  },
  docMiniAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
  },
  verifiedMiniBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.medical,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.surface,
  },
  docMiniName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.darkGreen,
    fontFamily: FONT_SANS,
    textAlign: 'center',
    width: '100%',
  },
  docMiniSpec: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    textAlign: 'center',
    width: '100%',
    marginTop: 2,
  },
  docMiniFee: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    marginTop: 4,
    marginBottom: 8,
  },
  bookMiniBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  bookMiniBtnText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
    fontFamily: FONT_SANS,
  },
  emptyDoctorCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyDoctorText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginTop: 6,
  },
});

export default ProfileScreen;