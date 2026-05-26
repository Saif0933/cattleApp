import React, { useState } from 'react';
import {
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
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const AnimalDetailsScreen = ({ route, navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const { product } = route.params || {};

  const name = product?.name || 'Gauri';
  const id = product?.id || 'C001';
  const breed = product?.breed || 'HF Cross';
  const age = product?.age || '3 Years';
  const gender = product?.gender || 'Female';
  const image = product?.image || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600';

  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Health', 'Breeding', 'Activity'];

  const animalDescription = product?.description || 'A healthy, highly productive dairy cow with an excellent feeding record. Known for consistent milk yield and calm behavior on the farm.';
  const color = product?.color || 'Black & White';

  const overviewDetails = [
    { label: 'Animal Name', value: name },
    { label: 'Breed', value: breed },
    { label: 'Color', value: color },
    { label: 'Gender', value: gender },
    { label: 'Age', value: age },
    { label: 'Weight', value: product?.weight || '450 kg' },
    { label: 'Milk Yield', value: product?.milkYield || '12 L/day' },
    { label: 'Date of Birth', value: '10 Mar 2021' },
    { label: 'Owner', value: 'Rashi Farm' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerSubtitle}>Cow • {age}</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <Icon name="ios-share" size={22} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cow Image with absolute cover */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cowImage as any} resizeMode="cover" />
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabBar}>
          {tabs.map((tab, idx) => (
            <TouchableOpacity 
              key={idx}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <View style={styles.sectionContainer}>
            <View style={styles.descriptionCard}>
              <Text style={styles.sectionTitle}>About {name}</Text>
              <Text style={styles.descriptionText}>{animalDescription}</Text>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>Animal Details</Text>
            <View style={styles.grid}>
              {overviewDetails.map((detail, idx) => (
                <View key={idx} style={styles.gridCell}>
                  <Text style={styles.cellLabel}>{detail.label}</Text>
                  <Text style={styles.cellValue}>{detail.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'Health' && (
          <View style={styles.sectionContainer}>
            {/* Health Status Card */}
            <View style={[styles.statusCard, { borderColor: COLORS.primary }]}>
              <View style={styles.statusHeader}>
                <Icon name="favorite" size={24} color={COLORS.primary} />
                <Text style={styles.statusTitle}>Overall Health: Healthy</Text>
              </View>
              <Text style={styles.statusDescription}>
                All vaccinations are up to date. Last checkup was done by Dr. Verma on 15 May 2026.
              </Text>
            </View>

            {/* Vaccination Section */}
            <Text style={styles.sectionSubtitle}>Vaccination History</Text>
            <View style={styles.infoList}>
              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <Icon name="vaccines" size={22} color={COLORS.medical} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>FMD Vaccine</Text>
                  <Text style={styles.listSubtext}>Administered: 10 May 2026 • Doctor: Dr. Verma</Text>
                </View>
                <View style={styles.badgeSuccess}>
                  <Text style={styles.badgeText}>Completed</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <Icon name="vaccines" size={22} color={COLORS.medical} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>Brucellosis Vaccine</Text>
                  <Text style={styles.listSubtext}>Administered: 05 Jan 2026 • Doctor: Dr. Verma</Text>
                </View>
                <View style={styles.badgeSuccess}>
                  <Text style={styles.badgeText}>Completed</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <Icon name="vaccines" size={22} color={COLORS.medical} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>HS Vaccine</Text>
                  <Text style={styles.listSubtext}>Next due: 20 Aug 2026 (Scheduled)</Text>
                </View>
                <View style={styles.badgeWarning}>
                  <Text style={styles.badgeTextWarning}>Pending</Text>
                </View>
              </View>
            </View>

            {/* Deworming Card */}
            <Text style={styles.sectionSubtitle}>Deworming & Checkups</Text>
            <View style={styles.dewormingCard}>
              <View style={styles.dewormingRow}>
                <Icon name="healing" size={20} color={COLORS.gold} />
                <Text style={styles.dewormingTitle}>Last Deworming: 12 Apr 2026</Text>
              </View>
              <Text style={styles.dewormingText}>Next Deworming is scheduled in 6 weeks (Recommended: Albendazole).</Text>
            </View>
          </View>
        )}

        {activeTab === 'Breeding' && (
          <View style={styles.sectionContainer}>
            {/* Breeding Status Card */}
            <View style={[styles.statusCard, { borderColor: COLORS.gold }]}>
              <View style={styles.statusHeader}>
                <Icon name="child-care" size={24} color={COLORS.gold} />
                <Text style={styles.statusTitle}>Breeding Status: Pregnant</Text>
              </View>
              <Text style={styles.statusDescription}>
                Successfully inseminated on 20 Feb 2026. Calving expected date: 25 Nov 2026 (approx 3 months pregnant).
              </Text>
            </View>

            {/* Breeding Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total Calvings</Text>
                <Text style={styles.statValue}>2 Times</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Insemination Count</Text>
                <Text style={styles.statValue}>3 Cycles</Text>
              </View>
            </View>

            {/* Breeding History */}
            <Text style={styles.sectionSubtitle}>Breeding History</Text>
            <View style={styles.infoList}>
              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                  <Icon name="event" size={22} color={COLORS.gold} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>2nd Calving (Female Calf)</Text>
                  <Text style={styles.listSubtext}>Date: 15 Apr 2025 • Health: Healthy</Text>
                </View>
                <View style={styles.badgeSuccess}>
                  <Text style={styles.badgeText}>Success</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                  <Icon name="event" size={22} color={COLORS.gold} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>1st Calving (Male Calf)</Text>
                  <Text style={styles.listSubtext}>Date: 10 Jan 2024 • Health: Healthy</Text>
                </View>
                <View style={styles.badgeSuccess}>
                  <Text style={styles.badgeText}>Success</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                  <Icon name="event" size={22} color={COLORS.gold} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>Artificial Insemination</Text>
                  <Text style={styles.listSubtext}>Date: 12 Mar 2023 • Inseminator: Dr. Verma</Text>
                </View>
                <View style={styles.badgeDanger}>
                  <Text style={styles.badgeTextDanger}>Failed</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Activity' && (
          <View style={styles.sectionContainer}>
            {/* Activity Summary Cards */}
            <View style={styles.activityStatsGrid}>
              <View style={styles.activityStatBox}>
                <Icon name="directions-walk" size={24} color={COLORS.primary} />
                <Text style={styles.activityStatValue}>8,420</Text>
                <Text style={styles.activityStatLabel}>Steps Today</Text>
              </View>
              <View style={styles.activityStatBox}>
                <Icon name="restaurant" size={24} color={COLORS.primary} />
                <Text style={styles.activityStatValue}>7.5 hrs</Text>
                <Text style={styles.activityStatLabel}>Grazing Time</Text>
              </View>
              <View style={styles.activityStatBox}>
                <Icon name="update" size={24} color={COLORS.primary} />
                <Text style={styles.activityStatValue}>420 min</Text>
                <Text style={styles.activityStatLabel}>Rumination</Text>
              </View>
              <View style={styles.activityStatBox}>
                <Icon name="hotel" size={24} color={COLORS.primary} />
                <Text style={styles.activityStatValue}>9.0 hrs</Text>
                <Text style={styles.activityStatLabel}>Resting Time</Text>
              </View>
            </View>

            {/* Activity Level Status */}
            <View style={[styles.statusCard, { borderColor: COLORS.primary, marginTop: 15 }]}>
              <View style={styles.statusHeader}>
                <Icon name="speed" size={24} color={COLORS.primary} />
                <Text style={styles.statusTitle}>Activity Level: Normal</Text>
              </View>
              <Text style={styles.statusDescription}>
                Animal shows normal grazing, rumination and resting patterns. No anomalies or heat symptoms detected in the last 48 hours.
              </Text>
            </View>

            {/* Detailed Activity Logs */}
            <Text style={styles.sectionSubtitle}>Recent Activity Timeline</Text>
            <View style={styles.infoList}>
              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(22, 163, 74, 0.1)' }]}>
                  <Icon name="check-circle" size={22} color={COLORS.primary} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>Grazing & Feed Intake</Text>
                  <Text style={styles.listSubtext}>10:00 AM - 02:00 PM • Healthy appetite observed</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(22, 163, 74, 0.1)' }]}>
                  <Icon name="check-circle" size={22} color={COLORS.primary} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>Rumination Cycle</Text>
                  <Text style={styles.listSubtext}>02:30 PM - 04:30 PM • 120 minutes of rumination</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={[styles.listIconBg, { backgroundColor: 'rgba(22, 163, 74, 0.1)' }]}>
                  <Icon name="check-circle" size={22} color={COLORS.primary} />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listHeading}>Resting Period</Text>
                  <Text style={styles.listSubtext}>05:00 PM - 07:00 PM • Normal resting heart rate</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons matching style */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
          <Text style={styles.editBtnText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.recordBtn} 
          onPress={() => navigation.navigate('HealthRecord', { animalName: name, breed: breed })}
          activeOpacity={0.85}
        >
          <Icon name="healing" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.recordBtnText}>Health Record</Text>
        </TouchableOpacity>
      </View>

      {/* Chat FAB */}
      <TouchableOpacity 
        style={styles.chatFab}
        onPress={() => navigation.navigate('Community')}
        activeOpacity={0.85}
      >
        <Icon name="chat" size={26} color="#FFFFFF" />
      </TouchableOpacity>
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
  backBtn: { 
    width: 44, height: 44, borderRadius: 15, 
    justifyContent: 'center', alignItems: 'flex-start'
  },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  headerSubtitle: { fontSize: 12, color: COLORS.secondary, fontFamily: FONT_SANS, marginTop: 2 },
  shareBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 110 },
  
  imageContainer: { 
    height: 220, borderRadius: 24, overflow: 'hidden', 
    marginBottom: 20,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8
  },
  cowImage: { width: '100%', height: '100%' },

  tabBar: { 
    flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: COLORS.border, 
    paddingBottom: 8, marginBottom: 20, justifyContent: 'space-between'
  },
  tabBtn: { paddingVertical: 8, paddingHorizontal: 4 },
  tabBtnActive: { borderBottomWidth: 3, borderBottomColor: '#16A34A' },
  tabText: { fontSize: 14, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SANS },
  tabTextActive: { color: '#16A34A', fontWeight: '900' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15 },
  gridCell: { 
    width: (width - 63) / 2, backgroundColor: COLORS.surface, 
    borderRadius: 20, padding: 16, borderWidth: 1.5, borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  cellLabel: { fontSize: 12, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  cellValue: { fontSize: 15, fontWeight: '900', color: COLORS.darkGreen, marginTop: 6, fontFamily: FONT_SERIF },

  sectionContainer: {
    flex: 1,
  },
  descriptionCard: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
    fontFamily: FONT_SANS,
  },
  statusCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    marginLeft: 8,
  },
  statusDescription: {
    fontSize: 13,
    color: COLORS.secondary,
    lineHeight: 18,
    fontFamily: FONT_SANS,
  },
  sectionSubtitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    marginBottom: 12,
  },
  infoList: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  listIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  listHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkGreen,
    fontFamily: FONT_SANS,
  },
  listSubtext: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 2,
    fontFamily: FONT_SANS,
  },
  badgeSuccess: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
    fontFamily: FONT_SANS,
  },
  badgeWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeTextWarning: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F59E0B',
    fontFamily: FONT_SANS,
  },
  badgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeTextDanger: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EF4444',
    fontFamily: FONT_SANS,
  },
  dewormingCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dewormingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dewormingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkGreen,
    fontFamily: FONT_SANS,
    marginLeft: 6,
  },
  dewormingText: {
    fontSize: 13,
    color: COLORS.secondary,
    lineHeight: 18,
    fontFamily: FONT_SANS,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.darkGreen,
    marginTop: 4,
    fontFamily: FONT_SERIF,
  },
  activityStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  activityStatBox: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  activityStatValue: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkGreen,
    marginTop: 6,
    fontFamily: FONT_SERIF,
  },
  activityStatLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    marginTop: 2,
    fontFamily: FONT_SANS,
  },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 24, backgroundColor: COLORS.surface, flexDirection: 'row', gap: 12
  },
  editBtn: { 
    flex: 1, height: 56, backgroundColor: COLORS.surface, borderRadius: 28, 
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#16A34A'
  },
  editBtnText: { fontSize: 15, fontWeight: '900', color: '#16A34A', fontFamily: FONT_SANS },
  recordBtn: { 
    flex: 2.2, height: 56, backgroundColor: '#16A34A', borderRadius: 28, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 3, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8
  },
  recordBtnText: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS },
  chatFab: {
    position: 'absolute',
    bottom: 110,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 999
  }
});

export default AnimalDetailsScreen;