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

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#10B981',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  gold: '#FFB800',
  crimson: '#EF4444',
  emerald: '#10B981',
};

const HerdScreen = ({ navigation }: any) => {

  const animals = [
    {
      id: "profile-1",
      ownerId: "user-123",
      name: "Oliver",
      category: "CAT",
      breed: "Persian Cat",
      ageMonths: 12,
      gender: "MALE",
      weight: 4.5,
      photoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400",

      vaccinations: [
        {
          id: "vax-1",
          vaccineName: "Rabies Vaccine",
          dueDate: "2026-11-15T00:00:00Z",
          administeredDate: "2026-10-12T00:00:00Z",
          status: "SCHEDULED"
        }
      ],

      // legacy fallbacks
      lastVax: "Oct 12, 2026",
      nextVax: "Nov 15, 2026",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "profile-2",
      ownerId: "user-123",
      name: "Billy",
      category: "GOAT",
      breed: "Boer Goat",
      ageMonths: 24,
      gender: "MALE",
      weight: 65.0,
      photoUrl: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400",

      vaccinations: [
        {
          id: "vax-2",
          vaccineName: "PPR Vaccine",
          dueDate: "2026-09-30T00:00:00Z",
          administeredDate: "2026-09-05T00:00:00Z",
          status: "MISSED"
        }
      ],

      // legacy fallbacks
      lastVax: "Sep 05, 2026",
      nextVax: "Sep 30, 2026",
      status: "Overdue",
      image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const getBadgeConfig = (status: string) => {
    if (status.toUpperCase() === 'OVERDUE') {
      return { bg: '#FEF2F2', text: '#EF4444', dot: '#EF4444', label: 'Overdue' };
    }
    return { bg: '#ECFDF5', text: '#10B981', dot: '#10B981', label: 'Upcoming' };
  };



  const CareCard = ({ animal }: { animal: any }) => {
    const name = animal.name;
    const breed = animal.breed;
    const image = animal.photoUrl || animal.image;
    
    // Aligned status, nextVax, lastVax from vaccinations array
    const latestVaxItem = animal.vaccinations?.[0];
    const status = latestVaxItem 
      ? (latestVaxItem.status === 'MISSED' ? 'Overdue' : 'Upcoming') 
      : animal.status;

    const lastVax = latestVaxItem?.administeredDate 
      ? new Date(latestVaxItem.administeredDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      : animal.lastVax;

    const nextVax = latestVaxItem?.dueDate 
      ? new Date(latestVaxItem.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      : animal.nextVax;

    const badge = getBadgeConfig(status);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {/* Circular status status border ring */}
          <View style={[styles.imageRing, { borderColor: badge.dot }]}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: image }} style={styles.animalImg} resizeMode="cover" />
            </View>
          </View>
          
          <View style={styles.animalInfo}>
            <Text style={styles.animalName}>{name}</Text>
            <Text style={styles.breedText}>{breed}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailLabel}>{animal.gender === 'MALE' ? 'Male' : 'Female'}</Text>
              <Text style={styles.detailDot}>•</Text>
              <Text style={styles.detailLabel}>{animal.weight} kg</Text>
            </View>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
            <View style={[styles.statusDot, { backgroundColor: badge.dot }]} />
            <Text style={[styles.statusText, { color: badge.text }]}>{badge.label.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.careRow}>
          <View style={styles.careBox}>
            <Text style={styles.careLabel}>LAST VACCINATION</Text>
            <Text style={styles.careValue}>{lastVax}</Text>
          </View>
          <View style={styles.careBox}>
            <Text style={styles.careLabel}>NEXT DUE</Text>
            <Text style={[styles.careValue, status === 'Overdue' && { color: COLORS.crimson }]}>{nextVax}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('HealthRecord', { animalName: name, breed: breed })}
        >
          <Icon name="history-edu" size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.logBtnText}>VIEW HEALTH HISTORY</Text>
          <Icon name="chevron-right" size={16} color={COLORS.primary} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity 
          style={styles.circleButton} 
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Healthcare Tracking</Text>

        <TouchableOpacity 
          style={styles.circleButton} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AddCattle')}
        >
          <Icon name="add" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Visual Hero Dashboard Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroSubtitle}>HERD COVERAGE</Text>
              <Text style={styles.heroTitle}>92% Protected</Text>
            </View>
            <View style={styles.heroBadge}>
              <Icon name="check-circle" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.heroBadgeText}>EXCELLENT</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '92%' }]} />
            </View>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNum}>12</Text>
              <Text style={styles.heroStatLabel}>Total Head</Text>
            </View>
            <View style={styles.heroVDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNum}>02</Text>
              <Text style={[styles.heroStatNum, { color: '#FFA8A8' }]}>Alerts</Text>
            </View>
            <View style={styles.heroVDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNum}>10</Text>
              <Text style={styles.heroStatLabel}>Immune</Text>
            </View>
          </View>
        </View>



        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vaccination Status</Text>
          <View style={styles.alertToggle}>
            <Icon name="notifications-active" size={16} color={COLORS.emerald} style={{ marginRight: 4 }} />
            <Text style={styles.seeAll}>Reminders On</Text>
          </View>
        </View>

        {/* Cards Grid */}
        <View style={styles.grid}>
          {animals.map((a, i) => (
            <CareCard key={i} animal={a} />
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  topHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },

  heroBanner: {
    backgroundColor: '#0F291E',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 6,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroSubtitle: {
    fontSize: 9,
    fontWeight: '800',
    color: '#10B981',
    letterSpacing: 1.5,
    fontFamily: FONT_SANS,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
    fontFamily: FONT_SANS,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: FONT_SANS,
  },
  progressContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#1E3E2F',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E3E2F',
    paddingTop: 16,
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatNum: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SANS,
  },
  heroStatLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#839A8F',
    marginTop: 4,
    fontFamily: FONT_SANS,
  },
  heroVDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#1E3E2F',
  },

  tabSection: {
    marginBottom: 20,
  },
  tabsScroll: {
    paddingVertical: 4,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTabPill: {
    backgroundColor: '#0F291E',
    borderColor: '#0F291E',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    fontFamily: FONT_SANS,
  },
  activeTabText: {
    color: '#FFFFFF',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F291E',
    fontFamily: FONT_SANS,
  },
  alertToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAll: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '800',
    fontFamily: FONT_SANS,
  },

  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageRing: {
    padding: 2,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 52,
    height: 52,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  animalImg: {
    width: '100%',
    height: '100%',
  },
  animalInfo: {
    marginLeft: 14,
    flex: 1,
  },
  animalName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F291E',
    fontFamily: FONT_SANS,
  },
  breedText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
    fontWeight: '600',
    fontFamily: FONT_SANS,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    fontFamily: FONT_SANS,
  },
  detailDot: {
    fontSize: 8,
    color: '#CBD5E1',
    marginHorizontal: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: FONT_SANS,
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },

  careRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  careBox: {
    flex: 1,
  },
  careLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
    fontFamily: FONT_SANS,
  },
  careValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F291E',
    marginTop: 4,
    fontFamily: FONT_SANS,
  },

  logBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logBtnText: {
    color: '#0F291E',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
    fontFamily: FONT_SANS,
  },
});

export default HerdScreen;