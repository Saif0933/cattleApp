import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  emerald: '#10B981',
  sky: '#0EA5E9',
};

const OrderSummaryScreen = ({ route, navigation }: any) => {
  // We'll fallback to a sample product if no params are passed (for testing)
  const { product } = route.params || {
    product: {
      title: "Royal Canine Elite",
      brand: "Elite Nutrition",
      price: "85",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600",
      weight: "15kg Bag",
    }
  };

  const subtotal = parseFloat(product.price.replace(',', ''));
  const platformFee = 5.00;
  const shipping = 12.50;
  const total = subtotal + platformFee + shipping;

  const DetailRow = ({ label, value, isTotal = false }: any) => (
    <View style={[styles.detailRow, isTotal && styles.totalRow]}>
      <Text style={[styles.detailLabel, isTotal && styles.totalText]}>{label}</Text>
      <Text style={[styles.detailValue, isTotal && styles.totalValue]}>
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Product Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productBrand}>{product.brand.toUpperCase()}</Text>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productWeight}>{product.weight}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressIconBox}>
              <Icon name="location-on" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>John Doe</Text>
              <Text style={styles.addressText}>123 Elite Ranch Road, Austin, Texas, 78701</Text>
              <Text style={styles.addressPhone}>+1 (555) 0123-4567</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentIconBox}>
              <Icon name="credit-card" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentText}>MasterCard ending in 4242</Text>
            </View>
            <TouchableOpacity>
              <Icon name="check-circle" size={22} color={COLORS.emerald} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Breakdown</Text>
          <View style={styles.breakdownCard}>
            <DetailRow label="Subtotal" value={subtotal} />
            <DetailRow label="Platform Fee" value={platformFee} />
            <DetailRow label="Shipping" value={shipping} />
            <View style={styles.divider} />
            <DetailRow label="Total Amount" value={total} isTotal={true} />
          </View>
        </View>

        <View style={styles.guaranteeBox}>
          <Icon name="verified-user" size={18} color={COLORS.emerald} />
          <Text style={styles.guaranteeText}>Secure Payment & Buyer Protection Enabled</Text>
        </View>

      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <View style={styles.footerTotalBox}>
          <Text style={styles.footerTotalLabel}>TOTAL</Text>
          <Text style={styles.footerTotalValue}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>
        <TouchableOpacity 
          style={styles.placeOrderBtn}
          onPress={() => navigation.navigate('Payment', { total: total })}
        >
          <Text style={styles.placeOrderBtnText}>PLACE ORDER</Text>
          <Icon name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: COLORS.primary, marginBottom: 15, fontFamily: FONT_SERIF },
  
  productCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  productImage: { width: 90, height: 90, borderRadius: 15 },
  productInfo: { marginLeft: 15, flex: 1, justifyContent: 'center' },
  productBrand: { fontSize: 10, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1, fontFamily: FONT_SANS },
  productTitle: { fontSize: 16, fontWeight: '900', color: COLORS.primary, marginTop: 4, fontFamily: FONT_SERIF },
  productWeight: { fontSize: 12, color: COLORS.secondary, marginTop: 2, fontFamily: FONT_SANS },
  productPrice: { fontSize: 18, fontWeight: '900', color: COLORS.emerald, marginTop: 6, fontFamily: FONT_SANS },

  addressCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 15, 
    alignItems: 'center',
    elevation: 3
  },
  addressIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  addressInfo: { flex: 1, marginLeft: 15 },
  addressName: { fontSize: 14, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SANS },
  addressText: { fontSize: 12, color: COLORS.secondary, marginTop: 2, lineHeight: 18, fontFamily: FONT_SANS },
  addressPhone: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginTop: 4, fontFamily: FONT_SANS },
  editText: { fontSize: 13, fontWeight: '800', color: COLORS.sky, fontFamily: FONT_SANS },

  paymentCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 15, 
    alignItems: 'center',
    elevation: 3
  },
  paymentIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  paymentInfo: { flex: 1, marginLeft: 15 },
  paymentText: { fontSize: 14, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SANS },

  breakdownCard: { backgroundColor: 'white', borderRadius: 25, padding: 20, elevation: 3 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { fontSize: 13, color: COLORS.secondary, fontWeight: '600', fontFamily: FONT_SANS, letterSpacing: 0.5 },
  detailValue: { fontSize: 14, color: COLORS.primary, fontWeight: '800', fontFamily: FONT_SANS },
  divider: { height: 1, backgroundColor: COLORS.background, marginVertical: 10 },
  totalRow: { marginTop: 5 },
  totalText: { fontSize: 16, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  totalValue: { fontSize: 22, fontWeight: '900', color: COLORS.emerald, fontFamily: FONT_SANS },

  guaranteeBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  guaranteeText: { fontSize: 11, fontWeight: '700', color: COLORS.secondary, marginLeft: 8 },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: 'white', 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20
  },
  footerTotalBox: { flex: 1 },
  footerTotalLabel: { fontSize: 10, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1.5, fontFamily: FONT_SANS },
  footerTotalValue: { fontSize: 26, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SANS },
  placeOrderBtn: { 
    backgroundColor: COLORS.primary, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    height: 56, 
    borderRadius: 18,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  placeOrderBtnText: { color: 'white', fontWeight: '900', fontSize: 15, marginRight: 10 }
});

export default OrderSummaryScreen;
