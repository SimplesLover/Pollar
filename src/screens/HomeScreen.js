import React, { useMemo, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useTextSize } from '../context/TextSizeContext';

export default function HomeScreen({ navigation }) {
  const { palette } = useTheme();
  const { models, parts, favoritesModels, favoritesParts } = useData();
  const { textScale } = useTextSize();
  const styles = createStyles(palette, textScale);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000); // atualiza a cada minuto
    return () => clearInterval(id);
  }, []);

  const tipsByWeekday = [
    'Faça uma limpeza rápida nas borrachas de vedação.', // Domingo
    'Verifique a temperatura configurada e ajuste conforme uso.', // Segunda
    'Organize os itens internos para melhorar a ventilação.', // Terça
    'Cheque se há gelo excessivo no evaporador e descongele se preciso.', // Quarta
    'Mantenha 10cm de folga atrás do equipamento para ventilação.', // Quinta
    'Planeje a manutenção preventiva e revise o calendário.', // Sexta
    'Evite abrir a porta com frequência para reduzir consumo de energia.', // Sábado
  ];
  const tip = tipsByWeekday[now.getDay()];
  const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' });

  const favModels = useMemo(() => models.filter((m) => favoritesModels.includes(m.code)).slice(0, 10), [models, favoritesModels]);
  const favParts = useMemo(() => parts.filter((p) => favoritesParts.includes(p.code)).slice(0, 10), [parts, favoritesParts]);
  const whatsNew = useMemo(() => models.slice(0, 8), [models]);

  const Tile = ({ image, title, onPress }) => (
    <TouchableOpacity style={styles.tile} activeOpacity={0.85} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.tileImage} />
      <Text numberOfLines={1} style={styles.tileLabel}>{title}</Text>
    </TouchableOpacity>
  );

  const Section = ({ title, children, action }) => (
    <View style={{ marginBottom: spacing.xl }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row' }}>{children}</View>
      </ScrollView>
    </View>
  );

  const Shortcut = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.shortcut} onPress={onPress}>
      <Ionicons name={icon} size={22} color={palette.primary} />
      <Text style={styles.shortcutText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.lg }}>
      {/* Daily tip card */}
      <View style={styles.dailyCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="calendar-outline" size={20} color={palette.primary} />
          <Text style={styles.dailyDate}> {capitalize(dateStr)}</Text>
        </View>
        <Text style={styles.dailyText}>{tip}</Text>
      </View>

      {/* Favorites */}
      <Section title="Favoritos" action={<TouchableOpacity onPress={() => navigation.navigate('Favoritos')}><Text style={styles.link}>Ver Todos</Text></TouchableOpacity>}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {favModels.map((m) => (
            <Tile key={m.code} image={m.images[0]} title={m.name} onPress={() => navigation.navigate('Modelos', { screen: 'ModelDetails', params: { code: m.code } })} />
          ))}
          {favParts.map((p) => (
            <Tile key={p.code} image={p.image} title={p.name} onPress={() => navigation.navigate('Peças', { screen: 'PartDetails', params: { code: p.code } })} />
          ))}
        </ScrollView>
      </Section>

      {/* Shortcuts centrais removidos conforme solicitado */}

      {/* Toolbox */}
      <Section title="Ferramentas de Manutenção">
        <Shortcut icon="scan-outline" label="Scanner" onPress={() => navigation.navigate('QRScanner')} />
        <Shortcut icon="search-outline" label="Pesquisar" onPress={() => navigation.navigate('Modelos')} />
        <Shortcut icon="settings-outline" label="Configurações" onPress={() => navigation.navigate('Settings')} />
      </Section>

      {/* What's new */}
      <Section title="Novidades">
        {whatsNew.map((m) => (
          <Tile key={`new-${m.code}`} image={m.images[0]} title={m.name} onPress={() => navigation.navigate('Modelos', { screen: 'ModelDetails', params: { code: m.code } })} />
        ))}
      </Section>
    </ScrollView>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const createStyles = (palette, textScale = 1) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: palette.background, padding: spacing.md },
    dailyCard: {
      backgroundColor: palette.surface,
      borderRadius: 16,
      padding: spacing.md,
      marginBottom: spacing.lg,
      ...shadows.medium,
    },
    dailyDate: { fontSize: 16 * textScale, fontWeight: typography.weight.bold, color: palette.primaryDark },
    dailyText: { marginTop: 6, color: palette.textSecondary, fontSize: 13 * textScale },

    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
    sectionTitle: { fontSize: 18 * textScale, fontWeight: typography.weight.bold, color: palette.primaryDark },
    link: { color: palette.primary, fontWeight: '600', textTransform: 'capitalize', fontSize: 14 * textScale },

    tile: { width: 120, marginRight: spacing.sm },
    tileImage: { width: 120, height: 80, borderRadius: 10, backgroundColor: palette.surface },
    tileLabel: { marginTop: 6, color: palette.textPrimary, fontSize: 12 * textScale, fontWeight: '600' },

    shortcut: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: palette.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm,
      ...shadows.small,
    },
    shortcutText: { marginTop: 6, fontSize: 12 * textScale, color: palette.textSecondary, fontWeight: '600' },
  });
