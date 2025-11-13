import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../design/colors';

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.bg}>
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(100, progress))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { height: 10, backgroundColor: '#E8F0FE', borderRadius: 10, overflow: 'hidden' },
  fill: { height: 10, backgroundColor: colors.primary },
});