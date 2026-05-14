import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  emerald: '#10B981',
  sky: '#0EA5E9',
};

const PaymentScreen = ({ route, navigation }: any) => {
  const { total = 0 } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('card');

  const PaymentOption = ({ id, icon, title, subtitle, isRecommended = false }: any) => (
    <TouchableOpacity 
      style={[styles.methodCard, selectedMethod === id && styles.selectedCard]}
      onPress={() => setSelectedMethod(id)}
    >
      <View style={[styles.iconBox, selectedMethod === id && styles.selectedIconBox]}>
        <Icon name={icon} size={24} color={selectedMethod === id ? 'white' : COLORS.primary} />
      </View>
      <View style={styles.methodInfo}>
        <View style={styles.titleRow}>
          <Text style={[styles.methodTitle, selectedMethod === id && styles.selectedText]}>{title}</Text>
          {isRecommended && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>FASTEST</Text>
            </View>
          )}
        </View>
        <Text style={[styles.methodSubtitle, selectedMethod === id && styles.selectedSubText]}>{subtitle}</Text>
      </View>
      <View style={[styles.radioOuter, selectedMethod === id && styles.radioSelectedOuter]}>
        {selectedMethod === id && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="close" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Total Amount Display */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>AMOUNT TO PAY</Text>
          <Text style={styles.amountValue}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        
        <PaymentOption 
          id="upi"
          icon="account-balance-wallet"
          title="UPI (PhonePe, Google Pay, BHIM)"
          subtitle="Instant payment using any UPI app"
          isRecommended={true}
        />

        <PaymentOption 
          id="card"
          icon="credit-card"
          title="Credit / Debit Card"
          subtitle="Visa, Mastercard, RuPay & more"
        />

        <PaymentOption 
          id="netbanking"
          icon="account-balance"
          title="Net Banking"
          subtitle="All major Indian banks supported"
        />

        <PaymentOption 
          id="cod"
          icon="payments"
          title="Cash on Delivery"
          subtitle="Pay when your order arrives"
        />

        <View style={styles.securityInfo}>
          <Icon name="lock" size={16} color={COLORS.secondary} />
          <Text style={styles.securityText}>Your payment is encrypted and 100% secure</Text>
        </View>

      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payBtn}
          onPress={() => navigation.navigate('OrderSuccess', { orderId: 'ELT-' + Math.floor(100000 + Math.random() * 900000) })}
        >
          <Text style={styles.payBtnText}>PAY SECURELY</Text>
          <Icon name="shield" size={20} color="white" style={{marginLeft: 10}} />
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
    backgroundColor: 'white'
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  
  scrollContent: { padding: 20, paddingBottom: 120 },
  
  amountCard: { 
    backgroundColor: COLORS.primary, 
    borderRadius: 25, 
    padding: 25, 
    alignItems: 'center', 
    marginBottom: 30,
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15
  },
  amountLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  amountValue: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 8, fontFamily: FONT_SERIF },

  sectionTitle: { fontSize: 16, fontWeight: '900', color: COLORS.primary, marginBottom: 15, fontFamily: FONT_SERIF, marginLeft: 5 },
  
  methodCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 22, 
    padding: 16, 
    alignItems: 'center', 
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  selectedCard: { 
    borderColor: COLORS.primary, 
    backgroundColor: COLORS.primary + '05',
    elevation: 5
  },
  iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  selectedIconBox: { backgroundColor: COLORS.primary },
  methodInfo: { flex: 1, marginLeft: 15 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  methodTitle: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  selectedText: { color: COLORS.primary, fontWeight: '900' },
  methodSubtitle: { fontSize: 11, color: COLORS.secondary, marginTop: 2, fontWeight: '500' },
  selectedSubText: { color: COLORS.primary, opacity: 0.7 },
  
  recommendedBadge: { backgroundColor: COLORS.emerald + '15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 8 },
  recommendedText: { color: COLORS.emerald, fontSize: 8, fontWeight: '900' },

  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  radioSelectedOuter: { borderColor: COLORS.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },

  securityInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 },
  securityText: { fontSize: 11, color: COLORS.secondary, marginLeft: 8, fontWeight: '600' },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: 'white', 
    padding: 20, 
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20
  },
  payBtn: { 
    backgroundColor: COLORS.primary, 
    height: 60, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  payBtnText: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 }
});

export default PaymentScreen;
