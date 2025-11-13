import React, { useMemo, useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import FavoriteButton from '../components/FavoriteButton';

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PartDetailsScreen({ route, navigation }) {
  const { code } = route.params;
  const { parts, favoritesParts } = useData();
  const { palette } = useTheme();
  const part = useMemo(() => parts.find((p) => p.code === code), [parts, code]);
  const [uri, setUri] = useState(part?.image || null);

  const statusInfo = (status) => {
    switch (status) {
      case 'em_estoque':
        return { label: 'Em estoque', bg: palette.success || '#16a34a', fg: '#ffffff', icon: 'checkmark-circle' };
      case 'sob_encomenda':
        return { label: 'Sob encomenda', bg: palette.warning || '#f59e0b', fg: '#ffffff', icon: 'time' };
      case 'indisponivel':
        return { label: 'Indisponível', bg: palette.error || '#dc2626', fg: '#ffffff', icon: 'close-circle' };
      default:
        return { label: String(status || 'Status'), bg: palette.neutral || '#6b7280', fg: '#ffffff', icon: 'information-circle' };
    }
  };

  const capitalizeLabel = (label) => {
    // Capitalize first letter and handle special cases
    const specialCases = {
      'voltage': 'Voltage',
      'gas': 'Gas',
      'range': 'Range',
      'cfm': 'CFM',
      'fins': 'Fins',
      'display': 'Display',
      'relay': 'Relay',
      'torque': 'Torque'
    };
    
    return specialCases[label] || label.charAt(0).toUpperCase() + label.slice(1);
  };

  useEffect(() => {
    setUri(part?.image || null);
  }, [part]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }} contentContainerStyle={{ padding: 12 }}>
      {part ? (
        <>
          <View style={styles.header}>
            <Text style={[styles.title, { color: palette.primaryDark }]}>{part.name}</Text>
            <FavoriteButton type="part" code={part.code} active={favoritesParts.includes(part.code)} />
          </View>
          <Text style={[styles.subtitle, { color: palette.textSecondary }]}>{part.code} · {capitalizeFirst(part.category)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo(part.status).bg, borderWidth: 1, borderColor: statusInfo(part.status).fg }]}
          >
            <Ionicons name={statusInfo(part.status).icon} size={16} color={statusInfo(part.status).fg} style={{ marginRight: 6 }} />
            <Text style={[styles.statusText, { color: statusInfo(part.status).fg }]}>{statusInfo(part.status).label}</Text>
          </View>
        </>
      ) : (
        <Text style={[styles.subtitle, { color: palette.textSecondary }]}>Peça não encontrada</Text>
      )}
      <Image
        source={{ uri }}
        style={styles.image}
        onError={() =>
          setUri(
            'https://placehold.co/300x300/334155/white?text=Pe%C3%A7a'
          )
        }
      />

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={[styles.cardTitle, { color: palette.primaryDark }]}>Especificações</Text>
        {Object.keys(part?.specs || {}).map((k) => (
          <Text key={k} style={[styles.spec, { color: palette.textPrimary }]}>{capitalizeLabel(k)}: {String(part.specs[k])}</Text>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={[styles.cardTitle, { color: palette.primaryDark }]}>Informações de Substituição</Text>
        <Text style={[styles.spec, { color: palette.textPrimary }]}>{part.replacementInfo}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface }]}>
        <Text style={[styles.cardTitle, { color: palette.primaryDark }]}>Modelos Compatíveis</Text>
        {(part?.compatibleModels || []).map((m) => (
          <TouchableOpacity key={m} style={[styles.modelRow, { borderBottomColor: palette.border || '#eee' }]} onPress={() => navigation.navigate('ModelDetails', { code: m })}>
            <Text style={[styles.modelText, { color: palette.primaryDark }]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: typography.weight.bold },
  subtitle: { fontSize: 12, marginTop: 2 },
  image: { width: '100%', height: 200, borderRadius: 12, marginTop: spacing.md },
  statusBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, marginTop: 6 },
  statusText: { fontWeight: typography.weight.bold },
  card: { borderRadius: 12, padding: spacing.md, marginTop: spacing.md, ...shadows.low },
  cardTitle: { fontWeight: typography.weight.bold, marginBottom: 8 },
  spec: { fontSize: 13, marginBottom: 4 },
  modelRow: { paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  modelText: { fontWeight: typography.weight.bold },
});