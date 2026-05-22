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
};

const BreedingScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const breeders = [
    {
      id: "srv-1",
      breederId: "breeder-1",
      title: "Thunder",
      breed: "Pure Arabian Horse",
      category: "HORSE",
      price: 1500.00,
      images: ["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "Elite breeding services for purebred horses.",
      tag: "EQUINE EXPERT",
      breeder: {
        businessName: "Elite Stables",
        experienceYears: 10,
        address: "Karnal, Haryana",
        isVerified: true,
        rating: 4.8
      },
      name: "Thunder",
      owner: "Elite Stables",
      fee: "1,500",
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400",
      verified: true
    },
    {
      id: "srv-2",
      breederId: "breeder-2",
      title: "Rex",
      breed: "German Shepherd",
      category: "DOG",
      price: 500.00,
      images: ["https://images.unsplash.com/photo-1589944173175-400144838d05?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "High agility German Shepherd for guard dog breeding.",
      tag: "CANINE EXPERT",
      breeder: {
        businessName: "Apex K9 Studios",
        experienceYears: 6,
        address: "Chandigarh",
        isVerified: true,
        rating: 4.7
      },
      name: "Rex",
      owner: "Apex K9",
      fee: "500",
      image: "https://images.unsplash.com/photo-1589944173175-400144838d05?auto=format&fit=crop&q=80&w=400",
      verified: true
    },
    {
      id: "srv-3",
      breederId: "breeder-3",
      title: "Aero",
      breed: "Trained Blue Macaw",
      category: "BIRDS",
      price: 350.00,
      images: ["https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "Hand-reared breeding service for high-color Macaws.",
      tag: "AVIAN SPECIALIST",
      breeder: {
        businessName: "Skyline Aviaries",
        experienceYears: 8,
        address: "Jaipur, Rajasthan",
        isVerified: true,
        rating: 4.9
      },
      name: "Aero",
      owner: "Skyline Aviaries",
      fee: "350",
      image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=400",
      verified: true
    },
    {
      id: "srv-4",
      breederId: "breeder-4",
      title: "Neptune",
      breed: "Butterfly Koi",
      category: "FISH",
      price: 120.00,
      images: ["https://images.unsplash.com/photo-1512411311534-118847053556?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "Premium Butterfly Koi genetics for ornamental ponds.",
      tag: "AQUATIC EXPERT",
      breeder: {
        businessName: "AquaZen Koi Farms",
        experienceYears: 12,
        address: "Kochi, Kerala",
        isVerified: true,
        rating: 4.8
      },
      name: "Neptune",
      owner: "AquaZen Koi Farms",
      fee: "120",
      image: "https://images.unsplash.com/photo-1512411311534-118847053556?auto=format&fit=crop&q=80&w=400",
      verified: true
    },
    {
      id: "srv-5",
      breederId: "breeder-5",
      title: "Sultan",
      breed: "Jamnapari Goat",
      category: "GOATS",
      price: 400.00,
      images: ["https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "Pure Jamnapari stud with excellent breeding records.",
      tag: "LIVESTOCK BREEDER",
      breeder: {
        businessName: "Hindustan Livestock",
        experienceYears: 15,
        address: "Karnal, Haryana",
        isVerified: true,
        rating: 4.9
      },
      name: "Sultan",
      owner: "Hindustan Livestock",
      fee: "400",
      image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400",
      verified: true
    },
    {
      id: "srv-6",
      breederId: "breeder-6",
      title: "Cleo",
      breed: "Persian Cat",
      category: "CATS",
      price: 300.00,
      images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "Show-quality triple-coat Persian cat breeding.",
      tag: "FELINE EXPERT",
      breeder: {
        businessName: "Royal Cattery",
        experienceYears: 5,
        address: "Mumbai, Maharashtra",
        isVerified: true,
        rating: 4.6
      },
      name: "Cleo",
      owner: "Royal Cattery",
      fee: "300",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400",
      verified: true
    },
    {
      id: "srv-7",
      breederId: "breeder-7",
      title: "Pip",
      breed: "Dumbo Rat",
      category: "SMALL_ANIMALS",
      price: 50.00,
      images: ["https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "Tame Dumbo Rat stud service for premium pet lines.",
      tag: "EXOTIC PETS",
      breeder: {
        businessName: "Pocket Pets Studio",
        experienceYears: 4,
        address: "Delhi NCR",
        isVerified: true,
        rating: 4.7
      },
      name: "Pip",
      owner: "Pocket Pets Studio",
      fee: "50",
      image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=400",
      verified: true
    },
    {
      id: "srv-8",
      breederId: "breeder-8",
      title: "Goldy",
      breed: "Aseel Rooster",
      category: "HENS",
      price: 150.00,
      images: ["https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400"],
      availability: "Available Now",
      description: "Purebred fighter-line Aseel Rooster stud service.",
      tag: "POULTRY SPECIALIST",
      breeder: {
        businessName: "Desi Farms",
        experienceYears: 7,
        address: "Ludhiana, Punjab",
        isVerified: true,
        rating: 4.8
      },
      name: "Goldy",
      owner: "Desi Farms",
      fee: "150",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400",
      verified: true
    }
  ];

  const handleConnect = (name: string, owner: string) => {
    Alert.alert(
      "Connect with Breeder",
      `Would you like to connect with ${owner} for breeding service with ${name}?\n\nPlatform Service Fee applies.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Connect", onPress: () => Alert.alert("Success", "Request Sent! Breeder will contact you shortly.") }
      ]
    );
  };

  const getTagColors = (tag: string) => {
    const t = tag.toUpperCase();
    if (t.includes('AVAILABLE')) return { bg: '#E0F2FE', text: '#0369A1' };
    if (t.includes('VERIFIED')) return { bg: '#DCFCE7', text: '#15803D' };
    if (t.includes('HORSE') || t.includes('EQUINE')) return { bg: '#FEE2E2', text: '#B91C1C' };
    if (t.includes('DOG') || t.includes('CANINE')) return { bg: '#FEF3C7', text: '#B45309' };
    if (t.includes('BIRD') || t.includes('AVIAN')) return { bg: '#E0F2FE', text: '#0369A1' };
    if (t.includes('FISH') || t.includes('AQUATIC')) return { bg: '#E0F2FE', text: '#0284C7' };
    if (t.includes('GOAT') || t.includes('LIVESTOCK')) return { bg: '#F0FDF4', text: '#16A34A' };
    if (t.includes('CAT') || t.includes('FELINE')) return { bg: '#FAF5FF', text: '#7E22CE' };
    if (t.includes('POULTRY') || t.includes('HEN')) return { bg: '#FFF7ED', text: '#EA580C' };
    return { bg: '#F3E8FF', text: '#6B21A8' };
  };

  const filteredBreeders = breeders.filter(b => {
    const q = searchQuery.toLowerCase();
    const name = (b.title || b.name || '').toLowerCase();
    const breed = (b.breed || '').toLowerCase();
    const owner = (b.breeder?.businessName || b.owner || '').toLowerCase();
    const category = (b.category || '').toLowerCase();
    return name.includes(q) || breed.includes(q) || owner.includes(q) || category.includes(q);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
          <Icon name="location-on" size={16} color={COLORS.accent} />
          <Text style={styles.locationText}>Abilene, TX</Text>
          <Icon name="keyboard-arrow-down" size={16} color={COLORS.secondary} />
        </TouchableOpacity>

        <Text style={styles.logoTitle}>AgriBreeding</Text>

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
            placeholder="Search breeders, species, or studs..."
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

      {/* Breeders List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionTitle}>Top Rated Breeders</Text>

        <View style={styles.listContainer}>
          {filteredBreeders.map((b) => {
            const name = b.title || b.name;
            const breed = b.breed;
            const owner = b.breeder?.businessName || b.owner;
            const priceVal = typeof b.price === 'number' ? b.price.toLocaleString() : b.fee;
            const image = b.images?.[0] || b.image;
            const rating = b.breeder?.rating || 4.8;
            const tagColors = getTagColors(b.tag || 'VERIFIED BREEDER');

            return (
              <TouchableOpacity
                key={b.id}
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => handleConnect(name, owner)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: image }} style={styles.cardImg} resizeMode="cover" />
                </View>
                
                <View style={styles.cardInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.animalName} numberOfLines={1}>{name}</Text>
                    <View style={styles.ratingContainer}>
                      <Icon name="star" size={14} color="#F59E0B" />
                      <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.breedText} numberOfLines={1}>{breed} • {owner}</Text>
                  <Text style={styles.descText} numberOfLines={1}>{b.description}</Text>
                  
                  <View style={styles.footerRow}>
                    <View style={[styles.tagBadge, { backgroundColor: tagColors.bg }]}>
                      <Text style={[styles.tagBadgeText, { color: tagColors.text }]}>{b.tag}</Text>
                    </View>
                    <Text style={styles.priceText}>${priceVal}</Text>
                  </View>
                </View>

                <Icon name="chevron-right" size={24} color="#94A3B8" style={styles.chevronIcon} />
              </TouchableOpacity>
            );
          })}
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
  animalName: {
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
  breedText: {
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
});

export default BreedingScreen;
