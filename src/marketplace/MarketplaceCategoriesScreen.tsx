import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetCategories } from '../api/hook/marketplace/categories';
import { useThemeColors } from '../context/useTheme';

const { width } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const MarketplaceCategoriesScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  const { data: categoriesResponse, isLoading } = useGetCategories();
  const categories = categoriesResponse?.data || [];

  const renderCategory = ({ item, index }: { item: any, index: number }) => {
    // Dynamic background colors for a premium boutique look
    const bgColors = ['#FEF3C7', '#E0E7FF', '#DCFCE7', '#FCE7F3', '#F3E8FF', '#FFEDD5'];
    const cardBg = bgColors[index % bgColors.length];

    return (
      <TouchableOpacity 
        style={styles.categoryCard} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('MarketplaceHome', { categoryId: item.id })}
      >
        <View style={[styles.iconBox, { backgroundColor: cardBg }]}>
          <Icon name={item.iconUrl || 'shape-outline'} size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
        {item.description && (
          <Text style={styles.categoryDesc} numberOfLines={2}>{item.description}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={COLORS.isDark ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Categories</Text>
        <View style={{ width: 44 }} /> {/* Spacer */}
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.medical || '#0D9488'} />
          <Text style={styles.loadingText}>Loading collections...</Text>
        </View>
      ) : categories.length === 0 ? (
        <View style={styles.centerContainer}>
          <Icon name="shape-outline" size={60} color={COLORS.secondary} />
          <Text style={styles.emptyText}>No categories found</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.rowWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  rowWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SANS,
    textAlign: 'center',
    marginBottom: 5,
  },
  categoryDesc: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  }
});

export default MarketplaceCategoriesScreen;
