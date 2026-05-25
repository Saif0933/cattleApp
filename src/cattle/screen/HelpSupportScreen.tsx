import React, { useState } from 'react';
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
  const [rating, setRating] = useState(5);

  const handleGridOption = (name: string) => {
    Alert.alert(name, `${name} module is loading...`);
  };

  const handleStarRating = (value: number) => {
    setRating(value);
    Alert.alert('Thank You!', `You rated us ${value} stars.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F5" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="arrow-back" size={22} color={COLORS.darkGreen} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Support Center Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Support Center</Text>
            <Text style={styles.heroSub}>Get instant answers and guidance for managing your farm activities.</Text>
          </View>
          <View style={styles.heroIconBox}>
            <Icon name="support-agent" size={32} color="#FFFFFF" />
          </View>
        </View>

        {/* 2x2 Grid of Support Options */}
        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => handleGridOption('FAQs')}
          >
            <View style={[styles.gridIconBox, { backgroundColor: '#E0F2FE' }]}>
              <Icon name="help-outline" size={24} color="#0284C7" />
            </View>
            <Text style={styles.gridTitle}>FAQs</Text>
            <Text style={styles.gridDesc}>Browse common questions & answers</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => handleGridOption('Contact Support')}
          >
            <View style={[styles.gridIconBox, { backgroundColor: '#DCFCE7' }]}>
              <Icon name="headset-mic" size={24} color="#16A34A" />
            </View>
            <Text style={styles.gridTitle}>Support</Text>
            <Text style={styles.gridDesc}>Direct support channels & help</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => handleGridOption('Report an Issue')}
          >
            <View style={[styles.gridIconBox, { backgroundColor: '#FEE2E2' }]}>
              <Icon name="report-problem" size={24} color="#DC2626" />
            </View>
            <Text style={styles.gridTitle}>Report</Text>
            <Text style={styles.gridDesc}>Submit bug reports & issues</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard} 
            activeOpacity={0.8}
            onPress={() => handleGridOption('App Guide')}
          >
            <View style={[styles.gridIconBox, { backgroundColor: '#F3E8FF' }]}>
              <Icon name="menu-book" size={24} color="#7C3AED" />
            </View>
            <Text style={styles.gridTitle}>App Guide</Text>
            <Text style={styles.gridDesc}>Learn tips on cattle registration</Text>
          </TouchableOpacity>
        </View>

        {/* Rate Us Dynamic Card */}
        <View style={styles.rateCard}>
          <View style={styles.rateHeader}>
            <View style={styles.rateIconBox}>
              <Icon name="star-outline" size={22} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.rateTitle}>Rate Cattle App</Text>
              <Text style={styles.rateDesc}>Tap the stars to submit your review rating</Text>
            </View>
          </View>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity 
                key={s} 
                onPress={() => handleStarRating(s)}
                style={styles.starTouch}
                activeOpacity={0.7}
              >
                <Icon 
                  name={s <= rating ? "star" : "star-border"} 
                  size={36} 
                  color={s <= rating ? "#F59E0B" : "#D1D5DB"} 
                  style={{ marginRight: 6 }} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Chat With Support CTA */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.chatBtn}
          onPress={() => Alert.alert('Support', 'Support agent chat is connecting...')}
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
  container: { flex: 1, backgroundColor: '#F5F7F5' },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#F5F7F5'
  },
  backBtn: { 
    width: 40, height: 40, borderRadius: 20, 
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 110 },
  
  heroCard: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 28,
    padding: 22,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  heroContent: {
    flex: 1,
    marginRight: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SERIF,
  },
  heroSub: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.85,
    marginTop: 6,
    lineHeight: 18,
    fontFamily: FONT_SANS,
  },
  heroIconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    width: (width - 56) / 2,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  gridIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
  },
  gridDesc: {
    fontSize: 11,
    color: COLORS.secondary,
    marginTop: 4,
    fontFamily: FONT_SANS,
    lineHeight: 15,
  },

  rateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    marginTop: 4,
  },
  rateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rateTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
  },
  rateDesc: {
    fontSize: 11,
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 4,
  },
  starTouch: {
    padding: 4,
  },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: 'rgba(245, 247, 245, 0.95)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chatBtn: { 
    height: 56, 
    backgroundColor: COLORS.primary, 
    borderRadius: 24, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 4, 
    shadowColor: COLORS.primary, 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 10
  },
  chatText: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS }
});

export default HelpSupportScreen;
