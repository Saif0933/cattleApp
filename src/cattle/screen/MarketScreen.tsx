import React, { useMemo, useState } from 'react';
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
import { useThemeColors } from '../../context/useTheme';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const MarketplaceScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const filters = [
    { label: 'All', value: 'ALL' },
    { label: 'Medicines', value: 'MEDICINES' },
    { label: 'Dog Food', value: 'DOG_FOOD' },
    { label: 'Cat Food', value: 'CAT_FOOD' },
    { label: 'Cattle Feed', value: 'CATTLE_FEED' },
    { label: 'Supplements', value: 'SUPPLEMENTS' },
    { label: 'Farming Tools', value: 'FARMING_TOOLS' },
    { label: 'Vaccines', value: 'VACCINES' },
    { label: 'Accessories', value: 'ACCESSORIES' },
  ];

  const allListings = [
    {
      id: "prod-101",
      vendorId: "vendor-1",
      name: "Royal Canine Elite",
      description: "High Protein Kibble for Active Dogs",
      price: 85.00,
      stock: 30,
      category: "DOG_FOOD",
      images: ["https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600"],
      isFeatured: true,
      rating: 4.8,
      
      // compatibility fields
      title: "Royal Canine Elite",
      brand: "Elite Nutrition",
      info: "High Protein Kibble for Active Dogs",
      weight: "15kg Bag",
      type: "PROMOTED",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "5% Platform Fee"
    },
    {
      id: "prod-102",
      vendorId: "vendor-2",
      name: "VaxPro Healthcare",
      description: "Full Vaccination Pack for Livestock",
      price: 120.00,
      stock: 45,
      category: "VACCINES",
      images: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600"],
      isFeatured: true,
      rating: 4.7,

      // compatibility fields
      title: "VaxPro Healthcare",
      brand: "HealthGuard",
      info: "Full Vaccination Pack for Livestock",
      weight: "5 Doses",
      type: "BRAND",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Ads Charge Apply"
    },
    {
      id: "prod-103",
      vendorId: "vendor-3",
      name: "DewormElite Plus",
      description: "Broad Spectrum Dewormer for Pets",
      price: 35.00,
      stock: 120,
      category: "MEDICINES",
      images: ["https://images.unsplash.com/photo-1631549916768-4119cb8e20ca?auto=format&fit=crop&q=80&w=600"],
      isFeatured: false,
      rating: 4.5,

      // compatibility fields
      title: "DewormElite Plus",
      brand: "VetCare",
      info: "Broad Spectrum Dewormer for Pets",
      weight: "10 Tabs",
      type: "STANDARD",
      image: "https://images.unsplash.com/photo-1631549916768-4119cb8e20ca?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "5% Comm."
    },
    {
      id: "prod-104",
      vendorId: "vendor-4",
      name: "Elite Cattle Feed",
      description: "High-Calorie Organic Growth Feed",
      price: 45.00,
      stock: 80,
      category: "CATTLE_FEED",
      images: ["https://images.unsplash.com/photo-1516733958632-afb5fd88bb1a?auto=format&fit=crop&q=80&w=600"],
      isFeatured: false,
      rating: 4.6,

      // compatibility fields
      title: "Elite Cattle Feed",
      brand: "Green Pastures",
      info: "High-Calorie Organic Growth Feed",
      weight: "50kg Bag",
      type: "STANDARD",
      image: "https://images.unsplash.com/photo-1516733958632-afb5fd88bb1a?auto=format&fit=crop&q=80&w=600",
      verified: false,
      commission: "Comm. Apply"
    },
    {
      id: "prod-105",
      vendorId: "vendor-5",
      name: "Persian Feast",
      description: "Grain-Free Salmon & Rice Mix",
      price: 45.00,
      stock: 90,
      category: "CAT_FOOD",
      images: ["https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=600"],
      isFeatured: false,
      rating: 4.4,

      // compatibility fields
      title: "Persian Feast",
      brand: "Kitty Gourmet",
      info: "Grain-Free Salmon & Rice Mix",
      weight: "2kg Pack",
      type: "STANDARD",
      image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=600",
      verified: false,
      commission: "Comm. Apply"
    },
    {
      id: "prod-106",
      vendorId: "vendor-6",
      name: "Elite Dog Manor",
      description: "Weather-Proof Premium Wooden Dog House",
      price: 450.00,
      stock: 10,
      category: "ACCESSORIES",
      images: ["https://images.unsplash.com/photo-1591130901021-39e99292944d?auto=format&fit=crop&q=80&w=600"],
      isFeatured: true,
      rating: 4.9,

      // compatibility fields
      title: "Elite Dog Manor",
      brand: "PetShelter Pro",
      info: "Weather-Proof Premium Wooden Dog House",
      weight: "Large Size",
      type: "EXCLUSIVE",
      image: "https://images.unsplash.com/photo-1591130901021-39e99292944d?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "10% Platform"
    },
    {
      id: "prod-107",
      vendorId: "vendor-7",
      name: "Pro Cattle Feeder",
      description: "Heavy-Duty Automatic Feeding System",
      price: 850.00,
      stock: 4,
      category: "FARMING_TOOLS",
      images: ["https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=600"],
      isFeatured: true,
      rating: 4.9,

      // compatibility fields
      title: "Pro Cattle Feeder",
      brand: "FarmTech",
      info: "Heavy-Duty Automatic Feeding System",
      weight: "500kg Cap.",
      type: "ELITE",
      image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=600",
      verified: true,
      commission: "Subscription"
    }
  ];

  const filteredListings = useMemo(() => {
    if (activeFilter === 'ALL') return allListings;
    return allListings.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const ProductCard = (item: any) => {
    const title = item.name || item.title || 'Premium Item';
    const brand = item.brand || item.category || 'Elite Brand';
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price || '0');
    const info = item.description || item.info || 'No description provided';
    const image = (item.images && item.images.length > 0) ? item.images[0] : (item.image || 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600');
    const type = item.isFeatured ? 'FEATURED' : (item.type || 'STANDARD');
    const verified = item.verified || false;
    const commission = item.commission || (item.stock ? `${item.stock} left in stock` : 'Available');
    const weight = item.weight || '';

    return (
      <TouchableOpacity 
        style={styles.modernCard}
        onPress={() => navigation.navigate('AnimalDetails', { product: item })}
      >
        <Image source={{ uri: image }} style={styles.cardImg} />
        <View style={styles.cardOverlay}>
          <View style={styles.typeBadge}><Text style={styles.typeText}>{type}</Text></View>
          {verified && (
            <View style={styles.verifiedBadge}>
              <Icon name="verified" size={14} color={COLORS.gold} />
            </View>
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.brandRow}>
            <Text style={styles.brandName}>{brand.toUpperCase()}</Text>
            {weight ? <Text style={styles.weightTag}>{weight}</Text> : null}
          </View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.infoText}>{info}</Text>
          <View style={styles.footer}>
            <View>
              <Text style={styles.priceText}>${price}</Text>
              <Text style={styles.commissionText}>{commission}</Text>
            </View>
            <TouchableOpacity 
              style={styles.buyBtn}
              onPress={() => navigation.navigate('OrderSummary', { product: item })}
            >
              <Text style={styles.buyBtnText}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
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
              onPress={() => setActiveFilter(f.value)}
              style={[styles.filterPill, activeFilter === f.value && styles.activePill]}
            >
              <Text style={[styles.filterText, activeFilter === f.value && styles.activeFilterText]}>{f.label}</Text>
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

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 24, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  cartBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  filterSection: { paddingVertical: 15, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  filterPill: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 12, marginRight: 10, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  activePill: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SERIF },
  activeFilterText: { color: COLORS.surface },
  promoBanner: { backgroundColor: COLORS.emerald, padding: 15, borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  promoText: { color: 'white', fontSize: 12, fontWeight: '700', marginLeft: 10, flex: 1, fontFamily: FONT_SERIF },
  grid: { gap: 20 },
  modernCard: { backgroundColor: COLORS.surface, borderRadius: 25, overflow: 'hidden', elevation: 4, borderWidth: 1, borderColor: COLORS.border },
  cardImg: { width: '100%', height: 180 },
  cardOverlay: { position: 'absolute', top: 15, left: 15, right: 15, flexDirection: 'row', justifyContent: 'space-between' },
  typeBadge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { color: 'white', fontSize: 9, fontWeight: '900' },
  verifiedBadge: { backgroundColor: COLORS.surface, width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
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
  buyBtnText: { color: COLORS.surface, fontWeight: '900', fontSize: 12 }
});

export default MarketplaceScreen;