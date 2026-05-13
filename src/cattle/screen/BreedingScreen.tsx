import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  emerald: '#10B981',
};

const BreedingScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Cattle', 'Dogs', 'Horses'];

  const breeders = [
    {
      name: "Thunder",
      breed: "Pure Arabian Horse",
      owner: "Elite Stables",
      fee: "1,500",
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400",
      verified: true,
      category: "Horses"
    },
    {
      name: "Rex",
      breed: "German Shepherd",
      owner: "Apex K9",
      fee: "500",
      image: "https://images.unsplash.com/photo-1589944173175-400144838d05?auto=format&fit=crop&q=80&w=400",
      verified: true,
      category: "Dogs"
    }
  ];

  const handleConnect = (name: string, owner: string) => {
    Alert.alert(
      "Connect with Breeder",
      `Would you like to connect with ${owner} for breeding service with ${name}?\n\nPlatform Service Fee applies.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Connect", onPress: () => Alert.alert("Success", "Request Sent! Breeder will contact you shortly.") }
      ]
    );
  };

  const BreedingCard = ({ name, breed, owner, fee, image, verified }: any) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: image }} style={styles.cardImg} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.animalName}>{name}</Text>
          {verified && <Icon name="verified" size={18} color={COLORS.accent} />}
        </View>
        <Text style={styles.breedText}>{breed}</Text>
        <View style={styles.divider} />
        <View style={styles.footer}>
          <View>
            <Text style={styles.ownerLabel}>BREEDER</Text>
            <Text style={styles.ownerName}>{owner}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.feeLabel}>SERVICE FEE</Text>
            <Text style={styles.feeValue}>${fee}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.connectBtn} onPress={() => handleConnect(name, owner)}>
          <Text style={styles.connectBtnText}>CONNECT FOR BREEDING</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pet Breeding Service</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {tabs.map((t, i) => (
            <TouchableOpacity 
              key={i} 
              onPress={() => setActiveTab(t)}
              style={[styles.tabPill, activeTab === t && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === t && styles.activeTabText]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>Premium Breeder Listing</Text>
          <Text style={styles.infoSub}>List your elite animals for breeding. Listing fees & commissions apply.</Text>
        </View>

        <View style={styles.grid}>
          {breeders.filter(b => activeTab === 'All' || b.category === activeTab).map((b, i) => (
            <BreedingCard key={i} {...b} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  tabSection: { paddingVertical: 15, backgroundColor: 'white' },
  tabPill: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 12, marginRight: 10, backgroundColor: '#F1F5F3' },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 13, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SERIF },
  activeTabText: { color: 'white' },
  infoBanner: { backgroundColor: COLORS.emerald, padding: 20, borderRadius: 20, marginBottom: 25 },
  infoTitle: { color: 'white', fontSize: 18, fontWeight: '900', fontFamily: FONT_SERIF },
  infoSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 5 },
  grid: { gap: 20 },
  card: { backgroundColor: 'white', borderRadius: 25, overflow: 'hidden', elevation: 3 },
  cardImg: { width: '100%', height: 200 },
  content: { padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  animalName: { fontSize: 22, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  breedText: { fontSize: 14, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#F1F5F3', marginVertical: 15 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  ownerLabel: { fontSize: 9, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  ownerName: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginTop: 2 },
  feeLabel: { fontSize: 9, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  feeValue: { fontSize: 18, fontWeight: '900', color: COLORS.primary, marginTop: 2 },
  connectBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, alignItems: 'center' },
  connectBtnText: { color: 'white', fontWeight: '900', fontSize: 12, letterSpacing: 1 }
});

export default BreedingScreen;
