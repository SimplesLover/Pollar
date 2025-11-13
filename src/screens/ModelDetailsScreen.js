import React, { useMemo, useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import FavoriteButton from '../components/FavoriteButton';
import ImageModal from '../components/ImageModal';
import PieceDiagram from '../components/PieceDiagram';
import SpecGraph from '../components/SpecGraph';

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ModelDetailsScreen({ route, navigation }) {
  const { code } = route.params;
  const { models, parts, favoritesModels } = useData();
  const { palette } = useTheme();
  const model = useMemo(() => models.find((m) => m.code === code), [models, code]);
  const [modalImage, setModalImage] = useState(null);
  const [galleryUris, setGalleryUris] = useState(model?.images ?? []);

  useEffect(() => {
    setGalleryUris(model?.images ?? []);
  }, [model]);

  const compatibleParts = useMemo(
    () => (model ? parts.filter((p) => p.compatibleModels.includes(model.code)) : []),
    [parts, model]
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }} contentContainerStyle={{ padding: 12 }}>
      {model ? (
        <>
          <View style={styles.header}>
            <Text style={[styles.title, { color: palette.primaryDark }]}>{model.name}</Text>
            <FavoriteButton type="model" code={model.code} active={favoritesModels.includes(model.code)} />
          </View>
          <Text style={[styles.subtitle, { color: palette.textSecondary }]}>{model.code} · {model.brand} · {capitalizeFirst(model.type)}</Text>
        </>
      ) : (
        <Text style={[styles.subtitle, { color: palette.textSecondary }]}>Modelo não encontrado</Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
        {galleryUris.map((uri, i) => (
          <TouchableOpacity key={`${model.code}-img-${i}`} onPress={() => setModalImage(uri)}>
            <Image
              source={{ uri }}
              style={styles.galleryImage}
              onError={() =>
                setGalleryUris((prev) =>
                  prev.map((u, idx) =>
                    idx === i
                      ? 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=60'
                      : u
                  )
                )
              }
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={[styles.cardTitle, { color: palette.primaryDark }]}>Especificações Técnicas</Text>
        <Text style={[styles.spec, { color: palette.textPrimary }]}>Capacidade: {model.capacity}L</Text>
        <Text style={[styles.spec, { color: palette.textPrimary }]}>Dimensões: {model.dimensions.w}x{model.dimensions.h}x{model.dimensions.d}cm</Text>
        <Text style={[styles.spec, { color: palette.textPrimary }]}>Potência: {model.power}W</Text>
        <Text style={[styles.spec, { color: palette.textPrimary }]}>Faixa de Temperatura: {model.specs.tempRange}</Text>
        <Text style={[styles.spec, { color: palette.textPrimary }]}>Voltagem: {model.specs.voltage}</Text>
        <Text style={[styles.spec, { color: palette.textPrimary }]}>Portas: {model.specs.doors} · Prateleiras: {model.specs.shelves}</Text>
      </View>

      <SpecGraph capacity={model.capacity} power={model.power} />

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={[styles.cardTitle, { color: palette.primaryDark }]}>Diagrama de Peças</Text>
        {model ? (
          <PieceDiagram
            imageUri={model.pieceDiagramImage}
            markers={model.pieceMarkers}
            onMarkerPress={(m) => navigation.navigate('Peças', { screen: 'PartDetails', params: { code: m.partCode } })}
          />
        ) : null}
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={[styles.cardTitle, { color: palette.primaryDark }]}>Peças Compatíveis</Text>
        {compatibleParts.map((p) => (
          <TouchableOpacity key={p.code} style={[styles.partRow, { borderBottomColor: palette.border || '#eee' }]} onPress={() => navigation.navigate('PartDetails', { code: p.code })}>
            <Text style={[styles.partName, { color: palette.primaryDark }]}>{p.name}</Text>
            <Text style={[styles.partCode, { color: palette.textSecondary }]}>{p.code} · {p.category} · {p.status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ImageModal visible={!!modalImage} uri={modalImage} onClose={() => setModalImage(null)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: typography.weight.bold },
  subtitle: { fontSize: 12, marginTop: 2 },
  galleryImage: { width: 180, height: 120, borderRadius: 12, marginRight: spacing.sm },
  card: { borderRadius: 12, padding: spacing.md, marginTop: spacing.md, ...shadows.low },
  cardTitle: { fontWeight: typography.weight.bold, marginBottom: 8 },
  spec: { fontSize: 13, marginBottom: 4 },
  partRow: { paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  partName: { fontWeight: typography.weight.bold },
  partCode: { fontSize: 12 },
});