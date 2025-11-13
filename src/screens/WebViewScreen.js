import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import Text from '../components/Text';

// Safe import for WebView
let WebView;
try {
  WebView = require('react-native-webview').WebView;
} catch (error) {
  console.warn('react-native-webview não está disponível:', error);
}

export default function WebViewScreen({ navigation, route }) {
  const { palette } = useTheme();
  const { title, url } = route.params;
  const [loading, setLoading] = React.useState(true);

  const openInBrowser = async () => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.warn('Erro ao abrir URL:', error);
    }
  };

  if (!WebView) {
    return (
      <View style={[styles.container, { backgroundColor: palette.background }]}>
        <View style={[styles.header, { backgroundColor: palette.surface, borderBottomColor: palette.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={palette.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: palette.textPrimary }]} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: palette.textPrimary }]}>
            Navegador web não disponível
          </Text>
          <Text style={[styles.errorSubtext, { color: palette.textSecondary }]}>
            O módulo WebView não está instalado
          </Text>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: palette.primary }]} 
            onPress={openInBrowser}
          >
            <Text style={styles.buttonText}>Abrir no navegador</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <View style={[styles.header, { backgroundColor: palette.surface, borderBottomColor: palette.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={palette.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: palette.textPrimary }]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary} />
        </View>
      )}
      
      <WebView
        source={{ uri: url }}
        style={styles.webView}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: typography.weight.semibold,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: typography.weight.semibold,
    fontSize: 16,
  },
});