import React, { useEffect, useState } from 'react';
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

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#FFB800',
  background: '#F8FAFA',
  emerald: '#10B981',
  border: '#E2E8F0',
};

const NewFlockScreen = ({ navigation, route }: any) => {
  const [step, setStep] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState('Cow');
  const [flockName, setFlockName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('none');

  useEffect(() => {
    if (route.params?.initialImage) {
      setSelectedImages([route.params.initialImage]);
      setStep(2);
      navigation.setParams({ initialImage: undefined });
    }
  }, [route.params?.initialImage]);

  const handleImagePick = () => {
    Alert.alert('Select Photo', 'Choose a source to add your animal photo', [
      { 
        text: 'Camera', 
        onPress: () => ImagePicker.launchCamera({ mediaType: 'photo' }, (res) => {
          if (res.assets && res.assets[0].uri) {
            setSelectedImages([...selectedImages, res.assets[0].uri]);
          }
        }) 
      },
      { 
        text: 'Gallery', 
        onPress: () => ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (res) => {
          if (res.assets && res.assets[0].uri) {
            setSelectedImages([...selectedImages, res.assets[0].uri]);
          }
        }) 
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleCreate = (overridePlan?: string) => {
    const planToUse = overridePlan !== undefined ? overridePlan : selectedPlan;
    Alert.alert('Registering Specimen...', 'Uploading details to the registry.');
    setTimeout(() => {
      // Map category to AnimalCategory enum: COW, BUFFALO, GOAT, DOG, CAT, HORSE, SHEEP, RABBIT, POULTRY, EXOTIC, OTHER
      let animalCategory = 'OTHER';
      const animalLower = selectedAnimal.toLowerCase();
      if (animalLower.includes('cow') || animalLower.includes('bull')) animalCategory = 'COW';
      else if (animalLower.includes('buffalo')) animalCategory = 'BUFFALO';
      else if (animalLower.includes('goat')) animalCategory = 'GOAT';
      else if (animalLower.includes('dog')) animalCategory = 'DOG';
      else if (animalLower.includes('cat')) animalCategory = 'CAT';
      else if (animalLower.includes('horse')) animalCategory = 'HORSE';
      else if (animalLower.includes('sheep')) animalCategory = 'SHEEP';
      else if (animalLower.includes('rabbit')) animalCategory = 'RABBIT';
      
      const newAnimalPayload = {
        title: flockName || 'Elite Animal Specimen',
        category: animalCategory,
        breed: selectedAnimal,
        price: planToUse === 'top' ? '85,000' : (planToUse === 'certified' ? '92,000' : '15,000'),
        description: description || 'Premium lineage, excellent health records.',
        images: selectedImages.length > 0 ? selectedImages : ['https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400'],
        weight: 120.0,
        milkProduction: 10.0,
        ageMonths: 12,
        gender: 'FEMALE',
        vaccination: 'VACCINATED',
        isNegotiable: true,
        isFeatured: planToUse === 'top',
        isPremium: planToUse === 'certified',
        status: 'ACTIVE',
        address: 'Ambala, Haryana',
        phone: '9876543210',

        // Compatibility fields for legacy screens
        name: flockName || 'Elite Animal Specimen',
        info: 'Ambala, Haryana',
        type: planToUse === 'top' ? 'FEATURED' : (planToUse === 'certified' ? 'PREMIUM' : 'NEW'),
        image: selectedImages[0] || 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400',
        yield: '10L/day',
        age: '1 Year',
        desc: description || 'Premium lineage, excellent health records.'
      };

      navigation.navigate('MainApp', { screen: 'Home', params: { newAnimal: newAnimalPayload } });
    }, 1500);
  };

  const renderStep1 = () => {
    const animals = [
      { id: 'Cow', name: 'Cow', img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=200' },
      { id: 'Bull', name: 'Bull', img: 'https://images.unsplash.com/photo-1551135020-39e4ca508d9e?auto=format&fit=crop&q=80&w=200' },
      { id: 'Buffalo', name: 'Buffalo', img: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=200' },
      { id: 'Rabbit', name: 'Rabbit', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=200' },
      { id: 'Goat', name: 'Goat', img: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=200' },
      { id: 'Other', name: 'Other Specimen', icon: 'pets' },
    ];

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Select Specimen Type</Text>
        <Text style={styles.stepDesc}>Choose the category that best represents your livestock or animal breed.</Text>
        
        <View style={styles.grid}>
          {animals.map((item) => {
            const isSelected = selectedAnimal === item.id;
            return (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => setSelectedAnimal(item.id)}
                style={[styles.animalCard, isSelected && styles.selectedCard]}
                activeOpacity={0.8}
              >
                <View style={styles.imageRing}>
                  {item.img ? (
                    <View style={styles.imageWrapper}>
                      <Image source={{ uri: item.img }} style={styles.animalImg} resizeMode="cover" />
                    </View>
                  ) : (
                    <View style={[styles.imageWrapper, styles.placeholderIcon]}>
                      <Icon name={item.icon as string} size={28} color={isSelected ? '#FFFFFF' : COLORS.primary} />
                    </View>
                  )}
                </View>
                <Text style={[styles.animalName, isSelected && styles.selectedText]}>{item.name}</Text>
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Icon name="check" size={14} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Specimen Information</Text>
      <Text style={styles.stepDesc}>Provide details about the specimen lineage, milk yields, age, or specific certificates.</Text>
      
      <Text style={styles.inputLabel}>Specimen / Breed Title *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. Sahiwal Breed Dairy Cow" 
        value={flockName} 
        onChangeText={setFlockName} 
        placeholderTextColor="#94A3B8" 
      />

      <Text style={styles.inputLabel}>Description & History</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Describe ancestry, vaccination dates, habits, or yield histories..." 
        multiline 
        numberOfLines={4}
        value={description} 
        onChangeText={setDescription} 
        placeholderTextColor="#94A3B8" 
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Showcase Media</Text>
      <Text style={styles.stepDesc}>High-resolution pictures of the animal dramatically increase dealer inquiry rates.</Text>
      
      <View style={styles.photoGrid}>
        <TouchableOpacity style={styles.addPhotoBtn} onPress={handleImagePick} activeOpacity={0.7}>
          <Icon name="add-a-photo" size={28} color={COLORS.primary} />
          <Text style={styles.addPhotoText}>UPLOAD PHOTO</Text>
        </TouchableOpacity>
        
        {selectedImages.map((uri, i) => (
          <View key={i} style={styles.previewContainer}>
            <Image source={{ uri }} style={styles.previewImg} resizeMode="cover" />
            <TouchableOpacity 
              style={styles.deletePhotoBtn} 
              onPress={() => handleRemoveImage(i)}
              activeOpacity={0.7}
            >
              <Icon name="close" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Enhance Listing Visibility</Text>
      <Text style={styles.stepDesc}>Unlock priority display features to match with premium certified buyers faster.</Text>
      
      {/* Free Standard Plan Card */}
      <TouchableOpacity 
        style={[styles.promoOption, selectedPlan === 'free' && styles.selectedPromoOption]} 
        onPress={() => {
          setSelectedPlan('free');
          handleCreate('free');
        }}
        activeOpacity={0.8}
      >
        <View style={styles.promoHeader}>
          <View style={[styles.promoIconWrapper, { backgroundColor: '#E0F2FE' }]}>
            <Icon name="assignment" size={20} color="#0284C7" />
          </View>
          <View style={styles.promoMeta}>
            <Text style={styles.promoTitle}>Free Standard Listing</Text>
            <Text style={styles.promoDuration}>Standard Search Rank</Text>
          </View>
          <Text style={[styles.promoPrice, { color: '#0284C7' }]}>Free</Text>
        </View>
        <Text style={styles.promoDesc}>Publish your specimen listing instantly with no premium visibility options.</Text>
        {selectedPlan === 'free' && (
          <View style={[styles.promoSelectedBadge, { backgroundColor: '#E0F2FE' }]}>
            <Icon name="check-circle" size={12} color="#0284C7" style={{ marginRight: 4 }} />
            <Text style={[styles.promoSelectedText, { color: '#0369A1' }]}>PUBLISHING...</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Top Placed Ad Card */}
      <TouchableOpacity 
        style={[styles.promoOption, selectedPlan === 'top' && styles.selectedPromoOption]} 
        onPress={() => setSelectedPlan(selectedPlan === 'top' ? 'none' : 'top')}
        activeOpacity={0.9}
      >
        <View style={styles.promoHeader}>
          <View style={[styles.promoIconWrapper, { backgroundColor: '#FEF3C7' }]}>
            <Icon name="trending-up" size={20} color={COLORS.accent} />
          </View>
          <View style={styles.promoMeta}>
            <Text style={styles.promoTitle}>Top Placed Ad</Text>
            <Text style={styles.promoDuration}>7 Days Priority Feed</Text>
          </View>
          <Text style={styles.promoPrice}>$15.00</Text>
        </View>
        <Text style={styles.promoDesc}>Display this specimen at the absolute top grid coordinates of customer searches.</Text>
        {selectedPlan === 'top' && (
          <View style={styles.promoSelectedBadge}>
            <Icon name="check-circle" size={12} color="#15803D" style={{ marginRight: 4 }} />
            <Text style={styles.promoSelectedText}>SELECTED</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Certified Dealer Badge Card */}
      <TouchableOpacity 
        style={[styles.promoOption, selectedPlan === 'certified' && styles.selectedPromoOption]} 
        onPress={() => setSelectedPlan(selectedPlan === 'certified' ? 'none' : 'certified')}
        activeOpacity={0.9}
      >
        <View style={styles.promoHeader}>
          <View style={[styles.promoIconWrapper, { backgroundColor: '#D1FAE5' }]}>
            <Icon name="verified-user" size={20} color={COLORS.emerald} />
          </View>
          <View style={styles.promoMeta}>
            <Text style={styles.promoTitle}>Certified Dealer Badge</Text>
            <Text style={styles.promoDuration}>30 Days Badge Protection</Text>
          </View>
          <Text style={styles.promoPrice}>$25.00</Text>
        </View>
        <Text style={styles.promoDesc}>Mark the listing with a verified gold protection badge, signaling veterinarian compliance.</Text>
        {selectedPlan === 'certified' && (
          <View style={styles.promoSelectedBadge}>
            <Icon name="check-circle" size={12} color="#15803D" style={{ marginRight: 4 }} />
            <Text style={styles.promoSelectedText}>SELECTED</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.skipBtn} 
        onPress={() => handleCreate(selectedPlan)}
        activeOpacity={0.7}
      >
        <Text style={styles.skipBtnText}>
          {selectedPlan !== 'none' ? 'Published' : 'Skip Promotion & Publish Free'}
        </Text>
        <Icon name="arrow-forward" size={16} color={COLORS.secondary} style={{ marginLeft: 6 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}
          style={styles.circleButton}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Specimen Registry</Text>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>Step {step} of 4</Text>
        </View>
      </View>

      {/* Modern Progress Line */}
      <View style={styles.progressBarWrapper}>
        {[1, 2, 3, 4].map((s) => (
          <View 
            key={s} 
            style={[
              styles.progressBarLine,
              s <= step ? styles.activeProgress : styles.inactiveProgress
            ]}
          />
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </ScrollView>

      {step < 4 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.mainBtn} 
            onPress={() => {
              if (step === 2 && !flockName.trim()) {
                Alert.alert('Required Field', 'Please enter a name for the specimen listing.');
                return;
              }
              setStep(step + 1);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.mainBtnText}>
              {step === 3 ? 'PROCEED TO PUBLISH' : 'CONTINUE'}
            </Text>
            <Icon name="arrow-forward" size={18} color="white" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  header: { 
    height: 60, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    backgroundColor: '#F8FAFC' 
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
  stepBadge: { 
    backgroundColor: '#0F291E', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8 
  },
  stepBadgeText: { 
    color: '#FFFFFF', 
    fontSize: 10, 
    fontWeight: '800',
    fontFamily: FONT_SANS,
  },

  progressBarWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 4,
    gap: 6,
  },
  progressBarLine: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  activeProgress: {
    backgroundColor: '#10B981',
  },
  inactiveProgress: {
    backgroundColor: '#E2E8F0',
  },

  scrollContent: { 
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  
  stepContainer: { flex: 1 },
  stepTitle: { 
    fontSize: 22, 
    fontWeight: '900', 
    color: '#0F291E', 
    fontFamily: FONT_SERIF,
    marginBottom: 6,
  },
  stepDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 24,
    fontFamily: FONT_SANS,
  },

  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 12,
  },
  animalCard: { 
    width: (width - 56) / 2, 
    height: 150, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCard: { 
    backgroundColor: '#0F291E', 
    borderWidth: 2, 
    borderColor: '#FFB800' 
  },
  imageRing: {
    padding: 3,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  placeholderIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animalImg: { 
    width: '100%', 
    height: '100%' 
  },
  animalName: { 
    fontSize: 14, 
    fontWeight: '800', 
    color: '#0F291E', 
    marginTop: 10, 
    fontFamily: FONT_SANS 
  },
  selectedText: { 
    color: '#FFFFFF' 
  },
  checkBadge: { 
    position: 'absolute', 
    top: 10, 
    right: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFB800',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3D5447',
    marginBottom: 8,
    marginTop: 16,
    fontFamily: FONT_SANS,
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 14, 
    padding: 14, 
    fontSize: 15, 
    color: '#0F291E', 
    borderWidth: 1.5, 
    borderColor: '#E2E8F0',
    fontFamily: FONT_SANS,
  },
  textArea: { 
    height: 110, 
    textAlignVertical: 'top' 
  },

  photoGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12 
  },
  addPhotoBtn: { 
    width: (width - 64) / 3, 
    height: (width - 64) / 3, 
    borderRadius: 14, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderStyle: 'dashed', 
    borderWidth: 2, 
    borderColor: '#0F291E' 
  },
  addPhotoText: { 
    fontSize: 9, 
    fontWeight: '800', 
    marginTop: 6, 
    color: '#0F291E',
    fontFamily: FONT_SANS,
    letterSpacing: 0.5,
  },
  previewContainer: {
    width: (width - 64) / 3, 
    height: (width - 64) / 3,
    borderRadius: 14,
    overflow: 'hidden',
  },
  previewImg: { 
    width: '100%', 
    height: '100%' 
  },
  deletePhotoBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  promoOption: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 16, 
    borderWidth: 1.5, 
    borderColor: '#F1F5F9',
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  selectedPromoOption: {
    borderColor: '#10B981',
    borderWidth: 2,
    backgroundColor: '#F0FDF4',
  },
  promoSelectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  promoSelectedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
    fontFamily: FONT_SANS,
  },
  promoHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  promoIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoMeta: {
    marginLeft: 12,
    flex: 1,
  },
  promoTitle: { 
    fontSize: 15, 
    fontWeight: '800', 
    color: '#0F291E', 
    fontFamily: FONT_SANS 
  },
  promoDuration: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
    fontFamily: FONT_SANS,
  },
  promoDesc: { 
    fontSize: 12, 
    color: '#64748B', 
    lineHeight: 16,
    fontFamily: FONT_SANS,
  },
  promoPrice: { 
    fontSize: 18, 
    fontWeight: '900', 
    color: '#10B981',
    fontFamily: FONT_SANS,
  },
  skipBtn: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14, 
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  skipBtnText: { 
    color: '#3D5447', 
    fontWeight: '800', 
    fontSize: 13,
    fontFamily: FONT_SANS,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  mainBtn: { 
    height: 54,
    borderRadius: 16, 
    backgroundColor: '#0F291E', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#0F291E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4 
  },
  mainBtnText: { 
    color: '#FFFFFF', 
    fontWeight: '800', 
    fontSize: 14, 
    letterSpacing: 0.5,
    fontFamily: FONT_SANS,
  }
});

export default NewFlockScreen;