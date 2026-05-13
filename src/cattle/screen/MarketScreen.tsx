import React, { useMemo, useState } from 'react';
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
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  emerald: '#10B981',
  sky: '#0EA5E9',
};

const MarketplaceScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Food', 'Medicine', 'Livestock', 'Breeding', 'Birds'];

  const allListings = [
    {
      title: "Royal Canine Elite",
      brand: "Elite Nutrition",
      category: "Food",
      price: "85",
      info: "High Protein Kibble for Active Dogs",
      weight: "15kg Bag",
      type: "PROMOTED",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "5% Platform Fee"
    },
    {
      title: "VaxPro Healthcare",
      brand: "HealthGuard",
      category: "Medicine",
      price: "120",
      info: "Full Vaccination Pack for Livestock",
      weight: "5 Doses",
      type: "BRAND",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Ads Charge Apply"
    },
    {
      title: "DewormElite Plus",
      brand: "VetCare",
      category: "Medicine",
      price: "35",
      info: "Broad Spectrum Dewormer for Pets",
      weight: "10 Tabs",
      type: "STANDARD",
      image: "https://images.unsplash.com/photo-1631549916768-4119cb8e20ca?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "5% Comm."
    },
    {
      title: "Majestic Brahman",
      brand: "Texas Ranches",
      category: "Livestock",
      price: "12,500",
      info: "A++ Grade Show-Quality Bull",
      weight: "850kg",
      type: "PREMIUM",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Subscription"
    },
    {
      title: "Holstein Dairy Queen",
      brand: "Empire Dairy",
      category: "Livestock",
      price: "4,200",
      info: "High Milk Yield Certified Cow",
      weight: "620kg",
      type: "ELITE",
      image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Featured"
    },
    {
      title: "Champion Siberian",
      brand: "Arctic Breeds",
      category: "Breeding",
      price: "1,500",
      info: "Certified AKC Stud Service",
      weight: "Proven Sire",
      type: "ELITE",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Listing Fee Paid"
    },
    {
      title: "GSD Alpha Male",
      brand: "K9 Academy",
      category: "Breeding",
      price: "2,000",
      info: "Working Line German Shepherd Stud",
      weight: "IPO3 Certified",
      type: "PROMOTED",
      image: "https://images.unsplash.com/photo-1589944173175-400144838d05?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Ads Charge"
    },
    {
      title: "Scarlet Macaw",
      brand: "Exotic Aviary",
      category: "Birds",
      price: "2,800",
      info: "Hand-Raised Friendly Macaw",
      weight: "1.2kg",
      type: "EXCLUSIVE",
      image: "https://images.unsplash.com/photo-1484557918186-7b4e561c9948?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Commission 10%"
    },
    {
      title: "African Grey",
      brand: "Smart Birds",
      category: "Birds",
      price: "3,500",
      info: "Highly Intelligent Talking Parrot",
      weight: "500g",
      type: "PREMIUM",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30ebe3?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Elite"
    },
    {
      title: "Elite Cattle Feed",
      brand: "Green Pastures",
      category: "Food",
      price: "45",
      info: "High-Calorie Organic Growth Feed",
      weight: "50kg Bag",
      type: "STANDARD",
      image: "https://images.unsplash.com/photo-1516733958632-afb5fd88bb1a?auto=format&fit=crop&q=80&w=600",
      verified: false,
      commission: "Comm. Apply"
    },
    {
      title: "Persian Feast",
      brand: "Kitty Gourmet",
      category: "Food",
      price: "45",
      info: "Grain-Free Salmon & Rice Mix",
      weight: "2kg Pack",
      type: "STANDARD",
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=600",
      verified: false,
      commission: "Comm. Apply"
    }
  ];

  const filteredListings = useMemo(() => {
    if (activeFilter === 'All') return allListings;
    return allListings.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const ProductCard = ({ title, brand, price, info, image, type, verified, commission, weight }: any) => (
    <TouchableOpacity style={styles.modernCard}>
      <Image source={{ uri: image }} style={styles.cardImg} />
      <View style={styles.cardOverlay}>
        <View style={styles.typeBadge}><Text style={styles.typeText}>{type}</Text></View>
        {verified && (
          <View style={styles.verifiedBadge}>
            <Icon name="verified" size={14} color={COLORS.accent} />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.brandRow}>
          <Text style={styles.brandName}>{brand.toUpperCase()}</Text>
          {weight && <Text style={styles.weightTag}>{weight}</Text>}
        </View>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.infoText}>{info}</Text>
        <View style={styles.footer}>
          <View>
            <Text style={styles.priceText}>${price}</Text>
            <Text style={styles.commissionText}>{commission}</Text>
          </View>
          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyBtnText}>BUY NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Elite Marketplace</Text>
        <TouchableOpacity style={styles.cartBtn}>
          <Icon name="shopping-cart" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {filters.map((f, i) => (
            <TouchableOpacity 
              key={i} 
              onPress={() => setActiveFilter(f)}
              style={[styles.filterPill, activeFilter === f && styles.activePill]}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.activeFilterText]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={styles.promoBanner}>
          <Icon name="campaign" size={24} color="white" />
          <Text style={styles.promoText}>Promote your brand here. Higher rankings, more sales!</Text>
        </View>

        <View style={styles.grid}>
          {filteredListings.map((item, idx) => <ProductCard key={idx} {...item} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  cartBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#F1F5F3', justifyContent: 'center', alignItems: 'center' },
  filterSection: { paddingVertical: 15, backgroundColor: 'white' },
  filterPill: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 12, marginRight: 10, backgroundColor: '#F1F5F3' },
  activePill: { backgroundColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SERIF },
  activeFilterText: { color: 'white' },
  promoBanner: { backgroundColor: COLORS.emerald, padding: 15, borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  promoText: { color: 'white', fontSize: 12, fontWeight: '700', marginLeft: 10, flex: 1, fontFamily: FONT_SERIF },
  grid: { gap: 20 },
  modernCard: { backgroundColor: 'white', borderRadius: 25, overflow: 'hidden', elevation: 4 },
  cardImg: { width: '100%', height: 180 },
  cardOverlay: { position: 'absolute', top: 15, left: 15, right: 15, flexDirection: 'row', justifyContent: 'space-between' },
  typeBadge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { color: 'white', fontSize: 9, fontWeight: '900' },
  verifiedBadge: { backgroundColor: 'white', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20 },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandName: { fontSize: 10, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1, fontFamily: FONT_SERIF },
  weightTag: { fontSize: 10, fontWeight: '900', color: COLORS.emerald, backgroundColor: COLORS.emerald + '15', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  titleText: { fontSize: 20, fontWeight: '900', color: COLORS.primary, marginTop: 4, fontFamily: FONT_SERIF },
  infoText: { fontSize: 13, color: COLORS.secondary, marginTop: 4, lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  priceText: { fontSize: 22, fontWeight: '900', color: COLORS.primary },
  commissionText: { fontSize: 10, color: COLORS.emerald, fontWeight: '700', marginTop: 2 },
  buyBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  buyBtnText: { color: 'white', fontWeight: '900', fontSize: 12 }
});

export default MarketplaceScreen;