import React, { useEffect } from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const OrderSuccessScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params || { orderId: 'ELT-123456' };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OrderTracking', { orderId: orderId });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, orderId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {/* Success Animation Area (Static for now) */}
        <View style={styles.successIconWrapper}>
          <View style={styles.pulseInner} />
          <View style={styles.pulseOuter} />
          <View style={styles.iconCircle}>
            <Icon name="check" size={60} color="white" />
          </View>
        </View>

        <Text style={styles.successTitle}>Order Placed Successfully!</Text>
        <Text style={styles.successSubtitle}>
          Your order has been confirmed and is being processed by the seller.
        </Text>

        <View style={styles.orderIdCard}>
          <Text style={styles.orderIdLabel}>ORDER ID</Text>
          <Text style={styles.orderIdValue}>{orderId}</Text>
          <View style={styles.dotLine} />
          <View style={styles.trackRow}>
            <Icon name="local-shipping" size={18} color={COLORS.emerald} />
            <Text style={styles.trackText}>Estimated Delivery: 3-5 Business Days</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Icon name="mail-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.infoText}>A confirmation email has been sent to your registered address.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  
  successIconWrapper: { width: 150, height: 150, alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.emerald, alignItems: 'center', justifyContent: 'center', zIndex: 3, elevation: 10 },
  pulseInner: { position: 'absolute', width: 130, height: 130, borderRadius: 65, backgroundColor: COLORS.emerald, opacity: 0.15 },
  pulseOuter: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: COLORS.emerald, opacity: 0.08 },

  successTitle: { fontSize: 26, fontWeight: '900', color: COLORS.primary, textAlign: 'center', fontFamily: FONT_SERIF },
  successSubtitle: { fontSize: 14, color: COLORS.secondary, textAlign: 'center', marginTop: 12, lineHeight: 22, fontWeight: '500' },

  orderIdCard: { 
    backgroundColor: 'white', 
    width: '100%', 
    borderRadius: 25, 
    padding: 25, 
    marginTop: 40,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15
  },
  orderIdLabel: { fontSize: 10, fontWeight: '900', color: COLORS.secondary, letterSpacing: 2 },
  orderIdValue: { fontSize: 24, fontWeight: '900', color: COLORS.primary, marginTop: 8, letterSpacing: 1 },
  dotLine: { width: '100%', height: 1, borderWidth: 1, borderColor: COLORS.background, borderStyle: 'dashed', marginVertical: 20, borderRadius: 1 },
  trackRow: { flexDirection: 'row', alignItems: 'center' },
  trackText: { fontSize: 12, fontWeight: '700', color: COLORS.emerald, marginLeft: 10 },

  infoBox: { flexDirection: 'row', alignItems: 'center', marginTop: 30, paddingHorizontal: 10 },
  infoText: { fontSize: 12, color: COLORS.secondary, marginLeft: 10, lineHeight: 18, fontWeight: '500', textAlign: 'center' },

  footer: { padding: 30, paddingBottom: Platform.OS === 'ios' ? 50 : 30 },
  trackBtn: { 
    backgroundColor: COLORS.primary, 
    height: 56, 
    borderRadius: 18, 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 15
  },
  trackBtnText: { color: 'white', fontWeight: '900', fontSize: 15, letterSpacing: 1 },
  homeBtn: { 
    height: 56, 
    borderRadius: 18, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary + '20'
  },
  homeBtnText: { color: COLORS.primary, fontWeight: '900', fontSize: 14, letterSpacing: 0.5 }
});

export default OrderSuccessScreen;
