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
  View,
  ActivityIndicator,
  TextInput,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../context/useTheme';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useGetReports, 
  useGetPendingReportsCount, 
  useReviewReport 
} from '../../api/hook/forum/reports';
import { useGetListedAnimalsByLocation } from '../../api/hook/animal/listing';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const ReportsScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState<'analytics' | 'moderation'>('analytics');
  const [selectedStatus, setSelectedStatus] = useState<'PENDING' | 'RESOLVED' | 'DISMISSED'>('PENDING');
  
  // Modals / review inputs
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [remarks, setRemarks] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'RESOLVED' | 'DISMISSED'>('RESOLVED');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch listings to compute user stats dynamically
  const { data: listingsResponse, isLoading: isListingsLoading } = useGetListedAnimalsByLocation(
    { latitude: 18.5204, longitude: 73.8567, limit: 100 }
  );

  const listings = listingsResponse?.data?.listings || [];
  const userCattle = listings.filter(item => item.ownerId === user?.id);
  const userCattleCount = userCattle.length;
  const totalDailyMilk = userCattle.reduce((sum, item) => sum + (item.animal?.dailyMilkProdLtr || 0), 0);
  const pregnantCount = userCattle.filter(item => item.animal?.gender?.toLowerCase() === 'female').length;
  const healthyCount = userCattle.filter(item => !(item.animal as any)?.healthStatus || (item.animal as any).healthStatus.toLowerCase() === 'healthy').length;
  const sickCount = userCattleCount - healthyCount;
  const healthIndex = userCattleCount > 0 ? Math.round((healthyCount / userCattleCount) * 100) : 100;

  // Tanstack Queries for Moderation
  const { data: pendingCountResponse } = useGetPendingReportsCount({
    enabled: activeTab === 'moderation'
  });
  const pendingCount = pendingCountResponse?.data?.pendingCount ?? 0;

  const { data: reportsResponse, isLoading: isReportsLoading } = useGetReports(
    { status: selectedStatus, limit: 100 },
    { enabled: activeTab === 'moderation' }
  );
  const backendReports = reportsResponse?.data?.reports || [];

  const { mutate: reviewReport, isPending: isReviewing } = useReviewReport({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", "reports"] });
      setShowReviewModal(false);
      setRemarks('');
      setSelectedReport(null);
    }
  });

  const handleSubmitReview = () => {
    if (!selectedReport) return;
    reviewReport({
      id: selectedReport.id,
      payload: {
        status: reviewStatus,
        remarks: remarks.trim() || undefined
      }
    });
  };

  const reports = [
    { 
      name: 'Milk Production', 
      desc: 'Track daily yields and trends', 
      route: 'MilkProductionReport', 
      icon: 'local-drink', 
      color: COLORS.emerald,
      status: 'Updated Today',
      metric: isListingsLoading ? '...' : `${totalDailyMilk} L`
    },
    { 
      name: 'Health Reports', 
      desc: 'Vaccinations, checkups & history', 
      route: '', 
      icon: 'healing', 
      color: COLORS.medical,
      status: sickCount > 0 ? 'Action Needed' : 'All Healthy',
      metric: isListingsLoading ? '...' : `${sickCount} Alerts`
    },
    { 
      name: 'Breeding Reports', 
      desc: 'Calving, heat cycle & inseminations', 
      route: 'Breeding', 
      icon: 'favorite', 
      color: COLORS.crimson,
      status: isListingsLoading ? '...' : `${pregnantCount} Female`,
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
      <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor={COLORS.background} />
      
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

      {/* Main Switcher Tabs */}
      <View style={styles.mainTabsContainer}>
        <TouchableOpacity 
          style={[styles.mainTabBtn, activeTab === 'analytics' && styles.activeMainTabBtn]}
          onPress={() => setActiveTab('analytics')}
          activeOpacity={0.8}
        >
          <Text style={[styles.mainTabBtnText, activeTab === 'analytics' && styles.activeMainTabBtnText]}>Farm Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.mainTabBtn, activeTab === 'moderation' && styles.activeMainTabBtn]}
          onPress={() => setActiveTab('moderation')}
          activeOpacity={0.8}
        >
          <Text style={[styles.mainTabBtnText, activeTab === 'moderation' && styles.activeMainTabBtnText]}>Content Moderation</Text>
          {pendingCount > 0 && (
            <View style={styles.bubbleCountBadge}>
              <Text style={styles.bubbleCountText}>{pendingCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'analytics' ? (
          <>
            {/* Performance Summary Banner */}
            <View style={styles.summaryBanner}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>
                  {new Date().toLocaleString('en-IN', { month: 'long' }).toUpperCase()} SUMMARY
                </Text>
              </View>
              <Text style={styles.bannerTitle}>Your herd is performing at peak efficiency</Text>
              <Text style={styles.bannerSubtitle}>
                Milk production stands at {isListingsLoading ? '...' : `${totalDailyMilk} L`}, with {isListingsLoading ? '...' : (sickCount > 0 ? `${sickCount} active health warning(s)` : 'zero active health warnings')} across all species.
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
                  <Text style={styles.gridValue}>
                    {isListingsLoading ? '...' : `${totalDailyMilk} L`}
                  </Text>
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
                  <Text style={styles.gridValue}>
                    {isListingsLoading ? '...' : `${healthIndex}%`}
                  </Text>
                  <Text style={styles.gridLabel}>Herd Health Index</Text>
                  <View style={styles.trendRow}>
                    <Icon 
                      name={sickCount > 0 ? "warning" : "check-circle"} 
                      size={14} 
                      color={sickCount > 0 ? COLORS.crimson : COLORS.medical} 
                    />
                    <Text style={[styles.trendText, { color: sickCount > 0 ? COLORS.crimson : COLORS.medical }]}>
                      {sickCount > 0 ? `${sickCount} Alerts` : 'Excellent'}
                    </Text>
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
          </>
        ) : (
          <>
            {/* Sub Tabs for Moderation Status Filter */}
            <View style={styles.subTabBar}>
              {(['PENDING', 'RESOLVED', 'DISMISSED'] as const).map((status) => {
                const isActive = selectedStatus === status;
                return (
                  <TouchableOpacity
                    key={status}
                    style={[styles.subTabItem, isActive && styles.activeSubTabItem]}
                    onPress={() => setSelectedStatus(status)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.subTabItemText, isActive && styles.activeSubTabItemText]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Reported Items List */}
            <View style={styles.listContainer}>
              {isReportsLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 40 }} />
              ) : backendReports.length > 0 ? (
                backendReports.map((report: any) => {
                  const targetContent = 
                    report.question?.title || 
                    report.answer?.content || 
                    report.comment?.content || 
                    'No content snippet available';

                  const badgeColor = 
                    report.targetType === 'QUESTION' ? '#3B82F6' :
                    report.targetType === 'ANSWER' ? '#10B981' : '#F59E0B';

                  const dateText = new Date(report.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <TouchableOpacity
                      key={report.id}
                      style={styles.moderationCard}
                      onPress={() => {
                        setSelectedReport(report);
                        setReviewStatus(report.status === 'PENDING' ? 'RESOLVED' : report.status);
                        setRemarks(report.remarks || '');
                        setShowReviewModal(true);
                      }}
                      activeOpacity={0.85}
                    >
                      <View style={styles.modCardHeader}>
                        <View style={[styles.targetTypeBadge, { backgroundColor: badgeColor + '15' }]}>
                          <Text style={[styles.targetTypeBadgeText, { color: badgeColor }]}>
                            {report.targetType}
                          </Text>
                        </View>
                        <Text style={styles.reportDate}>{dateText}</Text>
                      </View>

                      <Text style={styles.modContentSnippet} numberOfLines={2}>
                        "{targetContent}"
                      </Text>

                      <View style={styles.modReasonRow}>
                        <Text style={styles.reasonLabel}>Reason:</Text>
                        <Text style={styles.reasonValue}>{report.reason}</Text>
                      </View>

                      <View style={styles.modFooter}>
                        <Text style={styles.reporterText}>
                          By: {report.reporter?.name || 'Anonymous Reporter'}
                        </Text>
                        {report.status !== 'PENDING' && (
                          <View style={styles.actionedBadge}>
                            <Text style={styles.actionedBadgeText}>
                              {report.status}
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Icon name="check-circle" size={60} color={COLORS.secondary} style={{ opacity: 0.5, marginBottom: 10 }} />
                  <Text style={styles.emptyStateTitle}>No Reports Found</Text>
                  <Text style={styles.emptyStateSub}>No forum content reports match the selected status.</Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* Review Dialog / Modal */}
      <Modal
        visible={showReviewModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowReviewModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Review Content Report</Text>
            
            {selectedReport && (
              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalLabel}>Reported Content ({selectedReport.targetType})</Text>
                <View style={styles.modalSnippetBox}>
                  <Text style={styles.modalSnippetText}>
                    {selectedReport.question?.title || 
                     selectedReport.answer?.content || 
                     selectedReport.comment?.content || 
                     'No content snippet available'}
                  </Text>
                </View>

                <Text style={styles.modalLabel}>Reporter Details</Text>
                <Text style={styles.modalValueText}>
                  {selectedReport.reporter?.name || 'Anonymous'} (ID: {selectedReport.reporterId})
                </Text>

                <Text style={styles.modalLabel}>Flag Reason</Text>
                <Text style={styles.modalValueText}>{selectedReport.reason}</Text>

                {selectedReport.status === 'PENDING' ? (
                  <>
                    <Text style={styles.modalLabel}>Action</Text>
                    <View style={styles.actionRadioGroup}>
                      <TouchableOpacity
                        style={[styles.radioButton, reviewStatus === 'RESOLVED' && styles.radioActive]}
                        onPress={() => setReviewStatus('RESOLVED')}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.radioText, reviewStatus === 'RESOLVED' && styles.radioTextActive]}>
                          Resolve (Hide Content)
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.radioButton, reviewStatus === 'DISMISSED' && styles.radioActive]}
                        onPress={() => setReviewStatus('DISMISSED')}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.radioText, reviewStatus === 'DISMISSED' && styles.radioTextActive]}>
                          Dismiss Flag
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.modalLabel}>Remarks (Optional)</Text>
                    <TextInput
                      style={styles.modalTextInput}
                      placeholder="Add moderator remarks or action details..."
                      placeholderTextColor={COLORS.secondary}
                      value={remarks}
                      onChangeText={setRemarks}
                      multiline={true}
                      numberOfLines={3}
                    />

                    <View style={styles.modalActions}>
                      <TouchableOpacity 
                        style={[styles.modalBtn, styles.cancelBtn]} 
                        onPress={() => setShowReviewModal(false)}
                        disabled={isReviewing}
                      >
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.modalBtn, styles.submitBtn]} 
                        onPress={handleSubmitReview}
                        disabled={isReviewing}
                      >
                        {isReviewing ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <Text style={styles.submitBtnText}>Submit Decision</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalLabel}>Moderator Remarks</Text>
                    <Text style={styles.modalValueText}>{selectedReport.remarks || 'No remarks provided.'}</Text>

                    <Text style={styles.modalLabel}>Resolution Status</Text>
                    <Text style={[styles.modalValueText, { fontWeight: 'bold', color: COLORS.emerald }]}>
                      {selectedReport.status} by {selectedReport.reviewer?.name || 'Admin'}
                    </Text>

                    <TouchableOpacity 
                      style={[styles.modalBtn, styles.closeBtn]} 
                      onPress={() => setShowReviewModal(false)}
                    >
                      <Text style={styles.closeBtnText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  },

  // Main switchers
  mainTabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 4,
  },
  mainTabBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  activeMainTabBtn: {
    backgroundColor: COLORS.darkGreen
  },
  mainTabBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.secondary,
    fontFamily: FONT_SANS
  },
  activeMainTabBtnText: {
    color: '#FFFFFF'
  },
  bubbleCountBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6
  },
  bubbleCountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold'
  },

  // Sub Tab Styles
  subTabBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  subTabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  activeSubTabItem: {
    backgroundColor: COLORS.primary + '15',
    borderColor: COLORS.primary
  },
  subTabItemText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondary,
    fontFamily: FONT_SANS
  },
  activeSubTabItemText: {
    color: COLORS.primary
  },

  // Moderation Card Styles
  moderationCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5
  },
  modCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  targetTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  targetTypeBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    fontFamily: FONT_SANS
  },
  reportDate: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '600'
  },
  modContentSnippet: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    lineHeight: 18,
    marginBottom: 10
  },
  modReasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10
  },
  reasonLabel: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600'
  },
  reasonValue: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '800'
  },
  modFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8
  },
  reporterText: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '600'
  },
  actionedBadge: {
    backgroundColor: COLORS.emerald + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6
  },
  actionedBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.emerald,
    letterSpacing: 0.5
  },

  // Empty state
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    width: '100%'
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    marginBottom: 4
  },
  emptyStateSub: {
    fontSize: 12,
    color: COLORS.secondary,
    textAlign: 'center',
    paddingHorizontal: 20
  },

  // Modal Backdrop and Content
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.darkGreen,
    fontFamily: FONT_SERIF,
    marginBottom: 16,
    textAlign: 'center'
  },
  modalScroll: {
    flexGrow: 0
  },
  modalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginTop: 14,
    marginBottom: 6,
    letterSpacing: 0.5
  },
  modalSnippetBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  modalSnippetText: {
    fontSize: 13,
    color: COLORS.darkGreen,
    fontFamily: FONT_SANS,
    lineHeight: 18
  },
  modalValueText: {
    fontSize: 13,
    color: COLORS.darkGreen,
    fontWeight: '700'
  },
  actionRadioGroup: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4
  },
  radioButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface
  },
  radioActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10'
  },
  radioText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary
  },
  radioTextActive: {
    color: COLORS.primary
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    fontSize: 13,
    color: COLORS.darkGreen,
    textAlignVertical: 'top',
    height: 70,
    backgroundColor: '#F9FAFB'
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 10
  },
  modalBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface
  },
  submitBtn: {
    backgroundColor: COLORS.primary
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.secondary
  },
  submitBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  closeBtn: {
    backgroundColor: COLORS.darkGreen,
    marginTop: 20,
    marginBottom: 10
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF'
  }
});

export default ReportsScreen;
