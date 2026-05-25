import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const AnimalDetailsScreen = ({ route, navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const { product } = route.params || {};

  const name = product?.name || 'Gauri';
  const id = product?.id || 'C001';
  const breed = product?.breed || 'HF Cross';
  const age = product?.age || '3 Years';
  const gender = product?.gender || 'Female';
  const image = product?.image || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600';

  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Health', 'Breeding', 'Activity'];

  const overviewDetails = [
    { label: 'Breed', value: breed },
    { label: 'Date of Birth', value: '10 Mar 2021' },
    { label: 'Weight', value: '450 kg' },
    { label: 'Milk Yield', value: '12 L/day' },
    { label: 'Owner', value: 'Rashi Farm' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerSubtitle}>Cow • {age}</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <Icon name="ios-share" size={22} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cow Image with absolute cover */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cowImage} resizeMode="cover" />
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabBar}>
          {tabs.map((tab, idx) => (
            <TouchableOpacity 
              key={idx}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <View style={styles.grid}>
            {overviewDetails.map((detail, idx) => (
              <View key={idx} style={styles.gridCell}>
                <Text style={styles.cellLabel}>{detail.label}</Text>
                <Text style={styles.cellValue}>{detail.value}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Health' && (
          <View style={styles.tabPlaceholder}>
            <Text style={styles.placeholderText}>Recent vaccine: FMD Vaccine (Administered May 25, 2024)</Text>
          </View>
        )}

        {activeTab === 'Breeding' && (
          <View style={styles.tabPlaceholder}>
            <Text style={styles.placeholderText}>AI Schedule: May 25, 2024. Status: Confirmed.</Text>
          </View>
        )}

        {activeTab === 'Activity' && (
          <View style={styles.tabPlaceholder}>
            <Text style={styles.placeholderText}>Activity level: Normal. No alerts.</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons matching style */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
          <Text style={styles.editBtnText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.recordBtn} 
          onPress={() => navigation.navigate('HealthRecord', { animalName: name, breed: breed })}
          activeOpacity={0.85}
        >
          <Icon name="healing" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.recordBtnText}>Health Record</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF'
  },
  backBtn: { 
    width: 44, height: 44, borderRadius: 15, 
    justifyContent: 'center', alignItems: 'flex-start'
  },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  headerSubtitle: { fontSize: 12, color: COLORS.secondary, fontFamily: FONT_SANS, marginTop: 2 },
  shareBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 110 },
  
  imageContainer: { 
    height: 220, borderRadius: 24, overflow: 'hidden', 
    marginBottom: 20,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8
  },
  cowImage: { width: '100%', height: '100%' },

  tabBar: { 
    flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: '#E5E7EB', 
    paddingBottom: 8, marginBottom: 20, justifyContent: 'space-between'
  },
  tabBtn: { paddingVertical: 8, paddingHorizontal: 4 },
  tabBtnActive: { borderBottomWidth: 3, borderBottomColor: '#16A34A' },
  tabText: { fontSize: 14, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SANS },
  tabTextActive: { color: '#16A34A', fontWeight: '900' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15 },
  gridCell: { 
    width: (width - 63) / 2, backgroundColor: '#FFFFFF', 
    borderRadius: 20, padding: 16, borderWidth: 1.5, borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  cellLabel: { fontSize: 12, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  cellValue: { fontSize: 15, fontWeight: '900', color: COLORS.darkGreen, marginTop: 6, fontFamily: FONT_SERIF },

  tabPlaceholder: { 
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 25, 
    justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border
  },
  placeholderText: { fontSize: 13, color: COLORS.secondary, lineHeight: 20, textAlign: 'center', fontFamily: FONT_SANS },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 24, backgroundColor: '#FFFFFF', flexDirection: 'row', gap: 12
  },
  editBtn: { 
    flex: 1, height: 56, backgroundColor: '#FFFFFF', borderRadius: 28, 
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#16A34A'
  },
  editBtnText: { fontSize: 15, fontWeight: '900', color: '#16A34A', fontFamily: FONT_SANS },
  recordBtn: { 
    flex: 2.2, height: 56, backgroundColor: '#16A34A', borderRadius: 28, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 3, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8
  },
  recordBtnText: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS }
});

export default AnimalDetailsScreen;