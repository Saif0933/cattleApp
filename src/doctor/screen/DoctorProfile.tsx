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
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const GRADIENTS = {
  header: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000',
  btn: 'https://img.freepik.com/free-vector/abstract-gradient-blue-background-design_343694-2636.jpg',
};

const DoctorProfile = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const doctor = {
    id: "doc-2",
    userId: "user-doc-2",
    user: {
      name: "Dr. James Wilson",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
      roles: ["DOCTOR", "USER"]
    },
    specialization: "Lead Veterinary Physician",
    experienceYears: 12,
    clinicName: "Avian & Pet Health Center",
    clinicAddress: "Chandigarh, Punjab",
    consultationFee: 60.00,
    isVerified: true,
    bio: "Lead veterinary physician with extensive expertise in orthopedic pet surgeries and exotic bird medical consultations.",
    rating: 4.9,
    reviewCount: 850,
    patientsCount: 2480,
    consultationsCount: 1200
  };

  const InfoChip = ({ icon, label, color }: any) => (
    <View style={[styles.chip, { backgroundColor: color + '15' }]}>
      <Icon name={icon} size={12} color={color} />
      <Text style={[styles.chipText, { color }]}>{label}</Text>
    </View>
  );

  const StatTile = ({ label, value, icon, color }: any) => (
    <View style={styles.statTile}>
      <View style={[styles.statIconWrapper, { backgroundColor: color + '10' }]}>
        <Icon name={icon} size={20} color={color} />
      </View>
      <View style={styles.statTextGroup}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );

  const ActionPill = ({ title, subtitle, icon, color, count }: any) => (
    <TouchableOpacity style={styles.actionPill}>
      <View style={[styles.pillIconBox, { backgroundColor: color }]}>
        <Icon name={icon} size={24} color="white" />
      </View>
      <View style={styles.pillContent}>
        <Text style={styles.pillTitle}>{title}</Text>
        <Text style={styles.pillSubtitle}>{subtitle}</Text>
      </View>
      {count && (
        <View style={styles.pillBadge}>
          <Text style={styles.pillBadgeText}>{count}</Text>
        </View>
      )}
      <Icon name="navigate-next" size={24} color={COLORS.secondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        {/* Dynamic Header */}
        <ImageBackground source={{ uri: GRADIENTS.header }} style={styles.headerHero}>
          <View style={styles.headerTint}>
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.glassBtn} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.topTitle}>MASTER PROFILE</Text>
              <TouchableOpacity style={styles.glassBtn}>
                <Icon name="dashboard-customize" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Floating Profile Glass Card */}
        <View style={styles.floatingCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarOutline}>
              <Image 
                source={{ uri: doctor.user.avatar }} 
                style={styles.mainAvatar}
              />
              <View style={styles.activeDot} />
            </View>
            <View style={styles.mainInfo}>
              <Text style={styles.userName}>{doctor.user.name}</Text>
              <Text style={styles.userRole}>{doctor.specialization}</Text>
              <View style={styles.chipRow}>
                <InfoChip icon="star" label={String(doctor.rating)} color={COLORS.gold} />
                {doctor.isVerified && <InfoChip icon="verified" label="VETCORE PRO" color={COLORS.medical} />}
              </View>
            </View>
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <StatTile label="Total Patients" value={doctor.patientsCount.toLocaleString()} icon="people-alt" color={COLORS.medical} />
          <StatTile label="Consultations" value="1.2k+" icon="medical-services" color={COLORS.emerald} />
          <StatTile label="Experience" value={`${doctor.experienceYears}yrs`} icon="workspace-premium" color="#8B5CF6" />
        </View>

        {/* Action Dashboard */}
        <View style={styles.dashBody}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionMainTitle}>Management Hub</Text>
            <View style={styles.accentLine} />
          </View>

          <ActionPill 
            title="Schedule & Appointments" 
            subtitle="8 visits pending for today" 
            icon="event-available" 
            color={COLORS.medical}
            count="8"
          />
          <ActionPill 
            title="Patient Case Files" 
            subtitle="Secure medical database" 
            icon="folder-shared" 
            color={COLORS.emerald}
          />
          <ActionPill 
            title="Revenue & Analytics" 
            subtitle="Track performance metrics" 
            icon="insights" 
            color="#8B5CF6"
          />
        </View>

        {/* App Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionMainTitle}>App Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingsRow}>
              <View style={[styles.settingIcon, { backgroundColor: COLORS.isDark ? '#1C3140' : '#EFF6FF' }]}>
                <Icon name="notifications-none" size={22} color={COLORS.medical} />
              </View>
              <Text style={styles.settingLabel}>Notification Center</Text>
              <Icon name="chevron-right" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
            <View style={styles.rowDivider} />
            <TouchableOpacity style={styles.settingsRow}>
              <View style={[styles.settingIcon, { backgroundColor: COLORS.isDark ? '#1C3426' : '#F0FDF4' }]}>
                <Icon name="security" size={22} color={COLORS.emerald} />
              </View>
              <Text style={styles.settingLabel}>Privacy & Credentials</Text>
              <Icon name="chevron-right" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Solid-State Premium Role Switcher */}
        <TouchableOpacity 
          style={styles.solidSwitchCapsule} 
          activeOpacity={0.8} 
          onPress={() => navigation.navigate("SelectRole")}
        >
          <View style={styles.solidSwitchContent}>
            <View style={styles.solidIconCircle}>
              <Icon name="sync" size={24} color={COLORS.medical} />
            </View>
            <View style={styles.solidTextGroup}>
              <Text style={styles.solidMainLabel}>SWITCH TO OWNER MODE</Text>
              <Text style={styles.solidSubLabel}>Access your personal livestock dashboard</Text>
            </View>
            <View style={styles.solidArrowBox}>
              <Icon name="chevron-right" size={20} color="white" />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>VETCORE EXECUTIVE v4.0.0</Text>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>SECURE ACCESS</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollBody: { paddingBottom: 60 },
  
  headerHero: { height: 260, width: '100%' },
  headerTint: { 
    flex: 1, 
    backgroundColor: 'rgba(15, 23, 42, 0.4)', 
    paddingTop: (StatusBar.currentHeight || 0) + 15,
    paddingHorizontal: 24 
  },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  glassBtn: { 
    width: 48, height: 48, borderRadius: 24, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)'
  },
  topTitle: { fontSize: 13, fontWeight: '900', color: 'white', letterSpacing: 2, fontFamily: FONT_SERIF },

  floatingCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 35,
    marginTop: -80,
    padding: 24,
    elevation: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: COLORS.isDark ? 0.2 : 0.1,
    shadowRadius: 25,
  },
  profileHeader: { flexDirection: 'row', alignItems: 'center' },
  avatarOutline: { 
    padding: 3, borderRadius: 28, borderWidth: 2, borderColor: COLORS.medical + '30', position: 'relative'
  },
  mainAvatar: { width: 85, height: 85, borderRadius: 24 },
  activeDot: { 
    position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: 11, 
    backgroundColor: COLORS.emerald, borderWidth: 4, borderColor: COLORS.surface 
  },
  mainInfo: { marginLeft: 20, flex: 1 },
  userName: { fontSize: 24, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, letterSpacing: -0.5 },
  userRole: { fontSize: 13, fontWeight: '600', color: COLORS.secondary, marginTop: 4 },
  chipRow: { flexDirection: 'row', marginTop: 12 },
  chip: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, 
    borderRadius: 10, marginRight: 8 
  },
  chipText: { fontSize: 10, fontWeight: '900', marginLeft: 5, letterSpacing: 0.5 },

  statsSection: { 
    marginTop: 25, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  statTile: { 
    width: (width - 55) / 2, 
    backgroundColor: COLORS.surface, 
    borderRadius: 24, 
    padding: 15, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10
  },
  statIconWrapper: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  statTextGroup: { marginLeft: 12, flex: 1 },
  statValue: { fontSize: 17, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  statLabel: { fontSize: 9, fontWeight: '700', color: COLORS.secondary, marginTop: 2 },

  dashBody: { marginTop: 20, paddingHorizontal: 20 },
  sectionHeading: { marginBottom: 20 },
  sectionMainTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  accentLine: { width: 40, height: 4, backgroundColor: COLORS.medical, borderRadius: 2, marginTop: 8 },

  actionPill: { 
    backgroundColor: COLORS.surface, 
    borderRadius: 28, 
    padding: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 15
  },
  pillIconBox: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  pillContent: { flex: 1, marginLeft: 16 },
  pillTitle: { fontSize: 16, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SERIF },
  pillSubtitle: { fontSize: 12, fontWeight: '600', color: COLORS.secondary, marginTop: 2 },
  pillBadge: { backgroundColor: COLORS.crimson, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginRight: 10 },
  pillBadgeText: { color: 'white', fontSize: 11, fontWeight: '900' },

  settingsSection: { marginTop: 30, paddingHorizontal: 20 },
  settingsCard: { backgroundColor: COLORS.surface, borderRadius: 30, padding: 10, elevation: 4, borderWidth: 1, borderColor: COLORS.border },
  settingsRow: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  settingIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  settingLabel: { flex: 1, marginLeft: 15, fontSize: 15, fontWeight: '700', color: COLORS.primary },
  rowDivider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 20 },

  solidSwitchCapsule: { 
    marginHorizontal: 20, 
    marginTop: 45, 
    borderRadius: 30,
    backgroundColor: COLORS.medical,
    elevation: 20,
    shadowColor: COLORS.medical,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  solidSwitchContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
  },
  solidIconCircle: { 
    width: 44, 
    height: 44, 
    borderRadius: 14, 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  solidTextGroup: { flex: 1, marginLeft: 16 },
  solidMainLabel: { 
    color: 'white', 
    fontSize: 12, 
    fontWeight: '900', 
    letterSpacing: 1, 
    fontFamily: FONT_SERIF 
  },
  solidSubLabel: { 
    color: 'rgba(255,255,255,0.8)', 
    fontSize: 9, 
    fontWeight: '600', 
    marginTop: 2 
  },
  solidArrowBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  footer: { marginTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  footerText: { fontSize: 10, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1.5, opacity: 0.4 },
  footerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.secondary, marginHorizontal: 10, opacity: 0.3 }
});

export default DoctorProfile;
