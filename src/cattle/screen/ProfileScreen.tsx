import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

// Theme Colors from Tailwind Config
const COLORS = {
  primary: '#0e2819',
  primaryContainer: '#243e2e',
  onPrimary: '#ffffff',
  background: '#fbf9f6',
  surface: '#ffffff',
  surfaceContainer: '#efeeeb',
  surfaceContainerLow: '#f5f3f0',
  outline: '#727973',
  outlineVariant: '#c2c8c1',
  secondary: '#635d5a',
  secondaryContainer: '#e6ded9',
  tertiaryContainer: '#652403',
  onTertiaryContainer: '#e98961', // Adjusting based on your palette
  primaryFixed: '#cbead3',
  onPrimaryFixed: '#062012',
  secondaryFixed: '#e9e1dc',
  onSecondaryFixed: '#1e1b18',
};

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle: string;
}

interface TransactionRowProps {
  date: string;
  asset: string;
  id: string;
  status: string;
  amount: string;
  isVerified: boolean;
}

const ProfileScreen = () => {
  
  // Setting Item Component
  const SettingItem = ({ icon, title, subtitle }: SettingItemProps) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <Icon name={icon} size={22} color={COLORS.secondary} />
        <View style={styles.settingTextContainer}>
          <Text style={styles.labelSmPrimary}>{title.toUpperCase()}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color={COLORS.outlineVariant} />
    </TouchableOpacity>
  );

  // Transaction Row Component
  const TransactionRow = ({ date, asset, id, status, amount, isVerified }: TransactionRowProps) => (
    <View style={styles.tableRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.assetTitle}>{asset}</Text>
        <Text style={styles.assetId}>{id}</Text>
      </View>
      <View style={styles.amountCol}>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: isVerified ? COLORS.primaryFixed : COLORS.secondaryFixed }
        ]}>
          <Text style={[
            styles.statusBadgeText, 
            { color: isVerified ? COLORS.onPrimaryFixed : COLORS.onSecondaryFixed }
          ]}>{status.toUpperCase()}</Text>
        </View>
        <Text style={styles.amountText}>${amount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="menu" size={24} color={COLORS.primary} />
          <Text style={styles.logoText}>HERD</Text>
        </View>
        <Icon name="search" size={24} color={COLORS.primary} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollPadding} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageWrapper}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxP6y4og9ZbkzY2syYT-cRX20PTgLRo_pCyNiqVrWKuPFmrk9gRfq2nu8r1V0kufoshk_K8wYD3AwOUYVlmOs5V6EgahyPuHkyjSJ3FYnDq6DknJTbJNhY2BSRy-43fYRjcC1cPkh1XRQsKITcLpyikYZJ38V-UsP0LTt6cT1K_1RH9KyVMcyzoPMI9mDk1qntqkP5pJHLzxHiGNLlp8bPTIU1fgA4Fst-docAyR9k713kD_ZhFBuvtdY2ocGxwY8gITRPbvLn' }} 
              style={styles.profileImage} 
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.masterRancherText}>MASTER RANCHER</Text>
            <Text style={styles.rancherName}>Elias Thorne</Text>
            <View style={styles.locationRow}>
              <Icon name="location-on" size={16} color={COLORS.secondary} />
              <Text style={styles.locationText}>Blackwood Valley, Montana</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>EDIT PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>SHARE RANCH</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.labelSmWhite}>ACCOUNT SETTINGS</Text>
          </View>
          <SettingItem icon="mail" title="Email Address" subtitle="ethorne@blackwoodranch.com" />
          <SettingItem icon="lock" title="Security & Password" subtitle="Last updated 4 months ago" />
          <SettingItem icon="notifications" title="Auction Alerts" subtitle="Push, SMS enabled" />
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentGrid}>
          <View style={styles.cardPayment}>
            <Icon name="contactless" size={20} color={COLORS.outlineVariant} style={styles.contactlessIcon} />
            <Text style={styles.labelSmPrimary}>DEFAULT PAYMENT</Text>
            <View style={styles.cardInfoRow}>
              <View style={styles.visaBox}><Text style={styles.visaText}>VISA</Text></View>
              <View>
                <Text style={styles.cardNumber}>•••• 4292</Text>
                <Text style={styles.expiry}>Exp 09/26</Text>
              </View>
            </View>
            <TouchableOpacity><Text style={styles.underlineLink}>Edit Method</Text></TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addPaymentCard}>
            <Icon name="add-card" size={28} color={COLORS.secondary} />
            <Text style={styles.addPaymentText}>ADD NEW METHOD</Text>
            <Text style={styles.addPaymentSub}>ACH, Wire, or Card</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Table */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={styles.labelSmWhite}>RECENT TRANSACTIONS</Text>
            <TouchableOpacity><Text style={styles.underlineLinkWhite}>View All</Text></TouchableOpacity>
          </View>
          <TransactionRow 
            date="Oct 24" asset="Angus Bull #882" id="HERD-9921" 
            status="Verified" amount="4,250.00" isVerified={true} 
          />
          <TransactionRow 
            date="Oct 12" asset="Heifer Batch (12)" id="HERD-8472" 
            status="Processing" amount="18,400.00" isVerified={false} 
          />
        </View>

        {/* Support Section */}
        <View style={styles.supportBox}>
          <View style={styles.supportInner}>
            <View style={styles.supportIconCircle}>
              <Icon name="support-agent" size={24} color={COLORS.tertiaryContainer} />
            </View>
            <View style={styles.supportTextContent}>
              <Text style={styles.supportTitle}>Need assistance?</Text>
              <Text style={styles.supportSub}>Connect with your regional representative.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.supportBtn}>
            <Text style={styles.supportBtnText}>CONTACT SUPPORT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoText: { fontSize: 20, fontWeight: '700', color: COLORS.primary, marginLeft: 12 },
  scrollPadding: { padding: 16, paddingBottom: 100 },
  
  // Profile Header
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    overflow: 'hidden',
    backgroundColor: COLORS.secondaryContainer,
  },
  profileImage: { width: '100%', height: '100%' },
  profileInfo: { marginLeft: 20, flex: 1 },
  masterRancherText: { fontSize: 10, color: COLORS.secondary, letterSpacing: 1.5, fontWeight: '600' },
  rancherName: { fontSize: 28, fontWeight: '700', color: COLORS.primary, marginVertical: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginLeft: 4, color: COLORS.secondary, fontSize: 14 },

  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  editBtn: { 
    flex: 1, 
    backgroundColor: COLORS.primary, 
    paddingVertical: 14, 
    alignItems: 'center', 
    borderRadius: 4,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryContainer
  },
  editBtnText: { color: 'white', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  shareBtn: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: COLORS.outline, 
    paddingVertical: 14, 
    alignItems: 'center', 
    borderRadius: 4 
  },
  shareBtnText: { color: COLORS.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1 },

  // Cards
  sectionCard: { backgroundColor: 'white', borderWidth: 1, borderColor: COLORS.outlineVariant, borderRadius: 4, overflow: 'hidden', marginBottom: 24 },
  sectionHeader: { backgroundColor: COLORS.surfaceContainer, padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.outlineVariant },
  sectionHeaderBetween: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: COLORS.surfaceContainer, 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.outlineVariant 
  },
  labelSmWhite: { fontSize: 10, fontWeight: '700', color: COLORS.primary, letterSpacing: 1 },
  labelSmPrimary: { fontSize: 10, fontWeight: '700', color: COLORS.primary, letterSpacing: 1, marginBottom: 4 },

  // Settings
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainerLow },
  settingItemLeft: { flexDirection: 'row', alignItems: 'center' },
  settingTextContainer: { marginLeft: 16 },
  settingSubtitle: { color: COLORS.secondary, fontSize: 14, marginTop: 2 },

  // Payments
  paymentGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  cardPayment: { flex: 1, backgroundColor: 'white', borderWidth: 1, borderColor: COLORS.outlineVariant, padding: 16, borderRadius: 4 },
  contactlessIcon: { alignSelf: 'flex-end', marginBottom: -10 },
  cardInfoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  visaBox: { backgroundColor: COLORS.secondaryContainer, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, marginRight: 10 },
  visaText: { fontSize: 8, fontWeight: '800' },
  cardNumber: { fontWeight: '700', fontSize: 14 },
  expiry: { fontSize: 10, color: COLORS.secondary },
  underlineLink: { fontSize: 10, fontWeight: '700', textDecorationLine: 'underline', color: COLORS.primary },
  underlineLinkWhite: { fontSize: 10, fontWeight: '700', textDecorationLine: 'underline', color: COLORS.primary },

  addPaymentCard: { 
    flex: 1, 
    borderWidth: 1, 
    borderStyle: 'dashed', 
    borderColor: COLORS.outlineVariant, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16,
    borderRadius: 4
  },
  addPaymentText: { fontSize: 10, fontWeight: '700', color: COLORS.primary, marginTop: 8 },
  addPaymentSub: { fontSize: 10, color: COLORS.secondary },

  // Table
  tableRow: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.outlineVariant, alignItems: 'center' },
  dateText: { fontSize: 14, color: COLORS.secondary },
  assetTitle: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  assetId: { fontSize: 10, color: COLORS.secondary },
  amountCol: { flex: 1.5, alignItems: 'flex-end' },
  amountText: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusBadgeText: { fontSize: 9, fontWeight: '800' },

  // Support
  supportBox: { backgroundColor: COLORS.tertiaryContainer, borderRadius: 8, padding: 20 },
  supportInner: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  supportIconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  supportTextContent: { marginLeft: 16, flex: 1 },
  supportTitle: { fontSize: 20, fontWeight: '600', color: 'white' },
  supportSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  supportBtn: { backgroundColor: COLORS.background, paddingVertical: 14, alignItems: 'center', borderRadius: 4 },
  supportBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: 12, letterSpacing: 1 },
});

export default ProfileScreen;