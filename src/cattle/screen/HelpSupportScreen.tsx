import React from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
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

const HelpSupportScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const options = [
    { name: 'FAQs', icon: 'help-outline' },
    { name: 'Contact Support', icon: 'headset-mic' },
    { name: 'Report an issue', icon: 'report-problem' },
    { name: 'App Guide', icon: 'menu-book' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Support Options List */}
        <View style={styles.list}>
          {options.map((opt, idx) => (
            <TouchableOpacity key={idx} style={styles.item} activeOpacity={0.8}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.secondary + '0B' }]}>
                <Icon name={opt.icon} size={22} color={COLORS.darkGreen} />
              </View>
              <Text style={styles.itemName}>{opt.name}</Text>
              <Icon name="chevron-right" size={20} color={COLORS.secondary} style={{ opacity: 0.5 }} />
            </TouchableOpacity>
          ))}

          {/* Rate Us Option with 5 gold stars */}
          <View style={styles.rateCard}>
            <View style={styles.rateHeader}>
              <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                <Icon name="star-outline" size={22} color="#F59E0B" />
              </View>
              <Text style={styles.itemName}>Rate Us</Text>
            </View>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Icon key={s} name="star" size={30} color="#F59E0B" style={{ marginRight: 6 }} />
              ))}
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Chat With Support CTA */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.chatBtn}
          onPress={() => Alert.alert('Support', 'Chat support coming soon.')}
          activeOpacity={0.85}
        >
          <Icon name="chat-bubble-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.chatText}>Chat with Support</Text>
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  itemName: { flex: 1, fontSize: 15, fontWeight: '850', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  rateCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4
  },
  rateHeader: { flexDirection: 'row', alignItems: 'center' },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginBottom: 5 },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 24, backgroundColor: '#FFFFFF' 
  },
  chatBtn: { 
    height: 60, backgroundColor: '#16A34A', borderRadius: 28, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10
  },
  chatText: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS }
});

export default HelpSupportScreen;
