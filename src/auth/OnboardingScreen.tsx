import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColors } from '../context/useTheme';

const { width, height } = Dimensions.get('window');
const FONT_SERIF = Platform.OS === 'ios' ? 'Georgia' : 'serif';
const FONT_SANS = Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium';

// Each slide gets its own background image
const SLIDE_IMAGES = [
  require('../../assets/image.png'),          // Slide 1 — Manage Cattle
  require('../../assets/image copy.png'),     // Slide 2 — Improve Breeding
  require('../../assets/image copy 2.png'),   // Slide 3 — Increase Productivity
];

const OnboardingScreen = ({ navigation }: any) => {
  const COLORS = useThemeColors();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [0, 1, 2];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('SelectRole');
    }
  };

  return (
    <ImageBackground
      source={SLIDE_IMAGES[currentSlide]}
      style={styles.bgImage}
      resizeMode="cover"
    >
      {/* Light overlay — keeps image clearly visible */}
      <View style={styles.overlay} />

      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <SafeAreaView style={styles.container}>

        {/* Skip Header */}
        <View style={styles.topBar}>
          {currentSlide < 2 ? (
            <TouchableOpacity onPress={() => navigation.replace('SelectRole')}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ height: 20 }} />
          )}
        </View>

        {/* Spacer — image fills the screen */}
        <View style={{ flex: 1 }} />

        {/* Bottom panel — dots + button only */}
        <View style={styles.contentContainer}>
          <View style={styles.footerRow}>
            {/* Dot Indicators */}
            <View style={styles.indicatorContainer}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: index === currentSlide ? '#F59E0B' : 'rgba(255,255,255,0.5)',
                      width: index === currentSlide ? 24 : 8,
                    },
                  ]}
                />
              ))}
            </View>

            {/* Action Button */}
            {currentSlide < 2 ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.startedButton}
                onPress={handleNext}
                activeOpacity={0.85}
              >
                <Text style={styles.startedText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // Lighter overlay so image shows clearly — reduced from 0.55 to 0.25
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 30, 20, 0.25)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: FONT_SANS,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // Bottom panel
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: 'rgba(10, 30, 20, 0.45)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  nextButton: {
    height: 48,
    paddingHorizontal: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  nextText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16A34A',
    fontFamily: FONT_SANS,
  },
  startedButton: {
    height: 52,
    flex: 1,
    marginLeft: 30,
    borderRadius: 26,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  startedText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
    fontFamily: FONT_SANS,
  },
});

export default OnboardingScreen;
