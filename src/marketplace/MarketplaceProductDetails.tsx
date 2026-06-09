import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetProductById } from '../api/hook/marketplace/products';
import { useThemeColors } from '../context/useTheme';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const MarketplaceProductDetails = ({ navigation, route }: any) => {
  const { productId } = route.params;
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [quantity, setQuantity] = useState(1);

  const { data: productResponse, isLoading } = useGetProductById(productId);
  const product = productResponse?.data;

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    const defaultStock = product?.variants?.[0]?.stock || 10;
    if (type === 'increase' && quantity < defaultStock) {
      setQuantity((q) => q + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  if (isLoading || !product) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.medical || '#0D9488'} />
      </View>
    );
  }

  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1559839734-2b71f153ef7ef?auto=format&fit=crop&q=80&w=400';
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.price || 0;
  const oldPrice = defaultVariant?.compareAtPrice;
  const stock = defaultVariant?.stock || 0;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Header Over Image */}
      <View style={styles.absoluteHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn}>
          <Icon name="cart-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.mainImage} resizeMode="cover" />
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>{product.brand?.brandName || 'AgriMarket Official'}</Text>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={14} color="#FBBF24" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>

          <Text style={styles.titleText}>{product.title}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>₹{price}</Text>
            {oldPrice && (
              <Text style={styles.oldPrice}>₹{oldPrice}</Text>
            )}
            <View style={[styles.stockBadge, stock === 0 && { backgroundColor: 'rgba(220, 38, 38, 0.1)' }]}>
              <Text style={[styles.stockText, stock === 0 && { color: '#DC2626' }]}>
                {stock > 0 ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descText}>
            {product.description || 'Premium quality agricultural supply designed for maximum efficiency and durability. Recommended by top veterinarians and farmers.'}
          </Text>

          <View style={styles.divider} />

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.qtyBtn}
                onPress={() => handleQuantityChange('decrease')}
              >
                <Icon name="minus" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.qtyBtn}
                onPress={() => handleQuantityChange('increase')}
              >
                <Icon name="plus" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>₹{(Number(price) * quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartLargeBtn} activeOpacity={0.8}>
          <Icon name="shopping-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.addToCartLargeText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  absoluteHeader: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    width: width,
    height: height * 0.45,
    backgroundColor: COLORS.surface,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.medical || '#0D9488',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginLeft: 4,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
  },
  oldPrice: {
    fontSize: 16,
    color: COLORS.secondary,
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  stockBadge: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stockText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 12,
  },
  descText: {
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 4,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginHorizontal: 15,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalBox: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  addToCartLargeBtn: {
    backgroundColor: COLORS.medical || '#0D9488',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: COLORS.medical || '#0D9488',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  addToCartLargeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  }
});

export default MarketplaceProductDetails;
