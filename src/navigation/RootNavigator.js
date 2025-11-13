import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ModelsScreen from '../screens/ModelsScreen';
import ModelDetailsScreen from '../screens/ModelDetailsScreen';
import PartsScreen from '../screens/PartsScreen';
import PartDetailsScreen from '../screens/PartDetailsScreen';
import ManualsScreen from '../screens/ManualsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsOptionScreen from '../screens/SettingsOptionScreen';
import WebViewScreen from '../screens/WebViewScreen';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import typography from '../design/typography';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  const { toggleTheme, resetToSystem, isDark, palette } = useTheme();
  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  const HeaderThemeToggle = () => (
    <TouchableOpacity onPress={toggleTheme} onLongPress={resetToSystem} accessibilityRole="button" style={{ marginRight: 12 }}>
      <Ionicons name={isDark ? 'sunny' : 'moon'} size={isSmall ? 18 : 20} color="#fff" />
    </TouchableOpacity>
  );

  // Default stack options consolidated with the theme toggle
  const stackScreenOptions = {
    headerTitleStyle: { fontWeight: typography.weight.bold, color: '#fff', fontSize: isSmall ? 16 : 18, marginLeft: 12 },
    headerStyle: {
      height: isSmall ? 48 : 56,
      paddingVertical: isSmall ? 4 : 6,
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'left',
    headerShadowVisible: false,
    headerBackground: () => (
      <LinearGradient
        colors={[palette.primaryDark, palette.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      />
    ),
    headerRight: () => <HeaderThemeToggle />,
  };

  function HomeStack() {
    return (
      <Stack.Navigator screenOptions={stackScreenOptions} initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Glacio',
            headerRight: () => (
              <>
                <TouchableOpacity onPress={() => navigation.navigate('QRScanner')} style={{ marginRight: 12 }}>
                  <Ionicons name="qr-code-outline" size={isSmall ? 20 : 22} color="#fff" />
                </TouchableOpacity>
                <HeaderThemeToggle />
              </>
            ),
          })}
        />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: 'Scanner de QR' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
        <Stack.Screen name="SettingsOption" component={SettingsOptionScreen} options={{ title: 'Opções' }} />
        <Stack.Screen name="WebView" component={WebViewScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  function ModelsStack() {
    return (
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen
          name="Models"
          component={ModelsScreen}
          options={{
            title: '',
            headerTransparent: true,
            // remove gradient from header; hero da própria tela fornecerá o fundo
            headerBackground: () => null,
          }}
        />
        <Stack.Screen name="ModelDetails" component={ModelDetailsScreen} options={{ title: 'Detalhes do Modelo' }} />
      </Stack.Navigator>
    );
  }

  function PartsStack() {
    return (
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen
          name="Parts"
          component={PartsScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerBackground: () => null,
          }}
        />
        <Stack.Screen name="PartDetails" component={PartDetailsScreen} options={{ title: 'Detalhes da Peça' }} />
      </Stack.Navigator>
    );
  }

  function ManualsStack() {
    return (
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="Manuals" component={ManualsScreen} options={{ title: 'Manuais Técnicos' }} />
      </Stack.Navigator>
    );
  }

  function FavoritesStack() {
    return (
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Remove os textos abaixo dos ícones
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
          height: isSmall ? 48 : 56, // Reduzido para ser mais compacto sem textos
          paddingBottom: isSmall ? 4 : 6,
          paddingTop: isSmall ? 4 : 6,
          paddingHorizontal: 12,
        },
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textSecondary,
        tabBarIcon: ({ color }) => {
          const map = {
            'Início': 'home-outline',
            'Modelos': 'list-outline',
            'Peças': 'cube-outline',
            'Manuais': 'document-text-outline',
            'Favoritos': 'heart-outline',
          };
          const name = map[route.name] || 'ellipse-outline';
          return <Ionicons name={name} size={isSmall ? 20 : 22} color={color} style={{ marginTop: isSmall ? -4 : -5 }} />;
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarItemStyle: { paddingVertical: isSmall ? 6 : 8 },
      })}
    >
      <Tab.Screen name="Peças" component={PartsStack} />
      <Tab.Screen name="Modelos" component={ModelsStack} />
      <Tab.Screen name="Início" component={HomeStack} />
      <Tab.Screen name="Manuais" component={ManualsStack} />
      <Tab.Screen name="Favoritos" component={FavoritesStack} />
    </Tab.Navigator>
  );
}
