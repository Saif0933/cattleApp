import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
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

const BreedingScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCow, setSelectedCow] = useState<any>(null);
  const [modalTab, setModalTab] = useState('Breeding');

  const stats = [
    { value: '15', label: 'Heat Animals', color: '#EC4899', bg: '#FCE7F3' },
    { value: '5', label: 'Pregnant', color: '#16A34A', bg: '#DCFCE7' },
    { value: '7', label: 'Due for AI', color: '#F59E0B', bg: '#FEF3C7' },
    { value: '3', label: 'Due for Calving', color: '#8B5CF6', bg: '#EDE9FE' }
  ];

  const recentAnimals = [
    { name: 'Gauri', status: 'In Heat', date: 'May 24, 2024', image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400', statusColor: '#EC4899', statusBg: '#FCE7F3' },
    { name: 'Laxmi', status: 'Due for AI', date: 'May 24, 2024', image: 'https://images.unsplash.com/photo-1527153857715-3908f2bac5e8?auto=format&fit=crop&q=80&w=400', statusColor: '#F59E0B', statusBg: '#FEF3C7' },
    { name: 'Rani', status: 'Pregnant', date: 'May 24, 2024', image: 'https://images.unsplash.com/photo-1563865436874-9aef32095ffd?auto=format&fit=crop&q=80&w=400', statusColor: '#16A34A', statusBg: '#DCFCE7' }
  ];

  const handleOpenDetails = (cowName: string) => {
    setSelectedCow({
      name: cowName,
      breed: 'HF Cross',
      age: '3 Years',
      heatDate: 'May 24, 2024',
      aiDate: 'May 25, 2024',
      semenBull: 'Abhimanyu',
      status: 'Confirmed',
      dueDate: 'Mar 03, 2025',
      daysLeft: '280 Days',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400'
    });
    setDetailModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breeding</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2x2 Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <View key={idx} style={[styles.statCell, { backgroundColor: stat.bg }]}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Recent Animals Section */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Recent Animals</Text>
          <View style={styles.cardList}>
            {recentAnimals.map((item, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={styles.card}
                onPress={() => handleOpenDetails(item.name)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: item.image }} style={styles.cardImg} resizeMode="cover" />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: item.statusBg, alignSelf: 'flex-start', marginTop: 4 }]}>
                    <Text style={[styles.statusBadgeText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.cardDate}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Breeding Record Button */}
      <TouchableOpacity 
        style={styles.addBtn}
        onPress={() => handleOpenDetails('New Cow')}
        activeOpacity={0.85}
      >
        <Icon name="add" size={24} color="#FFFFFF" />
        <Text style={styles.addBtnText}>Add Breeding Record</Text>
      </TouchableOpacity>

      {/* Breeding Details Modal (Screen 14) */}
      <Modal
        visible={detailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                <Icon name="close" size={24} color={COLORS.darkGreen} />
              </TouchableOpacity>
              <View style={styles.modalHeaderTitleBox}>
                <Text style={styles.modalTitle}>{selectedCow?.name}</Text>
                <Text style={styles.modalSubTitle}>Cow • {selectedCow?.age}</Text>
              </View>
              <View style={{ width: 24 }} />
            </View>

            {selectedCow && (
              <ScrollView contentContainerStyle={styles.modalForm} showsVerticalScrollIndicator={false}>
                
                {/* Modal Sub Tab Bar */}
                <View style={styles.modalTabBar}>
                  {['Breeding', 'History', 'Calving'].map((tab) => (
                    <TouchableOpacity
                      key={tab}
                      style={[styles.modalTabBtn, modalTab === tab && styles.modalTabBtnActive]}
                      onPress={() => setModalTab(tab)}
                    >
                      <Text style={[styles.modalTabText, modalTab === tab && styles.modalTabTextActive]}>{tab}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {modalTab === 'Breeding' ? (
                  <>
                    <Text style={styles.infoSectionTitle}>Breeding Info</Text>
                    <View style={styles.breedingTable}>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Heat Date</Text>
                        <Text style={styles.tableCellValue}>{selectedCow.heatDate}</Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>AI Date</Text>
                        <Text style={styles.tableCellValue}>{selectedCow.aiDate}</Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Semen/Bull</Text>
                        <Text style={styles.tableCellValue}>{selectedCow.semenBull}</Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Pregnancy Status</Text>
                        <View style={[styles.statusBadge, { backgroundColor: '#DCFCE7' }]}>
                          <Text style={[styles.statusBadgeText, { color: '#16A34A' }]}>{selectedCow.status}</Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Due Date</Text>
                        <Text style={styles.tableCellValue}>{selectedCow.dueDate}</Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCellLabel}>Days Left</Text>
                        <Text style={[styles.tableCellValue, { color: COLORS.darkGreen, fontWeight: '900' }]}>{selectedCow.daysLeft}</Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.placeholderTabContent}>
                    <Text style={styles.placeholderTabText}>No records in {modalTab} yet.</Text>
                  </View>
                )}

                <TouchableOpacity 
                  style={styles.editRecordBtn}
                  onPress={() => setDetailModalVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.editRecordBtnText}>Edit Record</Text>
                </TouchableOpacity>

              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

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
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  scrollContent: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 110 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15 },
  statCell: { 
    width: (width - 63) / 2, 
    borderRadius: 22, padding: 18,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  statValue: { fontSize: 26, fontWeight: '900', fontFamily: FONT_SERIF },
  statLabel: { fontSize: 11, fontWeight: '800', color: COLORS.secondary, marginTop: 4, fontFamily: FONT_SANS },

  listSection: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF, marginBottom: 15 },

  cardList: { gap: 15 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  cardImg: { width: 52, height: 52, borderRadius: 12 },
  cardDetails: { flex: 1, marginLeft: 16 },
  cardTitle: { fontSize: 16, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  cardDate: { fontSize: 12, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },

  addBtn: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
    height: 60,
    backgroundColor: '#16A34A',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10
  },
  addBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900', marginLeft: 8, letterSpacing: 0.5, fontFamily: FONT_SANS },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15,41,30,0.5)', justifyContent: 'flex-end' },
  modalContent: { 
    height: '80%', backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  modalHeaderTitleBox: { flex: 1, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  modalSubTitle: { fontSize: 12, color: COLORS.secondary, fontFamily: FONT_SANS, marginTop: 2 },
  
  modalForm: { gap: 15, paddingBottom: 40 },
  modalTabBar: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1.5, borderBottomColor: '#E5E7EB', marginBottom: 15 },
  modalTabBtn: { paddingVertical: 10, paddingHorizontal: 10 },
  modalTabBtnActive: { borderBottomWidth: 3, borderBottomColor: '#16A34A' },
  modalTabText: { fontSize: 14, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SANS },
  modalTabTextActive: { color: '#16A34A', fontWeight: '900' },

  infoSectionTitle: { fontSize: 15, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SERIF, marginBottom: 5 },
  breedingTable: { 
    backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1.5, 
    borderColor: COLORS.border, overflow: 'hidden' 
  },
  tableRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border 
  },
  tableCellLabel: { fontSize: 13, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  tableCellValue: { fontSize: 13, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: '900', fontFamily: FONT_SANS },

  placeholderTabContent: { padding: 30, justifyContent: 'center', alignItems: 'center' },
  placeholderTabText: { fontSize: 13, color: COLORS.secondary, fontFamily: FONT_SANS },

  editRecordBtn: { 
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 28, 
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#16A34A', marginTop: 15
  },
  editRecordBtnText: { fontSize: 15, fontWeight: '900', color: '#16A34A', fontFamily: FONT_SANS }
});

export default BreedingScreen;
