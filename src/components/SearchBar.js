import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Text from './Text';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export default function SearchBar({ placeholder, onSearch, area, filtersEnabled, onToggleFilters }) {
  const [query, setQuery] = useState('');
  const { searchHistory, pushSearchHistory } = useData();
  const { palette, isDark } = useTheme();
  const styles = makeStyles(palette);

  useEffect(() => {
    onSearch('');
  }, []);

  const doSearch = (q) => {
    setQuery(q);
    onSearch(q);
  };

  const submit = () => {
    pushSearchHistory(area, query.trim());
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        {typeof onToggleFilters === 'function' && (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onToggleFilters}
            style={[styles.filterToggle, filtersEnabled ? styles.filterToggleActive : null]}
            activeOpacity={0.85}
          >
            <Ionicons
              name={filtersEnabled ? 'funnel' : 'funnel-outline'}
              size={16}
              color={filtersEnabled ? '#fff' : palette.textSecondary}
            />
          </TouchableOpacity>
        )}
        <Ionicons name="search" size={18} color={palette.muted} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={palette.muted}
          value={query}
          onChangeText={doSearch}
          onSubmitEditing={submit}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => doSearch('')}>
            <Ionicons name="close-circle" size={20} color={palette.muted} />
          </TouchableOpacity>
        )}
      </View>
      {searchHistory[area]?.length ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {searchHistory[area].map((h) => (
            <TouchableOpacity key={h} style={[styles.historyChip, { backgroundColor: isDark ? 'rgba(46,169,255,0.12)' : '#E8F0FE' }]} onPress={() => doSearch(h)}>
              <Ionicons name="time-outline" size={14} color={palette.primaryDark} />
              <Text style={styles.historyText}>{h}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const makeStyles = (palette) =>
  StyleSheet.create({
    container: { marginBottom: spacing.sm },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.surface,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      height: 46,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.border,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    filterToggle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.border,
      backgroundColor: palette.surface,
    },
    filterToggleActive: {
      backgroundColor: palette.primary,
      borderColor: palette.primary,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    input: { flex: 1, color: palette.textPrimary },
    historyChip: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      marginRight: spacing.xs,
    },
    historyText: { marginLeft: 6, color: palette.primaryDark, fontWeight: '600' },
  });