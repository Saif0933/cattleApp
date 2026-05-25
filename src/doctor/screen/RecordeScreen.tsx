import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const RecordeScreen = () => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const [searchQuery, setSearchQuery] = useState('');

  const records = [
    {
      id: '1',
      patient: "Boer Goat #402",
      owner: "John Doe",
      date: "12 May 2026",
      diagnosis: "General Checkup & Vaccination",
      status: "Completed",
      color: COLORS.emerald,
      icon: 'pets'
    },
    {
      id: '2',
      patient: "Holstein Cow",
      owner: "Mike Ross",
      date: "10 May 2026",
      diagnosis: "Digestive Issues (Follow-up)",
      status: "Pending",
      color: COLORS.gold,
      icon: 'agriculture'
    },
    {
      id: '3',
      patient: "Persian Cat",
      owner: "Sarah Smith",
      date: "08 May 2026",
      diagnosis: "Minor Ear Infection",
      status: "Follow-up",
      color: COLORS.medical,
      icon: 'pets'
    },
    {
      id: '4',
      patient: "Macaw Parrot",
      owner: "Robert Wilson",
      date: "05 May 2026",
      diagnosis: "Feather Plucking Behavior",
      status: "Completed",
      color: COLORS.emerald,
      icon: 'flutter-dash'
    }
  ];

  const filteredRecords = records.filter(rec =>
    rec.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>MEDICAL <Text style={{color: COLORS.medical}}>RECORDS</Text></Text>
        </View>
        <TouchableOpacity style={styles.plusBtn} activeOpacity={0.8}>
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Icon name="search" size={20} color={COLORS.secondary} />
            <TextInput 
              placeholder="Search by patient or owner..." 
              placeholderTextColor={COLORS.secondary + '70'}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Record List */}
        <View style={styles.recordSection}>
          <Text style={styles.sectionTitle}>Recent Encounters</Text>
          
          {filteredRecords.map((item) => (
            <TouchableOpacity key={item.id} style={styles.recordCard} activeOpacity={0.9}>
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <Icon name={item.icon} size={28} color={item.color} />
              </View>
              
              <View style={styles.recordInfo}>
                <View style={styles.topRow}>
                  <Text style={styles.patientName}>{item.patient}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                
                <Text style={styles.ownerText}>Owner: {item.owner}</Text>
                <Text style={styles.diagnosisText} numberOfLines={1}>{item.diagnosis}</Text>
                
                <View style={styles.footerRow}>
                  <View style={[styles.statusBadge, { backgroundColor: item.color + '10' }]}>
                    <Text style={[styles.statusText, { color: item.color }]}>{item.status.toUpperCase()}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewBtn} activeOpacity={0.7}>
                    <Text style={styles.viewBtnText}>VIEW FILE</Text>
                    <Icon name="chevron-right" size={16} color={COLORS.medical} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Floating Action for Report Generation */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Icon name="file-download" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    paddingHorizontal: 24, paddingTop: 30, paddingBottom: 20, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.primary, letterSpacing: -0.5, fontFamily: FONT_SERIF },
  plusBtn: { 
    width: 42, height: 42, borderRadius: 12, backgroundColor: COLORS.medical, 
    justifyContent: 'center', alignItems: 'center', elevation: 6,
    shadowColor: COLORS.medical, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 6
  },
  searchContainer: { paddingHorizontal: 24, marginBottom: 25 },
  searchBox: { 
    height: 56, backgroundColor: COLORS.surface, borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: COLORS.isDark ? 0.2 : 0.05, shadowRadius: 5,
    borderWidth: 1, borderColor: COLORS.border
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 14, fontWeight: '600', color: COLORS.primary, fontFamily: FONT_SANS },
  recordSection: { paddingHorizontal: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, marginBottom: 20, fontFamily: FONT_SERIF },
  recordCard: { 
    backgroundColor: COLORS.surface, borderRadius: 28, padding: 18, marginBottom: 18, 
    flexDirection: 'row', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: COLORS.isDark ? 0.2 : 0.05, shadowRadius: 10,
    borderWidth: 1, borderColor: COLORS.border
  },
  iconBox: { width: 60, height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  recordInfo: { flex: 1, marginLeft: 15, paddingRight: 5 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  patientName: { fontSize: 17, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF, flex: 1, marginRight: 12 },
  dateText: { fontSize: 11, fontWeight: '700', color: COLORS.secondary, opacity: 0.6, fontFamily: FONT_SANS },
  ownerText: { fontSize: 12, fontWeight: '600', color: COLORS.secondary, marginTop: 2, fontFamily: FONT_SANS },
  diagnosisText: { fontSize: 13, fontWeight: '500', color: COLORS.primary, marginTop: 4, opacity: 0.8, fontFamily: FONT_SANS },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5, fontFamily: FONT_SANS },
  viewBtn: { flexDirection: 'row', alignItems: 'center' },
  viewBtnText: { fontSize: 11, fontWeight: '800', color: COLORS.medical, marginRight: 4, fontFamily: FONT_SANS },
  fab: { 
    position: 'absolute', bottom: 30, right: 24, width: 64, height: 64, borderRadius: 32, 
    backgroundColor: COLORS.medical, justifyContent: 'center', alignItems: 'center', elevation: 15,
    shadowColor: COLORS.medical, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10
  },
});

export default RecordeScreen;
