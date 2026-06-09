import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const FarmProfileScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const { user, setUser, address: userAddress, updateAddress } = useUser();

  const [farmName, setFarmName] = useState(user?.name || 'Rashid Farm');
  const [ownerName, setOwnerName] = useState(userAddress?.fullName || 'Rashid Sharma');
  const [phone, setPhone] = useState(user?.phone || userAddress?.phone || '+91 98765 43210');
  const [street, setStreet] = useState(userAddress?.street || 'Village Rampur');
  const [city, setCity] = useState(userAddress?.city || 'Kota');
  const [stateVal, setStateVal] = useState(userAddress?.state || 'Rajasthan');
  const [zip, setZip] = useState(userAddress?.zip || '324001');
  const [land, setLand] = useState('15 Acres');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farm Profile</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.label}>Farm Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={farmName}
              onChangeText={setFarmName}
              placeholderTextColor={COLORS.secondary + '60'}
            />
          </View>

          <Text style={styles.label}>Owner Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={ownerName}
              onChangeText={setOwnerName}
              placeholderTextColor={COLORS.secondary + '60'}
            />
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor={COLORS.secondary + '60'}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>Street Address</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={street}
              onChangeText={setStreet}
              placeholderTextColor={COLORS.secondary + '60'}
            />
          </View>

          <Text style={styles.label}>City</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholderTextColor={COLORS.secondary + '60'}
            />
          </View>

          <Text style={styles.label}>State</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={stateVal}
              onChangeText={setStateVal}
              placeholderTextColor={COLORS.secondary + '60'}
            />
          </View>

          <Text style={styles.label}>Zip Code</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={zip}
              onChangeText={setZip}
              placeholderTextColor={COLORS.secondary + '60'}
              keyboardType="number-pad"
            />
          </View>

          <Text style={styles.label}>Total Land</Text>
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={land}
              onChangeText={setLand}
              placeholderTextColor={COLORS.secondary + '60'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Changes button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.editBtn} 
          onPress={() => {
            if (!farmName.trim() || !ownerName.trim() || !phone.trim() || !street.trim() || !city.trim() || !stateVal.trim() || !zip.trim()) {
              Alert.alert('Error', 'Please fill in all fields.');
              return;
            }
            if (user) {
              setUser({
                ...user,
                name: farmName,
                phone: phone,
              });
            }
            updateAddress({
              fullName: ownerName,
              phone: phone,
              street: street,
              city: city,
              state: stateVal,
              zip: zip,
            });
            Alert.alert('Success', 'Profile updated successfully!', [
              { text: 'OK', onPress: () => navigation.goBack() }
            ]);
          }} 
          activeOpacity={0.85}
        >
          <Text style={styles.editBtnText}>Save Changes</Text>
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

  scrollContent: { paddingHorizontal: 24, paddingTop: 15, paddingBottom: 110 },
  form: { gap: 16 },
  label: { fontSize: 13, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SANS, marginBottom: 2 },
  inputWrapper: {
    height: 56, backgroundColor: '#FFFFFF', borderRadius: 18, 
    borderWidth: 1.5, borderColor: COLORS.border, paddingHorizontal: 16,
    justifyContent: 'center'
  },
  input: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  textAreaWrapper: { height: 100, paddingVertical: 10 },
  textArea: { height: '100%', textAlignVertical: 'top' },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 24, backgroundColor: '#FFFFFF' 
  },
  editBtn: { 
    height: 60, backgroundColor: '#16A34A', borderRadius: 28, 
    justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10
  },
  editBtnText: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS }
});

export default FarmProfileScreen;
