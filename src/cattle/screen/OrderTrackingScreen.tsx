import React from 'react';
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

const OrderTrackingScreen = ({ route, navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { orderId = 'ELT-492102' } = route.params || {};

  const steps = [
    { title: 'Order Placed', time: 'Today, 10:30 AM', status: 'completed', icon: 'check-circle' },
    { title: 'Processing', time: 'Estimated: Today, 2:00 PM', status: 'active', icon: 'settings' },
    { title: 'Shipped', time: 'Waiting for pickup', status: 'pending', icon: 'local-shipping' },
    { title: 'Delivered', time: 'Estimated: 18 May', status: 'pending', icon: 'home' },
  ];

  const TrackStep = ({ step, isLast }: any) => (
    <View style={styles.stepContainer}>
      <View style={styles.leftCol}>
        <View style={[styles.stepIcon, step.status === 'completed' && styles.stepIconDone, step.status === 'active' && styles.stepIconActive]}>
          <Icon name={step.icon} size={20} color={step.status === 'pending' ? COLORS.secondary + '40' : 'white'} />
        </View>
        {!isLast && <View style={[styles.connector, step.status === 'completed' && styles.connectorDone]} />}
      </View>
      <View style={styles.stepInfo}>
        <Text style={[styles.stepTitle, step.status === 'active' && styles.activeText]}>{step.title}</Text>
        <Text style={styles.stepTime}>{step.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.surface} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainApp', { screen: 'Market' })} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Icon name="help-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Order Status Hero */}
        <View style={styles.statusHero}>
          <View style={styles.heroInfo}>
            <Text style={styles.heroLabel}>ID: {orderId}</Text>
            <Text style={styles.heroTitle}>In Processing</Text>
            <Text style={styles.heroSubtitle}>Your items are being prepared for shipping.</Text>
          </View>
          <View style={styles.heroIconBox}>
            <Icon name="inventory-2" size={40} color="white" />
          </View>
        </View>

        {/* Tracker Section */}
        <View style={styles.trackerCard}>
          <Text style={styles.sectionTitle}>Order Progress</Text>
          <View style={{ marginTop: 20 }}>
            {steps.map((step, i) => (
              <TrackStep key={i} step={step} isLast={i === steps.length - 1} />
            ))}
          </View>
        </View>

        {/* Delivery Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <View style={styles.detailItem}>
            <Icon name="person-outline" size={18} color={COLORS.secondary} />
            <Text style={styles.detailText}>John Doe | +1 (555) 0123</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="place" size={18} color={COLORS.secondary} />
            <Text style={styles.detailText}>123 Elite Ranch Road, Austin, TX, 78701</Text>
          </View>
        </View>

        {/* Support Banner */}
        <TouchableOpacity style={styles.supportBanner}>
          <Icon name="support-agent" size={24} color={COLORS.primary} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.supportTitle}>Need Help with Order?</Text>
            <Text style={styles.supportSub}>Chat with our elite support team</Text>
          </View>
          <Icon name="chevron-right" size={24} color={COLORS.primary} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.doneBtn}
          onPress={() => navigation.navigate('MainApp', { screen: 'Market' })}
        >
          <Text style={styles.doneBtnText}>BACK TO MARKETPLACE</Text>
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
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  helpBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { padding: 20, paddingBottom: 120 },

  statusHero: { 
    backgroundColor: COLORS.primary, 
    borderRadius: 30, 
    padding: 25, 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: COLORS.isDark ? 0.3 : 0.2,
    shadowRadius: 15,
    marginBottom: 25
  },
  heroInfo: { flex: 1 },
  heroLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  heroTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginTop: 4, fontFamily: FONT_SERIF },
  heroSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4, fontWeight: '500' },
  heroIconBox: { width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },

  trackerCard: { backgroundColor: COLORS.surface, borderRadius: 30, padding: 25, elevation: 3, borderWidth: 1, borderColor: COLORS.border },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  
  stepContainer: { flexDirection: 'row', height: 80 },
  leftCol: { alignItems: 'center', width: 40 },
  stepIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', zIndex: 2, borderWidth: 1, borderColor: COLORS.border },
  stepIconDone: { backgroundColor: COLORS.emerald, borderColor: COLORS.emerald },
  stepIconActive: { backgroundColor: COLORS.medical || '#0EA5E9', borderColor: COLORS.medical || '#0EA5E9' },
  connector: { width: 2, flex: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  connectorDone: { backgroundColor: COLORS.emerald },
  
  stepInfo: { marginLeft: 15, paddingTop: 5 },
  stepTitle: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  activeText: { color: COLORS.medical || '#0EA5E9', fontWeight: '900' },
  stepTime: { fontSize: 12, color: COLORS.secondary, opacity: 0.6, marginTop: 2, fontWeight: '600' },

  detailsCard: { backgroundColor: COLORS.surface, borderRadius: 30, padding: 25, marginTop: 20, elevation: 3, borderWidth: 1, borderColor: COLORS.border },
  detailItem: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  detailText: { fontSize: 13, color: COLORS.primary, fontWeight: '700', marginLeft: 12, flex: 1 },

  supportBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.surface, 
    borderRadius: 20, 
    padding: 20, 
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  supportTitle: { fontSize: 14, fontWeight: '900', color: COLORS.primary },
  supportSub: { fontSize: 11, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: COLORS.surface, 
    padding: 20, 
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20
  },
  doneBtn: { 
    backgroundColor: COLORS.primary, 
    height: 56, 
    borderRadius: 18, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  doneBtnText: { color: COLORS.surface, fontWeight: '900', fontSize: 14, letterSpacing: 1 }
});

export default OrderTrackingScreen;
