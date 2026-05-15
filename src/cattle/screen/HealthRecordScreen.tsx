import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
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
  border: '#EEEEEE',
  sky: '#0EA5E9',
  gold: '#FFB800',
  crimson: '#EF4444',
};

const HealthRecordScreen = ({ route, navigation }: any) => {
  const { animalName = 'Oliver', breed = 'Persian Cat' } = route.params || {};

  const records = [
    {
      id: 1,
      type: 'Vaccination',
      title: 'Rabies Booster',
      date: '12 Oct 2025',
      doctor: 'Dr. Sarah Wilson',
      status: 'Completed',
      icon: 'vaccines',
      color: COLORS.accent,
    },
    {
      id: 2,
      type: 'Checkup',
      title: 'General Wellness Exam',
      date: '05 Sep 2025',
      doctor: 'Dr. Sarah Wilson',
      status: 'Completed',
      icon: 'medical-services',
      color: COLORS.sky,
    },
    {
      id: 3,
      type: 'Surgery',
      title: 'Dental Cleaning',
      date: '15 Aug 2025',
      doctor: 'Elite Vet Clinic',
      status: 'Completed',
      icon: 'content-cut',
      color: COLORS.gold,
    },
    {
      id: 4,
      type: 'Laboratory',
      title: 'Blood Work (Full Panel)',
      date: '20 July 2025',
      doctor: 'LabCentral',
      status: 'Completed',
      icon: 'biotech',
      color: COLORS.primary,
    }
  ];

  const RecordItem = ({ record }: any) => (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLine} />
      <View style={[styles.typeIconBox, { backgroundColor: record.color + '15' }]}>
        <Icon name={record.icon} size={20} color={record.color} />
      </View>
      <View style={styles.recordCard}>
        <View style={styles.recordHeader}>
          <Text style={styles.recordType}>{record.type.toUpperCase()}</Text>
          <Text style={styles.recordDate}>{record.date}</Text>
        </View>
        <Text style={styles.recordTitle}>{record.title}</Text>
        <View style={styles.doctorRow}>
          <Icon name="person" size={14} color={COLORS.secondary} />
          <Text style={styles.doctorName}>{record.doctor}</Text>
        </View>
        <TouchableOpacity style={styles.viewDocBtn}>
          <Text style={styles.viewDocText}>View Report</Text>
          <Icon name="chevron-right" size={14} color={COLORS.accent} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Records</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Icon name="ios-share" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Animal Profile Summary */}
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200' }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.animalName}>{animalName}</Text>
            <Text style={styles.breedText}>{breed}</Text>
            <View style={styles.vitalRow}>
              <View style={styles.vitalItem}>
                <Icon name="monitor-weight" size={14} color={COLORS.secondary} />
                <Text style={styles.vitalText}>4.2 kg</Text>
              </View>
              <View style={styles.vitalItem}>
                <Icon name="event" size={14} color={COLORS.secondary} />
                <Text style={styles.vitalText}>2 Years</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medical Timeline</Text>
            <TouchableOpacity style={styles.addRecordBtn}>
              <Icon name="add" size={18} color="white" />
              <Text style={styles.addRecordText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timelineContainer}>
            {records.map((record) => (
              <RecordItem key={record.id} record={record} />
            ))}
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  shareBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { padding: 20, paddingBottom: 50 },

  profileCard: { 
    backgroundColor: 'white', 
    borderRadius: 30, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 15
  },
  avatar: { width: 70, height: 70, borderRadius: 20 },
  profileInfo: { marginLeft: 20, flex: 1 },
  animalName: { fontSize: 22, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  breedText: { fontSize: 13, color: COLORS.secondary, marginTop: 2, fontWeight: '600' },
  vitalRow: { flexDirection: 'row', marginTop: 10 },
  vitalItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15, backgroundColor: COLORS.background, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  vitalText: { fontSize: 11, fontWeight: '800', color: COLORS.primary, marginLeft: 6 },

  historySection: { marginTop: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  addRecordBtn: { backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  addRecordText: { color: 'white', fontSize: 12, fontWeight: '800', marginLeft: 5 },

  timelineContainer: { paddingLeft: 10 },
  timelineItem: { flexDirection: 'row', marginBottom: 25 },
  timelineLine: { position: 'absolute', left: 24, top: 50, bottom: -25, width: 2, backgroundColor: COLORS.border },
  typeIconBox: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  recordCard: { flex: 1, backgroundColor: 'white', borderRadius: 22, padding: 18, marginLeft: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  recordType: { fontSize: 9, fontWeight: '900', color: COLORS.secondary, letterSpacing: 1 },
  recordDate: { fontSize: 11, color: COLORS.secondary, fontWeight: '600' },
  recordTitle: { fontSize: 16, fontWeight: '800', color: COLORS.primary, fontFamily: FONT_SANS },
  doctorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  doctorName: { fontSize: 12, color: COLORS.secondary, marginLeft: 6, fontWeight: '600' },
  viewDocBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 15, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12 },
  viewDocText: { fontSize: 11, fontWeight: '800', color: COLORS.accent, marginRight: 4 }
});

export default HealthRecordScreen;
