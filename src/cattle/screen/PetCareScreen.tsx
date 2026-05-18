import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
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

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  emerald: '#10B981',
  crimson: '#EF4444',
};

const PetCareScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('Vaccination');

  const vaccines = [
    { name: "Rabies Prevention", pet: "Dogs & Cats", price: "45", duration: "1 Year", icon: "security" },
    { name: "DHPP Elite", pet: "Dogs", price: "60", duration: "3 Years", icon: "shield" },
    { name: "FVRCP Premium", pet: "Cats", price: "55", duration: "1 Year", icon: "health-and-safety" }
  ];

  const handleBookVax = (name: string, price: string) => {
    Alert.alert(
      "Confirm Vaccination",
      `Book ${name} appointment?\n\nService Fee: $${price}\nPlatform Fee Included.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Book Appointment", onPress: () => Alert.alert("Success", "Vaccination appointment booked! Reminder set.") }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Care & Vaccination</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Keep Them Protected</Text>
          <Text style={styles.bannerSub}>Book certified vaccinations and track healthcare logs.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Essential Vaccines</Text>
          <View style={styles.grid}>
            {vaccines.map((v, i) => (
              <TouchableOpacity key={i} style={styles.vaxCard} onPress={() => handleBookVax(v.name, v.price)}>
                <View style={styles.vaxIcon}>
                  <Icon name={v.icon} size={30} color={COLORS.emerald} />
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.vaxName}>{v.name}</Text>
                  <Text style={styles.vaxSub}>{v.pet} • {v.duration}</Text>
                </View>
                <View style={styles.priceBox}>
                  <Text style={styles.priceValue}>${v.price}</Text>
                  <Icon name="chevron-right" size={20} color={COLORS.secondary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Healthcare Tracking</Text>
          <TouchableOpacity style={styles.trackCard} onPress={() => navigation.navigate('Healthcare')}>
            <Icon name="event-note" size={32} color={COLORS.primary} />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.trackTitle}>Appointment Reminders</Text>
              <Text style={styles.trackSub}>0 Upcoming • 2 Overdue</Text>
            </View>
            <View style={styles.alertDot} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.background },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  banner: { backgroundColor: COLORS.primary, padding: 25, borderRadius: 25, marginBottom: 30 },
  bannerTitle: { color: 'white', fontSize: 22, fontWeight: '900', fontFamily: FONT_SERIF },
  bannerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 5 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, marginBottom: 15, fontFamily: FONT_SERIF },
  grid: { gap: 15 },
  vaxCard: { backgroundColor: 'white', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', elevation: 3 },
  vaxIcon: { width: 55, height: 55, borderRadius: 15, backgroundColor: COLORS.emerald + '15', justifyContent: 'center', alignItems: 'center' },
  vaxName: { fontSize: 16, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  vaxSub: { fontSize: 12, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  priceBox: { flexDirection: 'row', alignItems: 'center' },
  priceValue: { fontSize: 18, fontWeight: '900', color: COLORS.primary, marginRight: 5 },
  trackCard: { backgroundColor: 'white', borderRadius: 20, padding: 25, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  trackTitle: { fontSize: 16, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  trackSub: { fontSize: 12, color: COLORS.crimson, marginTop: 2, fontWeight: '700' },
  alertDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.crimson }
});

export default PetCareScreen;
