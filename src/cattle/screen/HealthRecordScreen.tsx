import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
  border: '#E2E8F0',
  sky: '#0EA5E9',
  gold: '#FFB800',
  crimson: '#EF4444',
};

const HealthRecordScreen = ({ route, navigation }: any) => {
  const { animalName = 'Oliver', breed = 'Persian Cat' } = route.params || {};

  // Dynamically resolve avatar and vitals based on params
  const avatarImage = animalName === 'Billy'
    ? 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=400'
    : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400';

  const animalWeight = animalName === 'Billy' ? '65.0 kg' : '4.5 kg';
  const animalAge = animalName === 'Billy' ? '2 Years' : '1 Year';

  // React State for medical history records
  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: "rec-1",
      animalProfileId: "profile-1",
      recordType: "VACCINATION",
      title: "Rabies Booster",
      diagnosis: "Routine rabies vaccination",
      treatment: "Administered 1ml Rabisin booster dose",
      date: "2026-10-12T00:00:00Z",
      veterinarian: "Dr. Sarah Mitchell",
      attachments: ["https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=400"],

      // legacy compat
      type: 'Vaccination',
      doctor: 'Dr. Sarah Wilson',
      status: 'Completed',
      icon: 'vaccines',
      color: COLORS.accent,
    },
    {
      id: "rec-2",
      animalProfileId: "profile-1",
      recordType: "GENERAL_CHECKUP",
      title: "General Wellness Exam",
      diagnosis: "Healthy condition, no anomalies found",
      treatment: "Regular deworming tablet given",
      date: "2026-09-05T00:00:00Z",
      veterinarian: "Dr. Sarah Mitchell",
      attachments: [],

      // legacy compat
      type: 'Checkup',
      doctor: 'Dr. Sarah Wilson',
      status: 'Completed',
      icon: 'medical-services',
      color: COLORS.sky,
    },
    {
      id: "rec-3",
      animalProfileId: "profile-1",
      recordType: "SURGERY",
      title: "Dental Cleaning",
      diagnosis: "Mild plaque buildup",
      treatment: "Ultrasonic scaling and polishing",
      date: "2026-08-15T00:00:00Z",
      veterinarian: "Elite Vet Clinic",
      attachments: [],

      // legacy compat
      type: 'Surgery',
      doctor: 'Elite Vet Clinic',
      status: 'Completed',
      icon: 'content-cut',
      color: COLORS.gold,
    },
    {
      id: "rec-4",
      animalProfileId: "profile-1",
      recordType: "DIAGNOSTIC_TEST",
      title: "Blood Work (Full Panel)",
      diagnosis: "Normal blood chemistry",
      treatment: "No clinical action required",
      date: "2026-07-20T00:00:00Z",
      veterinarian: "LabCentral Laboratories",
      attachments: ["https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=400"],

      // legacy compat
      type: 'Laboratory',
      doctor: 'LabCentral',
      status: 'Completed',
      icon: 'biotech',
      color: COLORS.primary,
    }
  ]);

  // Form State
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVet, setNewVet] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newTreatment, setNewTreatment] = useState('');
  const [newType, setNewType] = useState('VACCINATION');

  const getRecordBadgeConfig = (type: string) => {
    switch (type.toUpperCase()) {
      case 'VACCINATION':
        return { bg: '#ECFDF5', text: '#10B981', label: 'Vaccination' };
      case 'GENERAL_CHECKUP':
      case 'CHECKUP':
        return { bg: '#E0F2FE', text: '#0EA5E9', label: 'Checkup' };
      case 'SURGERY':
        return { bg: '#FEF2F2', text: '#EF4444', label: 'Surgery' };
      default:
        return { bg: '#F3E8FF', text: '#8B5CF6', label: 'Diagnostic' };
    }
  };

  const handleSubmit = () => {
    if (!newTitle.trim()) {
      Alert.alert('Required Field', 'Please enter a title for the health record.');
      return;
    }

    const typeLabel = newType === 'VACCINATION' ? 'Vaccination' : newType === 'GENERAL_CHECKUP' ? 'Checkup' : newType === 'SURGERY' ? 'Surgery' : 'Diagnostic';
    const typeIcon = newType === 'VACCINATION' ? 'vaccines' : newType === 'GENERAL_CHECKUP' ? 'medical-services' : newType === 'SURGERY' ? 'content-cut' : 'biotech';
    const typeColor = newType === 'VACCINATION' ? COLORS.accent : newType === 'GENERAL_CHECKUP' ? COLORS.sky : newType === 'SURGERY' ? COLORS.crimson : COLORS.primary;

    const newRecord = {
      id: `rec-${Date.now()}`,
      animalProfileId: "profile-1",
      recordType: newType,
      title: newTitle.trim(),
      diagnosis: newDiagnosis.trim() || 'No diagnostic notes added.',
      treatment: newTreatment.trim() || 'No treatments recorded.',
      date: new Date().toISOString(),
      veterinarian: newVet.trim() || 'Dr. Self / Owner',
      attachments: [],

      // legacy compat
      type: typeLabel,
      doctor: newVet.trim() || 'Dr. Self / Owner',
      status: 'Completed',
      icon: typeIcon,
      color: typeColor,
    };

    setMedicalRecords([newRecord, ...medicalRecords]);

    // Reset fields & Close modal
    setNewTitle('');
    setNewVet('');
    setNewDiagnosis('');
    setNewTreatment('');
    setNewType('VACCINATION');
    setModalVisible(false);
  };

  const RecordItem = ({ record, isLast }: { record: any; isLast: boolean }) => {
    const type = record.recordType || record.type;
    const title = record.title;
    
    const dateVal = record.date ? new Date(record.date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : record.date;

    const doctor = record.veterinarian || record.doctor;
    const color = record.color || (record.recordType === 'VACCINATION' ? COLORS.accent : record.recordType === 'GENERAL_CHECKUP' ? COLORS.sky : COLORS.gold);
    const icon = record.icon || (record.recordType === 'VACCINATION' ? 'vaccines' : record.recordType === 'GENERAL_CHECKUP' ? 'medical-services' : 'biotech');

    const badge = getRecordBadgeConfig(type);

    return (
      <View style={styles.timelineItem}>
        {!isLast && <View style={styles.timelineLine} />}
        <View style={[styles.typeIconBox, { borderColor: color }]}>
          <Icon name={icon} size={18} color={color} />
        </View>
        <View style={styles.recordCard}>
          <View style={styles.recordHeader}>
            <View style={[styles.badgeContainer, { backgroundColor: badge.bg }]}>
              <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label.toUpperCase()}</Text>
            </View>
            <Text style={styles.recordDate}>{dateVal}</Text>
          </View>
          <Text style={styles.recordTitle}>{title}</Text>
          
          <Text style={styles.diagnosisText}>{record.diagnosis}</Text>
          
          <View style={styles.doctorRow}>
            <Icon name="person" size={14} color="#64748B" />
            <Text style={styles.doctorName}>{doctor}</Text>
          </View>
          
          <TouchableOpacity style={styles.viewDocBtn} activeOpacity={0.7}>
            <Icon name="description" size={14} color="#64748B" style={{ marginRight: 6 }} />
            <Text style={styles.viewDocText}>View Report Details</Text>
            <Icon name="chevron-right" size={16} color={COLORS.accent} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.circleButton}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Records</Text>
        <TouchableOpacity style={styles.circleButton} activeOpacity={0.7}>
          <Icon name="share" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Animal Profile Summary Card */}
        <View style={styles.profileCard}>
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: avatarImage }} 
              style={styles.avatar} 
              resizeMode="cover"
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.animalName}>{animalName}</Text>
            <Text style={styles.breedText}>{breed}</Text>
            <View style={styles.vitalRow}>
              <View style={styles.vitalItem}>
                <Icon name="monitor-weight" size={12} color="#64748B" />
                <Text style={styles.vitalText}>{animalWeight}</Text>
              </View>
              <View style={styles.vitalItem}>
                <Icon name="event" size={12} color="#64748B" />
                <Text style={styles.vitalText}>{animalAge}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Timeline Section */}
        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medical History</Text>
            <TouchableOpacity 
              style={styles.addRecordBtn} 
              activeOpacity={0.7}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="add" size={16} color="white" />
              <Text style={styles.addRecordText}>Add Record</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timelineContainer}>
            {medicalRecords.map((record, index) => (
              <RecordItem 
                key={record.id} 
                record={record} 
                isLast={index === medicalRecords.length - 1} 
              />
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Pop up form modal for adding record */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalFormHeader}>
              <Text style={styles.modalTitle}>New Health Record</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Icon name="close" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalForm}>
              {/* Record Type Selector */}
              <Text style={styles.inputLabel}>Record Type</Text>
              <View style={styles.typeSelectorRow}>
                {[
                  { key: 'VACCINATION', label: 'Vaccination', color: COLORS.accent },
                  { key: 'GENERAL_CHECKUP', label: 'Checkup', color: COLORS.sky },
                  { key: 'SURGERY', label: 'Surgery', color: COLORS.crimson },
                  { key: 'DIAGNOSTIC_TEST', label: 'Diagnostic', color: '#8B5CF6' }
                ].map((item) => {
                  const isSelected = newType === item.key;
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={[
                        styles.typeOptionChip,
                        isSelected && { backgroundColor: item.color, borderColor: item.color }
                      ]}
                      onPress={() => setNewType(item.key)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.typeOptionText, isSelected && { color: '#FFFFFF' }]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Title Input */}
              <Text style={styles.inputLabel}>Record Title *</Text>
              <TextInput
                placeholder="e.g. Rabies Booster Dose"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
                value={newTitle}
                onChangeText={setNewTitle}
              />

              {/* Vet Input */}
              <Text style={styles.inputLabel}>Veterinarian / Clinic</Text>
              <TextInput
                placeholder="e.g. Dr. Sarah Mitchell"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
                value={newVet}
                onChangeText={setNewVet}
              />

              {/* Diagnosis Input */}
              <Text style={styles.inputLabel}>Diagnosis / Observations</Text>
              <TextInput
                placeholder="e.g. Healthy condition, no anomalies found"
                placeholderTextColor="#94A3B8"
                style={[styles.textInput, styles.textArea]}
                multiline={true}
                numberOfLines={3}
                value={newDiagnosis}
                onChangeText={setNewDiagnosis}
              />

              {/* Treatment Input */}
              <Text style={styles.inputLabel}>Treatment / Actions Administered</Text>
              <TextInput
                placeholder="e.g. Administered booster shot"
                placeholderTextColor="#94A3B8"
                style={[styles.textInput, styles.textArea]}
                multiline={true}
                numberOfLines={3}
                value={newTreatment}
                onChangeText={setNewTreatment}
              />

              {/* Action Buttons */}
              <View style={styles.modalButtonsRow}>
                <TouchableOpacity 
                  style={styles.modalCancelBtn} 
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalSaveBtn} 
                  onPress={handleSubmit}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalSaveText}>Save Record</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  header: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '900', 
    color: '#0F291E', 
    fontFamily: FONT_SERIF 
  },

  scrollContent: { 
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50 
  },

  profileCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    padding: 16, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  imageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  avatar: { 
    width: '100%', 
    height: '100%' 
  },
  profileInfo: { 
    marginLeft: 16, 
    flex: 1 
  },
  animalName: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: '#0F291E', 
    fontFamily: FONT_SERIF 
  },
  breedText: { 
    fontSize: 12, 
    color: '#64748B', 
    marginTop: 2, 
    fontWeight: '600',
    fontFamily: FONT_SANS,
  },
  vitalRow: { 
    flexDirection: 'row', 
    marginTop: 8 
  },
  vitalItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 10, 
    backgroundColor: '#F1F5F9', 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 8 
  },
  vitalText: { 
    fontSize: 10, 
    fontWeight: '800', 
    color: '#334155', 
    marginLeft: 4,
    fontFamily: FONT_SANS,
  },

  historySection: { 
    marginTop: 8 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#0F291E', 
    fontFamily: FONT_SANS 
  },
  addRecordBtn: { 
    backgroundColor: '#0F291E', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 10 
  },
  addRecordText: { 
    color: '#FFFFFF', 
    fontSize: 11, 
    fontWeight: '800', 
    marginLeft: 4,
    fontFamily: FONT_SANS,
  },

  timelineContainer: { 
    paddingLeft: 6 
  },
  timelineItem: { 
    flexDirection: 'row', 
    marginBottom: 20 
  },
  timelineLine: { 
    position: 'absolute', 
    left: 17, 
    top: 36, 
    bottom: -20, 
    width: 2, 
    backgroundColor: '#E2E8F0' 
  },
  typeIconBox: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 1, 
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
  },
  recordCard: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 16, 
    marginLeft: 14, 
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2 
  },
  recordHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: FONT_SANS,
  },
  recordDate: { 
    fontSize: 11, 
    color: '#94A3B8', 
    fontWeight: '600',
    fontFamily: FONT_SANS,
  },
  recordTitle: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#0F291E', 
    fontFamily: FONT_SANS 
  },
  diagnosisText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontFamily: FONT_SANS,
    lineHeight: 16,
  },
  doctorRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8 
  },
  doctorName: { 
    fontSize: 12, 
    color: '#64748B', 
    marginLeft: 4, 
    fontWeight: '600',
    fontFamily: FONT_SANS,
  },
  viewDocBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 14, 
    borderTopWidth: 1, 
    borderTopColor: '#F1F5F9', 
    paddingTop: 10 
  },
  viewDocText: { 
    fontSize: 11, 
    fontWeight: '800', 
    color: '#10B981', 
    marginRight: 4,
    fontFamily: FONT_SANS,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 41, 30, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  modalFormHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalForm: {
    paddingBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3D5447',
    marginBottom: 8,
    marginTop: 14,
    fontFamily: FONT_SANS,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  typeOptionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  typeOptionText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    fontFamily: FONT_SANS,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F291E',
    fontFamily: FONT_SANS,
    backgroundColor: '#F8FAFA',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
    fontFamily: FONT_SANS,
  },
  modalSaveBtn: {
    flex: 1.5,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#0F291E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  modalSaveText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: FONT_SANS,
  },
});

export default HealthRecordScreen;
