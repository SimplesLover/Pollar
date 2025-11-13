import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import FavoriteButton from './FavoriteButton';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ModelCard({ item, onPress }) {
  const { favoritesModels } = useData();
  const isFav = favoritesModels.includes(item.code);
  const [uri, setUri] = useState(item?.images?.[0] || null);
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  useEffect(() => {
    setUri(item?.images?.[0] || null);
  }, [item]);
  return (
    <TouchableOpacity style={styles.cardWrap} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri }}
          style={styles.image}
          onError={() =>
            setUri(
              'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=300&q=60'
            )
          }
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.35)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.brandPill}><Text style={styles.brandText}>{item.brand}</Text></View>
        <View style={styles.favWrap}><FavoriteButton type="model" code={item.code} active={isFav} /></View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.code} · {typeLabel(item.type)}</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="water" size={14} color={palette.textSecondary} />
            <Text style={styles.infoText}>{item.capacity}L</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="resize" size={14} color={palette.textSecondary} />
            <Text style={styles.infoText}>{item.dimensions.w}×{item.dimensions.h}×{item.dimensions.d} cm</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="flash" size={14} color={palette.textSecondary} />
            <Text style={styles.infoText}>{item?.specs?.voltage || '—'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function typeLabel(t) {
  switch (t) {
    case 'refrigerador':
      return 'Refrigerador';
    case 'camara':
      return 'Câmara';
    default:
      return t;
  }
}

const makeStyles = (palette) =>
  StyleSheet.create({
    cardWrap: { flex: 1, backgroundColor: palette.surface, borderRadius: 16, overflow: 'hidden', marginBottom: spacing.sm, ...shadows.medium },
    imageWrap: { height: 120, position: 'relative' },
    image: { width: '100%', height: '100%' },
    favWrap: { position: 'absolute', top: 8, right: 8 },
    brandPill: { position: 'absolute', bottom: 8, left: 8, backgroundColor: palette.primary, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 14 },
    brandText: { color: '#F8FAFC', fontWeight: typography.weight.bold, fontSize: 12 }, // Branco suave para melhor conforto visual
    content: { padding: spacing.md, gap: 4 },
    title: { fontSize: 15, fontWeight: typography.weight.bold, color: palette.primaryDark },
    subtitle: { fontSize: 12, color: palette.textSecondary, marginTop: 2, letterSpacing: 0.3 },
    infoRow: { flexDirection: 'column', marginTop: 6, gap: 6 },
    infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    infoText: { fontSize: 12, color: palette.textPrimary },
  });