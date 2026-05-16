import React from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const SubscriptionScreen = ({ navigation }: any) => {
  const plans = [
    {
      name: "Free Tier",
      price: "0",
      period: "/ month",
      features: ["1 Active Listing", "Standard Visibility", "Community Support"],
      color: '#64748B',
      btn: "Current Plan"
    },
    {
      name: "Elite Silver",
      price: "19",
      period: "/ month",
      features: ["5 Active Listings", "Silver Badge", "Email Support", "24h Listing Approval"],
      color: '#94A3B8',
      btn: "Go Silver",
      popular: false
    },
    {
      name: "Elite Gold",
      price: "49",
      period: "/ month",
      features: ["Unlimited Listings", "Gold Badge", "Priority Support", "1 Featured Listing/mo"],
      color: COLORS.accent,
      btn: "Go Gold",
      popular: true
    }
  ];

  const PlanCard = ({ name, price, period, features, color, btn, popular }: any) => (
    <View style={[styles.planCard, popular && styles.popularCard]}>
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}
      <View style={[styles.colorBar, { backgroundColor: color }]} />
      <Text style={styles.planName}>{name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.currency}>$</Text>
        <Text style={styles.priceValue}>{price}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>
      <View style={styles.featureList}>
        {features.map((f: string, i: number) => (
          <View key={i} style={styles.featureItem}>
            <Icon name="check-circle" size={18} color={COLORS.emerald} />
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity 
        style={[styles.planBtn, { backgroundColor: color }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.planBtnText}>{btn}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Elite Memberships</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.mainTitle}>Choose Your Plan</Text>
        <Text style={styles.mainSub}>Grow your business with premium visibility and unlimited listings.</Text>
        
        <View style={styles.plansContainer}>
          {plans.map((p, i) => <PlanCard key={i} {...p} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  mainTitle: { fontSize: 28, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, textAlign: 'center', marginTop: 10 },
  mainSub: { fontSize: 14, color: COLORS.secondary, textAlign: 'center', marginTop: 10, paddingHorizontal: 20 },
  plansContainer: { marginTop: 30, gap: 25 },
  planCard: { backgroundColor: 'white', borderRadius: 30, padding: 25, elevation: 5, overflow: 'hidden' },
  popularCard: { borderWidth: 3, borderColor: COLORS.accent },
  popularBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: COLORS.accent, paddingHorizontal: 15, paddingVertical: 8, borderBottomLeftRadius: 20 },
  popularText: { color: 'white', fontSize: 10, fontWeight: '900' },
  colorBar: { width: 100, height: 6, borderRadius: 3, marginBottom: 20 },
  planName: { fontSize: 22, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
  currency: { fontSize: 20, fontWeight: '900', color: COLORS.primary },
  priceValue: { fontSize: 42, fontWeight: '900', color: COLORS.primary },
  period: { fontSize: 16, color: COLORS.secondary, fontWeight: '600' },
  featureList: { marginTop: 25, gap: 15 },
  featureItem: { flexDirection: 'row', alignItems: 'center' },
  featureText: { fontSize: 14, color: COLORS.secondary, marginLeft: 10, fontWeight: '600' },
  planBtn: { marginTop: 30, padding: 18, borderRadius: 20, alignItems: 'center' },
  planBtnText: { color: 'white', fontWeight: '900', fontSize: 16, letterSpacing: 1 }
});

export default SubscriptionScreen;
