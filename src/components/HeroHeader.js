import React from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export default function HeroHeader({ title, subtitle, children, style, titleStyle, subtitleStyle }) {
  const { palette } = useTheme();
  const styles = makeStyles(palette);
  return (
    <LinearGradient
      colors={[palette.primaryDark, palette.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.hero, style]}
    >
      {title ? <Text style={[styles.heroTitle, titleStyle]}>{title}</Text> : null}
      {subtitle ? <Text style={[styles.heroSubtitle, subtitleStyle]}>{subtitle}</Text> : null}
      {children}
    </LinearGradient>
  );
}

const makeStyles = (palette) =>
  StyleSheet.create({
    hero: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 6, marginBottom: 12 },
    heroTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
    heroSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 12 },
  });