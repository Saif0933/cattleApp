import React, { useState } from 'react';
import {
  Dimensions,
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

const PaymentScreen = ({ route, navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { total = 0 } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const PaymentMethod = ({ id, icon, title, isRecommended = false }: any) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={[styles.methodCard, selectedMethod === id && styles.selectedCard]}
      onPress={() => setSelectedMethod(id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: selectedMethod === id ? COLORS.emerald : COLORS.background }]}>
        <Icon name={icon} size={28} color={selectedMethod === id ? 'white' : COLORS.primary} />
      </View>
      <View style={styles.methodContent}>
        <Text style={[styles.methodTitle, selectedMethod === id && styles.selectedTitle]}>{title}</Text>
        {isRecommended && <Text style={styles.recommendedTag}>Recommended</Text>}
      </View>
      <View style={[styles.checkbox, selectedMethod === id && styles.checked]}>
        {selectedMethod === id && <Icon name="check" size={16} color="white" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.surface} />
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* Total Price Section */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Total Amount to Pay</Text>
          <Text style={styles.priceValue}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          <View style={styles.secureLine}>
            <Icon name="verified-user" size={14} color={COLORS.emerald} />
            <Text style={styles.secureText}>100% Secure Payment</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Choose Payment Method</Text>

        <PaymentMethod 
          id="upi" 
          icon="qr-code-scanner" 
          title="UPI (Google Pay / PhonePe)" 
          isRecommended={true} 
        />
        
        <PaymentMethod 
          id="card" 
          icon="credit-card" 
          title="Debit / Credit Card" 
        />

        <PaymentMethod 
          id="net" 
          icon="account-balance" 
          title="Net Banking" 
        />

        <PaymentMethod 
          id="cod" 
          icon="payments" 
          title="Cash on Delivery" 
        />

        <View style={styles.infoBox}>
          <Icon name="info" size={18} color={COLORS.secondary} />
          <Text style={styles.infoText}>By placing this order, you agree to our Terms & Conditions.</Text>
        </View>

      </ScrollView>

      {/* Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => navigation.navigate('OrderSuccess', { orderId: 'ELT-' + Math.floor(Math.random() * 900000) })}
        >
          <Text style={styles.payButtonText}>CONFIRM & PAY</Text>
          <Icon name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    height: 70, 
    backgroundColor: COLORS.surface, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  backCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  headerText: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  
  scroll: { padding: 20, paddingBottom: 100 },
  
  priceCard: { 
    backgroundColor: COLORS.surface, 
    borderRadius: 25, 
    padding: 20, 
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceLabel: { fontSize: 13, fontWeight: '700', color: COLORS.secondary, marginBottom: 2 },
  priceValue: { fontSize: 36, fontWeight: '900', color: COLORS.emerald, fontFamily: FONT_SANS },
  secureLine: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: COLORS.background, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15, borderWidth: 1, borderColor: COLORS.border },
  secureText: { fontSize: 10, fontWeight: '800', color: COLORS.emerald, marginLeft: 5 },

  sectionHeading: { fontSize: 17, fontWeight: '900', color: COLORS.primary, marginBottom: 15, fontFamily: FONT_SERIF, marginLeft: 5 },
  
  methodCard: { 
    backgroundColor: COLORS.surface, 
    borderRadius: 20, 
    padding: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: COLORS.isDark ? 0.2 : 0.05,
    shadowRadius: 4
  },
  selectedCard: { borderColor: COLORS.emerald, backgroundColor: COLORS.surface },
  iconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  methodContent: { flex: 1, marginLeft: 12 },
  methodTitle: { fontSize: 15, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SANS },
  selectedTitle: { color: COLORS.emerald },
  recommendedTag: { fontSize: 9, fontWeight: '900', color: COLORS.emerald, marginTop: 2, textTransform: 'uppercase' },
  
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  checked: { backgroundColor: COLORS.emerald, borderColor: COLORS.emerald },

  infoBox: { flexDirection: 'row', paddingHorizontal: 10, marginTop: 10, alignItems: 'center' },
  infoText: { flex: 1, fontSize: 11, color: COLORS.secondary, marginLeft: 10, fontWeight: '500', lineHeight: 16 },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: COLORS.surface, 
    padding: 20, 
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 45 : 25
  },
  payButton: { 
    backgroundColor: COLORS.emerald, 
    height: 64, 
    borderRadius: 22, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 10,
    shadowColor: COLORS.emerald,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  payButtonText: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1, marginRight: 10 }
});

export default PaymentScreen;
