import React, { useState } from 'react';
import {
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

const MilkProductionReportScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const [activeRange, setActiveRange] = useState('Monthly');
  const ranges = ['Daily', 'Weekly', 'Monthly'];

  const chartData = [
    { label: '1', value: 35, height: '40%' },
    { label: '5', value: 45, height: '52%' },
    { label: '10', value: 68, height: '78%' },
    { label: '15', value: 55, height: '62%' },
    { label: '20', value: 80, height: '92%' },
    { label: '25', value: 72, height: '82%' },
    { label: '30', value: 60, height: '68%' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color={COLORS.darkGreen} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Milk Production</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Date Selector Row */}
        <View style={styles.dateSelectorRow}>
          {ranges.map((range, idx) => (
            <TouchableOpacity 
              key={idx}
              style={[styles.rangeBtn, activeRange === range && styles.rangeBtnActive]}
              onPress={() => setActiveRange(range)}
              activeOpacity={0.8}
            >
              <Text style={[styles.rangeText, activeRange === range && styles.rangeTextActive]}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.navArrow}>
            <Icon name="chevron-left" size={24} color={COLORS.darkGreen} />
          </TouchableOpacity>
          <Text style={styles.monthText}>May 2024</Text>
          <TouchableOpacity style={styles.navArrow}>
            <Icon name="chevron-right" size={24} color={COLORS.darkGreen} />
          </TouchableOpacity>
        </View>

        {/* Total Stats Banner */}
        <View style={styles.totalBanner}>
          <Text style={styles.totalLabel}>Total Milk</Text>
          <Text style={styles.totalValue}>9,600 L</Text>
          <Text style={styles.totalSub}>+ 8% vs Apr 2024</Text>
        </View>

        {/* Bar Chart Section */}
        <View style={styles.chartCard}>
          <View style={styles.chartTitleRow}>
            <Text style={styles.chartTitle}>Yield Distribution (L)</Text>
            <Icon name="bar-chart" size={20} color="#16A34A" />
          </View>

          {/* Core Chart Bars */}
          <View style={styles.chartContainer}>
            {/* Y Axis Grid Lines */}
            <View style={styles.gridLinesContainer}>
              <View style={styles.gridLine}><Text style={styles.gridText}>100</Text></View>
              <View style={styles.gridLine}><Text style={styles.gridText}>75</Text></View>
              <View style={styles.gridLine}><Text style={styles.gridText}>50</Text></View>
              <View style={styles.gridLine}><Text style={styles.gridText}>25</Text></View>
              <View style={styles.gridLine}><Text style={styles.gridText}>0</Text></View>
            </View>

            {/* Columns Area */}
            <View style={styles.barsArea}>
              {chartData.map((bar, idx) => (
                <View key={idx} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { height: bar.height, backgroundColor: '#16A34A' } as any]} />
                  </View>
                  <Text style={styles.barLabel}>{bar.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Extra analytics stats list */}
        <View style={styles.analyticsSection}>
          <Text style={styles.analyticsTitle}>Weekly Breakdown</Text>
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Week 1 (May 1 - 7)</Text>
              <Text style={styles.breakdownVal}>2,150 L</Text>
            </View>
            <View style={styles.hDivider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Week 2 (May 8 - 14)</Text>
              <Text style={styles.breakdownVal}>2,400 L</Text>
            </View>
            <View style={styles.hDivider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Week 3 (May 15 - 21)</Text>
              <Text style={styles.breakdownVal}>2,650 L</Text>
            </View>
            <View style={styles.hDivider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Week 4 (May 22 - 30)</Text>
              <Text style={styles.breakdownVal}>2,400 L</Text>
            </View>
          </View>
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
    justifyContent: 'center', alignItems: 'flex-start'
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  scrollContent: { paddingHorizontal: 24, paddingTop: 15, paddingBottom: 50 },

  dateSelectorRow: { 
    flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 18, 
    padding: 6, borderWidth: 1.5, borderColor: COLORS.border, marginBottom: 20
  },
  rangeBtn: { flex: 1, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  rangeBtnActive: { backgroundColor: '#16A34A' },
  rangeText: { fontSize: 13, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  rangeTextActive: { color: '#FFFFFF' },

  monthNav: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 25, gap: 20 },
  navArrow: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  monthText: { fontSize: 18, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },

  totalBanner: { 
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 22, 
    alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4,
    marginBottom: 25
  },
  totalLabel: { fontSize: 12, fontWeight: '800', color: COLORS.secondary, letterSpacing: 0.5, fontFamily: FONT_SANS },
  totalValue: { fontSize: 32, fontWeight: '900', color: COLORS.darkGreen, marginTop: 6, fontFamily: FONT_SERIF },
  totalSub: { fontSize: 12, fontWeight: '800', color: '#16A34A', marginTop: 4, fontFamily: FONT_SANS },

  chartCard: { 
    backgroundColor: COLORS.surface, borderRadius: 24, padding: 20, 
    borderWidth: 1.5, borderColor: COLORS.border,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 4,
    marginBottom: 25
  },
  chartTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  chartTitle: { fontSize: 15, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF },
  
  chartContainer: { height: 200, flexDirection: 'row' },
  gridLinesContainer: { width: 30, justifyContent: 'space-between', paddingVertical: 10 },
  gridLine: { height: 18, justifyContent: 'center' },
  gridText: { fontSize: 10, color: COLORS.secondary, fontWeight: '700', fontFamily: FONT_SANS },
  
  barsArea: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', borderLeftWidth: 1, borderBottomWidth: 1, borderColor: COLORS.border, paddingLeft: 10 },
  barCol: { width: 22, height: '100%', justifyContent: 'flex-end', alignItems: 'center' },
  barTrack: { flex: 1, width: 10, backgroundColor: COLORS.isDark ? '#1F2937' : '#E5E7EB', borderRadius: 5, justifyContent: 'flex-end' },
  barFill: { width: '100%', borderRadius: 5 },
  barLabel: { fontSize: 10, color: COLORS.secondary, fontWeight: '800', marginTop: 8, fontFamily: FONT_SANS },

  analyticsSection: {},
  analyticsTitle: { fontSize: 18, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SERIF, marginBottom: 15 },
  breakdownCard: { 
    backgroundColor: COLORS.surface, borderRadius: 22, padding: 18, 
    borderWidth: 1.5, borderColor: COLORS.border
  },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  breakdownLabel: { fontSize: 13, fontWeight: '700', color: COLORS.secondary, fontFamily: FONT_SANS },
  breakdownVal: { fontSize: 14, fontWeight: '900', color: COLORS.darkGreen, fontFamily: FONT_SANS },
  hDivider: { height: 1, backgroundColor: COLORS.border }
});

export default MilkProductionReportScreen;
