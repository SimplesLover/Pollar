import React, { useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, Modal, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Text from '../components/Text';
import { useData } from '../context/DataContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import PartCard from '../components/PartCard';
import { useTheme } from '../context/ThemeContext';
import HeroHeader from '../components/HeroHeader';

export default function PartsScreen({ navigation }) {
  const { parts, categories } = useData();
  const { palette } = useTheme();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({ category: 'todos' });
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [compatModal, setCompatModal] = useState({ visible: false, models: [], partCode: null });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const filtered = useMemo(() => {
    let list = parts;
    if (filtersEnabled) {
      list = list.filter((p) => (filters.category === 'todos' ? true : p.category === filters.category));
    }
    return list.filter((p) => (p.name + p.code + p.category).toLowerCase().includes(query.toLowerCase()));
  }, [parts, filtersEnabled, filters, query]);

  const openCompat = (item) => {
    setCompatModal({ visible: true, models: item.compatibleModels, partCode: item.code });
  };

  const numColumns = width < 600 ? 1 : width < 900 ? 2 : 3;
  const styles = makeStyles(palette);

  return (
    <View style={styles.container}>
      <HeroHeader title="Buscar Peças" subtitle="Encontre a peça ideal para sua necessidade">
        <SearchBar
          placeholder="Buscar por nome/código"
          onSearch={setQuery}
          area="parts"
          filtersEnabled={filtersEnabled}
          onToggleFilters={() => setFiltersEnabled((prev) => !prev)}
        />
      </HeroHeader>
      {filtersEnabled && (
        <FilterBar kind="parts" filters={filters} setFilters={setFilters} categories={categories} />
      )}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.column : undefined}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <PartCard
            item={item}
            onPress={() => navigation.navigate('PartDetails', { code: item.code })}
            onCompat={() => openCompat(item)}
          />
        )}
      />

      <Modal visible={compatModal.visible} transparent animationType="slide" onRequestClose={() => setCompatModal((prev) => ({ visible: false, models: prev?.models || [], partCode: prev?.partCode || null }))}>
        <View style={modalStyles(palette).modalBackdrop}>
          <View style={modalStyles(palette).modalCard}>
            <Text style={modalStyles(palette).modalTitle}>Compatibilidade · {compatModal.partCode}</Text>
            {(compatModal.models || []).map((m) => (
              <TouchableOpacity key={m} style={modalStyles(palette).modalRow} onPress={() => { setCompatModal({ visible: false }); navigation.navigate('Modelos', { screen: 'ModelDetails', params: { code: m } }); }}>
                <Text style={modalStyles(palette).modalText}>{m}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={modalStyles(palette).modalClose} onPress={() => setCompatModal({ visible: false })}>
              <Text style={{ color: palette.surface, fontWeight: '700' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = (palette) => StyleSheet.create({
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  modalCard: { width: '90%', backgroundColor: palette.surface, borderRadius: 12, padding: 12 },
  modalTitle: { fontWeight: '800', color: palette.primaryDark, marginBottom: 8 },
  modalRow: { paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: palette.border },
  modalText: { color: palette.textPrimary },
  modalClose: { marginTop: 12, backgroundColor: palette.primary, padding: 10, borderRadius: 8, alignItems: 'center' },
});

const makeStyles = (palette) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: palette.background },
    listContent: { paddingHorizontal: 12, paddingBottom: 12 },
    column: { gap: 12 },
  });