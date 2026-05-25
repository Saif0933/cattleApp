import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const HomeScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const stats = [
    { label: 'Total Cattle', value: '128', sub: '+12 this month', icon: 'cow', color: '#16A34A', bg: '#DCFCE7' },
    { label: 'Sick Animals', value: '12', sub: 'Need treatment', icon: 'heart-pulse', color: '#EF4444', bg: '#FEE2E2' },
    { label: 'Due for Checkup', value: '8', sub: 'Scheduled soon', icon: 'calendar-check', color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Milk Today', value: '320 L', sub: '+8% vs yesterday', icon: 'bottle-wine-outline', color: '#3B82F6', bg: '#DBEAFE' }
  ];

  const quickActions = [
    { name: 'Add Cattle', icon: 'plus', route: 'AddCattle', color: '#16A34A', bg: '#DCFCE7' },
    { name: 'Health', icon: 'shield-check', route: 'HealthRecord', color: '#16A34A', bg: '#DCFCE7' },
    { name: 'Breeding', icon: 'heart', route: 'Breeding', color: '#EC4899', bg: '#FCE7F3' },
    { name: 'Reports', icon: 'chart-bar', route: 'Reports', color: '#3B82F6', bg: '#DBEAFE' }
  ];

  const [recentList, setRecentList] = React.useState([
    {
      id: 'R001',
      name: 'Jersey Cow',
      category: 'Cow',
      age: '2 Years',
      location: 'Maharashtra',
      price: '₹ 70,000',
      status: 'For Sale',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e6d51?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'R002',
      name: 'Gir Calf',
      category: 'Cow',
      age: '6 Months',
      location: 'Gujarat',
      price: '₹ 25,000',
      status: 'For Sale',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'R003',
      name: 'Murrah Buffalo',
      category: 'Buffalo',
      age: '3 Years',
      location: 'Punjab',
      price: '₹ 90,000',
      status: 'For Sale',
      image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'R004',
      name: 'Barbari Goat',
      category: 'Goat',
      age: '2 Years',
      location: 'Uttar Pradesh',
      price: '₹ 12,000',
      status: 'For Sale',
      image: 'https://images.unsplash.com/photo-1610444983050-8b6b0a1d6361?auto=format&fit=crop&q=80&w=400'
    }
  ]);

  const [likedItems, setLikedItems] = React.useState<string[]>([]);
  const toggleLike = (id: string) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hello, Rashi 👋</Text>
          <Text style={styles.welcomeText}>Good Morning</Text>
        </View>
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Reminders')}>
            <Icon name="notifications-none" size={24} color={COLORS.darkGreen} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.profileBtn} 
            onPress={() => navigation.navigate('More')}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' }} 
              style={styles.avatar as any} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Farm Status Card */}
        <View style={styles.statusCard}>
          <Image 
            source={require('../../../assets/cattle_farm.png')} 
            style={styles.statusBgImage as any} 
            resizeMode="cover"
          />
          <View style={styles.statusOverlay}>
            <View style={styles.statusHeader}>
              <View style={styles.greenDot} />
              <Text style={styles.statusTitle}>Farm Overview</Text>
            </View>
            <Text style={styles.statusText}>All systems are running well</Text>
          </View>
        </View>

        {/* 2x2 Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.statCard}>
              <View style={[styles.statIconWrapper, { backgroundColor: stat.bg }]}>
                <MIcon name={stat.icon} size={24} color={stat.color} />
              </View>
              <View style={styles.statMeta}>
                <Text style={styles.statVal}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions horizontal block */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            {quickActions.map((action, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={styles.actionBtnCol}
                onPress={() => navigation.navigate(action.route)}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIconBox, { backgroundColor: action.bg }]}>
                  <MIcon name={action.icon} size={26} color={action.color} />
                </View>
                <Text style={styles.actionName}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Listings Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Listings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cattle')}>
            <View style={styles.viewAllRow}>
              <Text style={styles.viewAllText}>View All</Text>
              <MIcon name="chevron-right" size={16} color="#16A34A" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.recentContainer}>
          {recentList.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.recentCard}
              onPress={() => navigation.navigate('AnimalDetails', { product: item })}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.image }} style={styles.recentImg} />
              <View style={styles.recentInfo}>
                <View style={styles.recentHeaderRow}>
                  <Text style={styles.recentName}>{item.name}</Text>
                  <Text style={styles.recentPrice}>{item.price}</Text>
                </View>
                <View style={styles.recentMetaRow}>
                  <View style={styles.metaItem}>
                    <MIcon name="account-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                    <Text style={styles.metaText}>{item.age}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MIcon name="map-marker-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
                    <Text style={styles.metaText}>{item.location}</Text>
                  </View>
                </View>
                <View style={styles.recentFooterRow}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>{item.status}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleLike(item.id)}>
                    <MIcon 
                      name={likedItems.includes(item.id) ? "heart" : "heart-outline"} 
                      size={20} 
                      color={likedItems.includes(item.id) ? "#EF4444" : "#9CA3AF"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF'
  },
  greetingText: { fontSize: 13, fontWeight: '800', color: COLORS.secondary, letterSpacing: 0.5, fontFamily: FONT_SANS },
  welcomeText: { fontSize: 24, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF, marginTop: 2 },
  rightActions: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  bellBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  profileBtn: { 
    width: 44, height: 44, borderRadius: 22, 
    borderWidth: 1.5, borderColor: COLORS.border, overflow: 'hidden'
  },
  avatar: { width: '100%', height: '100%' },
  
  scrollContent: { paddingHorizontal: 24, paddingBottom: 100 },

  statusCard: {
    height: 160,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 15,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8,
    position: 'relative'
  },
  statusBgImage: { width: '100%', height: '100%', position: 'absolute' },
  statusOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(15, 41, 30, 0.4)', 
    padding: 20, 
    justifyContent: 'flex-end' 
  },
  statusHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981', marginRight: 8 },
  statusTitle: { color: '#E5E7EB', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: FONT_SANS },
  statusText: { color: 'white', fontSize: 20, fontWeight: '900', fontFamily: FONT_SERIF },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15, marginTop: 25 },
  statCard: {
    width: (width - 63) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  statIconWrapper: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  statMeta: { flex: 1 },
  statVal: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  statLabel: { fontSize: 11, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS, marginTop: 2 },

  actionsSection: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF, marginBottom: 18 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtnCol: { alignItems: 'center', width: (width - 48) / 4 },
  actionIconBox: { 
    width: 60, height: 60, borderRadius: 30, 
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  actionName: { fontSize: 12, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SANS, textAlign: 'center' },

  // Recent Listings styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16A34A',
    fontFamily: FONT_SANS
  },
  recentContainer: {
    gap: 12
  },
  recentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border || '#E5E7EB',
    padding: 10,
    alignItems: 'center'
  },
  recentImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover'
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  recentName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF
  },
  recentPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#16A34A',
    fontFamily: FONT_SANS
  },
  recentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 12
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    fontFamily: FONT_SANS
  },
  recentFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  statusBadge: {
    backgroundColor: '#EBFDF2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  statusBadgeText: {
    color: '#16A34A',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_SANS
  }
});

export default HomeScreen;