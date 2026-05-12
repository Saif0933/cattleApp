import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
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
  primary: '#2D4B37',
  secondary: '#8C7A6B',
  accent: '#E98961',
  background: '#FDFCFB',
  surface: '#FFFFFF',
  cardBg: '#F8F9FA',
  textMain: '#1A1C1E',
  textSub: '#6C757D',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
};

interface AnimalCardProps {
  name: string;
  breed: string;
  age: string;
  status: 'Healthy' | 'Observation' | 'Critical';
  image: string;
}

const HerdScreen = () => {
  const categories = [
    { name: 'Cattle', icon: 'pets' },
    { name: 'Goats', icon: 'agriculture' },
    { name: 'Cats', icon: 'pets' },
    { name: 'Rabbits', icon: 'cruelty-free' },
    { name: 'Parrots', icon: 'flutter-dash' },
  ];

  const animals = [
    {
      name: 'Oliver',
      breed: 'Persian Cat',
      age: '2 Years',
      status: 'Healthy' as const,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Billy',
      breed: 'Boer Goat',
      age: '1.5 Years',
      status: 'Observation' as const,
      image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Snowball',
      breed: 'Holland Lop',
      age: '8 Months',
      status: 'Healthy' as const,
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Rio',
      breed: 'Scarlet Macaw',
      age: '5 Years',
      status: 'Healthy' as const,
      image: 'https://images.unsplash.com/photo-1484557918186-7b4e561c9948?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Titan',
      breed: 'Black Angus',
      age: '3 Years',
      status: 'Healthy' as const,
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400',
    }
  ];

  const AnimalCard = ({ name, breed, age, status, image }: AnimalCardProps) => (
    <TouchableOpacity style={styles.animalCard}>
      <Image source={{ uri: image }} style={styles.animalImage} />
      <View style={styles.cardOverlay}>
        <View style={[styles.statusTag, { backgroundColor: status === 'Healthy' ? COLORS.success : status === 'Observation' ? COLORS.warning : COLORS.accent }]}>
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.animalName}>{name}</Text>
        <Text style={styles.animalBreed}>{breed}</Text>
        <View style={styles.ageRow}>
          <Icon name="access-time" size={14} color={COLORS.textSub} />
          <Text style={styles.animalAge}>{age}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Manage Your</Text>
          <Text style={styles.headerTitle}>Livestock & Pets</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Icon name="notifications-none" size={24} color={COLORS.textMain} />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat, idx) => (
            <TouchableOpacity key={idx} style={[styles.categoryChip, idx === 0 && styles.activeChip]}>
              <Icon name={cat.icon} size={20} color={idx === 0 ? 'white' : COLORS.secondary} />
              <Text style={[styles.categoryText, idx === 0 && styles.activeTabText]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={COLORS.textSub} />
          <Text style={styles.searchPlaceholder}>Search your animals...</Text>
        </View>

        {/* Animals Grid */}
        <View style={styles.grid}>
          {animals.map((animal, idx) => (
            <AnimalCard key={idx} {...animal} />
          ))}
        </View>

        {/* Add New Section */}
        <TouchableOpacity style={styles.addSection}>
          <View style={styles.addIconCircle}>
            <Icon name="add" size={30} color="white" />
          </View>
          <View style={styles.addTextContent}>
            <Text style={styles.addTitle}>Add New Animal</Text>
            <Text style={styles.addSub}>Register a new pet or livestock</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { fontSize: 16, color: COLORS.textSub, fontWeight: '500', fontFamily: FONT_SERIF },
  headerTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textMain, marginTop: 4, fontFamily: FONT_SERIF },
  profileBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  scrollPadding: { paddingBottom: 100 },
  categoryScroll: { paddingLeft: 20, marginBottom: 25 },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryText: { marginLeft: 8, fontWeight: '600', color: COLORS.secondary, fontSize: 14, fontFamily: FONT_SERIF },
  activeTabText: { color: 'white', fontFamily: FONT_SERIF },
  searchContainer: {
    marginHorizontal: 20,
    backgroundColor: '#F1F3F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 25,
  },
  searchPlaceholder: { marginLeft: 10, color: COLORS.textSub, fontSize: 14, fontFamily: FONT_SERIF },
  grid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  animalCard: {
    width: (width - 55) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  animalImage: { width: '100%', height: 150, backgroundColor: '#EEE' },
  cardOverlay: { position: 'absolute', top: 10, left: 10 },
  statusTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: 'white', fontSize: 8, fontWeight: '800', fontFamily: FONT_SERIF },
  cardInfo: { padding: 12 },
  animalName: { fontSize: 16, fontWeight: '700', color: COLORS.textMain, fontFamily: FONT_SERIF },
  animalBreed: { fontSize: 12, color: COLORS.textSub, marginTop: 2, fontFamily: FONT_SERIF },
  ageRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  animalAge: { marginLeft: 4, fontSize: 11, color: COLORS.textSub, fontWeight: '500', fontFamily: FONT_SERIF },
  addSection: {
    marginHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTextContent: { marginLeft: 15 },
  addTitle: { color: 'white', fontSize: 18, fontWeight: '700', fontFamily: FONT_SERIF },
  addSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2, fontFamily: FONT_SERIF },
});

export default HerdScreen;