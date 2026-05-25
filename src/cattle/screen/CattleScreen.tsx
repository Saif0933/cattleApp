import React, { useState } from 'react';
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
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const HerdScreen = ({ navigation, route }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [activeMarketTab, setActiveMarketTab] = useState('buy'); // 'buy' or 'sell'
  const [activeCategory, setActiveCategory] = useState('All Cattle');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState<string[]>([]);

  // Featured listings data
  const featuredListings = [
    {
      id: 'F001',
      name: 'HF Cross Cow',
      age: '3 Years',
      location: 'Punjab',
      price: '₹ 85,000',
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'F002',
      name: 'Sahiwal Cow',
      age: '5 Years',
      location: 'Haryana',
      price: '₹ 65,000',
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2bac5e8?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'F003',
      name: 'Murrah Buffalo',
      age: '4 Years',
      location: 'Uttar Pradesh',
      price: '₹ 95,000',
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1563865436874-9aef32095ffd?auto=format&fit=crop&q=80&w=400'
    }
  ];

  // Category list with icons
  const categories = [
    { name: 'All Cattle', icon: 'cow' },
    { name: 'Cow', icon: 'cow' },
    { name: 'Buffalo', icon: 'water-buffalo' },
    { name: 'Calf', icon: 'baby-carriage' },
    { name: 'Bull', icon: 'cow' }
  ];

  // Recent listings data
  const initialRecentListings = [
    {
      id: 'R001',
      name: 'Jersey Cow',
      age: '2 Years',
      location: 'Maharashtra',
      price: '₹ 70,000',
      status: 'For Sale',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e6d51?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'R002',
      name: 'Gir Calf',
      age: '6 Months',
      location: 'Gujarat',
      price: '₹ 25,000',
      status: 'For Sale',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'R003',
      name: 'Murrah Buffalo',
      age: '3 Years',
      location: 'Punjab',
      price: '₹ 90,000',
      status: 'For Sale',
      image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=400'
    }
  ];

  const [recentList, setRecentList] = useState(initialRecentListings);
  const [sellList, setSellList] = useState<any[]>([]);

  // Listen to new cattle additions
  React.useEffect(() => {
    if (route.params?.newAnimal) {
      const newAnimal = route.params.newAnimal;
      
      const formattedListing = {
        id: newAnimal.id || `R${Math.floor(100 + Math.random() * 900)}`,
        name: `${newAnimal.name} (${newAnimal.breed})`,
        age: newAnimal.age || '3 Years',
        location: newAnimal.location || 'Punjab',
        price: newAnimal.price || '₹ 55,000',
        status: 'For Sale',
        image: newAnimal.image
      };

      // Add to recent listings list
      setRecentList(prev => {
        if (prev.some(x => x.id === formattedListing.id)) return prev;
        return [formattedListing, ...prev];
      });

      // Add to sell listings list
      setSellList(prev => {
        if (prev.some(x => x.id === formattedListing.id)) return prev;
        return [formattedListing, ...prev];
      });

      // Auto-switch to sell tab to display user's listing
      setActiveMarketTab('sell');

      // Clear route params so it doesn't duplicate on page reload/navigation
      navigation.setParams({ newAnimal: undefined });
    }
  }, [route.params?.newAnimal]);

  const toggleLike = (id: string) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#0F291E" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Cattle Market</Text>
          <Text style={styles.headerSubtitle}>Buy and Sell Cattle Easily</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Icon name="bell-outline" size={24} color="#0F291E" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Toggle Buy / Sell Tabs */}
        <View style={styles.marketTabsContainer}>
          <TouchableOpacity 
            style={[styles.marketTabBtn, activeMarketTab === 'buy' && styles.activeMarketTabBtn]}
            onPress={() => setActiveMarketTab('buy')}
            activeOpacity={0.9}
          >
            <Icon 
              name="cart-outline" 
              size={20} 
              color={activeMarketTab === 'buy' ? '#FFFFFF' : '#6B7280'} 
              style={{ marginRight: 8 }} 
            />
            <Text style={[styles.marketTabBtnText, activeMarketTab === 'buy' && styles.activeMarketTabBtnText]}>
              Buy Cattle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.marketTabBtn, activeMarketTab === 'sell' && styles.activeMarketTabBtn]}
            onPress={() => setActiveMarketTab('sell')}
            activeOpacity={0.9}
          >
            <Icon 
              name="tag-outline" 
              size={20} 
              color={activeMarketTab === 'sell' ? '#FFFFFF' : '#6B7280'} 
              style={{ marginRight: 8 }} 
            />
            <Text style={[styles.marketTabBtnText, activeMarketTab === 'sell' && styles.activeMarketTabBtnText]}>
              Sell Cattle
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filters Row */}
        <View style={styles.filterRow}>
          <View style={styles.searchBox}>
            <Icon name="magnify" size={22} color="#6B7280" />
            <TextInput 
              placeholder="Search cattle..." 
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity style={styles.dropdownBtn}>
            <Text style={styles.dropdownText}>Species</Text>
            <Icon name="chevron-down" size={16} color="#4B5563" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dropdownBtn}>
            <Text style={styles.dropdownText}>Location</Text>
            <Icon name="chevron-down" size={16} color="#4B5563" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterIconBtn}>
            <Icon name="tune" size={20} color="#0F291E" />
          </TouchableOpacity>
        </View>

        {activeMarketTab === 'buy' ? (
          <>
            {/* Featured Listings Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Listings</Text>
              <TouchableOpacity>
                <View style={styles.viewAllRow}>
                  <Text style={styles.viewAllText}>View All</Text>
                  <Icon name="chevron-right" size={16} color="#16A34A" />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.featuredScroll}
            >
              {featuredListings.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.featuredCard}
                  onPress={() => navigation.navigate('AnimalDetails', { product: item })}
                  activeOpacity={0.9}
                >
                  <View style={styles.featuredImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.featuredImg} />
                    {item.isPremium && (
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumBadgeText}>Premium</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredName}>{item.name}</Text>
                    <View style={styles.metaRow}>
                      <View style={styles.metaItem}>
                        <Icon name="account-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                        <Text style={styles.metaText}>{item.age}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Icon name="map-marker-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                        <Text style={styles.metaText}>{item.location}</Text>
                      </View>
                    </View>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceText}>{item.price}</Text>
                      <TouchableOpacity onPress={() => toggleLike(item.id)}>
                        <Icon 
                          name={likedItems.includes(item.id) ? "heart" : "heart-outline"} 
                          size={20} 
                          color={likedItems.includes(item.id) ? "#EF4444" : "#9CA3AF"} 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Browse by Category Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Browse by Category</Text>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((cat, idx) => {
                const isActive = activeCategory === cat.name;
                return (
                  <TouchableOpacity 
                    key={idx}
                    style={styles.categoryCard}
                    onPress={() => setActiveCategory(cat.name)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.categoryCircle, isActive && styles.activeCategoryCircle]}>
                      <Icon name={cat.icon} size={28} color={isActive ? '#16A34A' : '#000000'} />
                    </View>
                    <Text style={[styles.categoryLabel, isActive && styles.activeCategoryLabel]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Recent Listings Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Listings</Text>
              <TouchableOpacity>
                <View style={styles.viewAllRow}>
                  <Text style={styles.viewAllText}>View All</Text>
                  <Icon name="chevron-right" size={16} color="#16A34A" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.recentContainer}>
              {recentList.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.recentCard}
                  onPress={() => navigation.navigate('AnimalDetails', { product: item })}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.image }} style={styles.recentImg} />
                  <View style={styles.recentInfo}>
                    <View style={styles.recentHeaderRow}>
                      <Text style={styles.recentName}>{item.name}</Text>
                      <Text style={styles.recentPrice}>{item.price}</Text>
                    </View>
                    <View style={styles.recentMetaRow}>
                      <View style={styles.metaItem}>
                        <Icon name="account-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                        <Text style={styles.metaText}>{item.age}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Icon name="map-marker-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                        <Text style={styles.metaText}>{item.location}</Text>
                      </View>
                    </View>
                    <View style={styles.recentFooterRow}>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>{item.status}</Text>
                      </View>
                      <TouchableOpacity onPress={() => toggleLike(item.id)}>
                        <Icon 
                          name={likedItems.includes(item.id) ? "heart" : "heart-outline"} 
                          size={20} 
                          color={likedItems.includes(item.id) ? "#EF4444" : "#9CA3AF"} 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Sell Listings Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Cattle for Sale</Text>
            </View>

            <View style={styles.recentContainer}>
              {sellList.length > 0 ? (
                sellList.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.recentCard}
                    onPress={() => navigation.navigate('AnimalDetails', { product: item })}
                    activeOpacity={0.9}
                  >
                    <Image source={{ uri: item.image }} style={styles.recentImg} />
                    <View style={styles.recentInfo}>
                      <View style={styles.recentHeaderRow}>
                        <Text style={styles.recentName}>{item.name}</Text>
                        <Text style={styles.recentPrice}>{item.price}</Text>
                      </View>
                      <View style={styles.recentMetaRow}>
                        <View style={styles.metaItem}>
                          <Icon name="account-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                          <Text style={styles.metaText}>{item.age}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Icon name="map-marker-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                          <Text style={styles.metaText}>{item.location}</Text>
                        </View>
                      </View>
                      <View style={styles.recentFooterRow}>
                        <View style={[styles.statusBadge, { backgroundColor: '#FEF3C7' }]}>
                          <Text style={[styles.statusBadgeText, { color: '#D97706' }]}>Active Listing</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleLike(item.id)}>
                          <Icon 
                            name={likedItems.includes(item.id) ? "heart" : "heart-outline"} 
                            size={20} 
                            color={likedItems.includes(item.id) ? "#EF4444" : "#9CA3AF"} 
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Icon name="tag-multiple-outline" size={56} color="#6B7280" style={{ opacity: 0.4, marginBottom: 8 }} />
                  <Text style={styles.emptyStateTitle}>No Cattle Listed Yet</Text>
                  <Text style={styles.emptyStateSub}>Click "Post Your Cattle" below to list your first animal for sale.</Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          style={styles.postBtn}
          onPress={() => navigation.navigate('AddCattle')}
          activeOpacity={0.9}
        >
          <Icon name="plus" size={24} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={styles.postBtnText}>Post Your Cattle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  backBtn: { 
    width: 40, height: 40, borderRadius: 20, 
    justifyContent: 'center', alignItems: 'flex-start'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '900', 
    color: '#0F291E', 
    fontFamily: FONT_SERIF,
    textAlign: 'center'
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: FONT_SANS,
    marginTop: 2,
    textAlign: 'center'
  },
  bellBtn: { 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'flex-end',
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold'
  },
  
  scrollContent: {
    paddingBottom: 100
  },

  // Toggle Buy / Sell Tabs
  marketTabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1.5,
    borderColor: '#E5E7EB'
  },
  marketTabBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  activeMarketTabBtn: {
    backgroundColor: '#16A34A'
  },
  marketTabBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4B5563',
    fontFamily: FONT_SANS
  },
  activeMarketTabBtnText: {
    color: '#FFFFFF'
  },

  // Search and Filter Row
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    alignItems: 'center',
    gap: 8
  },
  searchBox: {
    flex: 2,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB'
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#0F291E',
    fontFamily: FONT_SANS,
    padding: 0
  },
  dropdownBtn: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    gap: 4
  },
  dropdownText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
    fontFamily: FONT_SANS
  },
  filterIconBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Section styling
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16A34A',
    fontFamily: FONT_SANS
  },

  // Featured listings
  featuredScroll: {
    paddingLeft: 20,
    paddingRight: 8
  },
  featuredCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4
  },
  featuredImageContainer: {
    width: '100%',
    height: 110,
    position: 'relative'
  },
  featuredImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#16A34A',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    fontFamily: FONT_SANS
  },
  featuredInfo: {
    padding: 12
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 12
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    fontFamily: FONT_SANS
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  priceText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#16A34A',
    fontFamily: FONT_SANS
  },

  // Browse by Category
  categoryScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    marginBottom: 8
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2
  },
  activeCategoryCircle: {
    borderColor: '#16A34A',
    borderWidth: 2
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
    fontFamily: FONT_SANS
  },
  activeCategoryLabel: {
    color: '#16A34A',
    fontWeight: '800'
  },

  // Recent listings
  recentContainer: {
    paddingHorizontal: 20,
    gap: 12
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    padding: 10,
    alignItems: 'center'
  },
  recentImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover'
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  recentName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF
  },
  recentPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#16A34A',
    fontFamily: FONT_SANS
  },
  recentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 12
  },
  recentFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  statusBadge: {
    backgroundColor: '#EBFDF2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  statusBadgeText: {
    color: '#16A34A',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_SANS
  },

  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F291E',
    marginTop: 8,
    fontFamily: FONT_SERIF,
  },
  emptyStateSub: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    fontFamily: FONT_SANS,
  },

  // Floating button wrapper
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center'
  },
  postBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#16A34A',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6
  },
  postBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: FONT_SANS
  }
});

export default HerdScreen;