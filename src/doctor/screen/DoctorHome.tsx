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
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');

const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const DoctorHome = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const quickServices = [
    { label: 'Book\nDoctor', icon: 'doctor', isMC: true, color: '#16A34A', bg: '#F1FDF5', screen: 'AvailableDoctors' },
    { label: 'Chat with\nDoctor', icon: 'message-processing-outline', isMC: true, color: '#10B981', bg: '#ECFDF5', screen: 'AvailableDoctors' },
    { label: 'Medicines\n& Supplements', icon: 'pill', isMC: true, color: '#059669', bg: '#E6FBF1', screen: 'PharmacyScreen' },
    { label: 'Health\nRecords', icon: 'clipboard-text-outline', isMC: true, color: '#0EA5E9', bg: '#F0F9FF', screen: 'RecordeScreen' },
    { label: 'Vaccination\nReminder', icon: 'needle', isMC: true, color: '#F59E0B', bg: '#FEF8EB', screen: 'ServicesList' },
    { label: 'Offers &\nPackages', icon: 'tag-outline', isMC: true, color: '#EC4899', bg: '#FDF2F8', screen: 'ServicesList' },
  ];

  const popularServices = [
    {
      title: 'General Health Checkup',
      price: 'From ₹299',
      icon: 'stethoscope',
      img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'Vaccination Services',
      price: 'From ₹199',
      icon: 'needle',
      img: 'https://images.unsplash.com/photo-1546445317-29f4545e6d51?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'Deworming Treatment',
      price: 'From ₹149',
      icon: 'bug-outline',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'Fertility Consultation',
      price: 'From ₹399',
      icon: 'heart-outline',
      img: 'https://images.unsplash.com/photo-1532983330958-2f35515e3725?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const whyChooseUs = [
    { label: 'Experienced\nDoctors', icon: 'account-group', color: '#16A34A', bg: '#EAF6EE' },
    { label: 'Doorstep\nService', icon: 'moped', color: '#16A34A', bg: '#EAF6EE' },
    { label: 'Affordable\nPrices', icon: 'currency-inr', color: '#16A34A', bg: '#EAF6EE' },
    { label: 'Trusted by\nFarmers', icon: 'shield-check', color: '#16A34A', bg: '#EAF6EE' }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />

      {/* 1. Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
          <Icon name="place" size={20} color="#16A34A" style={styles.locationPin} />
          <Text style={styles.locationText}>New Delhi, India</Text>
          <Icon name="keyboard-arrow-down" size={16} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bellBtn} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MyAppointments')}
        >
          <Icon name="notifications-none" size={24} color={COLORS.primary} />
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* 2. Welcome Greeting */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hi, Ramesh 👋</Text>
          <Text style={styles.welcomeSubtitle}>We care for your cattle's health</Text>
        </View>

        {/* 3. Expert Care Promo Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerLeft}>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>⚡ Fast Response • Trusted Care</Text>
            </View>
            <View>
              <Text style={styles.bannerTitle}>Expert Care for{"\n"}<Text style={{color: '#15803D'}}>Healthy Cattle</Text></Text>
              <Text style={styles.bannerSubtitle}>Consult verified cattle doctors at your doorstep.</Text>
            </View>
            <TouchableOpacity 
              style={styles.bookNowBtn} 
              activeOpacity={0.9}
              onPress={() => navigation.navigate('AvailableDoctors')}
            >
              <Text style={styles.bookNowText}>Book a Doctor Now</Text>
              <View style={styles.arrowCircle}>
                <Icon name="arrow-forward" size={14} color="#16A34A" />
              </View>
            </TouchableOpacity>
          </View>
          
          <Image 
            source={{ uri: 'https://ik.imagekit.io/y75s1eeia/doctor_cow_banner.png' }} 
            style={styles.bannerDocImg as any}
            defaultSource={{ uri: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400' }}
          />
        </View>

        {/* 4. Quick Services Grid */}
        <View style={styles.servicesGrid}>
          {quickServices.map((service, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.serviceCard} 
              activeOpacity={0.85}
              onPress={() => navigation.navigate(service.screen)}
            >
              <View style={[styles.serviceIconCircle, { backgroundColor: service.bg }]}>
                {service.isMC ? (
                  <MCIcon name={service.icon} size={24} color={service.color} />
                ) : (
                  <Icon name={service.icon} size={24} color={service.color} />
                )}
              </View>
              <Text style={styles.serviceLabel}>{service.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 5. Need Urgent Help Hotline */}
        <View style={styles.urgentHelpContainer}>
          <View style={styles.urgentLeft}>
            <View style={styles.urgent247Circle}>
              <MCIcon name="phone-in-talk" size={22} color="#16A34A" />
            </View>
            <View>
              <Text style={styles.urgentTitle}>Need Urgent Help?</Text>
              <Text style={styles.urgentSubtitle}>Talk to a cattle doctor instantly</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.callNowBtn}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Emergency Call', 'Dialing nearest emergency veterinary response center...')}
          >
            <MCIcon name="phone" size={16} color="#16A34A" />
            <Text style={styles.callNowText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Popular Services Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ServicesList')}>
            <View style={styles.viewAllRow}>
              <Text style={styles.viewAllLink}>View All</Text>
              <Icon name="keyboard-arrow-right" size={16} color="#16A34A" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularList}
        >
          {popularServices.map((service, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.popularCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ServiceDetails', { serviceName: service.title })}
            >
              <View style={styles.popularCardImgContainer}>
                <Image source={{ uri: service.img }} style={styles.popularImg as any} />
                <View style={styles.popularIconOverlay}>
                  <MCIcon name={service.icon} size={14} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.popularCardBody}>
                <Text style={styles.popularCardTitle} numberOfLines={2}>{service.title}</Text>
                <Text style={styles.popularCardPrice}>{service.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 7. Good Care, Good Productivity Promo */}
        <View style={styles.productivityCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=300' }} 
            style={styles.productivityImg as any} 
          />
          <View style={styles.productivityContent}>
            <Text style={styles.productivityTitle}>Good Care, Good Productivity</Text>
            <Text style={styles.productivityDesc}>Regular checkups and timely vaccination keep your cattle healthy and productive.</Text>
            <TouchableOpacity 
              style={styles.learnMoreBtn}
              activeOpacity={0.8}
              onPress={() => Alert.alert('Learn More', 'Vaccinations shield cows from common viral diseases. Keep checking records!')}
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 8. Why Choose Us Grid */}
        <Text style={styles.whyTitle}>Why Choose Us?</Text>
        <View style={styles.whyGrid}>
          {whyChooseUs.map((item, idx) => (
            <View key={idx} style={styles.whyCard}>
              <View style={styles.whyIconCircle}>
                <MCIcon name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.whyLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.isDark ? COLORS.background : '#FAFAF9' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: COLORS.isDark ? COLORS.background : '#FAFAF9',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: 4,
    fontFamily: FONT_SANS,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bellBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#16A34A',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  
  welcomeSection: {
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 15,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  welcomeSubtitle: {
    fontSize: 13.5,
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginTop: 2,
    fontWeight: '600',
  },
  
  bannerContainer: {
    marginHorizontal: 24,
    backgroundColor: '#EAF6EE',
    borderRadius: 24,
    padding: 20,
    position: 'relative',
    height: 175,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#D3ECDB',
    justifyContent: 'center',
    overflow: 'visible',
  },
  bannerLeft: {
    width: '60%',
    height: '100%',
    justifyContent: 'space-between',
  },
  bannerBadge: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#B5E2C4',
  },
  bannerBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#16A34A',
    fontFamily: FONT_SANS,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF,
    lineHeight: 24,
    marginTop: 8,
  },
  bannerSubtitle: {
    fontSize: 10,
    color: '#4B5563',
    fontFamily: FONT_SANS,
    marginTop: 4,
    fontWeight: '600',
    lineHeight: 14,
  },
  bookNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15803D',
    alignSelf: 'flex-start',
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 8,
    borderRadius: 24,
    marginTop: 10,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_SANS,
    marginRight: 8,
  },
  arrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerDocImg: {
    position: 'absolute',
    right: 5,
    bottom: -1,
    width: 140,
    height: 176,
    zIndex: 2,
  },
  
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  serviceCard: {
    width: (width - 64) / 3,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  serviceIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    fontFamily: FONT_SANS,
    lineHeight: 14,
  },
  
  urgentHelpContainer: {
    marginHorizontal: 24,
    backgroundColor: '#F4FAF5',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E1EFE5',
  },
  urgentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  urgent247Circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2F2E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  urgentTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF,
  },
  urgentSubtitle: {
    fontSize: 11,
    color: '#4B5563',
    fontFamily: FONT_SANS,
    marginTop: 2,
    fontWeight: '600',
  },
  callNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#16A34A',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  callNowText: {
    color: '#16A34A',
    fontSize: 11.5,
    fontWeight: '900',
    fontFamily: FONT_SANS,
    marginLeft: 6,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllLink: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16A34A',
    fontFamily: FONT_SANS,
  },
  
  popularList: {
    paddingLeft: 24,
    paddingRight: 12,
    paddingBottom: 15,
    marginBottom: 20,
  },
  popularCard: {
    width: 145,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  popularCardImgContainer: {
    position: 'relative',
    width: '100%',
    height: 95,
  },
  popularImg: {
    width: '100%',
    height: '100%',
  },
  popularIconOverlay: {
    position: 'absolute',
    bottom: -12,
    left: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
    zIndex: 5,
  },
  popularCardBody: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 12,
  },
  popularCardTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    lineHeight: 15,
  },
  popularCardPrice: {
    fontSize: 11,
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginTop: 4,
    fontWeight: '700',
  },
  
  productivityCard: {
    marginHorizontal: 24,
    backgroundColor: '#F5FAF6',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E3EFE5',
  },
  productivityImg: {
    width: 80,
    height: 75,
    borderRadius: 12,
    marginRight: 14,
  },
  productivityContent: {
    flex: 1,
  },
  productivityTitle: {
    fontSize: 14.5,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF,
  },
  productivityDesc: {
    fontSize: 10.5,
    color: '#4B5563',
    fontFamily: FONT_SANS,
    marginTop: 3,
    lineHeight: 14,
    fontWeight: '600',
  },
  learnMoreBtn: {
    backgroundColor: '#15803D',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  learnMoreText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: FONT_SANS,
  },
  
  whyTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  whyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  whyCard: {
    width: (width - 68) / 4,
    alignItems: 'center',
  },
  whyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF6EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D8EDE0',
  },
  whyLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: COLORS.secondary,
    textAlign: 'center',
    fontFamily: FONT_SANS,
    lineHeight: 12,
  },
});

export default DoctorHome;
