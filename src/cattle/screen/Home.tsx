import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F0F4F2',
  surface: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.9)',
};

interface AnimalCardProps {
  name: string;
  breed: string;
  price: string;
  info: string;
  image: string;
  type: string;
}

const HERD_APP = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const categories = [
    { name: 'All', icon: 'grid-view', color: '#1B2E22' },
    { name: 'Cattle', icon: 'agriculture', color: '#496452' },
    { name: 'Pets', icon: 'pets', color: '#D97706' },
    { name: 'Birds', icon: 'flutter-dash', color: '#3B82F6' },
    { name: 'Feed', icon: 'grass', color: '#10B981' }
  ];

  const slides = [
    {
      title: 'Premium Livestock',
      sub: 'The world\'s most elite collection is now at your fingertips.',
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=1200',
      badge: 'EXCLUSIVE ACCESS'
    },
    {
      title: 'Exotic Pets',
      sub: 'Discover rare breeds and beautiful companions from every corner.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200',
      badge: 'TRENDING PETS'
    },
    {
      title: 'Rare Birds',
      sub: 'Vibrant plumage and talkative friends waiting for a home.',
      image: 'https://images.unsplash.com/photo-1484557918186-7b4e561c9948?auto=format&fit=crop&q=80&w=1200',
      badge: 'NEW ARRIVALS'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      let nextSlide = activeSlide + 1;
      if (nextSlide >= slides.length) {
        nextSlide = 0;
      }
      scrollRef.current?.scrollTo({ x: nextSlide * width, animated: true });
      setActiveSlide(nextSlide);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  const AnimalCard = ({ name, breed, price, info, image, type }: AnimalCardProps) => (
    <TouchableOpacity style={styles.modernCard}>
      <Image source={{ uri: image }} style={styles.cardImg} />
      <View style={styles.typeTag}>
        <Text style={styles.typeTagText}>{type.toUpperCase()}</Text>
      </View>
      <View style={styles.glassContent}>
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={styles.cardBreed}>{breed}</Text>
            <Text style={styles.cardName}>{name}</Text>
          </View>
          <View style={styles.pricePill}>
            <Text style={styles.pricePillText}>${price}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.footerItem}>
            <Icon name="history" size={14} color={COLORS.secondary} />
            <Text style={styles.footerText}>{info}</Text>
          </View>
          <TouchableOpacity style={styles.cardActionBtn}>
            <Icon name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <View style={styles.header}>
        <View />
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.circleIconBtn}>
            <Icon name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.sliderContainer}>
          <ScrollView ref={scrollRef} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16}>
            {slides.map((slide, idx) => (
              <ImageBackground key={idx} source={{ uri: slide.image }} style={styles.heroBackground}>
                <View style={styles.heroGradient}>
                  <View style={styles.heroContent}>
                    <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>{slide.badge}</Text></View>
                    <Text style={styles.heroTitle}>{slide.title}</Text>
                    <Text style={styles.heroSub}>{slide.sub}</Text>
                    <TouchableOpacity style={styles.heroBtn}><Text style={styles.heroBtnText}>Start Browsing</Text></TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {slides.map((_, idx) => (
              <View key={idx} style={[styles.dot, activeSlide === idx ? styles.activeDot : styles.inactiveDot]} />
            ))}
          </View>
        </View>

        <View style={styles.contentSection}>
          {/* Enhanced Categories Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Discover More</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catList} contentContainerStyle={{ paddingRight: 40 }}>
            {categories.map((cat, idx) => (
              <TouchableOpacity 
                key={idx} 
                onPress={() => setActiveCategory(idx)}
                style={[
                  styles.catCard, 
                  activeCategory === idx && { backgroundColor: cat.color, borderBottomWidth: 0 }
                ]}
              >
                <View style={[
                  styles.catIconBox, 
                  activeCategory === idx ? { backgroundColor: 'rgba(255,255,255,0.15)' } : { backgroundColor: COLORS.background }
                ]}>
                  <Icon name={cat.icon} size={18} color={activeCategory === idx ? 'white' : COLORS.primary} />
                </View>
                <Text style={[
                  styles.catLabel, 
                  activeCategory === idx ? { color: 'white' } : { color: COLORS.secondary }
                ]}>{cat.name.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Picks</Text>
          </View>
          <View style={styles.animalGrid}>
            <AnimalCard name="Oliver" breed="Persian Cat" price="850" info="2 Years Old" type="Pet" image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" />
            <AnimalCard name="Billy" breed="Boer Goat" price="1,200" info="1.5 Years Old" type="Livestock" image="https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400" />
            <AnimalCard name="Titan" breed="Black Angus" price="12,500" info="3 Years Old" type="Premium" image="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdNasNgugMt9GW99saf9kJLyEjuvlGJ-Ti7ptGLBiUeFObAF6Ma6ZyY1jew9pbTeSKPqDdhpRyYxOLVcqkdfa_VXyWyV2qwAXw7i5Uy-6tSo0fDfkZugDj74wiXhpmJWG__Y-tuoMn40fP0i-ePHCXZNR3ryiovs95anrLxl0XH_3_68X5p5SRtofvwvvhxqQj2o7y97xDwadmc1BGMF4E86CumFBytPLS1WU2RlzwbdJdCbEprXbnSpnHh-f9cdxzVN43MBx" />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fabContainer}>
        <View style={styles.fabCircle}><Icon name="add" size={32} color={COLORS.primary} /></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.background },
  sliderContainer: { height: height * 0.65 },
  heroBackground: { width: width, height: height * 0.65 },
  heroGradient: { 
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(15, 41, 30, 0.4)', justifyContent: 'flex-end', paddingBottom: 60
  },
  header: {
    position: 'absolute', top: StatusBar.currentHeight || 40, left: 0, right: 0, zIndex: 100,
    paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerActions: { flexDirection: 'row' },
  circleIconBtn: { 
    width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', alignItems: 'center' 
  },
  heroContent: { paddingHorizontal: 24, paddingBottom: 60 },
  heroBadge: { 
    backgroundColor: COLORS.accent, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 16
  },
  heroBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  heroTitle: { color: 'white', fontSize: 40, fontWeight: '900', lineHeight: 46 },
  heroSub: { color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 12, fontWeight: '500', width: '85%' },
  heroBtn: { backgroundColor: 'white', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 20, alignSelf: 'flex-start', marginTop: 24 },
  heroBtnText: { color: COLORS.primary, fontWeight: '800', fontSize: 16 },
  pagination: { position: 'absolute', top: (StatusBar.currentHeight || 40) + 70, right: 24, flexDirection: 'row' },
  dot: { height: 8, borderRadius: 4, marginRight: 6 },
  activeDot: { width: 24, backgroundColor: COLORS.accent },
  inactiveDot: { width: 8, backgroundColor: 'rgba(255,255,255,0.5)' },
  contentSection: { marginTop: -30, backgroundColor: COLORS.background, borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingTop: 30, paddingBottom: 100 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 20 },
  sectionTitle: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
  seeAll: { fontSize: 14, color: COLORS.secondary, fontWeight: '700' },
  catList: { paddingLeft: 24, marginBottom: 30 },
  catCard: { 
    backgroundColor: 'white', 
    paddingVertical: 12, 
    paddingHorizontal: 8, 
    borderRadius: 20, 
    marginRight: 10, 
    alignItems: 'center', 
    width: 75,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  catIconBox: { 
    width: 42, 
    height: 42, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  catLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  animalGrid: { paddingHorizontal: 24 },
  modernCard: { height: 320, borderRadius: 40, backgroundColor: 'white', marginBottom: 24, overflow: 'hidden', elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.15, shadowRadius: 20 },
  cardImg: { width: '100%', height: '100%', position: 'absolute' },
  typeTag: { position: 'absolute', top: 24, right: 24, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14 },
  typeTagText: { color: 'white', fontSize: 10, fontWeight: '900' },
  glassContent: { position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: COLORS.glass, borderRadius: 32, padding: 20, elevation: 5 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardBreed: { fontSize: 12, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  cardName: { fontSize: 22, fontWeight: '900', color: COLORS.primary },
  pricePill: { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14 },
  pricePillText: { color: 'white', fontWeight: '900', fontSize: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  footerItem: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginLeft: 8, fontSize: 13, color: COLORS.secondary, fontWeight: '700' },
  cardActionBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  fabContainer: { position: 'absolute', bottom: 30, right: 24 },
  fabCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center', elevation: 20, shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 15 }
});

export default HERD_APP;