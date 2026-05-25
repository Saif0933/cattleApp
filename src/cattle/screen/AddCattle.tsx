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
  View
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const AddCattleScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('Cow');
  const [breed, setBreed] = useState('HF Cross');
  const [dob, setDob] = useState('Select date');
  const [gender, setGender] = useState('Female');

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
      age: '3 Years',
      gender: gender,
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
        
        {/* Photo Upload Circle with overlay camera icon */}
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

          {/* Type Segment Selection */}
          <Text style={styles.label}>Type</Text>
          <View style={styles.segmentRow}>
            {['Cow', 'Buffalo', 'Calf'].map((t) => (
              <TouchableOpacity 
                key={t}
                style={[styles.segmentBtn, type === t && styles.segmentBtnActive]}
                onPress={() => setType(t)}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, type === t && styles.segmentTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Breed</Text>
          <View style={styles.dropdownBox}>
            <TextInput 
              style={styles.input}
              value={breed}
              onChangeText={setBreed}
              placeholder="Select breed"
              placeholderTextColor={COLORS.secondary + '60'}
            />
            <Icon name="arrow-drop-down" size={24} color={COLORS.secondary} style={{ marginRight: 15 }} />
          </View>

          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity 
            style={styles.datePickerBtn}
            onPress={() => setDob('10 Mar 2021')}
            activeOpacity={0.8}
          >
            <Text style={[styles.dateText, dob === 'Select date' && { color: COLORS.secondary + '60' }]}>
              {dob}
            </Text>
            <Icon name="calendar-today" size={20} color={COLORS.secondary} />
          </TouchableOpacity>

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
                    name={g === 'Female' ? 'fiber-manual-record' : 'fiber-manual-record'} 
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
  
  segmentRow: { flexDirection: 'row', gap: 10 },
  segmentBtn: { 
    flex: 1, height: 48, borderRadius: 12, backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent'
  },
  segmentBtnActive: { backgroundColor: '#16A34A' },
  segmentText: { fontSize: 14, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  segmentTextActive: { color: '#FFFFFF' },

  dropdownBox: { 
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: COLORS.border
  },
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