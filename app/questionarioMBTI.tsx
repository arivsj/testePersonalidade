import React from 'react';
import { View } from 'react-native';
import MBTINavigator from '@/src/personalidade/navigation/MBTINavigator';

export default function QuestionarioMBTI() {
  return (
    <View style={{ flex: 1 }}>
      <MBTINavigator />
    </View>
  );
}