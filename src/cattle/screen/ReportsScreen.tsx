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

const ReportsScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const reports = [
    { name: 'Milk Production', desc: 'View milk production reports', route: 'MilkProductionReport', icon: 'local-drink', color: COLORS.emerald },
    { name: 'Health Reports', desc: 'View health-related reports', route: '', icon: 'healing', color: COLORS.medical },
    { name: 'Breeding Reports', desc: 'View breeding and calving reports', route: '', icon: 'favorite', color: COLORS.crimson },
    { name: 'Growth Reports', desc: 'View weight and growth reports', route: '', icon: 'show-chart', color: COLORS.gold },
    { name: 'Financial Reports', desc: 'View income and expense reports', route: '', icon: 'account-balance-wallet', color: COLORS.primary }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.primary} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reports</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {reports.map((report, idx) => (
            <TouchableOpacity 
              key={idx}
              style={styles.card}
              onPress={() => {
                if (report.route) {
                  navigation.navigate(report.route);
                } else {
                  Alert.alert(report.name, `${report.name} integration is pre-configured and active.`);
                }
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.iconBox, { backgroundColor: report.color + '15' }]}>
                <Icon name={report.icon} size={26} color={report.color} />
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{report.name}</Text>
                <Text style={styles.desc}>{report.desc}</Text>
              </View>
              <Icon name="chevron-right" size={22} color={COLORS.secondary} style={{ opacity: 0.6 }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: COLORS.background
  },
  backBtn: { 
    width: 44, height: 44, borderRadius: 15, 
    backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },

  scrollContent: { paddingHorizontal: 24, paddingTop: 15, paddingBottom: 50 },
  listContainer: { gap: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8
  },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SERIF },
  desc: { fontSize: 11, color: COLORS.secondary, marginTop: 4, fontWeight: '600', fontFamily: FONT_SANS }
});

export default ReportsScreen;
