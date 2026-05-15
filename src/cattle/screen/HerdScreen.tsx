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
    Platform
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
  crimson: '#EF4444',
};

const HerdScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('All');

  const animals = [
    {
      name: "Oliver",
      breed: "Persian Cat",
      lastVax: "Oct 12, 2025",
      nextVax: "Nov 15, 2025",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Billy",
      breed: "Boer Goat",
      lastVax: "Sep 05, 2025",
      nextVax: "Sep 30, 2025",
      status: "Overdue",
      image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400",
    }
  ];

  const CareCard = ({ name, breed, lastVax, nextVax, status, image }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: image }} style={styles.animalImg} />
        <View style={styles.animalInfo}>
          <Text style={styles.animalName}>{name}</Text>
          <Text style={styles.breedText}>{breed}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status === 'Overdue' ? COLORS.crimson : COLORS.emerald }]}>
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.careRow}>
        <View style={styles.careBox}>
          <Text style={styles.careLabel}>LAST VACCINATION</Text>
          <Text style={styles.careValue}>{lastVax}</Text>
        </View>
        <View style={styles.careBox}>
          <Text style={styles.careLabel}>NEXT DUE</Text>
          <Text style={[styles.careValue, status === 'Overdue' && { color: COLORS.crimson }]}>{nextVax}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.logBtn}
        onPress={() => navigation.navigate('HealthRecord', { animalName: name, breed: breed })}
      >
        <Icon name="history-edu" size={18} color="white" />
        <Text style={styles.logBtnText}>VIEW HEALTH RECORDS</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Healthcare Tracking</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddCattle')}>
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLab}>Total Animals</Text>
          </View>
          <View style={styles.vDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>02</Text>
            <Text style={[styles.statLab, { color: COLORS.crimson }]}>Care Alerts</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vaccination Status</Text>
          <TouchableOpacity><Text style={styles.seeAll}>Reminders On</Text></TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {animals.map((a, i) => <CareCard key={i} {...a} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  addBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  statsBanner: { backgroundColor: 'white', borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-around', elevation: 2, marginBottom: 25 },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
  statLab: { fontSize: 10, fontWeight: '700', color: COLORS.secondary, marginTop: 4, letterSpacing: 1 },
  vDivider: { width: 1, height: '60%', backgroundColor: '#F1F5F3', alignSelf: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  seeAll: { fontSize: 12, color: COLORS.emerald, fontWeight: '800' },
  grid: { gap: 20 },
  card: { backgroundColor: 'white', borderRadius: 25, padding: 20, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  animalImg: { width: 60, height: 60, borderRadius: 15 },
  animalInfo: { marginLeft: 15, flex: 1 },
  animalName: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  breedText: { fontSize: 12, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { color: 'white', fontSize: 9, fontWeight: '900' },
  careRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  careBox: { flex: 1 },
  careLabel: { fontSize: 8, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  careValue: { fontSize: 14, fontWeight: '800', color: COLORS.primary, marginTop: 4 },
  logBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  logBtnText: { color: 'white', fontWeight: '900', fontSize: 11, marginLeft: 8, letterSpacing: 1 }
});

export default HerdScreen;