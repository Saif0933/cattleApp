import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
  sky: '#0EA5E9',
  crimson: '#EF4444',
};

const PetCareScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const careItems = [
    // Vaccines
    {
      id: "vax-1",
      name: "Rabies Prevention Vaccine",
      pet: "Dogs & Cats",
      price: "45",
      duration: "1 Year",
      type: "VACCINE",
      image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=400",
      description: "Essential immunization shielding pets against the rabies virus."
    },
    {
      id: "vax-2",
      name: "DHPP Elite Vaccine",
      pet: "Dogs",
      price: "60",
      duration: "3 Years",
      type: "VACCINE",
      image: "https://images.unsplash.com/photo-1608535002287-fc01d5c3db76?auto=format&fit=crop&q=80&w=400",
      description: "Protects against Canine Distemper, Hepatitis, Parvovirus, and Parainfluenza."
    },
    {
      id: "vax-3",
      name: "FVRCP Premium Vaccine",
      pet: "Cats",
      price: "55",
      duration: "1 Year",
      type: "VACCINE",
      image: "https://images.unsplash.com/photo-1618961734760-466979cb35b0?auto=format&fit=crop&q=80&w=400",
      description: "Immunizes felines from Rhinotracheitis, Calicivirus, and Panleukopenia."
    },
    {
      id: "vax-4",
      name: "FMD Cattle Vaccine",
      pet: "Cattle & Goats",
      price: "30",
      duration: "6 Months",
      type: "VACCINE",
      image: "https://images.unsplash.com/photo-1618961369757-b2f293b6e82c?auto=format&fit=crop&q=80&w=400",
      description: "High-protection vaccine shielding livestock from Foot-and-Mouth disease."
    },
    // Medicines
    {
      id: "med-1",
      name: "Broad Spectrum Dewormer",
      pet: "All Animals",
      price: "15",
      duration: "Single Dose",
      type: "MEDICINE",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
      description: "Fast-acting oral tablet to eliminate internal roundworms and tapeworms."
    },
    {
      id: "med-2",
      name: "Multi-Vitamin Booster",
      pet: "Dogs, Cats & Cattle",
      price: "25",
      duration: "Daily Dose",
      type: "MEDICINE",
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80&w=400",
      description: "Growth booster syrup promoting bone health and a shiny coat."
    },
    {
      id: "med-3",
      name: "Anti-Tick & Flea Topical",
      pet: "Dogs & Cats",
      price: "35",
      duration: "1 Month",
      type: "MEDICINE",
      image: "https://images.unsplash.com/photo-1607619056574-7b8f304b3c86?auto=format&fit=crop&q=80&w=400",
      description: "Squeeze-on solution that repels ticks, fleas, and biting lice."
    },
    {
      id: "med-4",
      name: "Antibiotic Eye Drops",
      pet: "Birds, Cats & Dogs",
      price: "20",
      duration: "7 Days",
      type: "MEDICINE",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
      description: "Veterinary-grade drops curing conjunctivitis and optical infections."
    }
  ];

  const handleConfirmBooking = (item: any) => {
    Alert.alert(
      `Confirm ${item.type === 'VACCINE' ? 'Vaccination' : 'Medicine Purchase'}`,
      `Proceed with ${item.name}?\n\nPrice: $${item.price}\nAll services include medical certificate logs.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => Alert.alert("Success", `${item.name} has been confirmed successfully!`) }
      ]
    );
  };

  const getTagColors = (type: string) => {
    const t = type.toUpperCase();
    if (t.includes('VACCINE')) return { bg: '#E0F2FE', text: '#0369A1' };
    if (t.includes('MEDICINE')) return { bg: '#DCFCE7', text: '#15803D' };
    return { bg: '#F3E8FF', text: '#6B21A8' };
  };

  const filteredCareItems = careItems.filter(item => {
    const q = searchQuery.toLowerCase();
    const name = (item.name || '').toLowerCase();
    const pet = (item.pet || '').toLowerCase();
    const type = (item.type || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    return name.includes(q) || pet.includes(q) || type.includes(q) || desc.includes(q);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.logoTitle}>AgriCare</Text>

        <TouchableOpacity 
          style={styles.cartButton} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('OrderSummary')}
        >
          <Icon name="shopping-cart" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={22} color={COLORS.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vaccines, medicines, or pets..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color={COLORS.secondary} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionTitle}>Vaccines & Medicines</Text>

        <View style={styles.listContainer}>
          {filteredCareItems.map((item) => {
            const tagColors = getTagColors(item.type);
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => handleConfirmBooking(item)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.cardImg} resizeMode="cover" />
                </View>
                
                <View style={styles.cardInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Icon name="star" size={14} color="#F59E0B" />
                      <Text style={styles.ratingText}>4.9</Text>
                    </View>
                  </View>

                  <Text style={styles.petText} numberOfLines={1}>{item.pet} • {item.duration}</Text>
                  <Text style={styles.descText} numberOfLines={1}>{item.description}</Text>
                  
                  <View style={styles.footerRow}>
                    <View style={[styles.tagBadge, { backgroundColor: tagColors.bg }]}>
                      <Text style={[styles.tagBadgeText, { color: tagColors.text }]}>{item.type}</Text>
                    </View>
                    <Text style={styles.priceText}>${item.price}</Text>
                  </View>
                </View>

                <Icon name="chevron-right" size={24} color="#94A3B8" style={styles.chevronIcon} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Healthcare Tracking Section */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Healthcare Tracking</Text>
        <TouchableOpacity 
          style={styles.trackCard} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Healthcare')}
        >
          <Icon name="event-note" size={32} color={COLORS.primary} />
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={styles.trackTitle}>Appointment Reminders</Text>
            <Text style={styles.trackSub}>0 Upcoming • 2 Overdue</Text>
          </View>
          <View style={styles.alertDot} />
        </TouchableOpacity>

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
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F291E',
    marginHorizontal: 4,
    fontFamily: FONT_SANS,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF,
  },
  cartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F291E',
    fontFamily: FONT_SANS,
    paddingVertical: 0,
  },
  clearIcon: {
    marginLeft: 8,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F291E',
    marginBottom: 16,
    fontFamily: FONT_SANS,
  },
  listContainer: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F291E',
    fontFamily: FONT_SANS,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 2,
    fontFamily: FONT_SANS,
  },
  petText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginTop: 2,
    fontFamily: FONT_SANS,
  },
  descText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    fontFamily: FONT_SANS,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingRight: 8,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: FONT_SANS,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#10B981',
    fontFamily: FONT_SANS,
  },
  chevronIcon: {
    marginLeft: 4,
  },

  trackCard: { 
    backgroundColor: 'white', 
    borderRadius: 16, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 20,
  },
  trackTitle: { fontSize: 16, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SANS },
  trackSub: { fontSize: 12, color: COLORS.crimson, marginTop: 2, fontWeight: '700', fontFamily: FONT_SANS },
  alertDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.crimson }
});

export default PetCareScreen;
