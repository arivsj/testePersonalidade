import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionProps {
  question: {
    id: number;
    text: string;
  };
  onAnswer: (questionId: number, score: number) => void;
  currentScore?: number;
}

const QuestionComponent: React.FC<QuestionProps> = ({ question, onAnswer, currentScore }) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(currentScore || null);

  // Atualiza o estado local se currentScore mudar (por exemplo, ao navegar entre perguntas)
  useEffect(() => {
    setSelectedScore(currentScore || null);
  }, [currentScore]);

  const handleScoreSelect = (score: number) => {
    const newScore = selectedScore === score ? null : score; // Permite desselecionar
    setSelectedScore(newScore);
    onAnswer(question.id, newScore || 0);
  };

  // Função para determinar a cor do círculo com base na pontuação
  const getCircleColor = (value: number) => {
    if (value === 1) return '#FF0000'; // Vermelho para Discordo Totalmente
    if (value === 5) return '#00FF00'; // Verde para Concordo Totalmente
    // Para os valores intermediários, criamos uma transição de vermelho para verde
    const intensity = (value - 1) / 4; // 0 para 1, 1 para 5
    const red = Math.round(255 * (1 - intensity));
    const green = Math.round(255 * intensity);
    return `rgb(${red},${green},0)`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      {/* Texto "Discordo Totalmente" à esquerda */}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Discordo Totalmente</Text>
        
        {/* Círculos de pontuação no centro */}
        <View style={styles.optionsContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.circleButton}
              onPress={() => handleScoreSelect(value)}
            >
              <View 
                style={[
                  styles.circle,
                  {
                    backgroundColor: getCircleColor(value),
                    borderColor: selectedScore === value ? '#FFFFFF' : 'transparent',
                    borderWidth: selectedScore === value ? 2 : 0
                  }
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Texto "Concordo Totalmente" à direita */}
        <Text style={styles.labelText}>Concordo Totalmente</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#3D3D3D',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 2,
    marginHorizontal: 20,
  },
  circleButton: {
    marginHorizontal: 5,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  }
});

export default QuestionComponent;