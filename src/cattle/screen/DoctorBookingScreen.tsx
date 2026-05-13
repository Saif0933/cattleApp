import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  emerald: '#10B981',
};

const DoctorBookingScreen = ({ navigation }: any) => {
  const doctors = [
    {
      name: "Dr. Sarah Mitchell",
      specialty: "Livestock Specialist",
      rating: "4.9",
      experience: "12 Years",
      fee: "150",
      image: "https://images.unsplash.com/photo-1559839734-2b71f15367ef?auto=format&fit=crop&q=80&w=400",
      verified: true,
      featured: true,
      reviews: "1.2k"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Pet Surgeon",
      rating: "4.8",
      experience: "8 Years",
      fee: "200",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      verified: true,
      featured: false,
      reviews: "850"
    }
  ];

  const handleBooking = (docName: string, fee: string) => {
    const commission = (parseFloat(fee) * 0.2).toFixed(2);
    Alert.alert(
      "Confirm Booking",
      `Book ${docName}?\n\nService Fee: $${fee}\nPlatform Commission: $${commission}\n\nTotal: $${fee}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => Alert.alert("Success", "Appointment Request Sent! 20% Commission Secured.") }
      ]
    );
  };

  const DoctorCard = ({ name, specialty, rating, experience, fee, image, verified, featured, reviews }: any) => (
    <TouchableOpacity style={[styles.docCard, featured && styles.featuredCard]}>
      {featured && (
        <View style={styles.featuredBadge}>
          <Icon name="star" size={12} color="white" />
          <Text style={styles.featuredText}>TOP RATED</Text>
        </View>
      )}
      <View style={styles.cardHeader}>
        <Image source={{ uri: image }} style={styles.docImg} />
        <View style={styles.docInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.docName}>{name}</Text>
            {verified && <Icon name="verified" size={16} color={COLORS.accent} style={{ marginLeft: 5 }} />}
          </View>
          <Text style={styles.docSpec}>{specialty}</Text>
          <View style={styles.statsRow}>
            <Icon name="star" size={14} color={COLORS.accent} />
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  promoBox: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 20, marginBottom: 25 },
  promoTitle: { color: 'white', fontSize: 18, fontWeight: '900', fontFamily: FONT_SERIF },
  promoSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 5 },
  grid: { gap: 20 },
  docCard: { backgroundColor: 'white', borderRadius: 25, padding: 20, elevation: 3 },
  featuredCard: { borderWidth: 2, borderColor: COLORS.accent },
  featuredBadge: { position: 'absolute', top: -12, right: 20, backgroundColor: COLORS.accent, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, zIndex: 5 },
  featuredText: { color: 'white', fontSize: 9, fontWeight: '900', marginLeft: 4 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  docImg: { width: 80, height: 80, borderRadius: 20 },
  docInfo: { marginLeft: 15, flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  docName: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  docSpec: { fontSize: 13, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  statText: { fontSize: 12, color: COLORS.secondary, marginLeft: 4, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F1F5F3', marginVertical: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  feeLabel: { fontSize: 10, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  feeValue: { fontSize: 20, fontWeight: '900', color: COLORS.primary, marginTop: 2 },
  bookBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15 },
  bookBtnText: { color: 'white', fontWeight: '900', fontSize: 12 }
});

export default DoctorBookingScreen;
