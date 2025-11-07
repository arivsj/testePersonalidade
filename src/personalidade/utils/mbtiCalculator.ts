/**
 * Utilitário para cálculo do tipo MBTI com base nas respostas do usuário
 * Seguindo as instruções exatas do teste:
 * - Pontuação de 1 a 5 para cada pergunta
 * - Somar as pontuações para cada bloco de 5 perguntas
 * - Comparar com o ponto médio 15 para determinar preferência
 */

interface QuestionResponse {
  questionId: number;
  score: number; // 1 a 5
}

interface MBTIResult {
  EI: 'E' | 'I' | 'N'; // N para neutro
  SN: 'S' | 'N' | 'N';
  TF: 'T' | 'F' | 'N';
  JP: 'J' | 'P' | 'N';
  type: string; // Ex: "INTJ"
  scores: {
    E: number; // Soma das perguntas 1-5
    S: number; // Soma das perguntas 6-10
    T: number; // Soma das perguntas 11-15
    J: number; // Soma das perguntas 16-20
  };
  detailedScores: {
    raw: number[]; // Pontuações brutas para cada pergunta
    totals: {
      energy: number; // Perguntas 1-5
      information: number; // Perguntas 6-10
      decision: number; // Perguntas 11-15
      organization: number; // Perguntas 16-20
    };
  };
}

/**
 * Calcula o tipo MBTI com base nas respostas do usuário
 * @param responses Array de respostas do usuário
 * @returns Resultado MBTI com pontuações e tipo
 */
export const calculateMBTIResult = (responses: QuestionResponse[]): MBTIResult => {
  console.log('Calculando MBTI com respostas:', responses); // Log de depuração
  
  // Inicializa somas para cada bloco de perguntas
  const sums = {
    energy: 0,        // Perguntas 1-5 (E vs I)
    information: 0,   // Perguntas 6-10 (S vs N)
    decision: 0,      // Perguntas 11-15 (T vs F)
    organization: 0   // Perguntas 16-20 (J vs P)
  };

  console.log('Valor inicial das somas:', sums); // Log de depuração

  // Mapeia os valores brutos para análise detalhada
  const rawScores: number[] = new Array(20).fill(0);

  // Processa cada resposta
  responses.forEach(response => {
    // Armazena o valor bruto
    if (response.questionId >= 1 && response.questionId <= 20) {
      rawScores[response.questionId - 1] = response.score;
    }
    
    // Soma nas categorias correspondentes
    if (response.questionId >= 1 && response.questionId <= 5) {
      sums.energy += response.score;
    } else if (response.questionId >= 6 && response.questionId <= 10) {
      sums.information += response.score;
    } else if (response.questionId >= 11 && response.questionId <= 15) {
      sums.decision += response.score;
    } else if (response.questionId >= 16 && response.questionId <= 20) {
      sums.organization += response.score;
    }
  });

  // Determina a preferência para cada dicotomia
  // Se soma > 15, preferência pela primeira letra
  // Se soma < 15, preferência pela segunda letra
  // Se soma = 15, neutro
  const EI = sums.energy > 15 ? 'E' : sums.energy < 15 ? 'I' : 'N';
  const SN = sums.information > 15 ? 'S' : sums.information < 15 ? 'N' : 'N';
  const TF = sums.decision > 15 ? 'T' : sums.decision < 15 ? 'F' : 'N';
  const JP = sums.organization > 15 ? 'J' : sums.organization < 15 ? 'P' : 'N';

  // Gera o tipo MBTI combinando as preferências (com N convertido para primeira opção)
  const type = `${EI === 'N' ? 'E' : EI}${SN === 'N' ? 'S' : SN}${TF === 'N' ? 'T' : TF}${JP === 'N' ? 'J' : JP}`;

  console.log('Resultado final do cálculo MBTI:', { EI, SN, TF, JP, type, sums }); // Log de depuração

  return {
    EI,
    SN,
    TF,
    JP,
    type,
    scores: {
      E: sums.energy,
      S: sums.information,
      T: sums.decision,
      J: sums.organization
    },
    detailedScores: {
      raw: rawScores,
      totals: sums
    }
  };
};

/**
 * Obtém a descrição para cada tipo MBTI
 * @param type Tipo MBTI (ex: "INTJ")
 * @returns Descrição do tipo
 */
export const getMBTIDescription = (type: string): string => {
  const descriptions: { [key: string]: string } = {
    INTJ: "Arquiteto - Imaginativo e estratégico, com grande poder de concentração",
    INTP: "Lógico - Inovador e analítico, com foco na lógica e ideias",
    ENTJ: "Comandante - Assertivo e visionário, naturalmente apto para liderar",
    ENTP: "Inovador - Inteligente e curioso, desafiador das tradições",
    INFJ: "Advogado - Incansável e idealista, com profunda sensibilidade",
    INFP: "Mediador - Poético e gentil, buscando significado e conexão",
    ENFJ: "Protagonista - Carismático e envolvente, com habilidades inatas para liderar",
    ENFP: "Ativista - Exuberante e criativo, explorador da vida",
    ISTJ: "Logístico - Prático e confiável, comprometido com a ordem e segurança",
    ISFJ: "Defensor - Atencioso e caloroso, leal e dedicado",
    ESTJ: "Executivo - Realista e direto, com foco na eficiência",
    ESFJ: "Cônsul - Popular e sociável, comprometido com harmonia e conformidade",
    ISTP: "Virtuoso - Versátil e espontâneo, com habilidades práticas",
    ISFP: "Aventureiro - Flexível e charmoso, com senso estético",
    ESTP: "Empresário - ousado e prático, com foco no presente",
    ESFP: "Animador - Espontâneo e caloroso, com entusiasmo para a vida"
  };

  return descriptions[type] || "Tipo MBTI desconhecido";
};

/**
 * Obtém explicações sobre cada dicotomia
 * @param result Resultado MBTI
 * @returns Explicações detalhadas
 */
export const getMBTIExplanations = (result: MBTIResult) => {
  const explanations = {
    EI: {
      dimension: "Fonte de Energia",
      E: "Extroversão (E): Você direciona sua energia para o mundo exterior, obtendo energia de interações sociais e atividades em grupo.",
      I: "Introversão (I): Você direciona sua energia para o mundo interior, obtendo energia de reflexões solitárias e atividades individuais.",
      explanation: `Sua pontuação foi ${result.scores.E} para Extroversão.`
    },
    SN: {
      dimension: "Forma de Coletar Informação",
      S: "Sensação (S): Você foca no concreto, no presente, nos fatos e detalhes práticos.",
      N: "Intuição (N): Você foca no abstrato, no futuro, nas possibilidades e nos padrões subjacentes.",
      explanation: `Sua pontuação foi ${result.detailedScores.totals.information} para Sensação.`
    },
    TF: {
      dimension: "Processo para Tomar Decisões",
      T: "Pensamento (T): Você usa a lógica, a objetividade e a análise impessoal ao tomar decisões.",
      F: "Sentimento (F): Você usa valores, a empatia e o impacto nas pessoas ao tomar decisões.",
      explanation: `Sua pontuação foi ${result.detailedScores.totals.decision} para Pensamento.`
    },
    JP: {
      dimension: "Estilo de Vida/Organização",
      J: "Julgamento (J): Você prefere ter as coisas resolvidas, planejar e ser organizado.",
      P: "Percepção (P): Você prefere manter as opções abertas, ser flexível e espontâneo.",
      explanation: `Sua pontuação foi ${result.detailedScores.totals.organization} para Julgamento.`
    }
  };

  return explanations;
};