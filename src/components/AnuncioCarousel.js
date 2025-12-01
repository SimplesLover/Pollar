import React, { useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { MODELOS } from '../data/modelos'
import { useNavigation } from '@react-navigation/native'
import { useThemeContext } from '../contexts/ThemeContext'
import { wp, hp, fs } from '../constants/theme'

function pickHighlights() {
  const shuffled = [...MODELOS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(3, shuffled.length))
}

export default function AnuncioCarousel() {
  const { colors, isDark } = useThemeContext()
  const nav = useNavigation()
  const items = useMemo(() => pickHighlights(), [])
  const { width } = useWindowDimensions()
  const cols = useMemo(() => (width < 360 ? 2 : width < 720 ? 3 : 4), [width])
  const gap = wp(2)
  const itemSize = (width - gap * (cols + 1)) / cols
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Novidades</Text>
      <FlatList
        horizontal
        data={items}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => nav.navigate('TelaDetalheModelo', { modeloId: item.id })} style={[styles.card, { width: itemSize, height: itemSize, marginLeft: index === 0 ? 0 : gap, backgroundColor: isDark ? colors.card : colors.secondary, borderColor: colors.border }] }>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <Text style={[styles.name, { color: isDark ? colors.text : colors.primary }]} numberOfLines={1}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginTop: hp(2), marginBottom: hp(2) },
  title: { marginHorizontal: wp(2), marginBottom: hp(1), fontSize: fs(16), fontWeight: '600' },
  card: { marginLeft: wp(2), borderRadius: 12, overflow: 'hidden', borderWidth: 1 },
  image: { width: '100%', height: '70%' },
  name: { padding: wp(3), fontSize: fs(14) }
})
