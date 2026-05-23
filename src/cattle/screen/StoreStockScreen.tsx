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
  sky: '#0EA5E9',
};

const StoreStockScreen = ({ route, navigation }: any) => {
  const { category = 'Dogs' } = route.params || {};

  const stockData: any = {
    'Dogs': [
      { id: 1, title: 'German Shepherd Puppy', price: '450', info: 'Vaccinated | 3 Months | Male', desc: 'High-pedigree German Shepherd pup with excellent health records and guard-dog potential.', image: 'https://images.unsplash.com/photo-1589944172368-c241f3facc28?auto=format&fit=crop&q=80&w=600' },
      { id: 2, title: 'Golden Retriever', price: '580', info: 'Show Quality | 4 Months', desc: 'Friendly and energetic retriever, perfect for families. Fully dewormed.', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600' },
    ],
    'Birds': [
      { id: 3, title: 'Blue Macaw Parrot', price: '1,200', info: 'Trained | DNA Tested', desc: 'Beautiful hand-reared Blue Macaw. Very friendly and started talking.', image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=600' },
      { id: 4, title: 'Premium Love Birds', price: '120', info: 'Breeding Pair | Vibrant', desc: 'Active breeding pair of Peach-faced Lovebirds in prime health.', image: 'https://images.unsplash.com/photo-1544965850-6f8a6678bb42?auto=format&fit=crop&q=80&w=600' },
    ],
    'Fish': [
      { id: 10, title: 'Halfmoon Betta', price: '25.00', info: 'Premium Grade | Vibrant Red', desc: 'Stunning Siamese Fighting Fish with a 180-degree tail spread. Perfect for nano tanks.', image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=600' },
      { id: 11, title: 'Red Cap Oranda', price: '45.00', info: 'Show Quality | 4 Inch', desc: 'Elegant goldfish with a prominent red hood. Active and healthy for indoor aquariums.', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600' },
      { id: 12, title: 'Platinum Angel Fish', price: '35.00', info: 'Long Fin | Breeding Pair', desc: 'Majestic silver-white angels. They add a touch of class to any community tank.', image: 'https://images.unsplash.com/photo-1544551763-47a0159f9234?auto=format&fit=crop&q=80&w=600' },
      { id: 13, title: 'Neon Tetra School', price: '18.00', info: 'Pack of 10 | Electric Blue', desc: 'A shimmering school of 10 Neon Tetras. Great for adding movement and color.', image: 'https://images.unsplash.com/photo-1534073737927-85f1df9605d2?auto=format&fit=crop&q=80&w=600' },
      { id: 14, title: 'Butterfly Koi', price: '150.00', info: 'Pond Ready | 8 Inch', desc: 'Graceful Koi with long, flowing fins. Ideal for large garden ponds and water features.', image: 'https://images.unsplash.com/photo-1512411311534-118847053556?auto=format&fit=crop&q=80&w=600' },
      { id: 15, title: 'Fancy Guppy Pair', price: '15.00', info: 'Cobra Strain | Active', desc: 'Beautifully colored breeding pair of Fancy Guppies. Easy to care for and very prolific.', image: 'https://images.unsplash.com/photo-1535591273668-578f31182c4f?auto=format&fit=crop&q=80&w=600' },
    ],
    'Horses': [
      { id: 5, title: 'Arabian Thoroughbred', price: '12,500', info: 'Show Grade | 4 Years', desc: 'Elegant Arabian stallion with majestic gait and stamina. Competition ready.', image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=600' },
    ],
    'Care & Supplies': [
      { id: 6, title: 'Elite Kibble Mix', price: '45.00', info: 'High Protein | 10kg', desc: 'Balanced nutrition for active dogs and livestock. Fortified with essential vitamins.', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600' },
      { id: 7, title: 'Organic Grooming Soap', price: '12.50', info: 'Anti-Tick | Neem Oil', desc: 'Sulphate-free soap for a shiny coat and skin protection. Safe for all animals.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
      { id: 8, title: 'Winter Fleece Coat', price: '28.00', info: 'Weatherproof | Medium', desc: 'Keep your pets warm during winters with this insulated, stylish fleece jacket.', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600' },
      { id: 9, title: 'Elite Wooden Kennel', price: '185.00', info: 'Spacious | Weatherproof', desc: 'Durable, high-quality wooden shelter for outdoor and indoor use. Easy to clean.', image: 'https://images.unsplash.com/photo-1541175070483-b9979d3996c6?auto=format&fit=crop&q=80&w=600' },
    ],
    'Small Animals': [
      { id: 20, title: 'Dumbo Rat (Double Rex)', price: '25.00', info: 'Hand Tamed | 2 Months | Female', desc: 'Highly intelligent and extremely social Dumbo Rat with soft curly Rex fur. Friendly, dewormed, and fully acclimated to handling.', image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=600' },
      { id: 21, title: 'Fancy Rat (Agouti Husky)', price: '18.00', info: 'Active | 3 Months | Male', desc: 'Sleek Agouti Husky pattern Fancy Rat. Playful, alert, and very active. Raised on premium rodent grains and organic greens.', image: 'https://images.unsplash.com/photo-1548767791-514684d06bb8?auto=format&fit=crop&q=80&w=600' },
    ],
    // Fallback data for other categories
  };

  const currentStock = stockData[category] || [
    { id: 99, title: `Elite ${category} Specimen`, price: 'Varies', info: 'Premium Stock | Verified', desc: 'Top-tier specimen available for elite collectors and breeders.', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=600' }
  ];

  const StockCard = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: { ...item, brand: category } })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <Text style={styles.itemInfo}>{item.info}</Text>
        <Text style={styles.itemDesc} numberOfLines={3}>{item.desc}</Text>
        <TouchableOpacity 
          style={styles.buyBtn}
          onPress={() => navigation.navigate('OrderSummary', { product: { ...item, brand: category } })}
        >
          <Text style={styles.buyBtnText}>INSPECT & BUY</Text>
          <Icon name="chevron-right" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSub}>{category.toUpperCase()} STORE</Text>
          <Text style={styles.headerTitle}>Live Stock</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{currentStock.length} ITEMS</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {currentStock.map((item: any) => (
          <StockCard key={item.id} item={item} />
        ))}
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
    // elevation: 2,
    // shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5
  },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerSub: { fontSize: 10, fontWeight: '900', color: COLORS.accent, letterSpacing: 1.5 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, marginTop: 2 },
  backBtn: { width: 44, height: 44, borderRadius: 15, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  
  countBadge: { backgroundColor: COLORS.primary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  countText: { color: 'white', fontSize: 10, fontWeight: '900', fontFamily: FONT_SANS },

  scrollContent: { padding: 20, paddingBottom: 50 },

  card: { 
    backgroundColor: 'white', 
    borderRadius: 30, 
    marginBottom: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 15
  },
  cardImage: { width: '100%', height: 220 },
  cardContent: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, flex: 1 },
  itemPrice: { fontSize: 20, fontWeight: '900', color: COLORS.accent, fontFamily: FONT_SANS },
  itemInfo: { fontSize: 12, fontWeight: '700', color: COLORS.sky, marginTop: 5, letterSpacing: 0.5 },
  itemDesc: { fontSize: 13, color: COLORS.secondary, marginTop: 10, lineHeight: 20, fontWeight: '500' },

  buyBtn: { 
    backgroundColor: COLORS.primary, 
    marginTop: 20, 
    height: 52, 
    borderRadius: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 5,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 8
  },
  buyBtnText: { color: 'white', fontSize: 13, fontWeight: '900', marginRight: 8, letterSpacing: 1 }
});

export default StoreStockScreen;
