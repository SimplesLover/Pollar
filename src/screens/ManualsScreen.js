import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import ProgressBar from '../components/ProgressBar';
import { useTheme } from '../context/ThemeContext';
import Text from '../components/Text';

const MANUALS = [
  { id: 'M-001', title: 'Instalação RF', category: 'instalacao' },
  { id: 'M-002', title: 'Manutenção RF', category: 'manutencao' },
  { id: 'M-003', title: 'Troubleshooting RF', category: 'troubleshooting' },
  { id: 'M-004', title: 'Instalação CF', category: 'instalacao' },
  { id: 'M-005', title: 'Manutenção CF', category: 'manutencao' },
  { id: 'M-006', title: 'Troubleshooting CF', category: 'troubleshooting' },
];

export default function ManualsScreen({ navigation }) {
  const { palette } = useTheme();
  const [filter, setFilter] = useState('todos');
  const [downloading, setDownloading] = useState({ id: null, progress: 0 });

  const filtered = MANUALS.filter((m) => (filter === 'todos' ? true : m.category === filter));

  const startDownload = (id) => {
    setDownloading({ id, progress: 0 });
    let p = 0;
    const timer = setInterval(() => {
      p += 10;
      if (p >= 100) {
        clearInterval(timer);
        setDownloading({ id: null, progress: 0 });
      } else {
        setDownloading({ id, progress: p });
      }
    }, 120);
  };

  const LABELS = { todos: 'Todos', instalacao: 'Instalação', manutencao: 'Manutenção', troubleshooting: 'Troubleshooting' };
  const pretty = (c) => LABELS[c] || c;

  const styles = makeStyles(palette);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }} contentContainerStyle={{ padding: 12 }}>
      <View style={styles.filterRow}>
        {['todos','instalacao','manutencao','troubleshooting'].map((c) => (
          <TouchableOpacity key={c} style={[styles.chip, filter === c ? styles.chipActive : null]} onPress={() => setFilter(c)}>
            <Text style={[styles.chipText, filter === c ? styles.chipTextActive : null]}>{pretty(c)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: spacing.lg }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.manualCard}>
            <View style={styles.manualInfo}>
              <Text style={styles.manualTitle}>{item.title}</Text>
              <Text style={styles.manualSub}>PDF (mock) · {pretty(item.category)}</Text>
            </View>
            {downloading.id === item.id ? (
              <View style={{ width: '100%' }}>
                <ProgressBar progress={downloading.progress} />
              </View>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => startDownload(item.id)}>
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </ScrollView>
  );
}

const makeStyles = (palette) => StyleSheet.create({
  filterRow: { flexDirection: 'row', marginBottom: spacing.lg },
  chip: { backgroundColor: palette.surface, borderRadius: 16, paddingVertical: 6, paddingHorizontal: spacing.sm, marginRight: spacing.xs, borderWidth: 1, borderColor: palette.border },
  chipActive: { backgroundColor: palette.primary + '20', borderColor: palette.primary },
  chipText: { color: palette.textPrimary, fontWeight: '600' },
  chipTextActive: { color: palette.primary },
  manualCard: { backgroundColor: palette.surface, borderRadius: 12, padding: spacing.md, marginBottom: spacing.md, ...shadows.low },
  manualInfo: { flex: 1, marginBottom: spacing.sm },
  manualTitle: { fontWeight: typography.weight.bold, color: palette.primaryDark },
  manualSub: { fontSize: 12, color: palette.textSecondary, marginTop: 4, opacity: 0.8 },
  button: { backgroundColor: palette.primary, borderRadius: 10, paddingHorizontal: spacing.md, paddingVertical: spacing.md, alignItems: 'center', alignSelf: 'stretch' },
  buttonText: { color: palette.surface, fontWeight: typography.weight.bold, textAlign: 'center' },
});
