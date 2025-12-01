import React, { useMemo } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native'
import AppHeader from '../components/AppHeader'
import DayCard from '../components/DayCard'
import FavoritosCarousel from '../components/FavoritosCarousel'
import AnuncioCarousel from '../components/AnuncioCarousel'
import { MARCAS } from '../data/marcas'
import { useNavigation } from '@react-navigation/native'
import { useThemeContext } from '../contexts/ThemeContext'
import { wp, hp, fs } from '../constants/theme'

export default function TelaInicial() {
  const { width } = useWindowDimensions()
  const cols = useMemo(() => (width < 360 ? 2 : width < 720 ? 3 : 4), [width])
  const gap = wp(2)
  const itemWidth = (width - gap * (cols + 1)) / cols
  const nav = useNavigation()
  const { colors, isDark } = useThemeContext()

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader />
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={MARCAS}
        keyExtractor={item => item.id}
        numColumns={cols}
        contentContainerStyle={{ paddingHorizontal: gap, paddingBottom: 24 }}
        columnWrapperStyle={{ gap }}
        ItemSeparatorComponent={() => <View style={{ height: gap }} />}
        ListHeaderComponent={
          <View>
            <DayCard />
            <FavoritosCarousel />
            <Text style={{ marginHorizontal: wp(2), marginTop: hp(2), marginBottom: hp(1), fontSize: fs(16), fontWeight: '600', color: colors.text }}>Marcas</Text>
          </View>
        }
        ListFooterComponent={
          <View>
            <AnuncioCarousel />
            <View style={{ height: 24 }} />
          </View>
        }
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
