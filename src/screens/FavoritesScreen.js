import React, { useMemo } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { useData } from '../context/DataContext';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import { useTheme } from '../context/ThemeContext';

export default function FavoritesScreen({ navigation }) {
  const { palette } = useTheme();
  const { models, parts, favoritesModels, favoritesParts, removeFavoriteModel, removeFavoritePart } = useData();
  const favModels = useMemo(() => models.filter((m) => favoritesModels.includes(m.code)), [models, favoritesModels]);
  const favParts = useMemo(() => parts.filter((p) => favoritesParts.includes(p.code)), [parts, favoritesParts]);

  return (
    <View style={{ flex: 1, padding: spacing.md, backgroundColor: palette.background }}>
      <Text style={[styles.sectionTitle, { color: palette.primaryDark }]}>Modelos</Text>
      <FlatList
        data={favModels}
        keyExtractor={(item) => item.code}
        ListEmptyComponent={<Text style={[styles.empty, { color: palette.textSecondary }]}>Nenhum modelo favoritado.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: palette.surface }]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('ModelDetails', { code: item.code })}>
              <Text style={[styles.rowTitle, { color: palette.primaryDark }]}>{item.name}</Text>
              <Text style={[styles.rowSub, { color: palette.textSecondary }]}>{item.code} · {item.brand}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavoriteModel(item.code)}><Text style={[styles.remove, { color: palette.error || '#ff3b30' }]}>Remover</Text></TouchableOpacity>
          </View>
        )}
      />

      <Text style={[styles.sectionTitle, { marginTop: spacing.md, color: palette.primaryDark }]}>Peças</Text>
      <FlatList
        data={favParts}
        keyExtractor={(item) => item.code}
        ListEmptyComponent={<Text style={[styles.empty, { color: palette.textSecondary }]}>Nenhuma peça favoritada.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: palette.surface }]}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('PartDetails', { code: item.code })}>
              <Text style={[styles.rowTitle, { color: palette.primaryDark }]}>{item.name}</Text>
              <Text style={[styles.rowSub, { color: palette.textSecondary }]}>{item.code} · {item.category}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavoritePart(item.code)}><Text style={[styles.remove, { color: palette.error || '#ff3b30' }]}>Remover</Text></TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontWeight: typography.weight.bold, marginBottom: spacing.sm },
  row: { borderRadius: 12, padding: spacing.sm, marginBottom: spacing.sm, ...shadows.low },
  rowTitle: { fontWeight: typography.weight.semibold },
  rowSub: { fontSize: 12, marginTop: 2 },
  remove: { fontWeight: typography.weight.bold },
  empty: { fontStyle: 'italic', padding: spacing.sm },
});