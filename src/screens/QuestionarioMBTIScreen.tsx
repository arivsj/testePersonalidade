import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface QuestionarioMBTIScreenProps {
  navigation?: any;
}

const QuestionarioMBTIScreen: React.FC<QuestionarioMBTIScreenProps> = ({ navigation }) => {
  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C2C2C" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '30%' }]} />
          </View>
          <Text style={styles.progressText}>3/10</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Question */}
        <Text style={styles.questionTitle}>Pergunta 3 de 10</Text>
        <Text style={styles.questionText}>
          Quando estou trabalhando em um projeto, eu prefiro:
        </Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>
              a) Planejar cada etapa com antecedência
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>
              b) Trabalhar de forma espontânea e adaptativa
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>
              c) Focar nas pessoas envolvidas e seu bem-estar
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>
              d) Analisar criticamente todas as possibilidades
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50, // Extra padding for status bar
  },
  backButton: {
    padding: 10,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#555',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A56E2',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    minWidth: 40,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  questionTitle: {
    fontSize: 16,
    color: '#8A56E2',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  optionsContainer: {
    width: '100%',
    maxWidth: 500,
  },
  optionButton: {
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
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

export default QuestionarioMBTIScreen;