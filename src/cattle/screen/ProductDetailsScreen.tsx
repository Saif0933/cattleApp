import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const ProductDetailsScreen = ({ route, navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { product } = route.params || {};
  const [qty, setQty] = useState(1);

  // Fallback defaults for safety
  const item = {
    id: product?.id || 1,
    title: product?.title || 'Premium Feed Mix',
    price: product?.price || '45.00',
    info: product?.info || 'High Protein | 10kg',
    desc: product?.desc || 'Elite balanced nutrition formulated for premium performance and energy.',
    image: product?.image || 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600',
    brand: product?.brand || 'Care & Supplies',
  };

  // Parse specs from info (e.g. "High Protein | 10kg")
  const specBadges = item.info.split('|').map((s: string) => s.trim());

  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.surface} />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle} activeOpacity={0.7}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity 
          style={styles.cartCircle} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('OrderSummary', { product: { ...item, quantity: qty } })}
        >
          <Icon name="shopping-cart" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Immersive Product Hero Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.brand.toUpperCase()}</Text>
          </View>
        </View>

        {/* Details Content Container */}
        <View style={styles.content}>
          
          {/* Main Info Card */}
          <View style={styles.detailsCard}>
            <Text style={styles.titleText}>{item.title}</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>${item.price}</Text>
              <View style={styles.ratingBadge}>
                <Icon name="star" size={16} color={COLORS.gold} />
                <Text style={styles.ratingText}>4.9 (84 reviews)</Text>
              </View>
            </View>

            {/* Render dynamically parsed spec pills */}
            <View style={styles.specsContainer}>
              {specBadges.map((spec: string, idx: number) => (
                <View key={idx} style={styles.specPill}>
                  <Text style={styles.specText}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.descBox}>
              <Text style={styles.descText}>{item.desc}</Text>
            </View>
          </View>

          {/* Quantity Selector Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Quantity</Text>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={handleDecrease} style={styles.qtyBtn} activeOpacity={0.8}>
                <Icon name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.qtyVal}>{qty}</Text>
              <TouchableOpacity onPress={handleIncrease} style={styles.qtyBtn} activeOpacity={0.8}>
                <Icon name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Trust Guarantees */}
          <View style={styles.section}>
            <View style={styles.guaranteeCard}>
              <View style={styles.guaranteeRow}>
                <Icon name="verified" size={20} color={COLORS.emerald} />
                <Text style={styles.guaranteeText}>100% Premium Quality Certified</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.guaranteeRow}>
                <Icon name="local-shipping" size={20} color={COLORS.emerald} />
                <Text style={styles.guaranteeText}>Safe and Sanitized Secure Transport</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Buy and Add to Cart Action Bar Footer */}
      <View style={styles.footer}>
        <View style={styles.priceCalculationBox}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPriceText}>
            ${(parseFloat(item.price.replace(/,/g, '')) * qty).toFixed(2)}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.buyBtn} 
          activeOpacity={0.85}
          onPress={() => navigation.navigate('OrderSummary', { product: { ...item, quantity: qty } })}
        >
          <Icon name="shopping-bag" size={20} color="white" />
          <Text style={styles.buyBtnText}>PROCEED TO BUY</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: COLORS.background, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartCircle: { 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '900', 
    color: COLORS.primary, 
    fontFamily: FONT_SERIF 
  },
  scrollContent: { paddingBottom: 130 },
  imageWrapper: { 
    width: '100%', 
    height: 320, 
    backgroundColor: COLORS.border,
    position: 'relative',
  },
  productImage: { 
    width: '100%', 
    height: '100%' 
  },
  categoryBadge: { 
    position: 'absolute', 
    top: 20, 
    left: 20, 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8 
  },
  categoryText: { 
    color: COLORS.surface, 
    fontSize: 10, 
    fontWeight: '900', 
    letterSpacing: 1,
    fontFamily: FONT_SANS 
  },
  content: { padding: 20 },
  detailsCard: { 
    backgroundColor: COLORS.surface, 
    borderRadius: 24, 
    padding: 20, 
    elevation: 4, 
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: COLORS.isDark ? 0.2 : 0.05, 
    shadowRadius: 12,
  },
  titleText: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: COLORS.primary, 
    fontFamily: FONT_SERIF,
    lineHeight: 28,
  },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 12 
  },
  priceText: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: COLORS.emerald, 
    fontFamily: FONT_SANS 
  },
  ratingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.isDark ? '#2E2214' : '#FFFBEB', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8 
  },
  ratingText: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: COLORS.gold, 
    marginLeft: 4,
    fontFamily: FONT_SANS 
  },
  specsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8, 
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  specPill: { 
    backgroundColor: COLORS.background, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  specText: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: COLORS.secondary,
    fontFamily: FONT_SANS 
  },
  section: { marginTop: 24 },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: COLORS.primary, 
    fontFamily: FONT_SERIF,
    marginBottom: 10,
    paddingLeft: 4,
  },
  descBox: { 
    backgroundColor: COLORS.surface, 
    borderRadius: 18, 
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  descText: { 
    fontSize: 13, 
    color: COLORS.secondary, 
    lineHeight: 20, 
    fontWeight: '500' 
  },
  qtyContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    alignSelf: 'flex-start',
    borderRadius: 14,
    padding: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.02,
  },
  qtyBtn: { 
    width: 38, 
    height: 38, 
    borderRadius: 10, 
    backgroundColor: COLORS.background, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyVal: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: COLORS.primary, 
    paddingHorizontal: 20,
    fontFamily: FONT_SANS 
  },
  guaranteeCard: { 
    backgroundColor: COLORS.surface, 
    borderRadius: 20, 
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  guaranteeRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  guaranteeText: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: COLORS.secondary, 
    marginLeft: 10,
    fontFamily: FONT_SANS 
  },
  divider: { 
    height: 1, 
    backgroundColor: COLORS.border, 
    marginVertical: 12 
  },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: COLORS.surface, 
    paddingHorizontal: 20, 
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    borderTopWidth: 1, 
    borderTopColor: COLORS.border,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  priceCalculationBox: {
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 10,
    color: COLORS.secondary,
    fontWeight: '800',
    letterSpacing: 0.5,
    fontFamily: FONT_SANS,
  },
  totalPriceText: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    marginTop: 2,
  },
  buyBtn: { 
    backgroundColor: COLORS.primary, 
    height: 54, 
    borderRadius: 16, 
    paddingHorizontal: 24,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 4,
    shadowColor: COLORS.primary, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 8
  },
  buyBtnText: { 
    color: COLORS.surface, 
    fontSize: 13, 
    fontWeight: '900', 
    marginLeft: 8, 
    letterSpacing: 0.5,
    fontFamily: FONT_SANS 
  }
});

export default ProductDetailsScreen;
