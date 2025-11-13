import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { Platform } from 'react-native';

export function useImmersiveMode(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const setupImmersiveMode = async () => {
      try {
        // Hide navigation bar on Android
        if (Platform.OS === 'android') {
          await NavigationBar.setVisibilityAsync('hidden');
          
          // Set navigation bar to transparent
          await NavigationBar.setBackgroundColorAsync('#00000000');
          
          // Set navigation bar behavior to overlay
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

    const restoreSystemUI = async () => {
      try {
        if (Platform.OS === 'android') {
          await NavigationBar.setVisibilityAsync('visible');
          await NavigationBar.setBehaviorAsync('inset-swipe');
        }
        
        await SystemUI.setSystemUIStyleAsync({
          visibility: 'visible',
        });
      } catch (error) {
        console.warn('Erro ao restaurar UI do sistema:', error);
      }
    };

    if (enabled) {
      setupImmersiveMode();
    }

    // Cleanup function to restore system UI when component unmounts
    return () => {
      restoreSystemUI();
    };
  }, [enabled]);
}

// Função para ativar/desativar modo imersivo manualmente
export async function setImmersiveMode(enabled) {
  try {
    if (Platform.OS === 'android') {
      await NavigationBar.setVisibilityAsync(enabled ? 'hidden' : 'visible');
      await NavigationBar.setBehaviorAsync(enabled ? 'overlay-swipe' : 'inset-swipe');
    }
    
    await SystemUI.setSystemUIStyleAsync({
      visibility: enabled ? 'immersive' : 'visible',
      backgroundColor: '#00000000',
    });
    
    return true;
  } catch (error) {
    console.warn('Erro ao configurar modo imersivo:', error);
    return false;
  }
}