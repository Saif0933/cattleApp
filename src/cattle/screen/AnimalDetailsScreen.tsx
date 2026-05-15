import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCOIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  emerald: '#10B981',
  crimson: '#EF4444',
  border: '#F1F5F3',
};

const AnimalDetailsScreen = ({ route, navigation }: any) => {
  const { product } = route.params || {};

  // Fallback data for safety
  const details = {
    title: product?.title || 'Elite Specimen',
    price: product?.price || '85,000',
    breed: product?.brand || product?.title || 'Holstein Friesian',
    location: product?.info || 'Karnal, Haryana',
    image: product?.image || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=1200',
    weight: product?.weight || '450kg',
    yield: product?.yield || '12L/day',
    age: product?.age || '3 Years',
    gender: product?.gender || 'Female',
    description: product?.desc || 'This premium specimen is from a verified lineage of high-yield producers. Excellent health records and high fat content. Currently in prime condition.',
    phone: product?.phone || '9876543210',
  };

  const handleCall = () => {
    Linking.openURL(`tel:${details.phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animal Details</Text>
        <TouchableOpacity style={styles.headerCircle}>
          <Icon name="favorite-border" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Immersive Image Gallery */}
        <View style={styles.heroWrapper}>
          <Image
            source={{ uri: details.image }}
            style={styles.heroImage}
          />
          <View style={styles.galleryBadge}>
            <Icon name="photo-library" size={14} color="white" />
            <Text style={styles.galleryText}>1/5 Photos</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Title & Price Section */}
          <View style={styles.mainInfoCard}>
            <View style={styles.row}>
              <View style={styles.titleArea}>
                <View style={styles.breedRow}>
                  <Text style={styles.breedName}>{details.title}</Text>
                  <View style={styles.verifiedBadge}>
                    <Icon name="verified" size={12} color={COLORS.emerald} />
                    <Text style={styles.verifiedText}>ELITE</Text>
                  </View>
                </View>
                <View style={styles.locationRow}>
                  <Icon name="location-on" size={14} color={COLORS.secondary} />
                  <Text style={styles.locationText}>{details.location}</Text>
                </View>
              </View>
              <View style={styles.priceArea}>
                <Text style={styles.priceText}>₹{details.price}</Text>
                <Text style={styles.negText}>Negotiable</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Vital Stats Grid */}
            <View style={styles.statsGrid}>
              <StatItem icon="water-outline" label="Milk Yield" value={details.yield} />
              <StatItem icon="calendar-clock" label="Age" value={details.age} />
              <StatItem icon="weight-kilogram" label="Weight" value={details.weight} />
              <StatItem icon="gender-female" label="Gender" value={details.gender} />
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.descCard}>
              <Text style={styles.descText}>{details.description}</Text>
            </View>
          </View>

          {/* Health Verification */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health & Certification</Text>
            <View style={styles.healthCard}>
              <HealthRow icon="vaccines" label="Vaccination" value="Up to date" />
              <View style={styles.hDivider} />
              <HealthRow icon="verified-user" label="Vet Certified" value="Dr. Sharma (Verified)" />
              <View style={styles.hDivider} />
              <HealthRow icon="history-edu" label="Ancestry" value="Pure Breed" />
            </View>
          </View>

          {/* Seller Profile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seller Information</Text>
            <TouchableOpacity style={styles.sellerCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }}
                style={styles.sellerAvatar}
              />
              <View style={styles.sellerDetails}>
                <Text style={styles.sellerName}>Rajinder Singh</Text>
                <View style={styles.ratingBox}>
                  <Icon name="star" size={14} color={COLORS.accent} />
                  <Text style={styles.ratingText}>4.9 (42 Trades)</Text>
                </View>
              </View>
              <View style={styles.viewProfile}>
                <Icon name="chevron-right" size={24} color={COLORS.secondary} />
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatBtn}>
          <Icon name="chat-bubble-outline" size={20} color={COLORS.primary} />
          <Text style={styles.chatText}>Inquire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
          <Icon name="phone-in-talk" size={20} color="white" />
          <Text style={styles.callText}>Call Seller</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

// Internal Components
const StatItem = ({ icon, label, value }: any) => (
  <View style={styles.statItem}>
    <View style={styles.statIconBox}>
      <MCOIcon name={icon} size={22} color={COLORS.primary} />
    </View>
    <Text style={styles.statLab}>{label}</Text>
    <Text style={styles.statVal}>{value}</Text>
  </View>
);

const HealthRow = ({ icon, label, value }: any) => (
  <View style={styles.healthRow}>
    <Icon name={icon} size={20} color={COLORS.emerald} />
    <View style={styles.healthInfo}>
      <Text style={styles.healthLab}>{label}</Text>
      <Text style={styles.healthVal}>{value}</Text>
    </View>
    <Icon name="check-circle" size={16} color={COLORS.emerald} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  backCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  headerCircle: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },

  scrollContent: { paddingBottom: 120 },
  
  heroWrapper: { width: '100%', height: 300, backgroundColor: '#E2E8F0' },
  heroImage: { width: '100%', height: '100%' },
  galleryBadge: { position: 'absolute', bottom: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, flexDirection: 'row', alignItems: 'center' },
  galleryText: { color: 'white', fontSize: 10, fontWeight: '900', marginLeft: 6 },

  content: { padding: 20 },
  mainInfoCard: { backgroundColor: 'white', borderRadius: 30, padding: 25, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleArea: { flex: 1 },
  breedRow: { flexDirection: 'row', alignItems: 'center' },
  breedName: { fontSize: 22, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.emerald + '15', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 10 },
  verifiedText: { color: COLORS.emerald, fontSize: 8, fontWeight: '900', marginLeft: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationText: { fontSize: 12, color: COLORS.secondary, marginLeft: 5, fontWeight: '600' },
  
  priceArea: { alignItems: 'flex-end' },
  priceText: { fontSize: 24, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SANS },
  negText: { fontSize: 10, color: COLORS.emerald, fontWeight: '800', marginTop: 2 },
  
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 20 },
  
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { alignItems: 'center', width: (width - 100) / 4 },
  statIconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statLab: { fontSize: 8, fontWeight: '800', color: COLORS.secondary, letterSpacing: 0.5 },
  statVal: { fontSize: 11, fontWeight: '900', color: COLORS.primary, marginTop: 2 },

  section: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, marginBottom: 15 },
  descCard: { backgroundColor: 'white', borderRadius: 25, padding: 20, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  descText: { fontSize: 14, color: COLORS.secondary, lineHeight: 22, fontWeight: '500' },

  healthCard: { backgroundColor: 'white', borderRadius: 25, padding: 15, elevation: 4, shadowColor: '#000', shadowOpacity: 0.03 },
  healthRow: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  healthInfo: { flex: 1, marginLeft: 15 },
  healthLab: { fontSize: 10, color: COLORS.secondary, fontWeight: '700' },
  healthVal: { fontSize: 14, color: COLORS.primary, fontWeight: '800', marginTop: 2 },
  hDivider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 10 },

  sellerCard: { backgroundColor: 'white', borderRadius: 25, padding: 15, flexDirection: 'row', alignItems: 'center', elevation: 4, shadowOpacity: 0.03 },
  sellerAvatar: { width: 55, height: 55, borderRadius: 18, backgroundColor: COLORS.background },
  sellerDetails: { flex: 1, marginLeft: 15 },
  sellerName: { fontSize: 17, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  ratingBox: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { fontSize: 11, color: COLORS.secondary, fontWeight: '700', marginLeft: 5 },
  viewProfile: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: 'white', padding: 20, borderTopWidth: 1, borderTopColor: COLORS.border,
    flexDirection: 'row', paddingBottom: Platform.OS === 'ios' ? 40 : 25
  },
  chatBtn: { flex: 1, height: 60, borderRadius: 20, backgroundColor: COLORS.background, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  chatText: { color: COLORS.primary, fontWeight: '900', marginLeft: 10, letterSpacing: 1 },
  callBtn: { flex: 1.5, height: 60, borderRadius: 20, backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: COLORS.primary, shadowOpacity: 0.3 },
  callText: { color: 'white', fontWeight: '900', marginLeft: 10, letterSpacing: 1 }
});

export default AnimalDetailsScreen;