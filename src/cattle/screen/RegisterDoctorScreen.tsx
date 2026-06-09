import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRegisterDoctor } from '../../api/hook/doctor';
import apiClient from '../../api/apiClient';
import { useUser } from '../../context/UserContext';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const RegisterDoctorScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { setUser, setToken } = useUser();

  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [consultationFee, setConsultationFee] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const registerDoctorMutation = useRegisterDoctor({
    onSuccess: (data) => {
      Alert.alert("Registration Successful", "Please log in again to continue as a doctor.", [
        { 
          text: "OK", 
          onPress: () => {
            // Logout user
            setToken(null);
            setUser(null);
            delete apiClient.defaults.headers.common['Authorization'];
            
            // Redirect to Login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login', params: { role: 'doctor' } }],
            });
          } 
        }
      ]);
    },
    onError: (error: any) => {
      Alert.alert(
        'Registration Failed',
        error?.response?.data?.message || error.message || 'Unable to register doctor. Please try again.'
      );
    }
  });

  const handleDocumentPicker = () => {
    // Mock selecting a qualification file for React Native compatibility
    setSelectedFile({
      uri: 'file:///mock/qualification_document.pdf',
      name: 'qualification_document.pdf',
      type: 'application/pdf'
    });
    Alert.alert('File Selected', 'qualification_document.pdf has been attached.');
  };

  const handleRegister = () => {
    if (!specialization.trim()) {
      Alert.alert('Validation Error', 'Please enter your specialization.');
      return;
    }
    if (!experienceYears.trim() || isNaN(Number(experienceYears))) {
      Alert.alert('Validation Error', 'Please enter a valid number of experience years.');
      return;
    }
    if (!consultationFee.trim() || isNaN(Number(consultationFee))) {
      Alert.alert('Validation Error', 'Please enter a valid consultation fee.');
      return;
    }

    const payload: any = {
      licenseNumber: licenseNumber.trim() || null,
      specialization: specialization.trim(),
      experienceYears: parseInt(experienceYears, 10),
      consultationFee: parseFloat(consultationFee),
      latitude: 18.5204, // default Pune coordinates, will be updated in SelectLocation screen
      longitude: 73.8567,
      stateName: 'Maharashtra',
      cityName: 'Pune',
    };

    if (selectedFile) {
      payload.qualificationDoc = selectedFile;
    }

    registerDoctorMutation.mutate(payload);
  };

  return (
    <ImageBackground
      source={require('../../../assets/cattle_farm.png')}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={COLORS.isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
          
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.formCard}>
                <Text style={styles.cardTitle}>Doctor Registration</Text>
                <Text style={styles.cardSubtitle}>
                  Provide your professional credentials to apply for verified status.
                </Text>

                {/* License Number Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>License Number (Optional)</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="file-certificate-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. VET-12345-IN"
                      placeholderTextColor="#9CA3AF"
                      value={licenseNumber}
                      onChangeText={setLicenseNumber}
                    />
                  </View>
                </View>

                {/* Specialization Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Specialization</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="stethoscope" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Livestock Surgeon, General Vet"
                      placeholderTextColor="#9CA3AF"
                      value={specialization}
                      onChangeText={setSpecialization}
                    />
                  </View>
                </View>

                {/* Experience Years Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Years of Experience</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="clock-outline" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. 8"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                      value={experienceYears}
                      onChangeText={setExperienceYears}
                    />
                  </View>
                </View>

                {/* Consultation Fee Input */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Consultation Fee (₹)</Text>
                  <View style={styles.inputWrapper}>
                    <Icon name="currency-inr" size={20} color="#0D9488" style={styles.inputIcon} />
                    <View style={styles.dividerV} />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. 250"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="numeric"
                      value={consultationFee}
                      onChangeText={setConsultationFee}
                    />
                  </View>
                </View>

                {/* Qualification File Upload */}
                <View style={styles.formGroup}>
                  <Text style={styles.fieldLabel}>Qualification Document</Text>
                  <TouchableOpacity
                    style={[styles.uploadBox, selectedFile && styles.uploadBoxActive]}
                    onPress={handleDocumentPicker}
                  >
                    <Icon
                      name={selectedFile ? 'file-check-outline' : 'cloud-upload-outline'}
                      size={28}
                      color={selectedFile ? '#0D9488' : '#6B7280'}
                    />
                    <Text style={styles.uploadText}>
                      {selectedFile ? selectedFile.name : 'Upload Certificate / ID (PDF/JPG)'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={[styles.submitBtn, registerDoctorMutation.isPending && styles.submitBtnDisabled]}
                  onPress={handleRegister}
                  disabled={registerDoctorMutation.isPending}
                  activeOpacity={0.8}
                >
                  {registerDoctorMutation.isPending ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.submitBtnText}>SUBMIT REGISTRATION</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const getStyles = (COLORS: any) =>
  StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    backgroundImageStyle: {
      transform: [{ scale: 1.2 }],
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    formCard: {
      backgroundColor: COLORS.surface,
      borderRadius: 32,
      padding: 24,
      borderWidth: 1,
      borderColor: COLORS.border,
      elevation: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
    },
    cardTitle: {
      fontSize: 26,
      fontWeight: '900',
      color: COLORS.primary,
      fontFamily: FONT_SERIF,
      textAlign: 'center',
    },
    cardSubtitle: {
      fontSize: 13,
      fontWeight: '600',
      color: COLORS.secondary,
      fontFamily: FONT_SANS,
      textAlign: 'center',
      marginTop: 6,
      marginBottom: 24,
      lineHeight: 18,
    },
    formGroup: {
      marginBottom: 18,
    },
    fieldLabel: {
      fontSize: 12,
      fontWeight: '800',
      color: COLORS.primary,
      fontFamily: FONT_SANS,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.isDark ? '#1F2937' : '#F3F4F6',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.border,
      paddingHorizontal: 14,
      height: 52,
    },
    inputIcon: {
      marginRight: 10,
    },
    dividerV: {
      width: 1,
      height: 20,
      backgroundColor: COLORS.border,
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 14,
      fontWeight: '700',
      color: COLORS.primary,
      fontFamily: FONT_SANS,
    },
    uploadBox: {
      borderWidth: 1.5,
      borderColor: COLORS.border,
      borderStyle: 'dashed',
      borderRadius: 16,
      paddingVertical: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.isDark ? '#1F2937' : '#F9FAFB',
    },
    uploadBoxActive: {
      borderColor: '#0D9488',
      backgroundColor: '#E6F4F1',
    },
    uploadText: {
      fontSize: 12,
      fontWeight: '700',
      color: COLORS.secondary,
      fontFamily: FONT_SANS,
      marginTop: 6,
    },
    submitBtn: {
      backgroundColor: COLORS.primary,
      height: 54,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      elevation: 5,
    },
    submitBtnDisabled: {
      backgroundColor: COLORS.secondary,
    },
    submitBtnText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '900',
      fontFamily: FONT_SANS,
      letterSpacing: 1,
    },
  });

export default RegisterDoctorScreen;
