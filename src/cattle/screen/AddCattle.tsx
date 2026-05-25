import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const BREEDS_BY_TYPE: Record<string, string[]> = {
  Cow: ['HF Cross', 'Jersey', 'Gir', 'Sahiwal', 'Red Sindhi', 'Tharparkar', 'Kankrej', 'Other'],
  Buffalo: ['Murrah', 'Nili Ravi', 'Jaffarabadi', 'Surti', 'Bhadawari', 'Mehsana', 'Other'],
  Calf: ['HF Calf', 'Jersey Calf', 'Gir Calf', 'Sahiwal Calf', 'Other'],
  Fish: ['Rohu', 'Catla', 'Mrigal', 'Tilapia', 'Carp', 'Catfish', 'Other'],
  Goat: ['Sirohi', 'Jamunapari', 'Barbari', 'Beetal', 'Osmanabadi', 'Other'],
  Sheep: ['Nellore', 'Marwari', 'Deccani', 'Bellary', 'Rambouillet', 'Other'],
  Birds: ['Broiler Chicken', 'Layer Chicken', 'Country Chicken', 'Duck', 'Quail', 'Other'],
  Dog: ['Labrador', 'German Shepherd', 'Golden Retriever', 'Spitz', 'Pug', 'Rottweiler', 'Other'],
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AddCattleScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('Cow');
  const [breed, setBreed] = useState('HF Cross');
  const [dob, setDob] = useState('Select date');
  const [gender, setGender] = useState('Female');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  // Modal & DatePicker States
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  const handleImagePick = () => {
    Alert.alert('Upload Photo', 'Choose a source to add your animal photo', [
      {
        text: 'Camera',
        onPress: () => ImagePicker.launchCamera({ mediaType: 'photo' }, (res) => {
          if (res.assets && res.assets[0].uri) {
            setImageUri(res.assets[0].uri);
          }
        })
      },
      {
        text: 'Gallery',
        onPress: () => ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (res) => {
          if (res.assets && res.assets[0].uri) {
            setImageUri(res.assets[0].uri);
          }
        })
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Incomplete Form', 'Please enter a name for your cattle.');
      return;
    }

    const newAnimalPayload = {
      title: name,
      name: name,
      type: type,
      breed: breed,
      age: dob !== 'Select date' ? `${new Date().getFullYear() - currentYear} Years` : '3 Years',
      gender: gender,
      price: price ? `₹ ${parseInt(price).toLocaleString('en-IN')}` : '₹ 55,000',
      location: location.trim() || 'Punjab',
      image: imageUri || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400',
      id: `C${Math.floor(100 + Math.random() * 900)}`
    };

    Alert.alert('Success', 'Cattle added to herd registry!', [
      { 
        text: 'OK', 
        onPress: () => navigation.navigate('MainApp', { screen: 'Cattle', params: { newAnimal: newAnimalPayload } }) 
      }
    ]);
  };

  // Type Selector
  const handleTypeSelect = (selectedType: string) => {
    setType(selectedType);
    const defaultBreed = BREEDS_BY_TYPE[selectedType]?.[0] || 'Other';
    setBreed(defaultBreed);
  };

  // Calendar Helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleConfirmDate = () => {
    if (selectedDay) {
      const monthStr = MONTH_NAMES[currentMonth].substring(0, 3);
      setDob(`${selectedDay} ${monthStr} ${currentYear}`);
    }
    setShowCalendarModal(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const cells = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.dayCellEmpty} />);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = selectedDay === d;
      cells.push(
        <TouchableOpacity
          key={`day-${d}`}
          style={[styles.dayCell, isSelected && styles.dayCellSelected]}
          onPress={() => setSelectedDay(d)}
          activeOpacity={0.8}
        >
          <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
            {d}
          </Text>
        </TouchableOpacity>
      );
    }

    return cells;
  };

  const availableBreeds = BREEDS_BY_TYPE[type] || ['Other'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.primary} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Cattle</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Photo Upload Circle */}
        <TouchableOpacity style={styles.photoContainer} onPress={handleImagePick} activeOpacity={0.8}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.photo} resizeMode="cover" />
          ) : (
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=200' }} 
              style={styles.photo} 
              resizeMode="cover"
            />
          )}
          <View style={styles.cameraOverlay}>
            <Icon name="photo-camera" size={24} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Input Form */}
        <View style={styles.form}>
          
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor={COLORS.secondary + '60'}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Type Scrollable List */}
          <Text style={styles.label}>Type</Text>
          <View style={styles.scrollRowContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollRowContent}>
              {Object.keys(BREEDS_BY_TYPE).map((t) => (
                <TouchableOpacity 
                  key={t}
                  style={[styles.segmentBtn, type === t && styles.segmentBtnActive]}
                  onPress={() => handleTypeSelect(t)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.segmentText, type === t && styles.segmentTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Breed Dropdown */}
          <Text style={styles.label}>Breed</Text>
          <TouchableOpacity 
            style={styles.dropdownBox}
            onPress={() => setShowBreedModal(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dropdownValue, !breed && { color: COLORS.secondary + '60' }]}>
              {breed || 'Select breed'}
            </Text>
            <Icon name="arrow-drop-down" size={24} color={COLORS.secondary} style={{ marginRight: 15 }} />
          </TouchableOpacity>

          {/* DOB Calendar Picker */}
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity 
            style={styles.datePickerBtn}
            onPress={() => setShowCalendarModal(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dateText, dob === 'Select date' && { color: COLORS.secondary + '60' }]}>
              {dob}
            </Text>
            <Icon name="calendar-today" size={20} color={COLORS.secondary} />
          </TouchableOpacity>

          {/* Price Input */}
          <Text style={styles.label}>Price (₹)</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              placeholder="Enter price (e.g. 75000)"
              placeholderTextColor={COLORS.secondary + '60'}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          {/* Location Input */}
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              placeholder="Enter location (e.g. Punjab, Gujarat)"
              placeholderTextColor={COLORS.secondary + '60'}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Gender selection */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {['Female', 'Male'].map((g) => (
              <TouchableOpacity 
                key={g}
                style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                onPress={() => setGender(g)}
                activeOpacity={0.8}
              >
                <View style={styles.genderInner}>
                  <Icon 
                    name="fiber-manual-record" 
                    size={10} 
                    color={gender === g ? '#FFFFFF' : COLORS.secondary} 
                    style={{ marginRight: 6 }} 
                  />
                  <Text style={[styles.genderBtnText, gender === g && styles.genderBtnTextActive]}>{g}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Footer Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Breed Selection Modal Bottom Sheet */}
      <Modal
        visible={showBreedModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBreedModal(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.breedSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select Breed for {type}</Text>
              <TouchableOpacity onPress={() => setShowBreedModal(false)} style={styles.sheetCloseBtn}>
                <Icon name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.breedListContent} showsVerticalScrollIndicator={false}>
              {availableBreeds.map((b) => (
                <TouchableOpacity
                  key={b}
                  style={[styles.breedItem, breed === b && styles.breedItemActive]}
                  onPress={() => {
                    setBreed(b);
                    setShowBreedModal(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.breedItemText, breed === b && styles.breedItemTextActive]}>
                    {b}
                  </Text>
                  {breed === b && (
                    <Icon name="check" size={22} color="#16A34A" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Custom Calendar Dialog Modal */}
      <Modal
        visible={showCalendarModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendarModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarCard}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>
            
            {/* Calendar Controls */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={handlePrevMonth} style={styles.headerChevron}>
                <Icon name="chevron-left" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              
              <View style={styles.calendarHeaderTitle}>
                <Text style={styles.calendarMonthText}>{MONTH_NAMES[currentMonth]}</Text>
                <View style={styles.yearControls}>
                  <TouchableOpacity onPress={() => setCurrentYear(prev => prev - 1)} style={styles.yearChevron}>
                    <Icon name="keyboard-arrow-left" size={18} color={COLORS.secondary} />
                  </TouchableOpacity>
                  <Text style={styles.calendarYearText}>{currentYear}</Text>
                  <TouchableOpacity onPress={() => setCurrentYear(prev => prev + 1)} style={styles.yearChevron}>
                    <Icon name="keyboard-arrow-right" size={18} color={COLORS.secondary} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <TouchableOpacity onPress={handleNextMonth} style={styles.headerChevron}>
                <Icon name="chevron-right" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {/* Weekdays Row */}
            <View style={styles.weekdaysRow}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayName) => (
                <Text key={dayName} style={styles.weekdayText}>{dayName}</Text>
              ))}
            </View>

            {/* Days Grid */}
            <View style={styles.daysGrid}>
              {renderCalendarDays()}
            </View>

            {/* Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => setShowCalendarModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmBtn} 
                onPress={handleConfirmDate}
              >
                <Text style={styles.confirmBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
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
  closeBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },

  scrollContent: { paddingHorizontal: 24, paddingTop: 15, paddingBottom: 120 },
  
  photoContainer: { 
    width: 100, height: 100, borderRadius: 50, 
    backgroundColor: '#E5E7EB', alignSelf: 'center', 
    position: 'relative', marginBottom: 30
  },
  photo: { width: '100%', height: '100%', borderRadius: 50 },
  cameraOverlay: { 
    position: 'absolute', bottom: 0, right: 0, 
    width: 36, height: 36, borderRadius: 18, 
    backgroundColor: '#16A34A', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FFFFFF'
  },

  form: { gap: 16 },
  label: { fontSize: 13, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SANS, marginBottom: 2 },
  
  inputWrapper: {
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    borderWidth: 1.5, borderColor: COLORS.border, paddingHorizontal: 16,
    justifyContent: 'center'
  },
  input: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  
  scrollRowContainer: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  scrollRowContent: {
    gap: 10,
    paddingRight: 24,
  },
  segmentBtn: { 
    paddingHorizontal: 20, height: 48, borderRadius: 12, backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent'
  },
  segmentBtnActive: { backgroundColor: '#16A34A' },
  segmentText: { fontSize: 14, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  segmentTextActive: { color: '#FFFFFF' },

  dropdownBox: { 
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: COLORS.border
  },
  dropdownValue: { fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },

  datePickerBtn: { 
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18,
    borderWidth: 1.5, borderColor: COLORS.border
  },
  dateText: { fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  
  genderRow: { flexDirection: 'row', gap: 12 },
  genderBtn: { 
    flex: 1, height: 50, borderRadius: 16, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border
  },
  genderBtnActive: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  genderInner: { flexDirection: 'row', alignItems: 'center' },
  genderBtnText: { fontSize: 14, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  genderBtnTextActive: { color: '#FFFFFF' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '90%',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    textAlign: 'center',
    marginBottom: 15,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerChevron: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarHeaderTitle: {
    alignItems: 'center',
  },
  calendarMonthText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
  },
  yearControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  yearChevron: {
    padding: 2,
  },
  calendarYearText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekdayText: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 20,
  },
  dayCellSelected: {
    backgroundColor: '#16A34A',
  },
  dayCellEmpty: {
    width: '14.28%',
    height: 40,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.darkGreen,
    fontFamily: FONT_SANS,
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },
  confirmBtn: {
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SANS,
  },

  breedSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '60%',
    padding: 24,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
  },
  sheetCloseBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  breedListContent: {
    paddingBottom: 20,
  },
  breedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  breedItemActive: {
    backgroundColor: 'rgba(22, 163, 74, 0.04)',
  },
  breedItemText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },
  breedItemTextActive: {
    color: '#16A34A',
    fontWeight: '900',
  },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 24, backgroundColor: '#FFFFFF' 
  },
  saveBtn: { 
    height: 60, backgroundColor: '#16A34A', borderRadius: 28, 
    justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10
  },
  saveText: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5, fontFamily: FONT_SANS }
});

export default AddCattleScreen;