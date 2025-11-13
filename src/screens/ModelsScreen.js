import React, { useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import spacing from '../design/spacing';
import { useData } from '../context/DataContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ModelCard from '../components/ModelCard';
import { useTheme } from '../context/ThemeContext';
import HeroHeader from '../components/HeroHeader';

export default function ModelsScreen({ navigation }) {
  const { models } = useData();
  const { palette } = useTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({ type: 'todos', brand: 'todos', capacity: 'todos' });
  const [filtersEnabled, setFiltersEnabled] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const filtered = useMemo(() => {
    let list = models;
    if (filtersEnabled) {
      list = list
        .filter((m) => (filters.type === 'todos' ? true : m.type === filters.type))
        .filter((m) => (filters.brand === 'todos' ? true : m.brand === filters.brand))
        .filter((m) => {
          if (filters.capacity === 'todos') return true;
          const [min, max] = filters.capacity.split('-').map((n) => parseInt(n, 10));
          return m.capacity >= min && m.capacity <= max;
        });
    }
    return list.filter((m) => (m.name + m.code + m.brand + m.type).toLowerCase().includes(query.toLowerCase()));
  }, [models, filtersEnabled, filters, query]);

  const styles = makeStyles(palette);
  const heroHeight = Math.max(48, Math.min(64, Math.round(width * 0.16)));
  const padX = Math.round(width * 0.04);
  const padTop = Math.max(8, Math.round(insets.top * 0.5));
  const marginBottom = Math.round(width * 0.03);
  return (
    <View style={styles.container}>
      <HeroHeader 
        title="Consultar Modelos" 
        subtitle="Encontre o modelo ideal para sua necessidade"
        style={{ minHeight: heroHeight, paddingHorizontal: 0, paddingTop: padTop + 28, paddingBottom: spacing.md, paddingRight: spacing.md, justifyContent: 'center', alignItems: 'flex-start', marginBottom }}
        titleStyle={{ fontSize: 18, marginBottom: 2, paddingLeft: spacing.md + 3 }}
        subtitleStyle={{ fontSize: 11, marginBottom: 6, paddingLeft: spacing.md + 3 }}
      >
        <SearchBar
          placeholder="Buscar por nome/código/marca"
          onSearch={setQuery}
          area="models"
          filtersEnabled={filtersEnabled}
          onToggleFilters={() => setFiltersEnabled((prev) => !prev)}
          compact
          style={{ alignSelf: 'flex-start', width: '95%', marginLeft: spacing.md + 3 }}
        />
      </HeroHeader>
      {filtersEnabled && <FilterBar kind="models" filters={filters} setFilters={setFilters} />}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <ModelCard item={item} onPress={() => navigation.navigate('ModelDetails', { code: item.code })} />
        )}
      />
    </View>
  );
}

  const makeStyles = (palette) =>
    StyleSheet.create({
      container: { flex: 1, backgroundColor: palette.background },
      listContent: { paddingHorizontal: 12, paddingBottom: 12 },
      column: { gap: 12 },
    });
