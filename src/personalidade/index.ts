// Exportações principais para o teste MBTI
export { default as MBTITestScreen } from './screens/MBTITestScreen';
export { default as MBTIResultScreen } from './screens/MBTIResultScreen';
export { default as MBTINavigator } from './navigation/MBTINavigator';
export { calculateMBTIResult, getMBTIDescription, getMBTIExplanations } from './utils/mbtiCalculator';
export { MBTIProvider, useMBTI } from './context/mbtiContext';
export defaultQuestions from './data/questions.json';