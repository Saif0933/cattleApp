import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
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
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const HealthRecordScreen = ({ route, navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  
  const [modalVisible, setModalVisible] = useState(false);

  // Form Fields
  const [selectedCattle, setSelectedCattle] = useState('Gauri (Cow)');
  const [recordType, setRecordType] = useState('Vaccination');
  const [medicine, setMedicine] = useState('FMD Vaccine');
  const [date, setDate] = useState('May 25, 2024');
  const [dueDate, setDueDate] = useState('Jun 25, 2024');
  const [notes, setNotes] = useState('');

  const stats = [
    { value: '12', label: 'Due for Checkup', color: '#F59E0B', bg: '#FEF3C7' },
    { value: '8', label: 'Sick Animals', color: '#EF4444', bg: '#FEE2E2' },
    { value: '128', label: 'Total Records', color: '#16A34A', bg: '#DCFCE7' }
  ];

  const [upcomingTasks, setUpcomingTasks] = useState([
    { title: 'Vaccination - FMD', date: 'May 25, 2024', desc: '5 Cattle', icon: 'vaccines', iconColor: '#16A34A', iconBg: '#DCFCE7' },
    { title: 'Deworming', date: 'May 25, 2024', desc: '8 Cattle', icon: 'bug-report', iconColor: '#A855F7', iconBg: '#F3E8FF' },
    { title: 'Health Checkup', date: 'May 25, 2024', desc: '6 Cattle', icon: 'healing', iconColor: '#3B82F6', iconBg: '#DBEAFE' }
  ]);

  const handleSaveRecord = () => {
    if (!medicine.trim()) {
      Alert.alert('Incomplete Form', 'Please enter the Vaccine/Medicine name.');
      return;
    }

    setUpcomingTasks([
      { 
        title: `${recordType} - ${medicine}`, 
        date: date, 
        desc: selectedCattle, 
        icon: recordType === 'Vaccination' ? 'vaccines' : 'healing', 
        iconColor: '#16A34A', 
        iconBg: '#DCFCE7' 
      },
      ...upcomingTasks
    ]);

    setModalVisible(false);
    Alert.alert('Success', 'Health record saved successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Icon name="notifications-none" size={24} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Horizontal Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <View key={idx} style={[styles.statCell, { backgroundColor: stat.bg }]}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Upcoming Tasks Section */}
        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
          <View style={styles.tasksList}>
            {upcomingTasks.map((task, idx) => (
              <View key={idx} style={styles.taskCard}>
                <View style={[styles.taskIconBox, { backgroundColor: task.iconBg }]}>
                  <Icon name={task.icon} size={24} color={task.iconColor} />
                </View>
                <View style={styles.taskDetails}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskSub}>{task.desc}</Text>
                </View>
                <Text style={styles.taskDate}>{task.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Health Record CTA Button */}
      <TouchableOpacity 
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Icon name="add" size={24} color="#FFFFFF" />
        <Text style={styles.addBtnText}>Add Health Record</Text>
      </TouchableOpacity>

      {/* Add Health Record Overlay Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Health Record</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalForm} showsVerticalScrollIndicator={false}>
              
              <Text style={styles.label}>Cattle</Text>
              <View style={styles.pickerBox}>
                <TextInput 
                  style={styles.pickerInput}
                  value={selectedCattle}
                  onChangeText={setSelectedCattle}
                  placeholder="Gauri (Cow)"
                  placeholderTextColor={COLORS.secondary + '60'}
                />
                <Icon name="arrow-drop-down" size={24} color={COLORS.secondary} />
              </View>

              <Text style={styles.label}>Record Type</Text>
              <View style={styles.pickerBox}>
                <TextInput 
                  style={styles.pickerInput}
                  value={recordType}
                  onChangeText={setRecordType}
                  placeholder="Vaccination"
                  placeholderTextColor={COLORS.secondary + '60'}
                />
                <Icon name="arrow-drop-down" size={24} color={COLORS.secondary} />
              </View>

              <Text style={styles.label}>Vaccine / Medicine</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input}
                  placeholder="FMD Vaccine"
                  placeholderTextColor={COLORS.secondary + '60'}
                  value={medicine}
                  onChangeText={setMedicine}
                />
              </View>

              <Text style={styles.label}>Date</Text>
              <TouchableOpacity 
                style={styles.datePickerBtn}
                onPress={() => setDate('May 25, 2024')}
                activeOpacity={0.8}
              >
                <Text style={styles.dateText}>{date}</Text>
                <Icon name="calendar-today" size={20} color={COLORS.secondary} />
              </TouchableOpacity>

              <Text style={styles.label}>Next Due Date</Text>
              <TouchableOpacity 
                style={styles.datePickerBtn}
                onPress={() => setDueDate('Jun 25, 2024')}
                activeOpacity={0.8}
              >
                <Text style={styles.dateText}>{dueDate}</Text>
                <Icon name="calendar-today" size={20} color={COLORS.secondary} />
              </TouchableOpacity>

              <Text style={styles.label}>Notes (Optional)</Text>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput 
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter notes"
                  placeholderTextColor={COLORS.secondary + '60'}
                  multiline
                  numberOfLines={3}
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveRecord} activeOpacity={0.85}>
                <Text style={styles.saveText}>Save Record</Text>
              </TouchableOpacity>

            </ScrollView>
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
  bellBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { paddingHorizontal: 24, paddingTop: 15, paddingBottom: 110 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  statCell: { 
    flex: 1, 
    borderRadius: 18, padding: 14, 
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  statValue: { fontSize: 24, fontWeight: '900', fontFamily: FONT_SERIF },
  statLabel: { fontSize: 10, fontWeight: '800', color: COLORS.secondary, marginTop: 4, fontFamily: FONT_SANS },

  tasksSection: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF, marginBottom: 15 },

  tasksList: { gap: 15 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  taskIconBox: { width: 46, height: 46, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  taskDetails: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  taskSub: { fontSize: 11, color: COLORS.secondary, marginTop: 3, fontWeight: '600', fontFamily: FONT_SANS },
  taskDate: { fontSize: 12, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },

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
    elevation: 4,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10
  },
  addBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900', marginLeft: 8, letterSpacing: 0.5, fontFamily: FONT_SANS },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15,41,30,0.5)', justifyContent: 'flex-end' },
  modalContent: { 
    height: '82%', backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  
  modalForm: { gap: 15, paddingBottom: 50 },
  label: { fontSize: 13, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SANS, marginBottom: 2 },
  inputWrapper: {
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    borderWidth: 1.5, borderColor: COLORS.border, paddingHorizontal: 16,
    justifyContent: 'center'
  },
  input: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  textAreaWrapper: { height: 100, paddingVertical: 10 },
  textArea: { height: '100%', textAlignVertical: 'top' },
  pickerBox: { 
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18,
    borderWidth: 1.5, borderColor: COLORS.border
  },
  pickerInput: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  datePickerBtn: { 
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18,
    borderWidth: 1.5, borderColor: COLORS.border
  },
  dateText: { fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  
  saveBtn: { 
    height: 60, backgroundColor: '#16A34A', borderRadius: 28, 
    justifyContent: 'center', alignItems: 'center', marginTop: 15,
    elevation: 4, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10
  },
  saveText: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS }
});

export default HealthRecordScreen;
