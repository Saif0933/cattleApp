import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const RemindersScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [reminders, setReminders] = useState([
    { id: '1', title: 'FMD Vaccination', date: 'Tomorrow, 10:00 AM', active: true },
    { id: '2', title: 'Deworming', date: 'May 24, 2024, 09:00 AM', active: true },
    { id: '3', title: 'Health Checkup', date: 'May 25, 2024, 11:00 AM', active: true },
    { id: '4', title: 'AI Schedule - Gauri', date: 'May 25, 2024, 10:00 AM', active: false }
  ]);

  const toggleSwitch = (id: string) => {
    setReminders(prev => prev.map(rem => rem.id === id ? { ...rem, active: !rem.active } : rem));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {reminders.map((rem) => (
            <View key={rem.id} style={styles.card}>
              <View style={styles.details}>
                <Text style={styles.title}>{rem.title}</Text>
                <Text style={styles.date}>{rem.date}</Text>
              </View>
              <Switch
                trackColor={{ false: '#E5E7EB', true: '#16A34A' }}
                thumbColor={rem.active ? '#FFFFFF' : '#F3F4F6'}
                ios_backgroundColor="#E5E7EB"
                onValueChange={() => toggleSwitch(rem.id)}
                value={rem.active}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Reminder Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => Alert.alert('Reminders', 'Add reminder feature coming soon.')}
          activeOpacity={0.85}
        >
          <Icon name="add" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.addText}>Add Reminder</Text>
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
  list: { gap: 15 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  details: { flex: 1, marginRight: 10 },
  title: { fontSize: 15, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  date: { fontSize: 12, color: COLORS.secondary, marginTop: 4, fontWeight: '600', fontFamily: FONT_SANS },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 24, backgroundColor: '#FFFFFF' 
  },
  addBtn: { 
    height: 60, backgroundColor: '#16A34A', borderRadius: 28, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10
  },
  addText: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS }
});

export default RemindersScreen;
