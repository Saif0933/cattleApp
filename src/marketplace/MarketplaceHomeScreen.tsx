import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetCategories } from '../api/hook/marketplace/categories';
import { useGetProducts } from '../api/hook/marketplace/products';
import { useThemeColors } from '../context/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const MarketplaceHomeScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Fetch Categories
  const { data: categoriesResponse, isLoading: loadingCategories } = useGetCategories();
  const categories = categoriesResponse?.data || [];

  const { data: productsResponse, isLoading: loadingProducts } = useGetProducts({
    categoryId: selectedCategoryId || undefined,
    status: 'ACTIVE',
    limit: 20
  });
  const products = productsResponse?.data?.products || [];

  const handleCategoryPress = (id: string) => {
    setSelectedCategoryId((prev) => (prev === id ? null : id));
  };

  const renderCategory = ({ item }: { item: any }) => {
    const isSelected = selectedCategoryId === item.id;
    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
        onPress={() => handleCategoryPress(item.id)}
        activeOpacity={0.8}
      >
        <View style={[styles.categoryIconBox, isSelected && styles.categoryIconBoxSelected]}>
          <Icon 
            name={item.iconUrl || 'shape-outline'} 
            size={24} 
            color={isSelected ? '#FFFFFF' : COLORS.medical} 
          />
        </View>
        <Text style={[styles.categoryName, isSelected && styles.categoryNameSelected]} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProduct = ({ item }: { item: any }) => {
    const imageUrl = item.images?.[0]?.url || 'https://images.unsplash.com/photo-1559839734-2b71f153ef7ef?auto=format&fit=crop&q=80&w=400';
    return (
      <TouchableOpacity 
        style={styles.productCard}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('MarketplaceProductDetails', { productId: item.id })}
      >
        <Image source={{ uri: imageUrl }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.productBrand} numberOfLines={1}>{item.brand?.brandName || 'Generic'}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>₹{item.variants?.[0]?.price || 0}</Text>
            {item.variants?.[0]?.compareAtPrice && (
              <Text style={styles.discountPrice}>₹{item.variants[0].compareAtPrice}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.addToCartBtn}>
            <Icon name="cart-plus" size={18} color="#FFFFFF" />
            <Text style={styles.addToCartText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>AgriMarket</Text>
          <Text style={styles.headerSubtitle}>Premium supplies & equipment</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn}>
          <Icon name="shopping-outline" size={24} color={COLORS.primary} />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>0</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="magnify" size={22} color={COLORS.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={COLORS.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="tune-variant" size={20} color={COLORS.surface} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <FlatList
        data={products}
        keyExtractor={(item, index) => item?.id || index.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Categories */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {loadingCategories ? (
              <ActivityIndicator size="small" color={COLORS.medical} style={{ marginVertical: 20 }} />
            ) : (
              <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategory}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
              />
            )}

            {/* Products Header */}
            <View style={[styles.sectionHeader, { marginTop: 20 }]}>
              <Text style={styles.sectionTitle}>
                {selectedCategoryId ? 'Filtered Products' : 'Popular Products'}
              </Text>
            </View>
            
            {loadingProducts && (
              <ActivityIndicator size="large" color={COLORS.medical} style={{ marginTop: 40 }} />
            )}
          </>
        }
        ListEmptyComponent={
          !loadingProducts ? (
            <View style={styles.emptyContainer}>
              <Icon name="package-variant" size={60} color={COLORS.secondary} />
              <Text style={styles.emptyText}>No products found.</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.crimson || '#DC2626',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '900',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: FONT_SANS,
    fontWeight: '600',
    color: COLORS.primary,
  },
  filterBtn: {
    backgroundColor: COLORS.medical || '#0D9488',
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.medical || '#0D9488',
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  categoryCardSelected: {
    opacity: 1,
  },
  categoryIconBox: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIconBoxSelected: {
    backgroundColor: COLORS.medical || '#0D9488',
    borderColor: COLORS.medical || '#0D9488',
    shadowColor: COLORS.medical || '#0D9488',
    shadowOpacity: 0.3,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  productCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    backgroundColor: COLORS.background,
  },
  productInfo: {
    marginTop: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    marginBottom: 2,
  },
  productBrand: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
  },
  discountPrice: {
    fontSize: 11,
    color: COLORS.secondary,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  addToCartBtn: {
    backgroundColor: COLORS.medical || '#0D9488',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.secondary,
  }
});

export default MarketplaceHomeScreen;
