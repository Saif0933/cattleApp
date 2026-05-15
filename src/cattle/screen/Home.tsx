import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F9FBFA',
  surface: '#FFFFFF',
  emerald: '#10B981',
};

const HERD_APP = ({ navigation, route }: any) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const services = [
    { name: 'Doctor', icon: 'medical-services', color: '#10B981', sub: '20% Comm.' },
    { name: 'Vaccine', icon: 'vaccines', color: '#3B82F6', sub: 'Care Logs' },
    { name: 'Breeding', icon: 'favorite', color: '#EC4899', sub: 'Elite Pairs' },
    { name: 'Store', icon: 'shopping-bag', color: '#F59E0B', sub: 'Premium' }
  ];

  const ads = [
    {
      title: 'Premium Nutrition',
      sub: 'Save 20% on Elite Pet Food Brands',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1200',
      badge: 'SPONSORED'
    },
    {
      title: 'Verified Doctors',
      sub: 'Top-rated specialists at your service.',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=1200',
      badge: 'FEATURED'
    }
  ];

  const [topListings, setTopListings] = useState([
    { name: "Siberian Husky", breed: "Pure Breed", price: "2,500", info: "Verified Breeder", type: "PREMIUM", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400", verified: true },
    { name: "Persian Kit", breed: "Show Quality", price: "1,200", info: "Top Seller", type: "AD", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400", verified: false }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextSlide = activeSlide + 1;
      if (nextSlide >= ads.length) nextSlide = 0;
      scrollRef.current?.scrollTo({ x: nextSlide * width, animated: true });
      setActiveSlide(nextSlide);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const ServiceCard = ({ name, icon, color, sub }: any) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => {
        if (name === 'Doctor') navigation.navigate('DoctorBooking');
        if (name === 'Breeding') navigation.navigate('Breeding');
        if (name === 'Vaccine') navigation.navigate('PetCare');
        if (name === 'Store') navigation.navigate('Store');
      }}
    >
      <View style={[styles.serviceIcon, { backgroundColor: color + '15' }]}>
        <Icon name={icon} size={28} color={color} />
      </View>
      <Text style={styles.serviceName}>{name}</Text>
      <Text style={styles.serviceSub}>{sub}</Text>
    </TouchableOpacity>
  );

  const PremiumCard = (item: any) => {
    const { name, breed, price, info, image, type, verified } = item;
    return (
      <View style={styles.premiumListing}>
        <Image source={{ uri: image }} style={styles.premiumImg} />
        {verified && (
          <View style={styles.verifiedBadge}>
            <Icon name="verified" size={16} color={COLORS.accent} />
            <Text style={styles.verifiedText}>TRUSTED</Text>
          </View>
        )}
        <View style={styles.premiumTag}>
          <Text style={styles.premiumTagText}>{type}</Text>
        </View>
        <View style={styles.premiumInfo}>
          <Text style={styles.premiumName}>{name}</Text>
          <Text style={styles.premiumBreed}>{breed}</Text>
          <View style={styles.premiumFooter}>
            <Text style={styles.premiumPrice}>${price}</Text>
            <TouchableOpacity 
              style={styles.premiumAction}
              onPress={() => navigation.navigate('AnimalDetails', { product: item })}
            >
              <Icon name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Floating Transparent Header */}
      <View style={styles.floatingHeader}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.secondary} />
          <Text style={styles.searchPlaceholder}>Search Doctors, Food...</Text>
        </View>
        <TouchableOpacity style={styles.subscribeBtn} onPress={() => navigation.navigate('Subscription')}>
          <Icon name="star" size={18} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Ads Carousel (Now at the very top) */}
        <View style={styles.adsWrapper}>
          <ScrollView ref={scrollRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {ads.map((ad, idx) => (
              <ImageBackground key={idx} source={{ uri: ad.image }} style={styles.adBanner}>
                <View style={styles.adOverlay}>
                  <View style={{ height: 100 }} /> 
                  <View style={styles.adBadge}><Text style={styles.adBadgeText}>{ad.badge}</Text></View>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text style={styles.adSubText}>{ad.sub}</Text>
                  <TouchableOpacity style={styles.adBtn}><Text style={styles.adBtnText}>Check Out</Text></TouchableOpacity>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elite Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((s, i) => <ServiceCard key={i} {...s} />)}
          </View>
        </View>

        <TouchableOpacity style={styles.subCallout} onPress={() => navigation.navigate('Subscription')}>
          <View>
            <Text style={styles.subTitle}>Professional Seller?</Text>
            <Text style={styles.subSub}>Get 1st listing FREE, then subscribe.</Text>
          </View>
          <Icon name="chevron-right" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.rowHeader}>
            <Text style={styles.sectionTitle}>Top Promoted</Text>
            <View style={styles.seeAllContainer}>
              <Text style={styles.seeAll}>View All</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
                <Icon name="chevron-right" size={18} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.premiumScroll}>
            {topListings.map((listing, idx) => <PremiumCard key={idx} {...listing} />)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Brands</Text>
          <View style={styles.brandGrid}>
            <TouchableOpacity style={styles.brandCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400' }} style={styles.brandImg} />
              <Text style={styles.brandName}>PetMedics</Text>
              <Text style={styles.brandCommission}>Sponsored</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.brandCard}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400' }} style={styles.brandImg} />
              <Text style={styles.brandName}>Elite Feast</Text>
              <Text style={styles.brandCommission}>Promoted</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddCattle')}>
        <Icon name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F9FBFA' },
  floatingHeader: { 
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, 
    paddingTop: StatusBar.currentHeight || 40, paddingBottom: 15
  },
  searchBar: { 
    flex: 1, height: 45, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, elevation: 5 
  },
  searchPlaceholder: { marginLeft: 10, color: '#94A3B8', fontSize: 13, fontFamily: FONT_SERIF },
  subscribeBtn: { width: 45, height: 45, backgroundColor: COLORS.primary, borderRadius: 12, marginLeft: 12, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  adsWrapper: { height: 280 },
  adBanner: { width: width, height: 280 },
  adOverlay: { flex: 1, backgroundColor: 'rgba(15, 41, 30, 0.4)', padding: 25, justifyContent: 'center' },
  adBadge: { backgroundColor: COLORS.accent, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 10 },
  adBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  adTitle: { color: 'white', fontSize: 24, fontWeight: '900', fontFamily: FONT_SERIF },
  adSubText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 5, fontFamily: FONT_SERIF },
  adBtn: { backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, alignSelf: 'flex-start', marginTop: 15 },
  adBtnText: { color: COLORS.primary, fontWeight: '800', fontSize: 12 },
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, marginBottom: 15 },
  rowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  seeAllContainer: { flexDirection: 'row', alignItems: 'center' },
  seeAll: { color: COLORS.secondary, fontSize: 12, fontWeight: '700', marginRight: 4 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceCard: { width: (width - 55) / 2, backgroundColor: 'white', padding: 15, borderRadius: 20, marginBottom: 15, elevation: 2 },
  serviceIcon: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  serviceName: { fontSize: 16, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  serviceSub: { fontSize: 11, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  subCallout: { 
    marginHorizontal: 20, backgroundColor: COLORS.primary, borderRadius: 20, padding: 20, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 
  },
  subTitle: { color: 'white', fontSize: 18, fontWeight: '900', fontFamily: FONT_SERIF },
  subSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  premiumScroll: { marginLeft: -5 },
  premiumListing: { width: 220, backgroundColor: 'white', borderRadius: 25, marginRight: 15, overflow: 'hidden', elevation: 4, marginBottom: 5 },
  premiumImg: { width: '100%', height: 140 },
  premiumTag: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  premiumTagText: { color: 'white', fontSize: 9, fontWeight: '900' },
  verifiedBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  verifiedText: { color: COLORS.primary, fontSize: 9, fontWeight: '900', marginLeft: 4 },
  premiumInfo: { padding: 15 },
  premiumName: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  premiumBreed: { fontSize: 12, color: COLORS.secondary, marginTop: 2 },
  premiumFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  premiumPrice: { fontSize: 16, fontWeight: '900', color: COLORS.primary },
  premiumAction: { width: 32, height: 32, backgroundColor: COLORS.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  brandGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  brandCard: { width: (width - 55) / 2, backgroundColor: 'white', borderRadius: 20, padding: 12, elevation: 2 },
  brandImg: { width: '100%', height: 100, borderRadius: 15, marginBottom: 10 },
  brandName: { fontSize: 15, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  brandCommission: { fontSize: 10, color: COLORS.emerald, fontWeight: '700', marginTop: 2 },
  fab: { 
    position: 'absolute', bottom: 30, right: 20, width: 65, height: 65, 
    backgroundColor: COLORS.primary, borderRadius: 20, justifyContent: 'center', 
    alignItems: 'center', elevation: 10, shadowColor: COLORS.primary, shadowRadius: 10, shadowOpacity: 0.3 
  }
});

export default HERD_APP;