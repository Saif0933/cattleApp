import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Modal,
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const ZoomableImage = ({ uri, styles }: { uri: string; styles: any }) => {
  if (Platform.OS === 'ios') {
    return (
      <ScrollView
        minimumZoomScale={1}
        maximumZoomScale={4}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.zoomScrollContent}
      >
        <Image
          source={{ uri }}
          style={styles.modalImage as any}
          resizeMode="contain"
        />
      </ScrollView>
    );
  }

  // Android: Custom smooth PanResponder with transition tracking
  const scale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const initialDistance = useRef(0);
  const lastScale = useRef(1);
  const lastOffset = useRef({ x: 0, y: 0 });
  const lastTouchesCount = useRef(0);

  // Reset scale and translation when uri changes
  useEffect(() => {
    scale.setValue(1);
    pan.setValue({ x: 0, y: 0 });
    lastScale.current = 1;
    lastOffset.current = { x: 0, y: 0 };
    lastTouchesCount.current = 0;
  }, [uri]);

  const getDistance = (evt: any) => {
    const touches = evt.nativeEvent.touches;
    if (touches.length >= 2) {
      const dx = touches[0].pageX - touches[1].pageX;
      const dy = touches[0].pageY - touches[1].pageY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    return 0;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        const touches = evt.nativeEvent.touches;
        // @ts-ignore
        return scale._value > 1 || touches.length >= 2;
      },
      onMoveShouldSetPanResponder: (evt) => {
        const touches = evt.nativeEvent.touches;
        // @ts-ignore
        return scale._value > 1 || touches.length >= 2;
      },
      onPanResponderGrant: (evt) => {
        const touches = evt.nativeEvent.touches;
        lastTouchesCount.current = touches.length;
        if (touches.length >= 2) {
          initialDistance.current = getDistance(evt);
        } else {
          pan.setOffset({
            x: lastOffset.current.x,
            y: lastOffset.current.y
          });
          pan.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;
        const touchesCount = touches.length;

        // Reset baseline if touch count changes on-the-fly to prevent jumping
        if (touchesCount !== lastTouchesCount.current) {
          lastTouchesCount.current = touchesCount;
          if (touchesCount >= 2) {
            initialDistance.current = getDistance(evt);
            // @ts-ignore
            lastScale.current = scale._value;
          } else {
            pan.setOffset({
              // @ts-ignore
              x: pan.x._value + lastOffset.current.x,
              // @ts-ignore
              y: pan.y._value + lastOffset.current.y
            });
            pan.setValue({ x: 0, y: 0 });
          }
        }

        if (touchesCount >= 2) {
          const currentDistance = getDistance(evt);
          if (initialDistance.current > 0) {
            let newScale = (currentDistance / initialDistance.current) * lastScale.current;
            if (newScale < 1) newScale = 1;
            if (newScale > 4) newScale = 4;
            scale.setValue(newScale);
          }
        } else if (touchesCount === 1) {
          // Allow panning only when zoomed in
          // @ts-ignore
          if (scale._value > 1) {
            pan.setValue({ x: gestureState.dx, y: gestureState.dy });
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        lastTouchesCount.current = 0;
        // @ts-ignore
        const currentScale = scale._value;
        lastScale.current = currentScale;

        if (currentScale <= 1.05) {
          // Spring back scale and translation to center if zoom is too small
          Animated.parallel([
            Animated.spring(scale, { toValue: 1, useNativeDriver: false }),
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false })
          ]).start();
          lastScale.current = 1;
          lastOffset.current = { x: 0, y: 0 };
        } else {
          pan.flattenOffset();
          // @ts-ignore
          lastOffset.current = { x: pan.x._value, y: pan.y._value };
        }
      }
    })
  ).current;

  return (
    <View style={styles.zoomContainer} {...panResponder.panHandlers}>
      <Animated.Image
        source={{ uri }}
        style={[
          styles.modalImage as any,
          {
            transform: [
              { scale: scale },
              { translateX: pan.x },
              { translateY: pan.y }
            ]
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const AnimalDetailsScreen = ({ route, navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const { product } = route.params || {};

  const name = product?.name || 'Gauri';
  const id = product?.id || 'C001';
  const breed = product?.breed || 'HF Cross';
  const age = product?.age || '3 Years';
  const gender = product?.gender || 'Female';
  const image = product?.image || 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600';

  const [activeTab, setActiveTab] = useState('Overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);
  const modalScrollRef = useRef<ScrollView>(null);
  const tabs = ['Overview', 'Health', 'Breeding', 'Activity'];

  const getFallbackImages = (category: string, primaryImg: string) => {
    const cowImages = [
      primaryImg,
      'https://images.unsplash.com/photo-1546445317-29f4545e6d51?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1527153857715-3908f2bac5e8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600'
    ];
    const buffaloImages = [
      primaryImg,
      'https://images.unsplash.com/photo-1563865436874-9aef32095ffd?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507103011901-e954d6ec0988?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558024920-b41e1887dc32?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=600'
    ];
    const goatImages = [
      primaryImg,
      'https://images.unsplash.com/photo-1524443169398-9aa1ceab67d5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1532517304529-7bf46f56b9c9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1565108499737-f581729860b7?auto=format&fit=crop&q=80&w=600'
    ];
    const dogImages = [
      primaryImg,
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600'
    ];
    const catImages = [
      primaryImg,
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600'
    ];

    const catName = (category || '').toLowerCase();
    if (catName.includes('buffalo')) return buffaloImages;
    if (catName.includes('goat')) return goatImages;
    if (catName.includes('dog')) return dogImages;
    if (catName.includes('cat')) return catImages;
    return cowImages;
  };

  const images = product?.images && Array.isArray(product.images) && product.images.length > 0
    ? product.images.slice(0, 5)
    : getFallbackImages(product?.category || 'Cow', image);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveImageIndex(index);
  };

  const handleModalScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    if (index >= 0 && index < images.length) {
      setModalActiveIndex(index);
    }
  };

  useEffect(() => {
    if (isImageViewerVisible) {
      const timer = setTimeout(() => {
        modalScrollRef.current?.scrollTo({
          x: modalActiveIndex * width,
          animated: false,
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isImageViewerVisible]);

  const animalDescription = product?.description || 'A healthy, highly productive dairy cow with an excellent feeding record. Known for consistent milk yield and calm behavior on the farm.';
  const color = product?.color || 'Black & White';

  const overviewDetails = [
    { label: 'Animal Name', value: name, icon: 'pets' },
    { label: 'Breed', value: breed, icon: 'label' },
    { label: 'Color', value: color, icon: 'palette' },
    { label: 'Gender', value: gender, icon: 'wc' },
    { label: 'Age', value: age, icon: 'cake' },
    { label: 'Weight', value: product?.weight || '450 kg', icon: 'fitness-center' },
    { label: 'Milk Yield', value: product?.milkYield || '12 L/day', icon: 'opacity' },
    { label: 'Date of Birth', value: '10 Mar 2021', icon: 'calendar-today' },
    { label: 'Owner', value: 'Rashi Farm', icon: 'account-circle' }
  ];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${name} (${breed}, ${age}) on CattleCare App! Beautiful livestock management details inside.`,
      });
    } catch (error: any) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cover Image Carousel & Floating Actions */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {images.map((imgUri: string, index: number) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => {
                  setModalActiveIndex(index);
                  setIsImageViewerVisible(true);
                }}
              >
                <Image source={{ uri: imgUri }} style={styles.carouselImage as any} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.imageOverlay} />

          {/* Dots Indicator */}
          <View style={styles.dotContainer}>
            {images.map((_: string, index: number) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeImageIndex === index ? styles.dotActive : styles.dotInactive
                ]}
              />
            ))}
          </View>
          
          {/* Header Action Floating Overlays */}
          <SafeAreaView style={styles.floatingHeader} edges={['top']}>
            <TouchableOpacity style={styles.floatingBackBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
              <Icon name="arrow-back-ios" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.floatingShareBtn} onPress={handleShare} activeOpacity={0.8}>
              <Icon name="share" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </SafeAreaView>

        </View>

        <View style={styles.contentWrapper}>
          
          {/* Animal Quick Details below image */}
          <View style={styles.detailsHeaderContainer}>
            <View style={styles.detailsTitleRow}>
              <Text style={styles.detailsTitle}>{name}</Text>
              <View style={styles.detailsBadge}>
                <Text style={styles.detailsBadgeText}>{breed}</Text>
              </View>
            </View>
            <Text style={styles.detailsSubtitle}>Cow • {age} • ID: {id}</Text>
          </View>
          
          {/* Pill Tab Selector */}
          <View style={styles.tabContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
              {tabs.map((tab, idx) => (
                <TouchableOpacity 
                  key={idx}
                  style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Tab Content */}
          {activeTab === 'Overview' && (
            <View style={styles.sectionContainer}>
              <View style={styles.descriptionCard}>
                <Text style={styles.sectionTitle}>About {name}</Text>
                <Text style={styles.descriptionText}>{animalDescription}</Text>
              </View>

              <Text style={styles.sectionHeading}>Animal Details</Text>
              <View style={styles.grid}>
                {overviewDetails.map((detail, idx) => (
                  <View key={idx} style={styles.gridCell}>
                    <View style={styles.cellHeader}>
                      <Icon name={detail.icon} size={16} color="#16A34A" style={{ marginRight: 6 }} />
                      <Text style={styles.cellLabel}>{detail.label}</Text>
                    </View>
                    <Text style={styles.cellValue}>{detail.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'Health' && (
            <View style={styles.sectionContainer}>
              {/* Health Status Card */}
              <View style={[styles.statusCard, { borderLeftColor: '#10B981' }]}>
                <View style={styles.statusHeader}>
                  <View style={[styles.statusIconBg, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                    <Icon name="favorite" size={24} color="#10B981" />
                  </View>
                  <View>
                    <Text style={styles.statusTitle}>Overall Health: Healthy</Text>
                    <Text style={styles.statusSubtext}>Last Checked: 15 May 2026</Text>
                  </View>
                </View>
                <Text style={styles.statusDescription}>
                  All vaccinations are up to date. Last checkup was done by Dr. Verma. Weight is stable.
                </Text>
              </View>

              {/* Vaccination Section */}
              <Text style={styles.sectionHeading}>Vaccination History</Text>
              <View style={styles.infoList}>
                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                    <MCIcon name="needle" size={22} color="#3B82F6" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>FMD Vaccine</Text>
                    <Text style={styles.listSubtext}>Date: 10 May 2026 • Doctor: Dr. Verma</Text>
                  </View>
                  <View style={styles.badgeSuccess}>
                    <Text style={styles.badgeText}>Completed</Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                    <MCIcon name="needle" size={22} color="#3B82F6" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>Brucellosis Vaccine</Text>
                    <Text style={styles.listSubtext}>Date: 05 Jan 2026 • Doctor: Dr. Verma</Text>
                  </View>
                  <View style={styles.badgeSuccess}>
                    <Text style={styles.badgeText}>Completed</Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                    <MCIcon name="needle" size={22} color="#F59E0B" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>HS Vaccine</Text>
                    <Text style={styles.listSubtext}>Next due: 20 Aug 2026 (Scheduled)</Text>
                  </View>
                  <View style={styles.badgeWarning}>
                    <Text style={styles.badgeTextWarning}>Scheduled</Text>
                  </View>
                </View>
              </View>

              {/* Deworming Card */}
              <Text style={styles.sectionHeading}>Deworming & Checkups</Text>
              <View style={styles.dewormingCard}>
                <View style={styles.dewormingRow}>
                  <Icon name="healing" size={20} color="#F59E0B" style={{ marginRight: 8 }} />
                  <Text style={styles.dewormingTitle}>Last Deworming: 12 Apr 2026</Text>
                </View>
                <Text style={styles.dewormingText}>
                  Next deworming cycle is scheduled in 6 weeks (Recommended: Albendazole).
                </Text>
              </View>
            </View>
          )}

          {activeTab === 'Breeding' && (
            <View style={styles.sectionContainer}>
              {/* Breeding Status Card */}
              <View style={[styles.statusCard, { borderLeftColor: '#F59E0B' }]}>
                <View style={styles.statusHeader}>
                  <View style={[styles.statusIconBg, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                    <Icon name="child-care" size={24} color="#F59E0B" />
                  </View>
                  <View>
                    <Text style={styles.statusTitle}>Breeding Status: Pregnant</Text>
                    <Text style={styles.statusSubtext}>Est. Calving: 25 Nov 2026</Text>
                  </View>
                </View>
                <Text style={styles.statusDescription}>
                  Successfully inseminated on 20 Feb 2026. Calving expected date: 25 Nov 2026 (approx 3 months pregnant).
                </Text>
              </View>

              {/* Breeding Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>Total Calvings</Text>
                  <Text style={styles.statValue}>2 Times</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>AI Insemination</Text>
                  <Text style={styles.statValue}>3 Cycles</Text>
                </View>
              </View>

              {/* Breeding History */}
              <Text style={styles.sectionHeading}>Breeding History</Text>
              <View style={styles.infoList}>
                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(22, 163, 74, 0.1)' }]}>
                    <Icon name="event" size={22} color="#16A34A" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>2nd Calving (Female Calf)</Text>
                    <Text style={styles.listSubtext}>Date: 15 Apr 2025 • Health: Healthy</Text>
                  </View>
                  <View style={styles.badgeSuccess}>
                    <Text style={styles.badgeText}>Success</Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(22, 163, 74, 0.1)' }]}>
                    <Icon name="event" size={22} color="#16A34A" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>1st Calving (Male Calf)</Text>
                    <Text style={styles.listSubtext}>Date: 10 Jan 2024 • Health: Healthy</Text>
                  </View>
                  <View style={styles.badgeSuccess}>
                    <Text style={styles.badgeText}>Success</Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                    <Icon name="event" size={22} color="#EF4444" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>Artificial Insemination</Text>
                    <Text style={styles.listSubtext}>Date: 12 Mar 2023 • Inseminator: Dr. Verma</Text>
                  </View>
                  <View style={styles.badgeDanger}>
                    <Text style={styles.badgeTextDanger}>Failed</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'Activity' && (
            <View style={styles.sectionContainer}>
              {/* Activity Stats Grid */}
              <View style={styles.activityStatsGrid}>
                <View style={styles.activityStatBox}>
                  <Icon name="directions-walk" size={24} color="#16A34A" />
                  <Text style={styles.activityStatValue}>8,420</Text>
                  <Text style={styles.activityStatLabel}>Steps Today</Text>
                </View>
                <View style={styles.activityStatBox}>
                  <Icon name="restaurant" size={24} color="#3B82F6" />
                  <Text style={styles.activityStatValue}>7.5 hrs</Text>
                  <Text style={styles.activityStatLabel}>Grazing Time</Text>
                </View>
                <View style={styles.activityStatBox}>
                  <Icon name="update" size={24} color="#8B5CF6" />
                  <Text style={styles.activityStatValue}>420 min</Text>
                  <Text style={styles.activityStatLabel}>Rumination</Text>
                </View>
                <View style={styles.activityStatBox}>
                  <Icon name="hotel" size={24} color="#EC4899" />
                  <Text style={styles.activityStatValue}>9.0 hrs</Text>
                  <Text style={styles.activityStatLabel}>Resting Time</Text>
                </View>
              </View>

              {/* Activity Level Status */}
              <View style={[styles.statusCard, { borderLeftColor: '#3B82F6', marginTop: 15 }]}>
                <View style={styles.statusHeader}>
                  <View style={[styles.statusIconBg, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                    <Icon name="speed" size={24} color="#3B82F6" />
                  </View>
                  <View>
                    <Text style={styles.statusTitle}>Activity Level: Normal</Text>
                    <Text style={styles.statusSubtext}>Sensor Tracked Live</Text>
                  </View>
                </View>
                <Text style={styles.statusDescription}>
                  Animal shows normal grazing, rumination and resting patterns. No anomalies or heat symptoms detected in the last 48 hours.
                </Text>
              </View>

              {/* Detailed Activity Logs */}
              <Text style={styles.sectionHeading}>Recent Timeline</Text>
              <View style={styles.infoList}>
                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                    <Icon name="check-circle" size={22} color="#16A34A" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>Grazing & Feed Intake</Text>
                    <Text style={styles.listSubtext}>10:00 AM - 02:00 PM • Healthy appetite observed</Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                    <Icon name="check-circle" size={22} color="#16A34A" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>Rumination Cycle</Text>
                    <Text style={styles.listSubtext}>02:30 PM - 04:30 PM • 120 minutes of rumination</Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View style={[styles.listIconBg, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                    <Icon name="check-circle" size={22} color="#16A34A" />
                  </View>
                  <View style={styles.listTextContainer}>
                    <Text style={styles.listHeading}>Resting Period</Text>
                    <Text style={styles.listSubtext}>05:00 PM - 07:00 PM • Normal resting heart rate</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

        </View>
      </ScrollView>

      {/* Bottom Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
          <Text style={styles.editBtnText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.recordBtn} 
          onPress={() => navigation.navigate('HealthRecord', { animalName: name, breed: breed })}
          activeOpacity={0.85}
        >
          <Icon name="healing" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.recordBtnText}>Health Record</Text>
        </TouchableOpacity>
      </View>

      {/* Chat FAB */}
      <TouchableOpacity 
        style={styles.chatFab}
        onPress={() => navigation.navigate('Community')}
        activeOpacity={0.85}
      >
        <Icon name="chat" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Full-Screen Image Viewer Modal */}
      <Modal
        visible={isImageViewerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsImageViewerVisible(false)}
      >
        <View style={styles.modalBackground}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.modalCloseBtn} 
            onPress={() => setIsImageViewerVisible(false)}
            activeOpacity={0.8}
          >
            <Icon name="close" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          
          {/* Horizontal Scrollable Slider of Zoomable Images */}
          <ScrollView
            ref={modalScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleModalScroll}
            scrollEventThrottle={16}
            style={styles.modalSlider}
            contentContainerStyle={styles.modalSliderContent}
          >
            {images.map((imgUri: string, index: number) => (
              <View key={index} style={styles.modalSlide}>
                <ZoomableImage uri={imgUri} styles={styles} />
              </View>
            ))}
          </ScrollView>

          {/* Page Counter Indicator at the bottom */}
          <View style={styles.modalPageIndicator}>
            <Text style={styles.modalPageIndicatorText}>
              {modalActiveIndex + 1} / {images.length}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 110 },
  
  imageContainer: { 
    height: 350, 
    position: 'relative',
    backgroundColor: '#000000',
  },
  carouselImage: { width: width, height: '100%' },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
    zIndex: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 14,
    backgroundColor: '#16A34A',
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  zoomContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  zoomScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSlider: {
    flex: 1,
    width: width,
  },
  modalSliderContent: {
    alignItems: 'center',
  },
  modalSlide: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPageIndicator: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalPageIndicatorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: FONT_SANS,
  },

  floatingHeader: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 0 : 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 99,
  },
  floatingBackBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  floatingShareBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  detailsHeaderContainer: {
    marginBottom: 22,
  },
  detailsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailsTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  detailsBadge: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.25)',
  },
  detailsBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#16A34A',
    fontFamily: FONT_SANS,
  },
  detailsSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    marginTop: 4,
  },

  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  tabContainer: {
    marginBottom: 20,
  },
  tabScrollContent: {
    gap: 8,
  },
  tabBtn: { 
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabBtnActive: { 
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  tabText: { fontSize: 13, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  tabTextActive: { color: '#FFFFFF', fontWeight: '900' },

  sectionContainer: {
    flex: 1,
  },
  descriptionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 22,
    fontFamily: FONT_SANS,
    fontWeight: '600',
  },

  sectionHeading: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
    marginTop: 25,
    marginBottom: 14,
  },

  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: 12,
  },
  gridCell: { 
    width: (width - 52) / 2, 
    backgroundColor: COLORS.surface, 
    borderRadius: 22, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: COLORS.border,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 6,
  },
  cellHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cellLabel: { fontSize: 11, fontWeight: '800', color: COLORS.secondary, fontFamily: FONT_SANS },
  cellValue: { fontSize: 15, fontWeight: '900', color: COLORS.primary, fontFamily: FONT_SANS },

  statusCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  statusSubtext: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: FONT_SANS,
  },
  statusDescription: {
    fontSize: 13,
    color: COLORS.secondary,
    lineHeight: 20,
    fontFamily: FONT_SANS,
    fontWeight: '600',
  },

  infoList: {
    marginBottom: 20,
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  listIconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  listHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
  },
  listSubtext: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 2,
    fontFamily: FONT_SANS,
    fontWeight: '600',
  },
  badgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#10B981',
    fontFamily: FONT_SANS,
  },
  badgeWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  badgeTextWarning: {
    fontSize: 10,
    fontWeight: '900',
    color: '#F59E0B',
    fontFamily: FONT_SANS,
  },
  badgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  badgeTextDanger: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EF4444',
    fontFamily: FONT_SANS,
  },
  dewormingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  dewormingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dewormingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
  },
  dewormingText: {
    fontSize: 13,
    color: COLORS.secondary,
    lineHeight: 20,
    fontFamily: FONT_SANS,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 4,
    fontFamily: FONT_SERIF,
  },
  activityStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  activityStatBox: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  activityStatValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 6,
    fontFamily: FONT_SERIF,
  },
  activityStatLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.secondary,
    marginTop: 3,
    fontFamily: FONT_SANS,
  },

  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 20, backgroundColor: COLORS.surface, flexDirection: 'row', gap: 12,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  editBtn: { 
    flex: 1, height: 56, backgroundColor: COLORS.surface, borderRadius: 28, 
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#16A34A'
  },
  editBtnText: { fontSize: 15, fontWeight: '900', color: '#16A34A', fontFamily: FONT_SANS },
  recordBtn: { 
    flex: 2.2, height: 56, backgroundColor: '#16A34A', borderRadius: 28, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10
  },
  recordBtnText: { fontSize: 15, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT_SANS },
  chatFab: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 999
  }
});

export default AnimalDetailsScreen;