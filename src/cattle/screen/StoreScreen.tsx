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
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const StoreScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const [searchQuery, setSearchQuery] = useState('');

  const stores = [
    { 
      name: 'Dogs', 
      icon: 'pets', 
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600', 
      count: 24,
      rating: '4.9',
      tag: 'CANINE EXPERT',
      desc: 'Verified premium guard dogs, show-quality puppies, and elite breeds.'
    },
    { 
      name: 'Birds', 
      icon: 'flutter-dash', 
      image: 'https://images.unsplash.com/photo-1522926193341-e9fed195d9cb?auto=format&fit=crop&q=80&w=600', 
      count: 142,
      rating: '4.8',
      tag: 'AVIAN SPECIALIST',
      desc: 'Hand-reared exotic parrots, love birds, and premium breeding pairs.'
    },
    { 
      name: 'Fish', 
      icon: 'set-meal', 
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600', 
      count: 85,
      rating: '4.7',
      tag: 'AQUATIC EXPERT',
      desc: 'Premium grade Bettas, Orandas, Angelfish, and aquarium setups.'
    },
    { 
      name: 'Goats', 
      icon: 'agriculture', 
      image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=600', 
      count: 32,
      rating: '4.9',
      tag: 'LIVESTOCK BREEDER',
      desc: 'High-yield dairy goats and healthy livestock for breeding.'
    },
    { 
      name: 'Cats', 
      icon: 'auto-awesome', 
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600', 
      count: 18,
      rating: '4.6',
      tag: 'FELINE EXPERT',
      desc: 'Beautiful healthy kittens and exotic cat breeds from verified lines.'
    },
    { 
      name: 'Small Animals', 
      icon: 'cruelty-free', 
      image: 'https://images.unsplash.com/photo-1548767791-514684d06bb8?auto=format&fit=crop&q=80&w=600', 
      count: 56,
      rating: '4.8',
      tag: 'EXOTIC PETS',
      desc: 'Friendly rabbits, hamsters, guinea pigs, and specialized cages.'
    },
    { 
      name: 'Horses', 
      icon: 'bedroom-baby', 
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=600', 
      count: 12,
      rating: '5.0',
      tag: 'EQUINE SPECIALIST',
      desc: 'Arabian Thoroughbreds, competition-ready stallions, and show horses.'
    },
    { 
      name: 'Hens', 
      icon: 'egg', 
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600', 
      count: 210,
      rating: '4.7',
      tag: 'POULTRY SPECIALIST',
      desc: 'Organic egg-laying hens, breeding roosters, and chicks.'
    },
    { 
      name: 'Care & Supplies', 
      icon: 'shopping-cart', 
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600', 
      count: 420,
      rating: '4.9',
      tag: 'PET SUPPLIES',
      desc: 'Elite kibble mix, grooming items, organic soaps, and weatherproof kennels.'
    },
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTagColors = (tag: string) => {
    const isDark = COLORS.isDark;
    switch (tag) {
      case 'CANINE EXPERT':
      case 'LIVESTOCK BREEDER':
        return { bg: isDark ? '#1C3322' : '#E8F5E9', text: isDark ? '#81C784' : '#2E7D32' };
      case 'AVIAN SPECIALIST':
      case 'FELINE EXPERT':
        return { bg: isDark ? '#1C2C3E' : '#E3F2FD', text: isDark ? '#64B5F6' : '#1565C0' };
      case 'AQUATIC EXPERT':
      case 'EXOTIC PETS':
        return { bg: isDark ? '#2E1E33' : '#F3E5F5', text: isDark ? '#BA68C8' : '#6A1B9A' };
      case 'EQUINE SPECIALIST':
      case 'PET SUPPLIES':
        return { bg: isDark ? '#3D281D' : '#FFF3E0', text: isDark ? '#FFB74D' : '#E65100' };
      case 'POULTRY SPECIALIST':
      default:
        return { bg: isDark ? '#3C3B1E' : '#FFFDE7', text: isDark ? '#FFF59D' : '#F57F17' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={{ width: 32 }} />
        <Text style={styles.brandTitle}>AgriMarket</Text>
        <TouchableOpacity 
          style={styles.cartBtn} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('OrderSummary')}
        >
          <Icon name="shopping-cart" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search" size={22} color={COLORS.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search livestock, feed, or stores..."
            placeholderTextColor={COLORS.secondary + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Icon name="close" size={18} color={COLORS.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Store List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionTitle}>Top Rated Local Stores</Text>

        <View style={styles.listContainer}>
          {filteredStores.map((store: any) => {
            const tagColors = getTagColors(store.tag);
            return (
              <TouchableOpacity
                key={store.name}
                style={styles.storeCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('StoreStock', { category: store.name })}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: store.image }} style={styles.storeImage} resizeMode="cover" />
                </View>
                
                <View style={styles.cardInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Icon name="star" size={14} color="#F59E0B" />
                      <Text style={styles.ratingText}>{store.rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.storeDesc} numberOfLines={2}>{store.desc}</Text>

                  <View style={[styles.tagBadge, { backgroundColor: tagColors.bg }]}>
                    <Text style={[styles.tagBadgeText, { color: tagColors.text }]}>{store.tag}</Text>
                  </View>
                </View>

                <Icon name="chevron-right" size={24} color={COLORS.secondary} style={styles.chevronIcon} />
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  topHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  cartBtn: {
    padding: 4,
  },

  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLORS.primary,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: FONT_SANS,
    paddingVertical: 0,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 16,
    fontFamily: FONT_SANS,
  },
  listContainer: {
    width: '100%',
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: COLORS.isDark ? 0.2 : 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  storeImage: {
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
  storeName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
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
    color: COLORS.secondary,
    marginLeft: 4,
  },
  storeDesc: {
    fontSize: 12,
    color: COLORS.secondary,
    lineHeight: 18,
    marginTop: 4,
    fontWeight: '500',
  },
  tagBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  tagBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  chevronIcon: {
    marginLeft: 8,
  },
});

export default StoreScreen;
