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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.95)',
  emerald: '#10B981',
  crimson: '#EF4444',
  sky: '#0EA5E9',
};

interface ListingCardProps {
  title: string;
  breed: string;
  price: string;
  age: string;
  weight: string;
  grade: string;
  location: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  horizontal?: boolean;
}

const MarketplaceScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Bulls', 'Cows', 'Semen', 'Birds', 'Dairy'];

  const allListings = [
    {
      title: "Majestic Brahman",
      breed: "Grey Brahman",
      category: "Bulls",
      price: "12,500",
      age: "2.5 Years",
      weight: "850kg",
      grade: "A++",
      location: "Texas, US",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=600",
      badge: "ELITE BREED",
      badgeColor: COLORS.emerald,
      featured: true
    },
    {
      title: "Royal Angus",
      breed: "Black Angus",
      category: "Bulls",
      price: "9,800",
      age: "2 Years",
      weight: "720kg",
      grade: "A+",
      location: "Montana, US",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDdNasNgugMt9GW99saf9kJLyEjuvlGJ-Ti7ptGLBiUeFObAF6Ma6ZyY1jew9pbTeSKPqDdhpRyYxOLVcqkdfa_VXyWyV2qwAXw7i5Uy-6tSo0fDfkZugDj74wiXhpmJWG__Y-tuoMn40fP0i-ePHCXZNR3ryiovs95anrLxl0XH_3_68X5p5SRtofvwvvhxqQj2o7y97xDwadmc1BGMF4E86CumFBytPLS1WU2RlzwbdJdCbEprXbnSpnHh-f9cdxzVN43MBx",
      badge: "BEST SELLER",
      badgeColor: COLORS.accent,
      featured: true
    },
    {
      title: "Scarlet Macaw",
      breed: "Ara Macao",
      category: "Birds",
      price: "2,800",
      age: "1 Year",
      weight: "1.2kg",
      grade: "Exotic",
      location: "Florida, US",
      image: "https://images.unsplash.com/photo-1484557918186-7b4e561c9948?auto=format&fit=crop&q=80&w=600",
      badge: "HIGH TALKER",
      badgeColor: COLORS.crimson,
      featured: true
    },
    {
      title: "African Grey",
      breed: "Psittacus erithacus",
      category: "Birds",
      price: "3,500",
      age: "1.5 Years",
      weight: "0.5kg",
      grade: "Genius",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30ebe3?auto=format&fit=crop&q=80&w=600",
      badge: "INTELLIGENT",
      badgeColor: COLORS.sky,
      featured: false
    },
    {
      title: "Golden Canary",
      breed: "Serinus canaria",
      category: "Birds",
      price: "150",
      age: "6 Months",
      weight: "20g",
      grade: "Singer",
      location: "Madrid, ES",
      image: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=600",
      featured: false
    },
    {
      title: "Dairy Queen",
      breed: "Holstein",
      category: "Dairy",
      price: "4,200",
      age: "3 Years",
      weight: "600kg",
      grade: "A",
      location: "Wisconsin, US",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600",
      featured: false
    }
  ];

  const filteredListings = useMemo(() => {
    if (activeFilter === 'All') return allListings;
    return allListings.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const featuredListings = useMemo(() => {
    return allListings.filter(item => item.featured);
  }, []);

  const ListingCard = ({ title, breed, price, age, weight, grade, location, image, badge, badgeColor, horizontal }: ListingCardProps) => (
    <TouchableOpacity style={[styles.modernCard, horizontal && styles.horizontalCard]}>
      <Image source={{ uri: image }} style={styles.cardImg} />
      {badge && (
        <View style={[styles.cardBadge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <View style={styles.glassContent}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardBreed}>{breed.toUpperCase()}</Text>
            <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
          </View>
          <View style={styles.pricePill}>
            <Text style={styles.priceValue}>${price}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>AGE</Text>
            <Text style={styles.statValue}>{age}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{weight.includes('g') ? 'SIZE' : 'WEIGHT'}</Text>
            <Text style={styles.statValue}>{weight}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>CLASS</Text>
            <Text style={styles.statValue}>{grade}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.locationBox}>
            <Icon name="location-on" size={14} color={COLORS.secondary} />
            <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.topFixedSection}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>Explore the</Text>
            <Text style={styles.headerTitle}>LIVESTOCK<Text style={{color: COLORS.accent}}> MARKET</Text></Text>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Icon name="tune" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingRight: 40 }}>
            {filters.map((filter, idx) => (
              <TouchableOpacity 
                key={idx} 
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterPill,
                  activeFilter === filter && styles.activeFilterPill
                ]}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView 
        style={styles.mainScroll} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {activeFilter === 'All' && (
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Elite Collection</Text>
              <Text style={styles.seeAll}>Featured</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 24, paddingRight: 40 }}>
              {featuredListings.map((item, index) => (
                <ListingCard key={index} {...item} horizontal />
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.verticalSection}>
          <View style={styles.marketInfo}>
            <Text style={styles.resultCount}>{filteredListings.length} {activeFilter} Listings</Text>
            <TouchableOpacity style={styles.sortBtn}>
              <Text style={styles.sortText}>Recent First</Text>
              <Icon name="expand-more" size={18} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.listingGrid}>
            {filteredListings.map((item, index) => (
              <ListingCard key={index} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.sellFab}>
        <Icon name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topFixedSection: { backgroundColor: COLORS.background, zIndex: 10, paddingBottom: 10 },
  header: { 
    paddingHorizontal: 24, paddingTop: 20, paddingBottom: 15, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
  },
  headerSubtitle: { fontSize: 14, fontWeight: '600', color: COLORS.secondary, letterSpacing: 1 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5 },
  searchBtn: { 
    width: 50, height: 50, borderRadius: 16, backgroundColor: 'white', 
    justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
  },
  filterContainer: { marginBottom: 5 },
  filterScroll: { paddingLeft: 24 },
  filterPill: { 
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, 
    backgroundColor: 'white', marginRight: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)',
    elevation: 2 
  },
  activeFilterPill: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '800', color: COLORS.secondary },
  activeFilterText: { color: 'white' },
  mainScroll: { flex: 1 },
  featuredSection: { marginTop: 20, marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary },
  seeAll: { fontSize: 12, color: COLORS.accent, fontWeight: '900', letterSpacing: 1 },
  verticalSection: { paddingHorizontal: 24 },
  marketInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  resultCount: { fontSize: 14, fontWeight: '700', color: COLORS.secondary },
  sortBtn: { flexDirection: 'row', alignItems: 'center' },
  sortText: { fontSize: 14, fontWeight: '700', color: COLORS.primary, marginRight: 4 },
  listingGrid: { gap: 24 },
  modernCard: { 
    height: 380, borderRadius: 40, backgroundColor: 'white', overflow: 'hidden',
    elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15
  },
  horizontalCard: { width: width * 0.8, marginRight: 20 },
  cardImg: { width: '100%', height: '100%', position: 'absolute' },
  cardBadge: { position: 'absolute', top: 20, right: 20, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, zIndex: 5 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: '900' },
  glassContent: { position: 'absolute', bottom: 12, left: 12, right: 12, backgroundColor: COLORS.glass, borderRadius: 28, padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  cardBreed: { fontSize: 9, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  cardTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, marginTop: 2 },
  pricePill: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  priceValue: { color: 'white', fontWeight: '900', fontSize: 16 },
  statsRow: { flexDirection: 'row', backgroundColor: COLORS.background, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 10, justifyContent: 'space-around', marginBottom: 15 },
  statBox: { alignItems: 'center' },
  statLabel: { fontSize: 8, fontWeight: '900', color: COLORS.secondary, marginBottom: 2 },
  statValue: { fontSize: 12, fontWeight: '800', color: COLORS.primary },
  divider: { width: 1, height: '50%', backgroundColor: 'rgba(0,0,0,0.1)', alignSelf: 'center' },
  cardFooter: { flexDirection: 'row', alignItems: 'center' },
  locationBox: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginLeft: 6, fontSize: 12, color: COLORS.secondary, fontWeight: '700' },
  sellFab: { position: 'absolute', bottom: 30, right: 24, width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.emerald, justifyContent: 'center', alignItems: 'center', elevation: 15, shadowColor: COLORS.emerald, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 15 }
});

export default MarketplaceScreen;