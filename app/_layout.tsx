import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MBTIProvider } from '@/src/personalidade/context/mbtiContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <MBTIProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen
              name="questionarioMBTI"
              options={{
                headerShown: false,
                presentation: 'card' // This ensures it slides in from right like a normal screen
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </MBTIProvider>
    </Provider>
  );
}