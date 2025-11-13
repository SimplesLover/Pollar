import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Text from './Text';
import colors from '../design/colors';
import { useData } from '../context/DataContext';

export default function Toast() {
  const { toast } = useData();
  if (!toast.visible) return null;
  return (
    <View pointerEvents="none" style={styles.container}>
      <View style={[styles.toast, toast.type === 'success' ? styles.success : toast.type === 'error' ? styles.error : styles.info]}>
        <Text style={styles.text}>{toast.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', left: 0, right: 0, bottom: 30, alignItems: 'center' },
  toast: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20 },
  text: { color: '#fff', fontWeight: '600' },
  success: { backgroundColor: colors.success },
  error: { backgroundColor: colors.error },
  info: { backgroundColor: colors.primary },
});