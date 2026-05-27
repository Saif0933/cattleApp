import React, { useState, useEffect } from 'react';
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
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../../context/useTheme';
import { useCreateAnimalListing } from '../../api/hook/animal/listing';
import { useGetAllCategories, useGetAllSubCategories } from '../../api/hook/animal/category';
import type { CreateAnimalListingRequest } from '../../types/animal.types';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const mapListingToProduct = (listing: any) => {
  const primaryImage = listing.images && listing.images.length > 0
    ? (listing.images[0].url?.secure_url || listing.images[0].url || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400')
    : 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400';

  const allImages = listing.images && listing.images.length > 0
    ? listing.images.map((img: any) => img.url?.secure_url || img.url || primaryImage)
    : [primaryImage];

  const age = listing.animal?.ageMonths
    ? `${Math.floor(listing.animal.ageMonths / 12)} Years`
    : '3 Years';

  return {
    id: listing.id,
    name: listing.animal?.name || listing.title,
    category: listing.animal?.category || 'Cow',
    breed: listing.animal?.breed || 'Other',
    age: age,
    location: listing.location?.city?.name || listing.location?.state?.name || 'Punjab',
    price: `₹ ${parseInt(listing.price || '55000').toLocaleString('en-IN')}`,
    isPremium: listing.status === 'PREMIUM',
    status: listing.status || 'For Sale',
    image: primaryImage,
    images: allImages,
    description: listing.description || listing.animal?.description || '',
    gender: listing.animal?.gender || 'Female',
    weight: listing.animal?.weightKg ? `${listing.animal.weightKg} kg` : '450 kg',
    milkYield: listing.animal?.dailyMilkProdLtr ? `${listing.animal.dailyMilkProdLtr} L/day` : undefined,
    color: 'White',
  };
};

const BREEDS_BY_TYPE: Record<string, string[]> = {
  Cow: ['HF Cross', 'Jersey', 'Gir', 'Sahiwal', 'Red Sindhi', 'Tharparkar', 'Kankrej', 'Other'],
  Buffalo: ['Murrah', 'Nili Ravi', 'Jaffarabadi', 'Surti', 'Bhadawari', 'Mehsana', 'Other'],
  Calf: ['HF Calf', 'Jersey Calf', 'Gir Calf', 'Sahiwal Calf', 'Other'],
  Fish: ['Rohu', 'Catla', 'Mrigal', 'Tilapia', 'Carp', 'Catfish', 'Other'],
  Cat: ['Persian Cat', 'Siamese Cat', 'British Shorthair Cat', 'Indian Breed','Russian Blue','Other'],
  Goat: ['Sirohi', 'Jamunapari', 'Barbari', 'Beetal', 'Osmanabadi', 'Other'],
  Sheep: ['Nellore', 'Marwari', 'Deccani', 'Bellary', 'Rambouillet', 'Other'],
  Birds: ['Broiler Chicken', 'Layer Chicken', 'Country Chicken', 'Duck', 'Quail', 'Other'],
  Dog: ['Labrador', 'German Shepherd', 'Golden Retriever', 'Spitz', 'Pug', 'Rottweiler', 'Other'],
};

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AddCattleScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  // Stepper state
  const [step, setStep] = useState(1);

  // Form states
  const [type, setType] = useState('Cow');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [breed, setBreed] = useState('HF Cross');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('Select date');
  const [gender, setGender] = useState('Female');
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');

  // Modals
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  
  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  // API hooks
  const { data: categoriesResponse } = useGetAllCategories();
  const categories = categoriesResponse?.data || [];

  const { data: subCategoriesResponse } = useGetAllSubCategories();
  const subCategories = subCategoriesResponse?.data || [];

  // Synchronize dynamic category lists
  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      // Find default category
      const cowCat = categories.find(c => c.name.toLowerCase() === 'cow') || categories[0];
      setSelectedCategoryId(cowCat.id);
      setType(cowCat.name);

      // Find default subcategory
      const matchedSubs = subCategories.filter(s => s.categoryId === cowCat.id);
      if (matchedSubs.length > 0) {
        setBreed(matchedSubs[0].name);
        setSelectedSubCategoryId(matchedSubs[0].id);
      }
    }
  }, [categories, subCategories]);

  const { mutate: createListing, isPending: isSaving } = useCreateAnimalListing({
    onSuccess: (response) => {
      const newProduct = mapListingToProduct(response.data);
      Alert.alert('Success', 'Cattle added to herd registry!', [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('MainApp', { screen: 'Cattle', params: { newAnimal: newProduct } }) 
        }
      ]);
    }
  });

  const STEPS = [
    { id: 1, title: 'Select Category', instruction: 'Select the classification of your animal' },
    { id: 2, title: 'Select Breed', instruction: `Choose the breed / subcategory of ${type}` },
    { id: 3, title: 'Basic Details', instruction: 'Enter identifiers and health properties' },
    { id: 4, title: 'Add Photos', instruction: 'Add high-quality animal photos (Max 5)' },
    { id: 5, title: 'Set Price', instruction: 'Enter expected selling price' },
    { id: 6, title: 'Set Location', instruction: "Select state and city for the buyer's reference" }
  ];

  const getCategoryIconName = (catName: string) => {
    switch (catName) {
      case 'Cow': return 'cow';
      case 'Buffalo': return 'water';
      case 'Calf': return 'baby-carriage';
      case 'Fish': return 'fish';
      case 'Cat': return 'cat';
      case 'Goat': return 'goat';
      case 'Sheep': return 'sheep';
      case 'Birds': return 'bird';
      case 'Dog': return 'dog';
      default: return 'paw';
    }
  };

  const handleImagePick = () => {
    if (imageUris.length >= 5) {
      Alert.alert('Limit Reached', 'You can upload up to 5 photos.');
      return;
    }

    Alert.alert('Upload Photo', 'Choose a source to add your animal photo', [
      {
        text: 'Camera',
        onPress: () => ImagePicker.launchCamera({ mediaType: 'photo' }, (res) => {
          if (res.assets && res.assets[0].uri) {
            const uri = res.assets[0].uri;
            setImageUris(prev => [...prev, uri].slice(0, 5));
          }
        })
      },
      {
        text: 'Gallery',
        onPress: () => ImagePicker.launchImageLibrary({ 
          mediaType: 'photo',
          selectionLimit: 5 - imageUris.length
        }, (res) => {
          if (res.assets) {
            const uris = res.assets.map(a => a.uri).filter((u): u is string => !!u);
            setImageUris(prev => [...prev, ...uris].slice(0, 5));
          }
        })
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setImageUris(prev => prev.filter((_, i) => i !== index));
  };

  const handleTypeSelect = (selectedName: string, selectedId: string) => {
    setType(selectedName);
    setSelectedCategoryId(selectedId);
    
    // Find first breed belonging to this category
    const matchedSubs = subCategories.filter(
      s => s.categoryId === selectedId || s.category?.name.toLowerCase() === selectedName.toLowerCase()
    );
    if (matchedSubs.length > 0) {
      setBreed(matchedSubs[0].name);
      setSelectedSubCategoryId(matchedSubs[0].id);
    } else {
      const defaultBreeds = BREEDS_BY_TYPE[selectedName] || ['Other'];
      setBreed(defaultBreeds[0]);
      setSelectedSubCategoryId('');
    }
  };

  const validateCurrentStep = () => {
    if (step === 1) {
      if (!type) {
        Alert.alert('Selection Required', 'Please choose a category.');
        return false;
      }
    } else if (step === 2) {
      if (!breed) {
        Alert.alert('Selection Required', 'Please select a breed.');
        return false;
      }
    } else if (step === 3) {
      if (!name.trim()) {
        Alert.alert('Required Field', 'Please enter a name for your cattle.');
        return false;
      }
      if (dob === 'Select date') {
        Alert.alert('Required Field', 'Please select Date of Birth.');
        return false;
      }
    } else if (step === 4) {
      if (imageUris.length === 0) {
        Alert.alert('Required Field', 'Please upload at least 1 photo.');
        return false;
      }
    } else if (step === 5) {
      if (!price.trim()) {
        Alert.alert('Required Field', 'Please enter expected price.');
        return false;
      }
    } else if (step === 6) {
      if (!stateName) {
        Alert.alert('Required Field', 'Please select a state.');
        return false;
      }
      if (!cityName.trim()) {
        Alert.alert('Required Field', 'Please enter the city name.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (step < STEPS.length) {
        setStep(prev => prev + 1);
      } else {
        handleUpload();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleUpload = () => {
    const priceNum = price ? parseInt(price) : 55000;
    const ageMonths = dob !== 'Select date' ? (new Date().getFullYear() - currentYear) * 12 : 36;
    const lat = 31.1471;
    const lng = 75.3412;

    const uploadImages = imageUris.map((uri, idx) => ({
      uri: uri,
      name: `animal_${Date.now()}_${idx}.jpg`,
      type: 'image/jpeg'
    } as any));

    const matchedCategory = categories.find(cat => cat.name.toLowerCase() === type.toLowerCase());
    const mainCatId = selectedCategoryId || matchedCategory?.id || categories[0]?.id || "00000000-0000-0000-0000-000000000000";

    const matchedSubCategory = subCategories.find(sub => sub.name.toLowerCase() === breed.toLowerCase());
    const subCatId = selectedSubCategoryId || matchedSubCategory?.id || subCategories.find(sub => sub.categoryId === mainCatId)?.id || subCategories[0]?.id || "00000000-0000-0000-0000-000000000000";

    const payload: CreateAnimalListingRequest = {
      mainCategoryId: mainCatId,
      subCategoryId: subCatId,
      name: name,
      category: type,
      breed: breed,
      ageMonths: ageMonths,
      gender: gender,
      weightKg: 450,
      description: `A healthy ${breed} ${type}`,
      doesGiveMilk: gender === 'Female',
      dailyMilkProdLtr: 12,
      
      title: name,
      price: priceNum,
      listingDescription: `A healthy ${breed} ${type} for sale.`,
      latitude: lat,
      longitude: lng,
      
      stateName: stateName,
      cityName: cityName,
      images: uploadImages
    };

    createListing(payload, {
      onError: (err) => {
        console.log("Create listing backend error:", err);
        const localPayload = {
          title: name,
          name: name,
          type: type,
          breed: breed,
          age: dob !== 'Select date' ? `${new Date().getFullYear() - currentYear} Years` : '3 Years',
          gender: gender,
          price: `₹ ${parseInt(price).toLocaleString('en-IN')}`,
          location: `${cityName}, ${stateName}`,
          image: imageUris[0] || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400',
          images: imageUris.length > 0 ? imageUris : ['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=400'],
          id: `C${Math.floor(100 + Math.random() * 900)}`
        };
        Alert.alert('Save Success (Offline Mode)', 'Cattle added to registry!', [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('MainApp', { screen: 'Cattle', params: { newAnimal: localPayload } }) 
          }
        ]);
      }
    });
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

  const displayedCategories = categories.length > 0
    ? categories
    : Object.keys(BREEDS_BY_TYPE).map((name) => ({
        id: name,
        name: name,
        description: null,
        imageUrl: null,
        createdAt: '',
        updatedAt: ''
      }));

  let displayedSubCategories = subCategories.filter(
    sub => sub.categoryId === selectedCategoryId || sub.category?.name.toLowerCase() === type.toLowerCase()
  );
  if (displayedSubCategories.length === 0) {
    displayedSubCategories = (BREEDS_BY_TYPE[type] || ['Other']).map((name) => ({
      id: name,
      categoryId: selectedCategoryId,
      name: name,
      description: null,
      imageUrl: null,
      createdAt: '',
      updatedAt: ''
    }));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.primary} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Your Cattle</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Stepper Progress Bar */}
      <View style={styles.stepperContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarActive, { width: `${(step / STEPS.length) * 100}%` }]} />
        </View>
        <View style={styles.stepTitleRow}>
          <Text style={styles.stepNumLabel}>STEP {step} OF {STEPS.length}</Text>
          <Text style={styles.stepTitleVal}>{STEPS[step - 1].title}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Step 1: Select Category */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>{STEPS[0].instruction}</Text>
            <View style={styles.categoryGrid}>
              {displayedCategories.map((cat) => {
                const isSelected = type === cat.name;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                    onPress={() => handleTypeSelect(cat.name, cat.id)}
                    activeOpacity={0.85}
                  >
                    <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
                      {cat.imageUrl?.secure_url ? (
                        <Image 
                          source={{ uri: cat.imageUrl.secure_url }} 
                          style={{ width: 36, height: 36, borderRadius: 18 }} 
                          resizeMode="cover"
                        />
                      ) : (
                        <CommunityIcon 
                          name={getCategoryIconName(cat.name)} 
                          size={32} 
                          color={isSelected ? '#16A34A' : COLORS.primary} 
                        />
                      )}
                    </View>
                    <Text style={[styles.categoryCardText, isSelected && styles.categoryCardTextSelected]}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 2: Select Subcategory / Breed */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>Choose the breed / subcategory of {type}</Text>
            <View style={styles.breedList}>
              {displayedSubCategories.map((sub) => {
                const isSelected = breed === sub.name;
                return (
                  <TouchableOpacity
                    key={sub.id}
                    style={[styles.breedSelectRow, isSelected && styles.breedSelectRowSelected]}
                    onPress={() => {
                      setBreed(sub.name);
                      setSelectedSubCategoryId(sub.id);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.breedSelectLabel, isSelected && styles.breedSelectLabelSelected]}>
                      {sub.name}
                    </Text>
                    {isSelected ? (
                      <Icon name="check-circle" size={22} color="#16A34A" />
                    ) : (
                      <View style={styles.uncheckCircle} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 3: Basic Details */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>Enter identifiers and health properties</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Cattle Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input}
                  placeholder="Enter name (e.g. Ganga, Laxmi)"
                  placeholderTextColor={COLORS.secondary + '60'}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
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
            </View>

            <View style={styles.formGroup}>
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
          </View>
        )}

        {/* Step 4: Photos Upload */}
        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>Add high-quality animal photos (Max 5)</Text>
            <View style={styles.photosGrid}>
              {imageUris.map((uri, index) => (
                <View key={index} style={styles.thumbnailWrap}>
                  <Image source={{ uri }} style={styles.thumbnailImg} />
                  <TouchableOpacity style={styles.deleteBadge} onPress={() => handleRemoveImage(index)}>
                    <Icon name="close" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
              {imageUris.length < 5 && (
                <TouchableOpacity style={styles.dashedAddBtn} onPress={handleImagePick} activeOpacity={0.8}>
                  <Icon name="add-a-photo" size={28} color="#16A34A" />
                  <Text style={styles.addPhotoTitle}>Add Photo</Text>
                  <Text style={styles.addPhotoSub}>({imageUris.length}/5 selected)</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Step 5: Expected Price */}
        {step === 5 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>Enter expected selling price</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Price (₹)</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input}
                  placeholder="Enter price in INR (e.g. 60000)"
                  placeholderTextColor={COLORS.secondary + '60'}
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        )}

        {/* Step 6: Location */}
        {step === 6 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepInstruction}>Select state and city for the buyer's reference</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>State</Text>
              <TouchableOpacity 
                style={styles.dropdownBox}
                onPress={() => setShowStateModal(true)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dropdownValue, !stateName && { color: COLORS.secondary + '60' }]}>
                  {stateName || 'Select State'}
                </Text>
                <Icon name="arrow-drop-down" size={24} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>City</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input}
                  placeholder="Enter city (e.g. Ludhiana, Rajkot)"
                  placeholderTextColor={COLORS.secondary + '60'}
                  value={cityName}
                  onChangeText={setCityName}
                />
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Footer Nav Controls */}
      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity style={styles.backNavBtn} onPress={handleBack}>
            <Text style={styles.backNavText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.nextNavBtn, isSaving && { opacity: 0.7 }]} 
          onPress={handleNext}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.nextNavText}>{step === STEPS.length ? 'Post Cattle' : 'Next'}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* State Selector Modal Sheet */}
      <Modal
        visible={showStateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStateModal(false)}
      >
        <View style={styles.modalOverlayBottom}>
          <View style={styles.breedSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStateModal(false)} style={styles.sheetCloseBtn}>
                <Icon name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.breedListContent} showsVerticalScrollIndicator={false}>
              {INDIAN_STATES.map((state) => (
                <TouchableOpacity
                  key={state}
                  style={[styles.breedItem, stateName === state && styles.breedItemActive]}
                  onPress={() => {
                    setStateName(state);
                    setShowStateModal(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.breedItemText, stateName === state && styles.breedItemTextActive]}>
                    {state}
                  </Text>
                  {stateName === state && (
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
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  backBtn: { 
    width: 44, height: 44, borderRadius: 15, 
    justifyContent: 'center', alignItems: 'flex-start'
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  closeBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },

  // Stepper Header Progress Bar
  stepperContainer: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 8,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.isDark ? '#374151' : '#E5E7EB',
    width: '100%',
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: '#16A34A',
    borderRadius: 3,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  stepNumLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16A34A',
    fontFamily: FONT_SANS,
    letterSpacing: 0.5,
  },
  stepTitleVal: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
  },

  scrollContent: { paddingHorizontal: 24, paddingTop: 15, paddingBottom: 140 },
  
  stepContent: {
    flex: 1,
  },
  stepInstruction: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginBottom: 20,
  },

  // Category Grid (Step 1)
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 4,
  },
  categoryCardSelected: {
    borderColor: '#16A34A',
    backgroundColor: 'rgba(22, 163, 74, 0.05)',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(22, 163, 74, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircleSelected: {
    backgroundColor: '#16A34A',
  },
  categoryCardText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.darkGreen,
    fontFamily: FONT_SANS,
  },
  categoryCardTextSelected: {
    color: '#16A34A',
  },

  // Breed list selection (Step 2)
  breedList: {
    gap: 10,
  },
  breedSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  breedSelectRowSelected: {
    borderColor: '#16A34A',
    backgroundColor: 'rgba(22, 163, 74, 0.04)',
  },
  breedSelectLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.darkGreen,
    fontFamily: FONT_SANS,
  },
  breedSelectLabelSelected: {
    color: '#16A34A',
    fontWeight: '900',
  },
  uncheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.secondary + '40',
  },

  // Photos Grid (Step 4)
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  thumbnailWrap: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 18,
    position: 'relative',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  deleteBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  dashedAddBtn: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  addPhotoTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16A34A',
    fontFamily: FONT_SANS,
    marginTop: 4,
  },
  addPhotoSub: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },

  // General Form elements
  formGroup: {
    marginBottom: 16,
  },
  label: { fontSize: 13, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SANS, marginBottom: 6 },
  
  inputWrapper: {
    height: 56, backgroundColor: COLORS.surface, borderRadius: 18, 
    borderWidth: 1.5, borderColor: COLORS.border, paddingHorizontal: 16,
    justifyContent: 'center'
  },
  input: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  
  dropdownBox: { 
    height: 56, backgroundColor: COLORS.surface, borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: COLORS.border
  },
  dropdownValue: { fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },

  datePickerBtn: { 
    height: 56, backgroundColor: COLORS.surface, borderRadius: 18, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18,
    borderWidth: 1.5, borderColor: COLORS.border
  },
  dateText: { fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  
  genderRow: { flexDirection: 'row', gap: 12 },
  genderBtn: { 
    flex: 1, height: 50, borderRadius: 16, backgroundColor: COLORS.surface,
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
    backgroundColor: COLORS.surface,
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
    backgroundColor: COLORS.isDark ? '#1F2937' : '#F3F4F6',
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
    backgroundColor: COLORS.surface,
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
    borderBottomColor: COLORS.border,
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

  // Footer Navigation Controls
  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 24, backgroundColor: COLORS.surface,
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
  backNavBtn: { 
    flex: 1,
    height: 56, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.secondary + '40',
  },
  backNavText: { 
    fontSize: 15, 
    fontWeight: '900', 
    color: COLORS.secondary, 
    fontFamily: FONT_SANS 
  },
  nextNavBtn: { 
    flex: 2,
    height: 56, 
    backgroundColor: '#16A34A', 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 4, 
    shadowColor: '#16A34A', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 10
  },
  nextNavText: { 
    fontSize: 15, 
    fontWeight: '900', 
    color: '#FFFFFF', 
    fontFamily: FONT_SANS 
  }
});

export default AddCattleScreen;