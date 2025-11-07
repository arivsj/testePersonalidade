import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({ 
  value, 
  onChangeText, 
  placeholder,
  secureTextEntry = false,
  style,
  inputStyle 
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    fontSize: 16,
  },
});

export default Input;