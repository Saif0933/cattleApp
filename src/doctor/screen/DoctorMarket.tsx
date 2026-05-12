import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.95)',
  emerald: '#10B981',
  medical: '#0EA5E9',
};

const DoctorMarket = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Vaccines', 'Supplements', 'Antibiotics', 'Equipment', 'Surgical'];

  const products = [
    {
      title: "Premium Vaccine",
      brand: "BioCattle Pro",
      category: "Vaccines",
      price: "120",
      rating: "4.9",
      stock: "In Stock",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=400",
      badge: "BEST SELLER",
      badgeColor: COLORS.emerald
    },
    {
      title: "Digital Thermometer",
      brand: "VetTech Elite",
      category: "Equipment",
      price: "85",
      rating: "4.8",
      stock: "Low Stock",
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400",
      badge: "TOP RATED",
      badgeColor: COLORS.accent
    },
    {
      title: "Calcium Booster",
      brand: "NutriHerd",
      category: "Supplements",
      price: "45",
      rating: "4.7",
      stock: "In Stock",
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400",
      featured: true
    }
  ];

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return products;
    return products.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const ProductCard = ({ title, brand, price, rating, stock, image, badge, badgeColor }: any) => (
    <TouchableOpacity style={styles.modernCard}>
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
            <Icon name="star" size={14} color={COLORS.accent} />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <View style={styles.stockBox}>
            <View style={[styles.stockDot, { backgroundColor: stock.includes('In') ? COLORS.emerald : COLORS.accent }]} />
            <Text style={styles.stockText}>{stock}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Icon name="add-shopping-cart" size={20} color="white" />
          <Text style={styles.addBtnText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.topSection}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>Vet Care</Text>
            <Text style={styles.headerTitle}>MEDICAL <Text style={{color: COLORS.medical}}>PHARMACY</Text></Text>
          </View>
          <TouchableOpacity style={styles.cartBtn}>
            <Icon name="shopping-basket" size={24} color={COLORS.primary} />
            <View style={styles.cartCount}><Text style={styles.cartCountText}>2</Text></View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={20} color={COLORS.secondary} />
            <TextInput placeholder="Search medicines, vaccines..." style={styles.searchInput} />
          </View>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {filters.map((filter, idx) => (
              <TouchableOpacity 
                key={idx} 
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterPill, activeFilter === filter && styles.activeFilterPill]}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>{filter}</Text>
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

      <TouchableOpacity style={styles.fab}>
        <Icon name="receipt-long" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topSection: { backgroundColor: 'white', paddingBottom: 15, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 10 },
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerSub: { fontSize: 14, fontWeight: '600', color: COLORS.secondary, letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5 },
  cartBtn: { width: 50, height: 50, borderRadius: 16, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  cartCount: { position: 'absolute', top: -5, right: -5, backgroundColor: COLORS.medical, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cartCountText: { color: 'white', fontSize: 10, fontWeight: '900' },
  searchContainer: { paddingHorizontal: 24, marginBottom: 15 },
  searchBox: { height: 50, backgroundColor: COLORS.background, borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
  searchInput: { flex: 1, marginLeft: 10, fontWeight: '600', fontSize: 14, color: COLORS.primary },
  filterContainer: { marginTop: 5 },
  filterScroll: { paddingLeft: 24, paddingRight: 40 },
  filterPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: COLORS.background, marginRight: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)' },
  activeFilterPill: { backgroundColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '800', color: COLORS.secondary },
  activeFilterText: { color: 'white' },
  mainScroll: { paddingHorizontal: 24, paddingTop: 25, paddingBottom: 120 },
  grid: { gap: 20 },
  modernCard: { height: 400, borderRadius: 40, backgroundColor: 'white', overflow: 'hidden', elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15 },
  cardImg: { width: '100%', height: '100%', position: 'absolute' },
  cardBadge: { position: 'absolute', top: 20, right: 20, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, zIndex: 5 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: '900' },
  glassContent: { position: 'absolute', bottom: 12, left: 12, right: 12, backgroundColor: COLORS.glass, borderRadius: 28, padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  cardBrand: { fontSize: 9, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  cardTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, marginTop: 2 },
  pricePill: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  priceValue: { color: 'white', fontWeight: '900', fontSize: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 5, fontSize: 12, fontWeight: '800', color: COLORS.primary },
  stockBox: { flexDirection: 'row', alignItems: 'center' },
  stockDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  stockText: { fontSize: 11, fontWeight: '700', color: COLORS.secondary },
  addBtn: { height: 50, backgroundColor: COLORS.primary, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  addBtnText: { color: 'white', fontSize: 12, fontWeight: '900', marginLeft: 10, letterSpacing: 1 },
  fab: { position: 'absolute', bottom: 30, right: 24, width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.medical, justifyContent: 'center', alignItems: 'center', elevation: 15 }
});

export default DoctorMarket;
