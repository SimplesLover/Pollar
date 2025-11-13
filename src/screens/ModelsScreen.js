import React, { useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useData } from '../context/DataContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ModelCard from '../components/ModelCard';
import { useTheme } from '../context/ThemeContext';
import HeroHeader from '../components/HeroHeader';

export default function ModelsScreen({ navigation }) {
  const { models } = useData();
  const { palette } = useTheme();
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
  return (
    <View style={styles.container}>
      <HeroHeader title="Consultar Modelos" subtitle="Encontre o modelo ideal para sua necessidade">
        <SearchBar
          placeholder="Buscar por nome/código/marca"
          onSearch={setQuery}
          area="models"
          filtersEnabled={filtersEnabled}
          onToggleFilters={() => setFiltersEnabled((prev) => !prev)}
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