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
import { useGetDoctorsByLocation } from '../../api/hook/doctor';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const DoctorBookingScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  // Fetch doctors dynamically by location (Pune as default coords)
  const { data: doctorsResponse, isLoading: isDoctorsLoading } = useGetDoctorsByLocation({
    latitude: 18.5204,
    longitude: 73.8567,
    limit: 50
  });

  const doctorsList = doctorsResponse?.data?.doctors || [];

  const handleBooking = (docName: string, feeNum: number) => {
    const commission = (feeNum * 0.2).toFixed(2);
    Alert.alert(
      "Confirm Booking",
      `Book ${docName}?\n\nService Fee: ₹${feeNum.toFixed(2)}\nPlatform Commission (20%): ₹${commission}\n\nTotal: ₹${feeNum.toFixed(2)}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => Alert.alert("Success", "Appointment Request Sent! 20% Commission Secured.") }
      ]
    );
  };

  const DoctorCard = ({ doc }: { doc: any }) => {
    const name = doc.user?.name || "Veterinary Doctor";
    const specialty = doc.specialization || "Livestock Specialist";
    const rating = "4.8";
    const experience = `${doc.experienceYears || 5} Years`;
    const feeVal = typeof doc.consultationFee === 'number' ? doc.consultationFee : parseFloat(doc.consultationFee) || 150;
    const fee = feeVal.toFixed(0);
    const verified = doc.isVerified ?? false;
    const featured = doc.isFeatured ?? false;
    const reviews = "1.2k";
    const image = doc.user?.avatarUrl || "https://images.unsplash.com/photo-1559839734-2b71f153ef7ef?auto=format&fit=crop&q=80&w=400";

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
            <Text style={styles.docSpec}>{specialty} • {experience} Exp</Text>
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
            <Text style={styles.feeValue}>₹{fee}</Text>
          </View>
          <TouchableOpacity style={styles.bookBtn} onPress={() => handleBooking(name, feeVal)}>
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
        <TouchableOpacity 
          style={styles.promoBox}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('RegisterDoctor')}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>Register as Doctor</Text>
            <Text style={styles.promoSub}>Join our platform and start receiving bookings.</Text>
          </View>
          <View style={styles.arrowCircle}>
            <Icon name="arrow-forward" size={20} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        {isDoctorsLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loaderText}>Finding doctors near you...</Text>
          </View>
        ) : doctorsList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="people-outline" size={48} color={COLORS.secondary} />
            <Text style={styles.emptyTitle}>No Doctors Listed Nearby</Text>
            <Text style={styles.emptySubtitle}>Be the first to register as a veterinarian in this area!</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {doctorsList.map((doc, idx) => (
              <DoctorCard key={doc.id || idx} doc={doc} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.background },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  promoBox: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 20, marginBottom: 25, flexDirection: 'row', alignItems: 'center' },
  promoTitle: { color: COLORS.surface, fontSize: 18, fontWeight: '900', fontFamily: FONT_SERIF },
  promoSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 5 },
  arrowCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
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
  bookBtnText: { color: COLORS.surface, fontWeight: '900', fontSize: 12 },
  loaderContainer: { paddingVertical: 50, alignItems: 'center', gap: 12 },
  loaderText: { fontSize: 14, color: COLORS.secondary, fontWeight: '600' },
  emptyContainer: { paddingVertical: 50, alignItems: 'center', gap: 12, backgroundColor: COLORS.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primary, marginTop: 8 },
  emptySubtitle: { fontSize: 13, color: COLORS.secondary, textAlign: 'center', paddingHorizontal: 20 }
});

export default DoctorBookingScreen;
