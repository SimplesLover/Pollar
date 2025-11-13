import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Text from './Text';
import { LinearGradient } from 'expo-linear-gradient';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import FavoriteButton from './FavoriteButton';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { useTextSize } from '../context/TextSizeContext';

export default function PartCard({ item, onPress, onCompat }) {
  const { favoritesParts, categories } = useData();
  const { palette } = useTheme();
  const { textScale } = useTextSize();
  const isFav = favoritesParts.includes(item.code);
  const [uri, setUri] = useState(item?.image || null);
  const scale = React.useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  const styles = makeStyles(palette, textScale);

  useEffect(() => {
    setUri(item?.image || null);
  }, [item]);

  const categoryLabel = (key) => categories.find((c) => c.key === key)?.label || key;
  const statusInfo = (s) => {
    switch (s) {
      case 'em_estoque':
        return { label: 'Em Estoque', color: palette.success || '#16a34a' };
      case 'sob_encomenda':
        return { label: 'Sob Encomenda', color: palette.warning || '#f59e0b' };
      case 'indisponivel':
        return { label: 'Indisponível', color: palette.error || '#dc2626' };
      default:
        return { label: s, color: palette.neutral || '#6b7280' };
    }
  };
  return (
    <Animated.View style={[styles.cardWrap, { transform: [{ scale }] }]}>
      <View style={styles.card}>
      <Image
        source={{ uri }}
        style={styles.image}
        onError={() =>
          setUri(
            'https://placehold.co/300x300/334155/white?text=Pe%C3%A7a'
          )
        }
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>
          {item.code} · {categoryLabel(item.category)}
        </Text>
        <View style={styles.statusRow}>
          <Text style={[styles.statusBadge, { color: statusInfo(item.status).color, borderColor: statusInfo(item.status).color }]}>
            {statusInfo(item.status).label}
          </Text>
        </View>
        <Text style={styles.specs}>Compatíveis: {item.compatibleModels.slice(0,3).join(', ')}{item.compatibleModels.length>3?'…':''}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button, { backgroundColor: palette.primary }]} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Text style={styles.buttonText}>Detalhes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: palette.primary }]} onPress={onCompat}>
            <Text style={styles.buttonText}>Compatibilidade</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FavoriteButton type="part" code={item.code} active={isFav} />
      </View>
    </Animated.View>
  );
}

const makeStyles = (palette, textScale = 1) => StyleSheet.create({
  cardWrap: { ...shadows.medium, borderRadius: 12, marginBottom: spacing.sm },
  card: { flexDirection: 'row', padding: spacing.sm, borderRadius: 12, backgroundColor: palette.surface, flexShrink: 1 },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: spacing.sm },
  title: { fontSize: 15 * textScale, fontWeight: typography.weight.bold, color: palette.primaryDark },
  subtitle: { fontSize: 12 * textScale, color: palette.textSecondary, marginTop: 2, letterSpacing: 0.3 },
  statusRow: { flexDirection: 'row', marginTop: 4 },
  statusBadge: { fontSize: 11 * textScale, fontWeight: typography.weight.semibold, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 1 },
  specs: { fontSize: 12 * textScale, color: palette.textSecondary, marginTop: 6, marginRight: spacing.sm, opacity: 0.8 },
  actions: { flexDirection: 'row', marginTop: spacing.xs, flexWrap: 'wrap', gap: spacing.xs },
  button: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 8, alignItems: 'center', flex: 1, minWidth: 90 },
  buttonText: { color: '#F8FAFC', fontWeight: typography.weight.bold, fontSize: 12 * textScale }, // Branco suave para melhor conforto visual

});
