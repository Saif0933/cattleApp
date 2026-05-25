import React, { useState } from 'react';
import {
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

const SettingsScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitleLabel}>Application Preferences</Text>
        <View style={styles.menuCard}>
          {/* Language Selector */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.darkGreen + '08' }]}>
              <Icon name="language" size={22} color={COLORS.darkGreen} />
            </View>
            <Text style={styles.menuText}>Language</Text>
            <Text style={styles.valText}>English</Text>
            <Icon name="chevron-right" size={20} color={COLORS.secondary} style={{ opacity: 0.5 }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Notifications Toggle */}
          <View style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.darkGreen + '08' }]}>
              <Icon name="notifications-none" size={22} color={COLORS.darkGreen} />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Switch
              trackColor={{ false: '#E5E7EB', true: '#16A34A' }}
              thumbColor={notifications ? '#FFFFFF' : '#F3F4F6'}
              onValueChange={setNotifications}
              value={notifications}
            />
          </View>

          <View style={styles.divider} />

          {/* Dark Mode Toggle */}
          <View style={styles.menuItem}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.darkGreen + '08' }]}>
              <Icon name="brightness-2" size={22} color={COLORS.darkGreen} />
            </View>
            <Text style={styles.menuText}>Dark Mode</Text>
            <Switch
              trackColor={{ false: '#E5E7EB', true: '#16A34A' }}
              thumbColor={darkMode ? '#FFFFFF' : '#F3F4F6'}
              onValueChange={setDarkMode}
              value={darkMode}
            />
          </View>

          <View style={styles.divider} />

          {/* Change Password */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.darkGreen + '08' }]}>
              <Icon name="lock-outline" size={22} color={COLORS.darkGreen} />
            </View>
            <Text style={styles.menuText}>Change Password</Text>
            <Icon name="chevron-right" size={20} color={COLORS.secondary} style={{ opacity: 0.5 }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Privacy Policy */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.darkGreen + '08' }]}>
              <Icon name="security" size={22} color={COLORS.darkGreen} />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Icon name="chevron-right" size={20} color={COLORS.secondary} style={{ opacity: 0.5 }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Terms & Conditions */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.darkGreen + '08' }]}>
              <Icon name="assignment" size={22} color={COLORS.darkGreen} />
            </View>
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Icon name="chevron-right" size={20} color={COLORS.secondary} style={{ opacity: 0.5 }} />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Delete Account */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: COLORS.crimson + '08' }]}>
              <Icon name="delete-outline" size={22} color={COLORS.crimson} />
            </View>
            <Text style={[styles.menuText, { color: COLORS.crimson }]}>Delete Account</Text>
            <Icon name="chevron-right" size={20} color={COLORS.crimson} style={{ opacity: 0.5 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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

  scrollContent: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 50 },
  sectionTitleLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.secondary,
    marginBottom: 12,
    marginLeft: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 8,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  menuText: { flex: 1, fontSize: 15, fontWeight: '800', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  valText: { fontSize: 13, color: COLORS.secondary, fontWeight: '700', marginRight: 8, fontFamily: FONT_SANS },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 14 }
});

export default SettingsScreen;
