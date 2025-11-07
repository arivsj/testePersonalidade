import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuth } from '@/src/hooks/useAuth';

interface LoginScreenProps {
  navigation?: any;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    // Simulate login with entered credentials
    login({
      id: '1',
      name: email.split('@')[0], // Use username from email
      email: email
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      
      <View style={styles.form}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
        
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        
        <Button title="Login" onPress={handleLogin} style={styles.button} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default LoginScreen;