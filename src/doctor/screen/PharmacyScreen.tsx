import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const DoctorMarket = () => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  const filters = [
    { label: 'All', value: 'ALL' },
    { label: 'Vaccines', value: 'VACCINES' },
    { label: 'Supplements', value: 'SUPPLEMENTS' },
    { label: 'Medicines', value: 'MEDICINES' },
    { label: 'Farming Tools', value: 'FARMING_TOOLS' },
  ];

  const products = [
    {
      id: "prod-vax",
      vendorId: "vendor-1",
      name: "Premium Vaccine",
      description: "BioCattle Pro High-fidelity cow immunization vaccine.",
      price: 120.00,
      stock: 50,
      category: "VACCINES",
      images: ["https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=400"],
      
      // legacy compat
      title: "Premium Vaccine",
      brand: "BioCattle Pro",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=400",
      badge: "BEST SELLER",
      badgeColor: COLORS.emerald
    },
    {
      id: "prod-eq",
      vendorId: "vendor-2",
      name: "Digital Thermometer",
      description: "VetTech Elite high accuracy animal clinical thermometer.",
      price: 85.00,
      stock: 5,
      category: "FARMING_TOOLS",
      images: ["https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400"],

      // legacy compat
      title: "Digital Thermometer",
      brand: "VetTech Elite",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400",
      badge: "TOP RATED",
      badgeColor: COLORS.gold
    },
    {
      id: "prod-sup",
      vendorId: "vendor-3",
      name: "Calcium Booster",
      description: "NutriHerd premium organic calcium supplement for maximum daily yield.",
      price: 45.00,
      stock: 12,
      category: "SUPPLEMENTS",
      images: ["https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400"],

      // legacy compat
      title: "Calcium Booster",
      brand: "NutriHerd",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400",
      featured: true
    }
  ];

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'ALL') return products;
    return products.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const ProductCard = (item: any) => {
    const title = item.name || item.title;
    const brand = item.brand || "VETCARE PRO";
    const price = typeof item.price === 'number' ? item.price.toFixed(0) : item.price;
    const rating = item.rating;
    const image = item.images?.[0] || item.image;
    const badge = item.badge;
    const badgeColor = item.badgeColor || COLORS.emerald;

    // Aligned stock rendering
    const stock = typeof item.stock === 'number' 
      ? (item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock') 
      : item.stock;

    return (
      <TouchableOpacity style={styles.modernCard} activeOpacity={0.95}>
        <Image source={{ uri: image }} style={styles.cardImg} />
        {badge && (
          <View style={[styles.cardBadge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
        <View style={styles.glassContent}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardBrand}>{brand.toUpperCase()}</Text>
              <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
            </View>
            <View style={styles.pricePill}>
              <Text style={styles.priceValue}>${price}</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.ratingBox}>
              <Icon name="star" size={14} color={COLORS.gold} />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <View style={styles.stockBox}>
              <View style={[styles.stockDot, { backgroundColor: stock.includes('In') ? COLORS.emerald : COLORS.gold }]} />
              <Text style={styles.stockText}>{stock}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
            <Icon name="add-shopping-cart" size={20} color={COLORS.surface} />
            <Text style={styles.addBtnText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.surface} />
      
      <View style={styles.topSection}>
        <View style={styles.header}>
          <View style={{ flex: 1, marginRight: 15 }}>
            <Text style={styles.headerTitle}>MEDICAL <Text style={{color: COLORS.medical}}>PHARMACY</Text></Text>
          </View>
          <TouchableOpacity style={styles.cartBtn} activeOpacity={0.8}>
            <Icon name="shopping-cart" size={22} color={COLORS.primary} />
            <View style={styles.cartCount}><Text style={styles.cartCountText}>2</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={20} color={COLORS.secondary} />
            <TextInput 
              placeholder="Search medicines, vaccines..." 
              placeholderTextColor={COLORS.secondary + '70'}
              style={styles.searchInput} 
            />
          </View>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {filters.map((filter, idx) => (
              <TouchableOpacity 
                key={idx} 
                onPress={() => setActiveFilter(filter.value)}
                style={[styles.filterPill, activeFilter === filter.value && styles.activeFilterPill]}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterText, activeFilter === filter.value && styles.activeFilterText]}>{filter.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScroll}>
        <View style={styles.grid}>
          {filteredProducts.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Icon name="receipt-long" size={30} color={COLORS.isDark ? '#0F291E' : '#FFFFFF'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topSection: { 
    backgroundColor: COLORS.surface, 
    paddingBottom: 15, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: COLORS.isDark ? 0.3 : 0.05,
    shadowRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 26, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5, marginTop: 15, fontFamily: FONT_SERIF },
  cartBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', marginTop: 15, borderWidth: 1, borderColor: COLORS.border },
  cartCount: { position: 'absolute', top: -4, right: -4, backgroundColor: COLORS.medical, width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  cartCountText: { color: 'white', fontSize: 10, fontWeight: '900', fontFamily: FONT_SANS },
  searchContainer: { paddingHorizontal: 24, marginBottom: 15 },
  searchBox: { height: 50, backgroundColor: COLORS.background, borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, marginLeft: 10, fontWeight: '600', fontSize: 14, color: COLORS.primary, fontFamily: FONT_SANS },
  filterContainer: { marginTop: 5 },
  filterScroll: { paddingLeft: 24, paddingRight: 40 },
  filterPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: COLORS.background, marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  activeFilterPill: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SERIF },
  activeFilterText: { color: COLORS.surface, fontFamily: FONT_SERIF },
  mainScroll: { paddingHorizontal: 24, paddingTop: 25, paddingBottom: 120 },
  grid: { gap: 20 },
  modernCard: { height: 400, borderRadius: 40, backgroundColor: COLORS.surface, overflow: 'hidden', elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: COLORS.isDark ? 0.3 : 0.1, shadowRadius: 15, borderWidth: 1, borderColor: COLORS.border },
  cardImg: { width: '100%', height: '100%', position: 'absolute' },
  cardBadge: { position: 'absolute', top: 20, right: 20, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, zIndex: 5 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: '900', fontFamily: FONT_SANS },
  glassContent: { position: 'absolute', bottom: 12, left: 12, right: 12, backgroundColor: COLORS.glass, borderRadius: 28, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  cardBrand: { fontSize: 9, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1, fontFamily: FONT_SANS },
  cardTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, marginTop: 2, fontFamily: FONT_SERIF },
  pricePill: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  priceValue: { color: COLORS.surface, fontWeight: '900', fontSize: 16, fontFamily: FONT_SANS },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 5, fontSize: 12, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SANS },
  stockBox: { flexDirection: 'row', alignItems: 'center' },
  stockDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  stockText: { fontSize: 11, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SANS },
  addBtn: { height: 50, backgroundColor: COLORS.primary, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: COLORS.surface, fontSize: 12, fontWeight: '900', marginLeft: 10, letterSpacing: 1, fontFamily: FONT_SANS },
  fab: { position: 'absolute', bottom: 30, right: 24, width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.medical, justifyContent: 'center', alignItems: 'center', elevation: 15, shadowColor: COLORS.medical, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10 }
});

export default DoctorMarket;
