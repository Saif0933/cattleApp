import React from 'react';
import {
  Dimensions,
  ImageBackground,
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

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#10B981',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  gold: '#FFB800',
};

const StoreScreen = ({ navigation }: any) => {
  const stores = [
    { name: 'Dogs', icon: 'pets', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600', count: 24 },
    { name: 'Birds', icon: 'flutter-dash', image: 'https://images.unsplash.com/photo-1522926193341-e9fed195d9cb?auto=format&fit=crop&q=80&w=600', count: 142 },
    { name: 'Fish', icon: 'set-meal', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600', count: 85 },
    { name: 'Goats', icon: 'agriculture', image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=600', count: 32 },
    { name: 'Cats', icon: 'auto-awesome', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600', count: 18 },
    { name: 'Small Animals', icon: 'cruelty-free', image: 'https://images.unsplash.com/photo-1548767791-514684d06bb8?auto=format&fit=crop&q=80&w=600', count: 56 },
    { name: 'Horses', icon: 'bedroom-baby', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=600', count: 12 },
    { name: 'Hens', icon: 'egg', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600', count: 210 },
    { name: 'Care & Supplies', icon: 'shopping-cart', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600', count: 420 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSub}>ELITE TRADERS</Text>
          <Text style={styles.headerTitle}>Animal Stores</Text>
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Icon name="search" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {stores.map((store, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.storeCard}
              onPress={() => navigation.navigate('StoreStock', { category: store.name })}
            >
              <ImageBackground 
                source={{ uri: store.image }} 
                style={styles.cardImage}
                imageStyle={{ borderRadius: 25 }}
              >
                <View style={styles.cardOverlay}>
                  <View style={styles.badge}>
                    <Icon name={store.icon} size={14} color="white" />
                    <Text style={styles.badgeText}>{store.count} AVAILABLE</Text>
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <View style={styles.visitRow}>
                      <Text style={styles.visitText}>Visit Store</Text>
                      <Icon name="arrow-forward" size={14} color="white" />
                    </View>
                  </View>
                </View>
              </ImageBackground>
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
    height: 80, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerSub: { fontSize: 10, fontWeight: '900', color: COLORS.accent, letterSpacing: 1.5 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, marginTop: 2 },
  backBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  searchBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { padding: 15, paddingBottom: 50 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  
  storeCard: { 
    width: (width - 45) / 2, 
    height: 240, 
    marginBottom: 15,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15
  },
  cardImage: { flex: 1 },
  cardOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.25)', 
    borderRadius: 25, 
    padding: 15,
    justifyContent: 'space-between'
  },
  badge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(16, 185, 129, 0.9)', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 10 
  },
  badgeText: { color: 'white', fontSize: 8, fontWeight: '900', marginLeft: 5, letterSpacing: 0.5 },
  
  cardFooter: { },
  storeName: { color: 'white', fontSize: 20, fontWeight: '900', fontFamily: FONT_SERIF },
  visitRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  visitText: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '700', marginRight: 5 }
});

export default StoreScreen;
