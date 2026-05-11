import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Theme Colors from HTML Config
const COLORS = {
  primary: '#0e2819',
  primaryContainer: '#243e2e',
  background: '#fbf9f6',
  surface: '#ffffff',
  surfaceContainerLow: '#f5f3f0',
  outlineVariant: '#c2c8c1',
  secondary: '#635d5a',
  tertiary: '#431400',
  tertiaryContainer: '#652403',
  onSurfaceVariant: '#424843',
  white: '#ffffff',
};

interface ListingCardProps {
  title?: string;
  breed: string;
  price: string;
  age: string;
  weight: string;
  grade: string;
  location: string;
  image: string;
  badge?: string;
  badgeColor?: string;
}

const MarketplaceScreen = () => {
  const filters = ['Bulls', 'Cows', 'Semen', 'Embryos', 'Dairy'];

  const ListingCard = ({ title, breed, price, age, weight, grade, location, image, badge, badgeColor }: ListingCardProps) => (
    <View style={styles.card}>
      {/* Image Section */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.badgeRow}>
          {badge && (
            <View style={[styles.statusBadge, { backgroundColor: badgeColor || COLORS.primary }]}>
              <Text style={styles.statusBadgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.bookmarkBtn}>
          <Icon name="bookmark-border" size={22} color={COLORS.tertiary} />
        </TouchableOpacity>
      </View>

      {/* Pricing Header */}
      <View style={styles.cardPriceRow}>
        <View>
          <Text style={styles.labelSm}>BREED</Text>
          <Text style={styles.headlineMd}>{breed}</Text>
        </View>
        <View style={styles.alignEnd}>
          <Text style={styles.labelSm}>CURRENT BID</Text>
          <Text style={[styles.headlineMd, { color: COLORS.tertiaryContainer }]}>${price}</Text>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsPadding}>
        <View style={styles.statsGrid}>
          <View style={styles.statCol}>
            <Text style={styles.labelSm}>AGE</Text>
            <Text style={styles.statValue}>{age}</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.labelSm}>WEIGHT</Text>
            <Text style={styles.statValue}>{weight}</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.labelSm}>GRADE</Text>
            <Text style={styles.statValue}>{grade}</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Icon name="location-on" size={18} color={COLORS.onSurfaceVariant} />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <TouchableOpacity style={styles.bidButton}>
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="menu" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.logoText}>HERD</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        {/* Search & Filter Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color={COLORS.secondary} style={styles.searchIcon} />
            <TextInput 
              placeholder="Search breeds, genetics..." 
              style={styles.searchInput}
              placeholderTextColor={COLORS.secondary}
            />
          </View>
          
          <View style={styles.filterWrapper}>
            <Text style={styles.filterLabel}>QUICK FILTERS:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {filters.map((item, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={[styles.filterChip, idx === 0 && styles.activeChip]}
                >
                  <Text style={[styles.filterChipText, idx === 0 && styles.activeChipText]}>
                    {item.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Listings */}
        <ListingCard 
          breed="Red Brahman Bull" price="15,200" age="36 Mo." weight="2,100 lbs" 
          grade="S-Tier" location="Houston, Texas" badge="TOP RATED" 
          image="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400"
        />

        <ListingCard 
          breed="Black Angus" price="12,400" age="24 Mo." weight="1,850 lbs" 
          grade="AAA+" location="Bozeman, Montana" badge="VERIFIED" 
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdNasNgugMt9GW99saf9kJLyEjuvlGJ-Ti7ptGLBiUeFObAF6Ma6ZyY1jew9pbTeSKPqDdhpRyYxOLVcqkdfa_VXyWyV2qwAXw7i5Uy-6tSo0fDfkZugDj74wiXhpmJWG__Y-tuoMn40fP0i-ePHCXZNR3ryiovs95anrLxl0XH_3_68X5p5SRtofvwvvhxqQj2o7y97xDwadmc1BGMF4E86CumFBytPLS1WU2RlzwbdJdCbEprXbnSpnHh-f9cdxzVN43MBx"
        />

        <ListingCard 
          breed="Holstein Dairy Cow" price="6,500" age="42 Mo." weight="1,500 lbs" 
          grade="A1" location="Madison, Wisconsin" badge="EXCELLENT YIELD" 
          image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400"
        />

        <ListingCard 
          breed="Hereford" price="8,200" age="36 Mo." weight="1,400 lbs" 
          grade="AA" location="Abilene, Texas" badge="URGENT" badgeColor={COLORS.tertiary}
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ELzXuzE77AongRZRFVNnUBJVffbo36QhvuhyPtcINeORg2kSf0_Wir-y_0u4yjFwSd4Yb5dJHjIHI_bwIBceA9Ba8AbUF-b76m9FRMhmY-S4OZZIwYCcoN9lQROB2HazXJFhxOiFqSM_bS00dhOmV4-Guz3d-bYG90M9aY4Mz9ccQ0cYb_EOM5WKwCfEZKz2gdd3zEuLxaqrTRfE-a5HY0v6Qc5z98U3VfbgSetRmQbdLA_yvZ0CeFiJ_L1H4LAkC1RaOgnD"
        />
        
        <ListingCard 
          breed="Jersey Heifer" price="3,800" age="12 Mo." weight="800 lbs" 
          grade="A" location="Burlington, Vermont" badge="NEW LISTING" badgeColor={COLORS.onSurfaceVariant}
          image="https://images.unsplash.com/photo-1527153371421-421710926671?auto=format&fit=crop&q=80&w=400"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoText: { fontSize: 24, fontWeight: '700', color: COLORS.primary, marginLeft: 12, letterSpacing: -1 },
  iconButton: { padding: 8 },
  scrollPadding: { padding: 16, paddingBottom: 40 },
  searchSection: { marginBottom: 24 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 48, fontSize: 16, color: '#000' },
  filterWrapper: { flexDirection: 'row', alignItems: 'center' },
  filterLabel: { fontSize: 10, fontWeight: '700', color: COLORS.secondary, marginRight: 8 },
  filterScroll: { flex: 1 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterChipText: { fontSize: 10, fontWeight: '700', color: COLORS.onSurfaceVariant },
  activeChipText: { color: COLORS.white },
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: 24,
    overflow: 'hidden',
  },
  imageWrapper: { height: 200, width: '100%', position: 'relative' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
  bookmarkBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
  },
  cardPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.surfaceContainerLow,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  detailsPadding: { padding: 16 },
  headlineMd: { fontSize: 20, fontWeight: '600', color: COLORS.primary },
  labelSm: { fontSize: 10, fontWeight: '600', color: COLORS.secondary, marginBottom: 2 },
  alignEnd: { alignItems: 'flex-end' },
  statsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    marginBottom: 16
  },
  statCol: { flex: 1 },
  statValue: { fontSize: 16, fontWeight: '600', color: '#1b1c1a' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  locationText: { marginLeft: 4, color: COLORS.onSurfaceVariant, fontSize: 14 },
  bidButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryContainer,
  },
  bidButtonText: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
});

export default MarketplaceScreen;