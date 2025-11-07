import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  titleStyle, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style, disabled && styles.disabledButton]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;