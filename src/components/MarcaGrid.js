import React, { useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { MARCAS } from '../data/marcas'
import { useNavigation } from '@react-navigation/native'
import { useThemeContext } from '../contexts/ThemeContext'
import { wp, hp, fs } from '../constants/theme'

export default function MarcaGrid() {
  const { width } = useWindowDimensions()
  const cols = useMemo(() => (width < 360 ? 2 : width < 720 ? 3 : 4), [width])
  const { colors, isDark } = useThemeContext()
  const nav = useNavigation()
  const gap = wp(2)
  const itemWidth = (width - gap * (cols + 1)) / cols
  return (
    <View style={{ marginTop: hp(2) }}>
      <Text style={{ marginHorizontal: wp(4), marginBottom: hp(1), fontSize: fs(16), fontWeight: '600', color: colors.text }}>Marcas</Text>
      <FlatList
        data={MARCAS}
        keyExtractor={item => item.id}
        numColumns={cols}
        contentContainerStyle={{ paddingHorizontal: gap }}
        columnWrapperStyle={{ gap }}
        ItemSeparatorComponent={() => <View style={{ height: gap }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { width: itemWidth, backgroundColor: isDark ? colors.card : colors.secondary, borderColor: colors.border }]}
            onPress={() => nav.navigate('TelaConsultaModelos', { marca: item.nome })}
          >
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={[styles.name, { color: isDark ? colors.text : colors.primary }]} numberOfLines={1}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 12, padding: wp(3), alignItems: 'center' },
  logo: { width: wp(16), height: wp(16), resizeMode: 'contain' },
  name: { marginTop: 8, fontSize: fs(13), fontWeight: '500' }
})