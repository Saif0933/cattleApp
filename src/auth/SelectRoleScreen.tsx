import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../context/useTheme';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const SelectRoleScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const styles = getStyles(COLORS);

  return (
    <ImageBackground
      source={require('../../assets/cattle_farm.png')}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      resizeMode="cover"
    >
      {/* Light overlay to match the sky and green fields brightness in screenshot */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={COLORS.isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
          
          {/* Top Brand Logo Section */}
          <View style={styles.header}>
            {/* <Icon name="cow" size={64} color="#F59E0B" style={styles.brandLogo} /> */}
            {/* <Text style={styles.brandTitle}>
              Cattle<Text style={styles.brandGold}>Care</Text>
            </Text>
            <Text style={styles.brandSubtitle}>Smart Cattle Management</Text> */}
          </View>

          {/* Select Your Role Instruction */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Select Your Role</Text>
          </View>

          {/* Role Cards List */}
          <View style={styles.cardsContainer}>
            {/* Farmer Card */}
            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => navigation.navigate('Login', { role: 'cattle' })}
              activeOpacity={0.9}
            >
              {/* Left Avatar Illustration in Circle */}
              <View style={[styles.avatarContainer, { backgroundColor: '#E2F0D9' }]}>
                <Image 
                  source={require('../../assets/image.png')}
                  style={styles.avatarImg} 
                />
              </View>

              {/* Center Info Section */}
              <View style={styles.roleInfo}>
                <View style={styles.roleHeader}>
                  <View style={[styles.badgeCircle, { backgroundColor: '#16A34A' }]}>
                    <Icon name="account" size={14} color="#FFFFFF" />
                  </View>
                  <Text style={styles.roleName}>Cattle</Text>
                </View>
                <Text style={styles.roleDescription}>
                  Manage your cattle, track health, breeding and productivity.
                </Text>
              </View>

              {/* Arrow */}
              <Icon name="chevron-right" size={26} color="#16A34A" style={styles.chevron} />
            </TouchableOpacity>

            {/* Veterinarian Card */}
            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => navigation.navigate('Login', { role: 'doctor' })}
              activeOpacity={0.9}
            >
              {/* Left Avatar Illustration in Circle */}
              <View style={[styles.avatarContainer, { backgroundColor: '#D9ECF0' }]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200' }}
                  style={styles.avatarImg} 
                />
              </View>

              {/* Center Info Section */}
              <View style={styles.roleInfo}>
                <View style={styles.roleHeader}>
                  <View style={[styles.badgeCircle, { backgroundColor: '#0284C7' }]}>
                    <Icon name="stethoscope" size={14} color="#FFFFFF" />
                  </View>
                  <Text style={styles.roleName}>Doctor</Text>
                </View>
                <Text style={styles.roleDescription}>
                  Provide better care by managing treatment and health records.
                </Text>
              </View>

              {/* Arrow */}
              <Icon name="chevron-right" size={26} color="#16A34A" style={styles.chevron} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const getStyles = (COLORS: any) => StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    transform: [{ scale: 1.22 }],
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.isDark ? 'rgba(10, 30, 20, 0.75)' : 'rgba(255, 255, 255, 0.15)', // dynamic overlay based on dark mode
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 30
  },
  header: { 
    alignItems: 'center', 
    marginTop: height * 0.04 
  },
  brandLogo: {
    marginBottom: 4,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F291E',
    fontFamily: FONT_SERIF,
    letterSpacing: -0.5
  },
  brandGold: {
    color: '#F59E0B'
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4B5563',
    fontFamily: FONT_SANS,
    marginTop: 2
  },

  titleSection: {
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.isDark ? '#FFFFFF' : '#0F291E',
    fontFamily: FONT_SERIF,
    textAlign: 'center'
  },


  cardsContainer: {
    gap: 16,
    marginVertical: 10
  },
  roleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  roleInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center'
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  badgeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  roleName: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONT_SERIF
  },
  roleDescription: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: FONT_SANS,
    lineHeight: 18
  },
  chevron: {
    marginLeft: 4
  }
});

export default SelectRoleScreen;
