import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#10B981',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  border: '#EEEEEE',
  sky: '#0EA5E9',
  gold: '#FFB800',
};

const OrderHistoryScreen = ({ navigation }: any) => {
  const pastOrders = [
    {
      id: 'ELT-721092',
      date: '12 May 2026',
      total: '98.50',
      status: 'Delivered',
      items: [
        { name: 'Royal Canine Elite', image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=200' }
      ]
    },
    {
      id: 'ELT-651022',
      date: '08 May 2026',
      total: '1,240.00',
      status: 'Shipped',
      items: [
        { name: 'Elite Breeding Bull #42', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=200' }
      ]
    },
    {
      id: 'ELT-491021',
      date: '28 April 2026',
      total: '45.00',
      status: 'Delivered',
      items: [
        { name: 'Premium Cattle Feed', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=200' }
      ]
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const isDelivered = status === 'Delivered';
    return (
      <View style={[styles.badge, { backgroundColor: isDelivered ? COLORS.accent + '15' : COLORS.sky + '15' }]}>
        <Text style={[styles.badgeText, { color: isDelivered ? COLORS.accent : COLORS.sky }]}>{status.toUpperCase()}</Text>
      </View>
    );
  };

  const OrderCard = ({ order }: any) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <StatusBadge status={order.status} />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderContent}>
        <Image source={{ uri: order.items[0].image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{order.items[0].name}</Text>
          <Text style={styles.itemCount}>{order.items.length} Item{order.items.length > 1 ? 's' : ''}</Text>
          <Text style={styles.orderTotal}>${order.total}</Text>
        </View>
        <Icon name="chevron-right" size={24} color={COLORS.secondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="filter-list" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {pastOrders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
        
        <View style={styles.footerInfo}>
          <Icon name="info-outline" size={16} color={COLORS.secondary} />
          <Text style={styles.footerText}>Showing orders from the last 6 months</Text>
        </View>
      </ScrollView>

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
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  filterBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { padding: 20, paddingBottom: 50 },

  orderCard: { 
    backgroundColor: 'white', 
    borderRadius: 25, 
    padding: 20, 
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 15
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  orderId: { fontSize: 15, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SANS },
  orderDate: { fontSize: 12, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 9, fontWeight: '900', letterSpacing: 1 },

  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 15 },

  orderContent: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 65, height: 65, borderRadius: 15, backgroundColor: COLORS.background },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 14, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SERIF },
  itemCount: { fontSize: 11, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  orderTotal: { fontSize: 16, fontWeight: '900', color: COLORS.primary, marginTop: 6, fontFamily: FONT_SANS },

  footerInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  footerText: { fontSize: 11, color: COLORS.secondary, marginLeft: 8, fontWeight: '600' }
});

export default OrderHistoryScreen;
