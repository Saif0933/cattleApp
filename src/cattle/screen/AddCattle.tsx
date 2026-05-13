import React, { useState, useEffect } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  emerald: '#10B981',
  border: 'rgba(0,0,0,0.05)',
};

const NewFlockScreen = ({ navigation, route }: any) => {
  const [step, setStep] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState('Cow');
  const [flockName, setFlockName] = useState('');
  const [purpose, setPurpose] = useState('Breeding');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    if (route.params?.initialImage) {
      setSelectedImages([route.params.initialImage]);
      setStep(2);
      navigation.setParams({ initialImage: undefined });
    }
  }, [route.params?.initialImage]);

  const handleImagePick = () => {
    Alert.alert('Select Photo', 'Choose a source', [
      { text: 'Camera', onPress: () => ImagePicker.launchCamera({ mediaType: 'photo' }, (res) => res.assets && setSelectedImages([...selectedImages, res.assets[0].uri!])) },
      { text: 'Gallery', onPress: () => ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (res) => res.assets && setSelectedImages([...selectedImages, res.assets[0].uri!])) },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleCreate = () => {
    Alert.alert('Registering...', 'Finalizing your elite listing.');
    setTimeout(() => {
      navigation.navigate('Home', { 
        newAnimal: {
          name: flockName || 'Elite Animal',
          breed: selectedAnimal,
          price: 'Consult',
          info: purpose,
          type: 'Elite',
          image: selectedImages[0] || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400'
        }
      });
    }, 1500);
  };

  const renderStep1 = () => {
    const animals = [
      { id: 'Cow', name: 'Cow', img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=200' },
      { id: 'Bull', name: 'Bull', img: 'https://images.unsplash.com/photo-1551135020-39e4ca508d9e?auto=format&fit=crop&q=80&w=200' },
      { id: 'Buffalo', name: 'Buffalo', img: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=200' },
      { id: 'Rabbit', name: 'Rabbit', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=200' },
      { id: 'Goat', name: 'Goat', img: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=200' },
      { id: 'Other', name: 'Other', icon: 'help' },
    ];

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Choose Animal Type</Text>
        <View style={styles.grid}>
          {animals.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => setSelectedAnimal(item.id)}
              style={[styles.animalCard, selectedAnimal === item.id && styles.selectedCard]}
            >
              {item.img ? (
                <Image source={{ uri: item.img }} style={styles.animalImg} />
              ) : (
                <Icon name={item.icon as string} size={40} color={COLORS.primary} />
              )}
              <Text style={[styles.animalName, selectedAnimal === item.id && styles.selectedText]}>{item.name}</Text>
              {selectedAnimal === item.id && <View style={styles.checkBadge}><Icon name="check-circle" size={24} color={COLORS.accent} /></View>}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Listing Details</Text>
      <TextInput style={styles.input} placeholder="Listing Name (e.g. Pure Breed Holstein)" value={flockName} onChangeText={setFlockName} placeholderTextColor={COLORS.secondary} />
      <TextInput style={[styles.input, { height: 100 }]} placeholder="Description & History" multiline value={description} onChangeText={setDescription} placeholderTextColor={COLORS.secondary} />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Elite Photos</Text>
      <View style={styles.photoGrid}>
        <TouchableOpacity style={styles.addPhotoBtn} onPress={handleImagePick}>
          <Icon name="add-a-photo" size={32} color={COLORS.primary} />
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
        {selectedImages.map((uri, i) => (
          <Image key={i} source={{ uri }} style={styles.previewImg} />
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Promote Your Listing</Text>
      <Text style={styles.stepSubText}>Get 10x more views by ranking at the top.</Text>
      
      <TouchableOpacity style={styles.promoOption}>
        <View style={styles.promoHeader}>
          <Icon name="trending-up" size={24} color={COLORS.accent} />
          <Text style={styles.promoTitle}>Top Ranked Listing</Text>
        </View>
        <Text style={styles.promoDesc}>Show your animal at the very top of the marketplace for 7 days.</Text>
        <Text style={styles.promoPrice}>$15.00</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.promoOption}>
        <View style={styles.promoHeader}>
          <Icon name="campaign" size={24} color={COLORS.emerald} />
          <Text style={styles.promoTitle}>Premium App Ad</Text>
        </View>
        <Text style={styles.promoDesc}>Display your listing in the Home Screen ads carousel.</Text>
        <Text style={styles.promoPrice}>$25.00</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipBtn} onPress={handleCreate}>
        <Text style={styles.skipBtnText}>Skip Promotion & Register Free</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Registration</Text>
        <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>{step}/4</Text></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </ScrollView>

      {step < 4 && (
        <TouchableOpacity style={styles.mainBtn} onPress={() => setStep(step + 1)}>
          <Text style={styles.mainBtnText}>{step === 3 ? 'REVIEW PROMOTIONS' : 'CONTINUE'}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  stepBadge: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  stepBadgeText: { color: 'white', fontSize: 10, fontWeight: '900' },
  scrollContent: { padding: 20 },
  stepContainer: { flex: 1 },
  stepTitle: { fontSize: 24, fontWeight: '900', color: COLORS.primary, marginBottom: 20, fontFamily: FONT_SERIF },
  stepSubText: { fontSize: 14, color: COLORS.secondary, marginBottom: 25 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  animalCard: { width: (width - 60) / 2, height: 160, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 4 },
  selectedCard: { backgroundColor: COLORS.primary, borderWidth: 2, borderColor: COLORS.accent },
  animalImg: { width: 80, height: 80, borderRadius: 40 },
  animalName: { fontSize: 16, fontWeight: '800', color: COLORS.primary, marginTop: 12, fontFamily: FONT_SERIF },
  selectedText: { color: 'white' },
  checkBadge: { position: 'absolute', top: 10, right: 10 },
  input: { backgroundColor: 'white', borderRadius: 15, padding: 15, marginBottom: 15, fontSize: 16, color: COLORS.primary, borderWidth: 1, borderColor: COLORS.border },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  addPhotoBtn: { width: 100, height: 100, borderRadius: 15, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: COLORS.primary },
  addPhotoText: { fontSize: 10, fontWeight: '800', marginTop: 5, color: COLORS.primary },
  previewImg: { width: 100, height: 100, borderRadius: 15 },
  promoOption: { backgroundColor: 'white', borderRadius: 20, padding: 20, marginBottom: 20, elevation: 3, borderWidth: 1, borderColor: COLORS.border },
  promoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  promoTitle: { fontSize: 18, fontWeight: '900', color: COLORS.primary, marginLeft: 10, fontFamily: FONT_SERIF },
  promoDesc: { fontSize: 13, color: COLORS.secondary, lineHeight: 18 },
  promoPrice: { fontSize: 22, fontWeight: '900', color: COLORS.primary, marginTop: 15 },
  skipBtn: { padding: 20, alignItems: 'center' },
  skipBtnText: { color: COLORS.secondary, fontWeight: '700', textDecorationLine: 'underline' },
  mainBtn: { margin: 20, backgroundColor: COLORS.primary, padding: 20, borderRadius: 20, alignItems: 'center', elevation: 5 },
  mainBtnText: { color: 'white', fontWeight: '900', fontSize: 16, letterSpacing: 1 }
});

export default NewFlockScreen;