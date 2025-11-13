import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import spacing from '../design/spacing';
import typography from '../design/typography';
import { useTheme } from '../context/ThemeContext';

// Safe import for barcode scanner
let BarCodeScanner;
try {
  BarCodeScanner = require('expo-barcode-scanner').BarCodeScanner;
} catch (error) {
}

export default function QRScannerScreen() {
  const { palette } = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState(null);
  const line = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      if (!BarCodeScanner) {
        setHasPermission(false);
        return;
      }
      
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        setHasPermission(false);
      }
    })();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(line, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(line, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [line]);

  const translateY = line.interpolate({ inputRange: [0, 1], outputRange: [10, 170] });

  const handleScan = ({ type, data }) => {
    setScanned(true);
    setCode(data);
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container, { backgroundColor: palette.background }]}>
        <Text style={[styles.text, { color: palette.primaryDark }]}>Solicitando permissão para a câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false || !BarCodeScanner) {
    return (
      <View style={[styles.container, { backgroundColor: palette.background }]}>
        <Text style={[styles.text, { color: palette.primaryDark }]}>
          {!BarCodeScanner ? 'Scanner QR não disponível' : 'Permissão negada. Ative a câmera nas configurações.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <View style={[styles.frame, { borderColor: palette.primary, backgroundColor: palette.surface }]}>
        {BarCodeScanner && (
          <BarCodeScanner
            style={StyleSheet.absoluteFill}
            onBarCodeScanned={scanned ? undefined : handleScan}
          />
        )}
        <LinearGradient
          colors={[palette.primaryDark, palette.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        {BarCodeScanner && (
          <Animated.View style={[styles.line, { backgroundColor: palette.secondary, transform: [{ translateY }] }]} />
        )}
      </View>
      <Text style={[styles.text, { color: palette.primaryDark }]}>Resultado: {code || (scanned ? '—' : 'lendo...')}</Text>
      {scanned ? (
        <TouchableOpacity style={[styles.button, { backgroundColor: palette.primary }]} onPress={() => { setScanned(false); setCode(null); }}>
          <Text style={{ color: '#fff', fontWeight: typography.weight.bold }}>Ler novamente</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.md },
  frame: { width: 240, height: 240, borderRadius: 16, borderWidth: 3, overflow: 'hidden' },
  line: { height: 2, width: '100%' },
  text: { marginTop: spacing.sm, fontWeight: typography.weight.bold },
  button: { marginTop: spacing.sm, borderRadius: 10, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
});
