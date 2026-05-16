import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../../context/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const COLORS = {
  primary: '#0F291E',
  secondary: '#3D5447',
  accent: '#10B981',
  background: '#F8FAFA',
  surface: '#FFFFFF',
  border: '#E5E7EB',
};

const InputField = ({ label, value, onChangeText, placeholder, icon, keyboardType = 'default' }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Icon name={icon} size={20} color={COLORS.secondary} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const UpdateAddressScreen = ({ navigation }: any) => {
  const { address: globalAddress, updateAddress } = useUser();
  const [address, setAddress] = useState(globalAddress);

  const handleSave = () => {
    updateAddress(address);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping Address</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionSubtitle}>Ensure your delivery details are up to date for smooth marketplace logistics.</Text>

        <View style={styles.formCard}>
          <InputField 
            label="Full Name" 
            value={address.fullName} 
            onChangeText={(t: string) => setAddress({...address, fullName: t})}
            placeholder="Enter your full name"
            icon="person-outline"
          />

          <InputField 
            label="Phone Number" 
            value={address.phone} 
            onChangeText={(t: string) => setAddress({...address, phone: t})}
            placeholder="Enter phone number"
            icon="phone"
            keyboardType="phone-pad"
          />

          <InputField 
            label="Street Address" 
            value={address.street} 
            onChangeText={(t: string) => setAddress({...address, street: t})}
            placeholder="House no, Street name"
            icon="place"
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <InputField 
                label="City" 
                value={address.city} 
                onChangeText={(t: string) => setAddress({...address, city: t})}
                placeholder="City"
                icon="location-city"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <InputField 
                label="State" 
                value={address.state} 
                onChangeText={(t: string) => setAddress({...address, state: t})}
                placeholder="State"
                icon="map"
              />
            </View>
          </View>

          <InputField 
            label="ZIP Code" 
            value={address.zip} 
            onChangeText={(t: string) => setAddress({...address, zip: t})}
            placeholder="Enter ZIP code"
            icon="markasread"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.infoBox}>
          <Icon name="info-outline" size={18} color={COLORS.secondary} />
          <Text style={styles.infoText}>This address will be used for all your livestock and product deliveries.</Text>
        </View>
      </ScrollView>

      {/* Footer Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveBtn}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </View>

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

  scrollContent: { padding: 24, paddingBottom: 120 },
  sectionSubtitle: { fontSize: 13, color: COLORS.secondary, lineHeight: 20, marginBottom: 25, fontWeight: '500' },

  formCard: { backgroundColor: 'white', borderRadius: 30, padding: 25, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 15 },
  
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '800', color: COLORS.primary, marginBottom: 8, marginLeft: 2, fontFamily: FONT_SANS },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.background, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: COLORS.border,
    height: 56,
    paddingHorizontal: 15
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: COLORS.primary, fontWeight: '700', fontFamily: FONT_SANS },

  row: { flexDirection: 'row' },

  infoBox: { flexDirection: 'row', alignItems: 'center', marginTop: 25, paddingHorizontal: 10 },
  infoText: { flex: 1, fontSize: 11, color: COLORS.secondary, marginLeft: 10, fontWeight: '600', lineHeight: 16 },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: 'white', padding: 20, borderTopWidth: 1, borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 40 : 25
  },
  saveBtn: { 
    backgroundColor: COLORS.primary, 
    height: 60, borderRadius: 20, 
    alignItems: 'center', justifyContent: 'center',
    elevation: 10, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10
  },
  saveBtnText: { color: 'white', fontSize: 15, fontWeight: '900', letterSpacing: 1 }
});

export default UpdateAddressScreen;
