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
    { 
      name: 'Milk Production', 
      desc: 'Track daily yields and trends', 
      route: 'MilkProductionReport', 
      icon: 'local-drink', 
      color: COLORS.emerald,
      status: 'Updated Today',
      metric: '312 L'
    },
    { 
      name: 'Health Reports', 
      desc: 'Vaccinations, checkups & history', 
      route: '', 
      icon: 'healing', 
      color: COLORS.medical,
      status: 'All Healthy',
      metric: '0 Alerts'
    },
    { 
      name: 'Breeding Reports', 
      desc: 'Calving, heat cycle & inseminations', 
      route: 'Breeding', 
      icon: 'favorite', 
      color: COLORS.crimson,
      status: '2 Pregnant',
      metric: '3 Upcoming'
    },
    { 
      name: 'Growth Reports', 
      desc: 'Weight history and growth metrics', 
      route: '', 
      icon: 'show-chart', 
      color: COLORS.gold,
      status: 'Normal Curve',
      metric: '+4.2%'
    },
    { 
      name: 'Financial Reports', 
      desc: 'Income statement & feed expenses', 
      route: '', 
      icon: 'account-balance-wallet', 
      color: COLORS.primary,
      status: 'This Month',
      metric: '₹45K Profit'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={18} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics Center</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Icon name="more-horiz" size={24} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Performance Summary Banner */}
        <View style={styles.summaryBanner}>
          <View style={styles.bannerBadge}>
            <Text style={styles.bannerBadgeText}>MAY SUMMARY</Text>
          </View>
          <Text style={styles.bannerTitle}>Your herd is performing at peak efficiency</Text>
          <Text style={styles.bannerSubtitle}>
            Milk production is up by 12.4% compared to the previous week, with zero active health warnings across all species.
          </Text>
          <View style={styles.bannerFooter}>
            <Text style={styles.bannerFooterText}>Next scheduled sync: Tonight 10:00 PM</Text>
          </View>
        </View>

        {/* Quick Insights Grid */}
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.grid}>
          <View style={styles.gridCard}>
            <View style={[styles.gridIconBg, { backgroundColor: COLORS.emerald + '15' }]}>
              <Icon name="opacity" size={22} color={COLORS.emerald} />
            </View>
            <View style={styles.gridInfo}>
              <Text style={styles.gridValue}>312 L</Text>
              <Text style={styles.gridLabel}>Daily Milk Yield</Text>
              <View style={styles.trendRow}>
                <Icon name="trending-up" size={14} color={COLORS.emerald} />
                <Text style={[styles.trendText, { color: COLORS.emerald }]}>+12.4%</Text>
              </View>
            </View>
          </View>

          <View style={styles.gridCard}>
            <View style={[styles.gridIconBg, { backgroundColor: COLORS.medical + '15' }]}>
              <Icon name="favorite" size={22} color={COLORS.medical} />
            </View>
            <View style={styles.gridInfo}>
              <Text style={styles.gridValue}>98.4%</Text>
              <Text style={styles.gridLabel}>Herd Health Index</Text>
              <View style={styles.trendRow}>
                <Icon name="check-circle" size={14} color={COLORS.medical} />
                <Text style={[styles.trendText, { color: COLORS.medical }]}>Excellent</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reports Directory */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Reports</Text>
          <Text style={styles.reportCount}>{reports.length} Types</Text>
        </View>

        <View style={styles.listContainer}>
          {reports.map((report, idx) => (
            <TouchableOpacity 
              key={idx}
              style={styles.card}
              onPress={() => {
                if (report.route) {
                  navigation.navigate(report.route);
                } else {
                  Alert.alert(report.name, `${report.name} details and downloadable files are pre-loaded successfully.`);
                }
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.iconBox, { backgroundColor: report.color + '12' }]}>
                <Icon name={report.icon} size={24} color={report.color} />
              </View>
              
              <View style={styles.details}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.name}>{report.name}</Text>
                  <Text style={[styles.cardMetric, { color: report.color }]}>{report.metric}</Text>
                </View>
                <Text style={styles.desc}>{report.desc}</Text>
                
                <View style={styles.cardFooterRow}>
                  <View style={styles.dotIndicator} />
                  <Text style={styles.statusText}>{report.status}</Text>
                </View>
              </View>

              <View style={styles.arrowBox}>
                <Icon name="arrow-forward-ios" size={14} color={COLORS.secondary} style={{ opacity: 0.8 }} />
              </View>
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
  settingsBtn: {
    width: 44, height: 44, borderRadius: 15, 
    backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  scrollContent: { paddingHorizontal: 24, paddingTop: 10, paddingBottom: 50 },
  
  summaryBanner: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12
  },
  bannerBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SERIF,
    lineHeight: 24,
    marginBottom: 8
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#A7B7B0',
    lineHeight: 18,
    fontFamily: FONT_SANS,
    marginBottom: 14
  },
  bannerFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 10
  },
  bannerFooterText: {
    fontSize: 10,
    color: '#8BA197',
    fontWeight: '600'
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    marginBottom: 12
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12
  },
  reportCount: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary
  },

  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20
  },
  gridCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  gridIconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridInfo: {
    flex: 1
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF
  },
  gridLabel: {
    fontSize: 10,
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginTop: 1
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2
  },
  trendText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: FONT_SANS
  },

  listContainer: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 6
  },
  iconBox: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 14 
  },
  details: { flex: 1 },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: { fontSize: 14, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  cardMetric: {
    fontSize: 12,
    fontWeight: '900',
    fontFamily: FONT_SANS
  },
  desc: { 
    fontSize: 11, 
    color: COLORS.secondary, 
    marginTop: 2, 
    fontWeight: '600', 
    fontFamily: FONT_SANS 
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6
  },
  statusText: {
    fontSize: 10,
    color: COLORS.secondary,
    fontWeight: '800',
    fontFamily: FONT_SANS
  },
  arrowBox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6
  }
});

export default ReportsScreen;
