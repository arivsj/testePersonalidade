import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C2C2C" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>DESVENDE SUA</Text>
        <Text style={styles.title}>PERSONALIDIADE</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Conheça a si mesmo de verdade!</Text>

        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          {/* Decorative Shapes */}
          <View style={[styles.decorativeShape, styles.shape1]} />
          <View style={[styles.decorativeShape, styles.shape2]} />
          <View style={[styles.decorativeShape, styles.shape3]} />
          <View style={[styles.decorativeShape, styles.shape4]} />
          <View style={[styles.decorativeShape, styles.shape5]} />
          <View style={[styles.decorativeShape, styles.shape6]} />
          <View style={[styles.decorativeShape, styles.shape7]} />
          <View style={[styles.decorativeShape, styles.shape8]} />

          {/* Main Illustration Circle */}
          <View style={styles.mainCircle}>
            <Image
              source={require('@/assets/images/personhome.png')}
              style={styles.personImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* CTA Button */}
        <Link href="/questionarioMBTI" asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#5A2D8F', '#E93E7F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>COMEÇAR TESTE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem}>
          <MaterialIcons name="home" size={18} color="#FFFFFF" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextSpacing]}>Sobre</Text>
        </TouchableOpacity>
        <Text style={styles.bottomNavText}>Resultados Anteriores</Text>
        <TouchableOpacity style={styles.bottomNavItem}>
          <MaterialIcons name="star-border" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    fontFamily: 'sans-serif',
  },
  illustrationContainer: {
    width: width * 0.48,
    height: width * 0.48,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  mainCircle: {
    width: width * 0.42,
    height: width * 0.42,
    borderRadius: (width * 0.42) / 2,
    backgroundColor: '#8A56E2',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  personImage: {
    width: '90%',
    height: '90%',
  },
  decorativeShape: {
    position: 'absolute',
  },
  shape1: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#87CEEB',
    top: '5%',
    left: '8%',
  },
  shape2: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFA500',
    top: '8%',
    left: '15%',
  },
  shape3: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#90EE90',
    top: '12%',
    left: '10%',
  },
  shape4: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF69B4',
    top: '3%',
    right: '12%',
  },
  shape5: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#90EE90',
    top: '8%',
    right: '8%',
  },
  shape6: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#87CEEB',
    bottom: '12%',
    left: '10%',
  },
  shape7: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF69B4',
    bottom: '10%',
    left: '6%',
  },
  shape8: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#9370DB',
    bottom: '8%',
    right: '10%',
  },
  ctaButton: {
    width: width * 0.85,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  neonBorder: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#9D4EDD',
    shadowColor: '#9D4EDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNavText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  bottomNavTextSpacing: {
    marginLeft: 5,
  },
});

export default HomeScreen;