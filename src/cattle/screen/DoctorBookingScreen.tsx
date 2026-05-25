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
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const DoctorBookingScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const doctors = [
    {
      id: "doc-1",
      userId: "user-doc-1",
      name: "Dr. Sarah Mitchell",
      specialization: "Livestock Specialist",
      experienceYears: 12,
      consultationFee: 150.00,
      isVerified: true,
      rating: 4.9,
      reviewCount: 1200,
      isFeatured: true,
      image: "https://images.unsplash.com/photo-1559839734-2b71f153ef7ef?auto=format&fit=crop&q=80&w=400",

      // legacy compat
      specialty: "Livestock Specialist",
      experience: "12 Years",
      fee: "150",
      verified: true,
      featured: true,
      reviews: "1.2k"
    },
    {
      id: "doc-2",
      userId: "user-doc-2",
      name: "Dr. James Wilson",
      specialization: "Pet Surgeon",
      experienceYears: 8,
      consultationFee: 200.00,
      isVerified: true,
      rating: 4.8,
      reviewCount: 850,
      isFeatured: false,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",

      // legacy compat
      specialty: "Pet Surgeon",
      experience: "8 Years",
      fee: "200",
      verified: true,
      featured: false,
      reviews: "850"
    }
  ];

  const handleBooking = (docName: string, feeStr: string) => {
    const feeNum = parseFloat(feeStr);
    const commission = (feeNum * 0.2).toFixed(2);
    Alert.alert(
      "Confirm Booking",
      `Book ${docName}?\n\nService Fee: $${feeNum.toFixed(2)}\nPlatform Commission (20%): $${commission}\n\nTotal: $${feeNum.toFixed(2)}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => Alert.alert("Success", "Appointment Request Sent! 20% Commission Secured.") }
      ]
    );
  };

  const DoctorCard = (doc: any) => {
    const name = doc.name;
    const specialty = doc.specialization || doc.specialty;
    const rating = typeof doc.rating === 'number' ? doc.rating.toFixed(1) : doc.rating;
    const experience = typeof doc.experienceYears === 'number' ? `${doc.experienceYears} Years` : doc.experience;
    const fee = typeof doc.consultationFee === 'number' ? doc.consultationFee.toFixed(0) : doc.fee;
    const verified = doc.isVerified ?? doc.verified;
    const featured = doc.isFeatured ?? doc.featured;
    const reviews = typeof doc.reviewCount === 'number' ? `${(doc.reviewCount / 1000).toFixed(1)}k` : doc.reviews;
    const image = doc.image;

    return (
      <TouchableOpacity style={[styles.docCard, featured && styles.featuredCard]}>
        {featured && (
          <View style={styles.featuredBadge}>
            <Icon name="star" size={12} color={COLORS.surface} />
            <Text style={styles.featuredText}>TOP RATED</Text>
          </View>
        )}
        <View style={styles.cardHeader}>
          <Image source={{ uri: image }} style={styles.docImg} />
          <View style={styles.docInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.docName}>{name}</Text>
              {verified && <Icon name="verified" size={16} color={COLORS.medical} style={{ marginLeft: 5 }} />}
            </View>
            <Text style={styles.docSpec}>{specialty}</Text>
            <View style={styles.statsRow}>
              <Icon name="star" size={14} color={COLORS.gold} />
              <Text style={styles.statText}>{rating} ({reviews} Reviews)</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.feeLabel}>CONSULTATION FEE</Text>
            <Text style={styles.feeValue}>${fee}</Text>
          </View>
          <TouchableOpacity style={styles.bookBtn} onPress={() => handleBooking(name, fee)}>
            <Text style={styles.bookBtnText}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Appointments</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={styles.promoBox}>
          <Text style={styles.promoTitle}>Verified Elite Experts</Text>
          <Text style={styles.promoSub}>Get a Trust Mark & Top Listing. Apply for Verification.</Text>
        </View>

        <View style={styles.grid}>
          {doctors.map((doc, idx) => <DoctorCard key={idx} {...doc} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.background },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  promoBox: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 20, marginBottom: 25 },
  promoTitle: { color: COLORS.surface, fontSize: 18, fontWeight: '900', fontFamily: FONT_SERIF },
  promoSub: { color: COLORS.secondary, fontSize: 12, marginTop: 5 },
  grid: { gap: 20 },
  docCard: { backgroundColor: COLORS.surface, borderRadius: 25, padding: 20, elevation: 3, borderWidth: 1, borderColor: COLORS.border },
  featuredCard: { borderWidth: 2, borderColor: COLORS.medical },
  featuredBadge: { position: 'absolute', top: -12, right: 20, backgroundColor: COLORS.medical, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, zIndex: 5 },
  featuredText: { color: 'white', fontSize: 9, fontWeight: '900', marginLeft: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  docImg: { width: 80, height: 80, borderRadius: 20 },
  docInfo: { marginLeft: 15, flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  docName: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  docSpec: { fontSize: 13, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  statText: { fontSize: 12, color: COLORS.secondary, marginLeft: 4, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  feeLabel: { fontSize: 10, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  feeValue: { fontSize: 20, fontWeight: '900', color: COLORS.primary, marginTop: 2 },
  bookBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15 },
  bookBtnText: { color: COLORS.surface, fontWeight: '900', fontSize: 12 }
});

export default DoctorBookingScreen;
