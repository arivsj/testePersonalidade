import React from 'react';
import { View, Text } from 'react-native';
import MBTITestScreen from '../screens/MBTITestScreen';
import MBTIResultScreen from '../screens/MBTIResultScreen';
import { useLocalSearchParams } from 'expo-router';

// Componente para determinar qual tela exibir com base nos parâmetros
const MBTINavigator: React.FC = () => {
  const params = useLocalSearchParams();
  console.log('Parâmetros recebidos no MBTINavigator:', params); // Adicionando log para depuração

  // Verifica se estamos na tela de resultados com parâmetros
  // Agora considerando que a presença de responses pode indicar a tela de resultados
  console.log('screen === "result":', params.screen === 'result');
  console.log('!!params.responses:', !!params.responses);
  
  if (params.responses) {
    console.log('Renderizando MBTIResultScreen - parâmetro responses está presente');
    return <MBTIResultScreen />;
  }

  console.log('Renderizando MBTITestScreen ou tela padrão');
  // Por padrão, mostra a tela de teste
  return <MBTITestScreen />;
};

export default MBTINavigator;