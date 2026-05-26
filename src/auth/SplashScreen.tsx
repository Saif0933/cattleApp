import React, { useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColors } from '../context/useTheme';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

const SplashScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/cattle_farm.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          
          <View style={styles.logoContainer} />

          <View style={styles.footer} />

        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cowIcon: {
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SERIF,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E5E7EB',
    marginTop: 8,
    letterSpacing: 0.5,
    fontFamily: FONT_SANS,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  footer: {
    width: '80%',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 1,
    fontFamily: FONT_SANS,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 2,
  },
});

export default SplashScreen;
