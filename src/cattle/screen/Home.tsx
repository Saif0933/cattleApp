import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
  const [searchQuery, setSearchQuery] = useState('');

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
      image: 'https://imgs.search.brave.com/lp9PxY3TOitWqgHHbuLEFx08wqzxOOSCUbSxnkDWcBg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE0LzUxLzkwLzQ3/LzM2MF9GXzE0NTE5/MDQ3MTBfaFJrT2Ux/S0lOZVpMWGhDQXBR/NW1nRklhQUpEZ2pq/c00uanBn',
      badge: 'SPONSORED'
    },
    {
      title: 'Verified Doctors',
      sub: 'Top-rated specialists at your service.',
      image: 'https://imgs.search.brave.com/2mQ2eK5AkvOL8rKoW6gSIpGgYbqtSt95ATT_62CAkJ0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTk5/NTQwOTM2MC9waG90/by9tYWxlLWFuZC1m/ZW1hbGUtdmV0ZXJp/bmFyeS10ZWFtLWdp/dmluZy1pbmplY3Rp/b24tdG8tcGV0LWFr/aXRhLWRvZy1pbi1z/dXJnZXJ5LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1YSXJy/VndZTVJ5OVpQVUVJ/NXhaYWtSOUZvb1hk/QXRraU5IaTVjbnpO/RjZZPQ',
      badge: 'FEATURED'
    }
  ];

  const [topListings, setTopListings] = useState([
    { 
      id: "listing-1",
      sellerId: "seller-1",
      title: "Siberian Husky", 
      name: "Siberian Husky", 
      breed: "Pure Breed", 
      price: "2,500", 
      info: "Verified Breeder", 
      type: "PREMIUM", 
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400", 
      verified: true,
      weight: '25kg',
      yield: 'N/A',
      age: '2 Years',
      gender: 'Male',
      desc: 'Active and friendly Siberian Husky, fully vaccinated and ready for a new home.',
      phone: '1234567890',
      
      // DB Model fields
      category: "DOG",
      ageMonths: 24,
      vaccination: "VACCINATED",
      isNegotiable: true,
      images: ["https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400"],
      videos: [],
      isFeatured: true,
      isPremium: true,
      status: "ACTIVE"
    },
    { 
      id: "listing-2",
      sellerId: "seller-2",
      title: "Jersey Elite", 
      name: "Jersey Elite", 
      breed: "Show Quality", 
      price: "78,000", 
      info: "Top Seller", 
      type: "AD", 
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400", 
      verified: false,
      weight: '380kg',
      yield: '10L/day',
      age: '2.5 Years',
      gender: 'Female',
      desc: 'High-quality Jersey cow with excellent milk yield and gentle temperament.',
      phone: '0987654321',

      // DB Model fields
      category: "COW",
      ageMonths: 30,
      vaccination: "PARTIALLY_VACCINATED",
      milkProduction: 10.0,
      isNegotiable: false,
      images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400"],
      videos: [],
      isFeatured: true,
      isPremium: false,
      status: "ACTIVE"
    }
  ]);

  const brandProducts = [
    {
      id: "prod-1",
      vendorId: "vendor-1",
      title: 'Holstein Friesian',
      name: 'Holstein Friesian',
      price: '95,000',
      brand: 'PetMedics',
      info: 'Ludhiana, Punjab',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400',
      weight: '520kg',
      yield: '15L/day',
      age: '4 Years',
      gender: 'Female',
      desc: 'High-quality dairy cattle with excellent milk production history. Sponsored by PetMedics.',
      phone: '9876543210',

      // DB Model fields
      category: "CATTLE_FEED",
      stock: 12,
      images: ["https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400"],
      isFeatured: true,
      rating: 4.9
    },
    {
      id: "prod-2",
      vendorId: "vendor-2",
      title: 'Jersey Elite',
      name: 'Jersey Elite',
      price: '78,000',
      brand: 'Elite Feast',
      info: 'Ambala, Haryana',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400',
      weight: '380kg',
      yield: '10L/day',
      age: '2.5 Years',
      gender: 'Female',
      desc: 'Healthy Jersey heifer, perfect for small dairy farms. Promoted by Elite Feast.',
      phone: '8765432109',

      // DB Model fields
      category: "CATTLE_FEED",
      stock: 5,
      images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400"],
      isFeatured: false,
      rating: 4.7
    }
  ];

  const suggestedProducts = [
    {
      id: "prod-3",
      vendorId: "vendor-3",
      name: "Premium Dog Food",
      breed: "Nutrition",
      price: "1,200",
      info: "Top Seller",
      type: "FOOD",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400",
      verified: true,
      weight: "15kg",
      yield: "N/A",
      age: "All Ages",
      gender: "N/A",
      desc: "Complete feed for adult and mature dogs.",
      phone: "1231231234",

      // DB Model fields
      category: "DOG_FOOD",
      stock: 100,
      images: ["https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400"],
      isFeatured: true,
      rating: 4.8
    },
    {
      id: "prod-4",
      vendorId: "vendor-4",
      name: "Horse Saddle",
      breed: "Equipment",
      price: "12,500",
      info: "Premium Gear",
      type: "GEAR",
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400",
      verified: false,
      weight: "5kg",
      yield: "N/A",
      age: "N/A",
      gender: "N/A",
      desc: "Premium leather horse saddle for riding.",
      phone: "4321432143",

      // DB Model fields
      category: "ACCESSORIES",
      stock: 15,
      images: ["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400"],
      isFeatured: false,
      rating: 4.5
    },
    {
      id: "prod-5",
      vendorId: "vendor-5",
      name: "Aquarium 50L",
      breed: "Accessories",
      price: "4,000",
      info: "Starter Kit",
      type: "ACCESSORY",
      image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400",
      verified: true,
      weight: "10kg",
      yield: "N/A",
      age: "N/A",
      gender: "N/A",
      desc: "50-liter glass aquarium with LED light and filter.",
      phone: "5555555555",

      // DB Model fields
      category: "ACCESSORIES",
      stock: 8,
      images: ["https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400"],
      isFeatured: true,
      rating: 4.6
    },
    {
      id: "prod-6",
      vendorId: "vendor-6",
      name: "Cat Tree 3-Tier",
      breed: "Toys",
      price: "2,800",
      info: "Best Seller",
      type: "TOY",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400",
      verified: false,
      weight: "8kg",
      yield: "N/A",
      age: "N/A",
      gender: "N/A",
      desc: "3-tier cat tree with scratching posts and hammock.",
      phone: "9999999999",

      // DB Model fields
      category: "ACCESSORIES",
      stock: 20,
      images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400"],
      isFeatured: false,
      rating: 4.4
    }
  ];

  const filteredListings = topListings.filter(item => 
    (item.title || item.name).toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (route.params?.newAnimal) {
      const newItem = route.params.newAnimal;
      setTopListings(prev => [
        {
          id: String(prev.length + 1),
          sellerId: "current_user",
          title: newItem.title || newItem.name,
          description: newItem.description || newItem.desc,
          category: newItem.category || 'COW',
          breed: newItem.breed,
          ageMonths: newItem.ageMonths || 12,
          gender: newItem.gender || 'MALE',
          weight: newItem.weight || 0,
          healthCondition: newItem.healthCondition || 'Excellent',
          vaccination: newItem.vaccination || 'NOT_VACCINATED',
          milkProduction: newItem.milkProduction || null,
          price: newItem.price || "0",
          isNegotiable: newItem.isNegotiable || false,
          latitude: null,
          longitude: null,
          address: newItem.address || 'Unknown',
          images: newItem.images || [newItem.image],
          videos: [],
          isFeatured: newItem.isFeatured || false,
          isPremium: newItem.isPremium || false,
          status: 'ACTIVE',
          postedDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),

          // Compatibility fallbacks
          name: newItem.title || newItem.name,
          info: newItem.address || newItem.info,
          type: newItem.type || 'NEW',
          image: newItem.images ? newItem.images[0] : newItem.image,
          verified: false,
          yield: newItem.milkProduction ? `${newItem.milkProduction}L/day` : 'N/A',
          age: newItem.ageMonths ? `${Math.floor(newItem.ageMonths / 12)} Years` : '1 Year',
          desc: newItem.description || newItem.desc,
          phone: newItem.phone || '9876543210'
        },
        ...prev
      ]);
      navigation.setParams({ newAnimal: undefined });
    }
  }, [route.params?.newAnimal]);

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
    const title = item.title || item.name || 'Elite Listing';
    const breed = item.breed || 'Unknown';
    const price = item.price ? `${item.price}` : '0';
    const image = (item.images && item.images.length > 0) ? item.images[0] : (item.image || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400');
    const type = item.isPremium ? 'PREMIUM' : (item.isFeatured ? 'FEATURED' : (item.type || 'STANDARD'));
    const verified = item.verified || item.seller?.isVerifiedSeller;

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
          <Text style={styles.premiumName}>{title}</Text>
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
          <TextInput 
            style={styles.searchInput}
            placeholder="Search Doctors, Food..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            underlineColorAndroid="transparent"
          />
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
                  <View style={{ height: 200 }} /> 
                  <View style={styles.adBadge}><Text style={styles.adBadgeText}>{ad.badge}</Text></View>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text style={styles.adSubText}>{ad.sub}</Text>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cattle Services</Text>
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
            {filteredListings.map((listing, idx) => <PremiumCard key={idx} {...listing} />)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Brands</Text>
          <View style={styles.brandGrid}>
            {brandProducts.map((item, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={styles.brandCard}
                onPress={() => navigation.navigate('AnimalDetails', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.brandImg} />
                <Text style={styles.brandName}>{item.brand}</Text>
                <Text style={styles.brandCommission}>{idx === 0 ? 'Sponsored' : 'Promoted'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.rowHeader}>
            <Text style={styles.sectionTitle}>More Products</Text>
            <View style={styles.seeAllContainer}>
              <Text style={styles.seeAll}>View All</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Store')}>
                <Icon name="chevron-right" size={18} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.premiumScroll}>
            {suggestedProducts.map((product, idx) => <PremiumCard key={`suggested-${idx}`} {...product} />)}
          </ScrollView>
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
  searchInput: { flex: 1, marginLeft: 10, color: COLORS.primary, fontSize: 14, fontFamily: FONT_SERIF, paddingVertical: 0 },
  subscribeBtn: { width: 45, height: 45, backgroundColor: COLORS.primary, borderRadius: 12, marginLeft: 12, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  adsWrapper: { height: 450 },
  adBanner: { width: width, height: 450 },
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