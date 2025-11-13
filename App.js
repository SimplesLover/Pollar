import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useEffect } from 'react';
import { useColorScheme, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { DataProvider } from './src/context/DataContext';
import { TextSizeProvider } from './src/context/TextSizeContext';
import Toast from './src/components/Toast';

function AppContainer() {
  const colorScheme = useColorScheme();
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark' || (themeMode === 'system' && colorScheme === 'dark');

  useEffect(() => {
    const setupImmersiveMode = async () => {
      try {
        // Hide navigation bar on Android
        if (Platform.OS === 'android') {
          await NavigationBar.setVisibilityAsync('hidden');
          await NavigationBar.setBackgroundColorAsync('#00000000');
          await NavigationBar.setBehaviorAsync('overlay-swipe');
        }
        
        // Set system UI to immersive mode
        await SystemUI.setSystemUIStyleAsync({
          visibility: 'immersive',
          backgroundColor: '#00000000',
        });
        
      } catch (error) {
        console.warn('Erro ao configurar modo imersivo:', error);
      }
    };

    setupImmersiveMode();
  }, []);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      <Toast />
      <StatusBar style={isDark ? 'light' : 'dark'} hidden={true} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TextSizeProvider>
        <DataProvider>
          <AppContainer />
        </DataProvider>
      </TextSizeProvider>
    </ThemeProvider>
  );
}
