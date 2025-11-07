import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Share, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { calculateMBTIResult, getMBTIDescription, getMBTIExplanations } from '../utils/mbtiCalculator';

const MBTIResultScreen: React.FC = () => {
  const params = useLocalSearchParams();
  console.log('Parâmetros recebidos na tela de resultados:', params); // Log de depuração
  const [mbtiResult, setMbtIResult] = useState<any>(null);
  const [explanations, setExplanations] = useState<any>(null);

  useEffect(() => {
    console.log('Efeito executado em MBTIResultScreen com params.responses:', params.responses);
    if (params.responses) {
      try {
        console.log('Tentando parsear respostas:', params.responses);
        const responses = JSON.parse(decodeURIComponent(params.responses as string));
        console.log('Respostas parseadas:', responses);
        if (responses && responses.length > 0) {
          const calculatedResult = calculateMBTIResult(responses);
          console.log('Resultado calculado:', calculatedResult);
          const explanationsResult = getMBTIExplanations(calculatedResult);

          setMbtIResult(calculatedResult);
          setExplanations(explanationsResult);
        }
      } catch (e) {
        console.error('Erro ao parsear respostas:', e);
      }
    } else {
      // Se não houver respostas, voltar para a tela inicial
      console.log('Nenhuma resposta encontrada, redirecionando...');
    }
  }, [params.responses]);

  const handleShare = async () => {
    if (!mbtiResult) return;

    try {
      const shareResult = await Share.share({
        message: `Meu tipo MBTI é ${mbtiResult.type} - ${getMBTIDescription(mbtiResult.type)}! Faça o teste também.`,
        title: 'Meu Resultado MBTI'
      });

      if (shareResult.action === Share.sharedAction) {
        console.log('Conteúdo compartilhado com sucesso');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o resultado');
    }
  };

  if (!mbtiResult || !explanations) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Processando resultados...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Seu Tipo MBTI</Text>
          <Text style={styles.resultType}>{mbtiResult.type}</Text>
          <Text style={styles.description}>{getMBTIDescription(mbtiResult.type)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Resultado</Text>

          <View style={styles.dimensionContainer}>
            <Text style={styles.dimensionTitle}>{explanations.EI.dimension}</Text>
            <Text style={styles.dimensionResult}>
              {mbtiResult.EI === 'N' 
                ? `Neutro - Você obteve pontuação igual a 15 (${mbtiResult.scores.E}) para esta dimensão. Isso indica que você pode se sentir confortável com ambos os lados da dicotomia.` 
                : mbtiResult.EI === 'E' 
                  ? explanations.EI.E 
                  : explanations.EI.I}
            </Text>
            <Text style={styles.dimensionExplanation}>{explanations.EI.explanation}</Text>
          </View>

          <View style={styles.dimensionContainer}>
            <Text style={styles.dimensionTitle}>{explanations.SN.dimension}</Text>
            <Text style={styles.dimensionResult}>
              {mbtiResult.SN === 'N' 
                ? `Neutro - Você obteve pontuação igual a 15 (${mbtiResult.detailedScores.totals.information}) para esta dimensão.` 
                : mbtiResult.SN === 'S' 
                  ? explanations.SN.S 
                  : explanations.SN.N}
            </Text>
            <Text style={styles.dimensionExplanation}>{explanations.SN.explanation}</Text>
          </View>

          <View style={styles.dimensionContainer}>
            <Text style={styles.dimensionTitle}>{explanations.TF.dimension}</Text>
            <Text style={styles.dimensionResult}>
              {mbtiResult.TF === 'N' 
                ? `Neutro - Você obteve pontuação igual a 15 (${mbtiResult.detailedScores.totals.decision}) para esta dimensão.` 
                : mbtiResult.TF === 'T' 
                  ? explanations.TF.T 
                  : explanations.TF.F}
            </Text>
            <Text style={styles.dimensionExplanation}>{explanations.TF.explanation}</Text>
          </View>

          <View style={styles.dimensionContainer}>
            <Text style={styles.dimensionTitle}>{explanations.JP.dimension}</Text>
            <Text style={styles.dimensionResult}>
              {mbtiResult.JP === 'N' 
                ? `Neutro - Você obteve pontuação igual a 15 (${mbtiResult.detailedScores.totals.organization}) para esta dimensão.` 
                : mbtiResult.JP === 'J' 
                  ? explanations.JP.J 
                  : explanations.JP.P}
            </Text>
            <Text style={styles.dimensionExplanation}>{explanations.JP.explanation}</Text>
          </View>
        </View>

        {(() => {
          // Informações detalhadas sobre cada tipo MBTI
          const typeDetails = {
            "ISTJ": {
              name: "O Logístico",
              description: "Prático e orientado por fatos, com integridade inabalável. Pessoas com personalidade ISTJ são responsáveis e realistas, metódicas e dedicadas. Valorizam a tradição e a ordem.",
              strengths: ["Responsável", "Organizado", "Prático", "Confiável", "Detalhista"],
              weaknesses: ["Teimoso", "Inflexível", "Resistente a mudanças"]
            },
            "ISFJ": {
              name: "O Defensor",
              description: "Protetor e dedicado, pronto para defender seus entes queridos. Pessoas ISFJ são calorosas, atenciosas e práticas. São extremamente leais e valorizam a harmonia.",
              strengths: ["Atencioso", "Confiável", "Paciente", "Leal", "Prático"],
              weaknesses: ["Excessivamente modesto", "Resistente a mudanças", "Sensível a críticas"]
            },
            "INFJ": {
              name: "O Advogado",
              description: "Idealista e organizado, impulsionado por valores sólidos. Pessoas INFJ são visionárias, criativas e profundamente preocupadas com o bem-estar dos outros.",
              strengths: ["Criativo", "Insightful", "Determinado", "Inspirador", "Altruísta"],
              weaknesses: ["Sensível", "Perfeccionista", "Tende a se isolar"]
            },
            "INTJ": {
              name: "O Arquiteto",
              description: "Estratégico e inovador, sempre com um plano para tudo. Pessoas INTJ são analíticas, determinadas e visionárias. Valorizam a competência e o conhecimento.",
              strengths: ["Estratégico", "Independente", "Determinado", "Curioso", "Inovador"],
              weaknesses: ["Arrogante", "Insensível", "Excessivamente crítico"]
            },
            "ISTP": {
              name: "O Virtuoso",
              description: "Experimentador prático e ousado, mestre de todas as ferramentas. Pessoas ISTP são adaptáveis, lógicas e excelentes em situações de crise.",
              strengths: ["Otimista", "Criativo", "Prático", "Calmo sob pressão", "Espontâneo"],
              weaknesses: ["Insensível", "Impaciente", "Arriscado"]
            },
            "ISFP": {
              name: "O Aventureiro",
              description: "Artista flexível e charmoso, sempre pronto para explorar. Pessoas ISFP são sensíveis, calorosas e valorizam a liberdade pessoal.",
              strengths: ["Charmoso", "Sensível à arte", "Curioso", "Leal", "Prático"],
              weaknesses: ["Conflitante", "Excessivamente competitivo", "Impulsivo"]
            },
            "INFP": {
              name: "O Mediador",
              description: "Poético, amável e altruísta, sempre em busca do bem. Pessoas INFP são idealistas, criativas e guiadas por seus valores.",
              strengths: ["Empático", "Criativo", "Idealista", "Curioso", "Adaptável"],
              weaknesses: ["Irrealista", "Autocrítico", "Difícil de conhecer"]
            },
            "INTP": {
              name: "O Lógico",
              description: "Inventor inovador com uma sede insaciável por conhecimento. Pessoas INTP são analíticas, curiosas e independentes.",
              strengths: ["Analítico", "Original", "Entusiasmado", "Objetivo", "Aberto"],
              weaknesses: ["Insensível", "Absorto", "Condescendente"]
            },
            "ESTP": {
              name: "O Empresário",
              description: "Inteligente, energético e muito perceptivo, que adora arriscar. Pessoas ESTP são enérgicas, práticas e excelentes em resolver problemas.",
              strengths: ["Ousado", "Racional", "Prático", "Direto", "Perceptivo"],
              weaknesses: ["Insensível", "Impulsivo", "Não consegue antecipar"]
            },
            "ESFP": {
              name: "O Animador",
              description: "Espontâneo, energético e entusiasta - a vida nunca é chata. Pessoas ESFP são sociáveis, divertidas e vivem o momento.",
              strengths: ["Corajoso", "Prático", "Ótimo senso de humor", "Original", "Perceptivo"],
              weaknesses: ["Sensível", "Conflitante", "Facilmente entediado"]
            },
            "ENFP": {
              name: "O Ativista",
              description: "Espirituoso, criativo e sociável, capaz de encontrar conexões entre tudo. Pessoas ENFP são entusiastas, criativas e sociáveis.",
              strengths: ["Curioso", "Perceptivo", "Energético", "Entusiasta", "Excelente comunicador"],
              weaknesses: ["Pouco prático", "Fácil de estressar", "Excessivamente emocional"]
            },
            "ENTP": {
              name: "O Inovador",
              description: "Inventor esperto e curioso, que adora um desafio intelectual. Pessoas ENTP são inovadoras, enérgicas e excelentes debatedoras.",
              strengths: ["Conhecimento rápido", "Inovador", "Estimulante", "Energético", "Racional"],
              weaknesses: ["Argumentativo", "Insensível", "Intolerante"]
            },
            "ESTJ": {
              name: "O Executivo",
              description: "Administrador excelente, inigualável em gerenciar coisas. Pessoas ESTJ são práticas, diretas e organizadas.",
              strengths: ["Dedicado", "Fortes vontades", "Direto", "Leal", "Responsável"],
              weaknesses: ["Inflexível", "Intolerante", "Teimoso"]
            },
            "ESFJ": {
              name: "O Cônsul",
              description: "Pessoa extraordinariamente atenciosa, social e popular. Pessoas ESFJ são sociáveis, práticas e atenciosas.",
              strengths: ["Prático", "Leal", "Bom ouvinte", "Energético", "Bom senso de dever"],
              weaknesses: ["Inflexível", "Inseguro", "Pouco imaginativo"]
            },
            "ENFJ": {
              name: "O Protagonista",
              description: "Líder carismático e inspirador, capaz de cativar seus ouvintes. Pessoas ENFJ são carismáticas, inspiradoras e organizadas.",
              strengths: ["Tolerante", "Confia nos outros", "Charisma natural", "Altruísta", "Inspirador"],
              weaknesses: ["Muito altruísta", "Fluctuante", "Inseguro"]
            },
            "ENTJ": {
              name: "O Comandante",
              description: "Líder ousado, imaginativo e de forte vontade, sempre encontrando uma maneira. Pessoas ENTJ são estratégicas, lógicas e determinadas.",
              strengths: ["Eficiente", "Energético", "Autoconfiante", "Forte vontade", "Estratégico"],
              weaknesses: ["Teimoso", "Intolerante", "Impaciente"]
            }
          };

          // Removendo a seção de pontuações por dimensão e adicionando informações detalhadas
          const currentTypeDetails = typeDetails[mbtiResult.type] || {
            name: "Tipo Desconhecido",
            description: "Não encontramos informações detalhadas sobre este tipo MBTI.",
            strengths: ["N/A"],
            weaknesses: ["N/A"]
          };

          return (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{currentTypeDetails.name}</Text>
                <Text style={styles.description}>{currentTypeDetails.description}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pontos Fortes</Text>
                <View style={styles.listContainer}>
                  {currentTypeDetails.strengths.map((strength, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.listItemText}>• {strength}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Pontos de Melhoria</Text>
                <View style={styles.listContainer}>
                  {currentTypeDetails.weaknesses.map((weakness, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.listItemText}>• {weakness}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          );
        })()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.buttonText}>Compartilhar Resultado</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.repeatButton}
            onPress={() => {
              // Aqui normalmente voltaria ao início do teste
              Alert.alert("Repetir Teste", "Funcionalidade de repetir o teste não implementada neste exemplo.");
            }}
          >
            <Text style={styles.buttonText}>Refazer Teste</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    padding: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#3D3D3D',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  resultType: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#8A56E2',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  section: {
    backgroundColor: '#3D3D3D',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  dimensionContainer: {
    marginBottom: 15,
  },
  dimensionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8A56E2',
    marginBottom: 5,
  },
  dimensionResult: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  dimensionExplanation: {
    fontSize: 12,
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  listItem: {
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#8A56E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },
  repeatButton: {
    flex: 1,
    backgroundColor: '#8A56E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default MBTIResultScreen;