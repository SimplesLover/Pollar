import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import { useTheme } from '../context/ThemeContext';

export default function FilterBar({ kind, filters, setFilters, categories = [] }) {
  const { palette, isDark } = useTheme();
  const styles = makeStyles(palette, isDark);
  if (kind === 'models') {
    const types = [
      { label: 'Todos', value: 'todos' },
      { label: 'Refrigerador', value: 'refrigerador' },
      { label: 'Câmara', value: 'camara' },
    ];
    const brands = [
      { label: 'Todos', value: 'todos' },
      { label: 'PolarTech', value: 'PolarTech' },
      { label: 'FrostCool', value: 'FrostCool' },
      { label: 'ArcticPro', value: 'ArcticPro' },
      { label: 'GelMaster', value: 'GelMaster' },
      { label: 'IceBox', value: 'IceBox' },
    ];
    const capacityRanges = [
      { label: 'Todos', value: 'todos' },
      { label: '≤ 250L', value: '0-250' },
      { label: '250–450L', value: '250-450' },
      { label: '≥ 500L', value: '500-2000' },
    ];
    return (
      <View style={styles.bar}>
        <View style={styles.group}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.row}>
          {types.map((t) => (
            <Chip key={t.value} selected={filters.type === t.value} onPress={() => setFilters({ ...filters, type: t.value })}>
              {t.label}
            </Chip>
          ))}
        </View>
        </View>
        <View style={styles.group}>
        <Text style={styles.label}>Marca</Text>
        <View style={styles.row}>
          {brands.map((b) => (
            <Chip key={b.value} selected={filters.brand === b.value} onPress={() => setFilters({ ...filters, brand: b.value })}>
              {b.label}
            </Chip>
          ))}
        </View>
        </View>
        <View style={styles.group}>
        <Text style={styles.label}>Capacidade</Text>
        <View style={styles.row}>
          {capacityRanges.map((c) => (
            <Chip key={c.value} selected={filters.capacity === c.value} onPress={() => setFilters({ ...filters, capacity: c.value })}>
              {c.label}
            </Chip>
          ))}
        </View>
        </View>
      </View>
    );
  }

  if (kind === 'parts') {
    return (
      <View style={styles.bar}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.row}>
          <Chip selected={filters.category === 'todos'} onPress={() => setFilters({ ...filters, category: 'todos' })}>
            Todos
          </Chip>
          {(categories || []).map((c) => (
            <Chip key={c.key} selected={filters.category === c.key} onPress={() => setFilters({ ...filters, category: c.key })}>
              {c.label}
            </Chip>
          ))}
        </View>
      </View>
    );
  }

  return null;
}

function Chip({ children, selected, onPress }) {
  const { palette, isDark } = useTheme();
  const styles = makeStyles(palette, isDark);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chip, selected ? styles.chipSelected : null]}>
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : null]}>{children}</Text>
    </TouchableOpacity>
  );
}

const makeStyles = (palette, isDark) =>
  StyleSheet.create({
    bar: {
      backgroundColor: palette.surface,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
      elevation: 2,
    },
    label: {
      fontSize: 13,
      color: isDark ? palette.primary : palette.primaryDark,
      fontWeight: typography.weight.bold,
      marginBottom: 8,
    },
    group: { marginBottom: spacing.sm },
    row: { flexDirection: 'row', flexWrap: 'wrap' },
    chip: {
      backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : '#F3F6FB',
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: spacing.sm,
      marginRight: spacing.xs,
      marginBottom: spacing.xs,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: isDark ? 'rgba(255,255,255,0.16)' : palette.border,
      elevation: isDark ? 0 : 1,
    },
    chipSelected: {
      backgroundColor: isDark ? 'rgba(132,182,244,0.25)' : '#E0EDFF',
      borderWidth: 1,
      borderColor: palette.primary,
    },
    chipText: {
      color: isDark ? '#EAF2FF' : palette.textPrimary,
      fontWeight: '700',
    },
    chipTextSelected: {
      color: isDark ? '#FFFFFF' : palette.primaryDark,
    },
  });