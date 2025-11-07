import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import QuestionComponent from '../components/QuestionComponent';
import questionsData from '../data/questions.json';

interface QuestionResponse {
  questionId: number;
  score: number; // 1 a 5
}

const MBTITestScreen: React.FC = () => {
  const [responses, setResponses] = useState<{[key: number]: number}>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  
  // Agrupa as perguntas por categoria
  const categories = questionsData.categories;
  
  // Função chamada quando uma resposta é selecionada
  const handleAnswer = (questionId: number, score: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // Verifica se todas as perguntas foram respondidas
  const allQuestionsAnswered = () => {
    const totalQuestions = categories.reduce((acc, category) => acc + category.questions.length, 0);
    return Object.keys(responses).length === totalQuestions;
  };

  // Navega para a tela de resultados
  const goToResults = () => {
    if (!allQuestionsAnswered()) {
      Alert.alert("Atenção", "Por favor, responda todas as perguntas antes de continuar.");
      return;
    }
    
    // Converter respostas para o formato esperado e serializar para passar como parâmetro
    const responsesForCalculation: QuestionResponse[] = [];
    for (const [questionId, score] of Object.entries(responses)) {
      responsesForCalculation.push({
        questionId: parseInt(questionId),
        score: parseInt(score)
      });
    }
    
    // Serializa as respostas para passar como parâmetro para a próxima tela
    const responsesString = encodeURIComponent(JSON.stringify(responsesForCalculation));
    
    // Navega para a tela de resultados com as respostas como parâmetro
    router.push({
      pathname: '/questionarioMBTI',
      params: { screen: 'result', responses: responsesString }
    });
  };

  // Pegar as perguntas da categoria atual
  const currentCategory = categories[currentCategoryIndex];
  const currentQuestions = currentCategory.questions;

  // Verificar se todas as perguntas da categoria atual foram respondidas
  const allCategoryQuestionsAnswered = currentQuestions.every(q => responses[q.id] && responses[q.id] > 0);
  
  // Função para ir para a próxima categoria
  const goToNextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(prev => prev + 1);
      setCurrentIndex(0);
    } else {
      // Se for a última categoria, ir para os resultados
      goToResults();
    }
  };

  // Função para ir para a categoria anterior
  const goToPreviousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(prev => prev - 1);
      setCurrentIndex(0);
    }
  };

  // Renderizar o componente da pergunta atual
  const renderCurrentQuestion = () => {
    if (!currentCategory || !currentQuestions[currentIndex]) {
      return null;
    }

    const currentQuestion = currentQuestions[currentIndex];
    const currentResponse = responses[currentQuestion.id] || null;

    return (
      <QuestionComponent
        question={currentQuestion}
        onAnswer={handleAnswer}
        currentScore={currentResponse}
      />
    );
  };

  // Função para ir para a próxima pergunta
  const goToNextQuestion = () => {
    const currentQuestion = currentQuestions[currentIndex];
    if (responses[currentQuestion.id] && responses[currentQuestion.id] > 0) {
      if (currentIndex < currentQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        goToNextCategory();
      }
    }
  };

  // Função para ir para a pergunta anterior
  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      goToPreviousCategory();
    }
  };

  // Contar perguntas respondidas na categoria atual
  const answeredInCategory = currentQuestions.filter(q => responses[q.id] && responses[q.id] > 0).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentCategory.fullName}</Text>
        <Text style={styles.progressText}>
          Pergunta {currentIndex + 1} de {currentQuestions.length}
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.categoryProgressContainer}>
          <Text style={styles.categoryProgressText}>
            {answeredInCategory} de {currentQuestions.length} perguntas respondidas
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(answeredInCategory / currentQuestions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
        
        {renderCurrentQuestion()}
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={goToPreviousQuestion}
            disabled={currentCategoryIndex === 0 && currentIndex === 0}
          >
            <Text style={styles.navButtonText}>Anterior</Text>
          </TouchableOpacity>
          
          {currentIndex < currentQuestions.length - 1 || currentCategoryIndex < categories.length - 1 ? (
            <TouchableOpacity
              style={[
                styles.navButton, 
                responses[currentQuestions[currentIndex]?.id] && responses[currentQuestions[currentIndex]?.id] > 0 
                  ? styles.nextButton 
                  : styles.disabledButton
              ]}
              onPress={goToNextQuestion}
              disabled={!(responses[currentQuestions[currentIndex]?.id] && responses[currentQuestions[currentIndex]?.id] > 0)}
            >
              <Text style={styles.navButtonText}>Próxima</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.navButton, styles.resultButton]}
              onPress={goToResults}
            >
              <Text style={styles.navButtonText}>Ver Resultados</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  header: {
    backgroundColor: '#2C2C2C',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  scrollContainer: {
    padding: 10,
  },
  categoryProgressContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryProgressText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A56E2',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    padding: 15,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  nextButton: {
    backgroundColor: '#8A56E2',
  },
  resultButton: {
    backgroundColor: '#8A56E2',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default MBTITestScreen;