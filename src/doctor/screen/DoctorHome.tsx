import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  medical: '#0EA5E9',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.9)',
  emerald: '#10B981',
  crimson: '#EF4444',
  border: 'rgba(0,0,0,0.05)',
};

const DoctorHome = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = React.useState('All');
  const categories = ['All', 'Cattle', 'Pets', 'Birds', 'Surgery', 'Nutrition'];

  const doctors = [
    {
      id: "doc-1",
      userId: "user-doc-1",
      name: "Dr. Sarah Miller",
      specialization: "Senior Livestock Expert",
      experienceYears: 12,
      consultationFee: 45.00,
      isVerified: true,
      rating: 4.9,
      reviewCount: 1200,
      bio: "Experienced in diagnosing and treating large livestock animals.",
      clinicName: "Sarah Cattle Clinic",
      clinicAddress: "Karnal, Haryana",
      image: "https://images.unsplash.com/photo-1559839734-2b71f153ec7a?auto=format&fit=crop&q=80&w=400",
      status: "Available Now",

      // legacy compat
      category: "Cattle",
      specialty: "Senior Livestock Expert",
      exp: "12 Yrs Exp",
      price: "45",
      badge: "VERIFIED",
      color: COLORS.emerald
    },
    {
      id: "doc-2",
      userId: "user-doc-2",
      name: "Dr. James Wilson",
      specialization: "Exotic Bird Specialist",
      experienceYears: 8,
      consultationFee: 60.00,
      isVerified: true,
      rating: 4.8,
      reviewCount: 850,
      bio: "Expert care for exotic birds, poultry, and avian surgical cases.",
      clinicName: "Avian Health Center",
      clinicAddress: "Chandigarh, Punjab",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      status: "In Consultation",

      // legacy compat
      category: "Birds",
      specialty: "Exotic Bird Specialist",
      exp: "8 Yrs Exp",
      price: "60",
      badge: "ELITE VET",
      color: COLORS.accent
    },
    {
      id: "doc-3",
      userId: "user-doc-3",
      name: "Dr. Elena Rodriguez",
      specialization: "Orthopedic Surgeon",
      experienceYears: 15,
      consultationFee: 120.00,
      isVerified: true,
      rating: 5.0,
      reviewCount: 2450,
      bio: "Board-certified animal orthopedic surgeon specializing in joint replacement.",
      clinicName: "Elite Vet Surgery Clinic",
      clinicAddress: "New Delhi",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
      status: "In Surgery",

      // legacy compat
      category: "Surgery",
      specialty: "Orthopedic Surgeon",
      exp: "15 Yrs Exp",
      price: "120",
      badge: "SURGEON",
      color: COLORS.crimson
    },
    {
      id: "doc-4",
      userId: "user-doc-4",
      name: "Dr. Michael Chen",
      specialization: "Animal Dietitian",
      experienceYears: 10,
      consultationFee: 40.00,
      isVerified: false,
      rating: 4.7,
      reviewCount: 380,
      bio: "Providing customized nutrition and diet charts for livestock and household pets.",
      clinicName: "Chen Nutrition Hub",
      clinicAddress: "Ludhiana, Punjab",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      status: "Available Now",

      // legacy compat
      category: "Nutrition",
      specialty: "Animal Dietitian",
      exp: "10 Yrs Exp",
      price: "40",
      badge: "NUTRITION",
      color: COLORS.medical
    },
    {
      id: "doc-5",
      userId: "user-doc-5",
      name: "Dr. Sofia Khan",
      specialization: "Small Animal GP",
      experienceYears: 6,
      consultationFee: 35.00,
      isVerified: true,
      rating: 4.9,
      reviewCount: 520,
      bio: "Comprehensive pet clinic for vaccines, general checkups, and pet microchipping.",
      clinicName: "Sofia Pet Wellness Center",
      clinicAddress: "Gurugram, Haryana",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
      status: "Available Now",

      // legacy compat
      category: "Pets",
      specialty: "Small Animal GP",
      exp: "6 Yrs Exp",
      price: "35",
      badge: "VERIFIED",
      color: COLORS.emerald
    }
  ];

  const filteredDoctors = React.useMemo(() => {
    if (activeTab === 'All') return doctors;
    return doctors.filter(doc => doc.category === activeTab || doc.specialization === activeTab);
  }, [activeTab]);

  const QuickAction = ({ icon, label, color }: any) => (
    <TouchableOpacity style={styles.actionBox}>
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <Icon name={icon} size={26} color={color} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>VET <Text style={{color: COLORS.medical}}>CARE</Text></Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Icon name="history" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={22} color={COLORS.secondary} />
            <TextInput 
              placeholder="Search doctor, specialty..." 
              placeholderTextColor={COLORS.secondary + '70'}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Icon name="tune" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionGrid}>
          <QuickAction icon="video-call" label="Consult" color={COLORS.medical} />
          <QuickAction icon="event-note" label="Schedule" color={COLORS.accent} />
          <QuickAction icon="local-hospital" label="Emergency" color={COLORS.crimson} />
          <QuickAction icon="medication" label="Pharmacy" color={COLORS.emerald} />
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.catScroll}
          contentContainerStyle={{ paddingLeft: 24, paddingRight: 40 }}
        >
          {categories.map((cat, idx) => (
            <TouchableOpacity 
              key={idx} 
              onPress={() => setActiveTab(cat)}
              style={[styles.catPill, activeTab === cat && styles.activeCatPill]}
            >
              <Text style={[styles.catText, activeTab === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Doctor List */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Specialists</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Nearby</Text></TouchableOpacity>
          </View>

          {filteredDoctors.map((doc, idx) => (
            <TouchableOpacity key={idx} style={styles.docCard}>
              <View style={styles.docImgContainer}>
                <Image source={{ uri: doc.image }} style={styles.docImg} />
                <View style={[styles.statusBadge, { backgroundColor: doc.status === 'Available Now' ? COLORS.emerald : COLORS.secondary }]}>
                  <Text style={styles.statusText}>{doc.status}</Text>
                </View>
              </View>
              
              <View style={styles.docInfo}>
                <View style={styles.docHeader}>
                  <View style={[styles.proBadge, { borderColor: doc.color + '40' }]}>
                    <Text style={[styles.proText, { color: doc.color }]}>{doc.badge}</Text>
                  </View>
                  <View style={styles.ratingBox}>
                    <Icon name="star" size={14} color={COLORS.accent} />
                    <Text style={styles.ratingText}>{doc.rating}</Text>
                  </View>
                </View>
                
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docSpec}>{doc.specialty}</Text>
                
                <View style={styles.docFooter}>
                  <View style={styles.expBox}>
                    <Icon name="verified" size={14} color={COLORS.medical} />
                    <Text style={styles.expText}>{doc.exp}</Text>
                  </View>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceLabel}>Fee:</Text>
                    <Text style={styles.priceVal}>${doc.price}</Text>
                  </View>
                </View>

                <TouchableOpacity style={[styles.bookBtn, { backgroundColor: COLORS.primary }]}>
                  <Text style={styles.bookText}>BOOK CONSULTATION</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    paddingHorizontal: 24, paddingVertical: 20, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
  },
  headerSub: { fontSize: 14, fontWeight: '600', color: COLORS.secondary, letterSpacing: 1, fontFamily: FONT_SERIF },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5, marginTop: 15, fontFamily: FONT_SERIF },
  profileBtn: { 
    width: 40, height: 40, borderRadius: 16, backgroundColor: 'white', 
    justifyContent: 'center', alignItems: 'center', elevation: 4, marginTop: 10, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
  },
  searchContainer: { 
    flexDirection: 'row', paddingHorizontal: 24, marginBottom: 25, gap: 12 
  },
  searchBox: { 
    flex: 1, height: 56, backgroundColor: 'white', borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '600', color: COLORS.primary, fontFamily: FONT_SERIF },
  filterBtn: { 
    width: 56, height: 56, borderRadius: 18, backgroundColor: COLORS.primary, 
    justifyContent: 'center', alignItems: 'center', elevation: 6
  },
  actionGrid: { 
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 30 
  },
  actionBox: { alignItems: 'center' },
  iconCircle: { 
    width: 68, height: 68, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 8 
  },
  actionLabel: { fontSize: 12, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SERIF },
  catScroll: { marginBottom: 25 },
  catPill: { 
    paddingHorizontal: 22, paddingVertical: 12, borderRadius: 16, 
    backgroundColor: 'white', marginRight: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.03)',
    elevation: 2 
  },
  activeCatPill: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { fontSize: 13, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SERIF },
  activeCatText: { color: 'white', fontFamily: FONT_SERIF },
  doctorSection: { paddingHorizontal: 24 },
  sectionHeader: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 
  },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  seeAll: { fontSize: 14, fontWeight: '700', color: COLORS.medical, fontFamily: FONT_SERIF },
  docCard: { 
    backgroundColor: 'white', borderRadius: 32, padding: 15, marginBottom: 20, 
    flexDirection: 'row', elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15 
  },
  docImgContainer: { position: 'relative' },
  docImg: { width: 110, height: 140, borderRadius: 24 },
  statusBadge: { 
    position: 'absolute', bottom: -10, alignSelf: 'center', 
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, elevation: 5 
  },
  statusText: { color: 'white', fontSize: 8, fontWeight: '900', fontFamily: FONT_SERIF },
  docInfo: { flex: 1, marginLeft: 18 },
  docHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  proBadge: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  proText: { fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  ratingText: { marginLeft: 4, fontSize: 10, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  docName: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  docSpec: { fontSize: 12, fontWeight: '600', color: COLORS.secondary, marginTop: 2, fontFamily: FONT_SERIF },
  docFooter: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.background 
  },
  expBox: { flexDirection: 'row', alignItems: 'center' },
  expText: { marginLeft: 4, fontSize: 11, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SERIF },
  priceTag: { flexDirection: 'row', alignItems: 'center' },
  priceLabel: { fontSize: 11, color: COLORS.secondary, fontWeight: '600', fontFamily: FONT_SERIF },
  priceVal: { fontSize: 16, fontWeight: '900', color: COLORS.primary, marginLeft: 4, fontFamily: FONT_SERIF },
  bookBtn: { 
    marginTop: 15, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' 
  },
  bookText: { color: 'white', fontSize: 11, fontWeight: '900', letterSpacing: 1, fontFamily: FONT_SERIF }
});

export default DoctorHome;
