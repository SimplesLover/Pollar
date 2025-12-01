import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useFavoritos } from '../contexts/FavoritosContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { wp, hp, fs } from '../constants/theme'

export default function ModeloCard({ item, onPress }) {
  const { isFavorito, toggleFavorito } = useFavoritos()
  const { colors, isDark } = useThemeContext()
  const fav = isFavorito(item.id)
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: isDark ? colors.card : colors.secondary }]} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <TouchableOpacity style={styles.heart} onPress={() => toggleFavorito(item.id)}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={fs(18)} color={fav ? '#e74c3c' : colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDark ? colors.text : colors.primary }]} numberOfLines={1}>{item.nome}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>{item.codigo} - {item.tipo}</Text>
        <Text style={[styles.specs, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.especificacoes.voltagem} • {item.especificacoes.consumo} • {item.especificacoes.dimensoes.altura}/{item.especificacoes.dimensoes.largura}/{item.especificacoes.dimensoes.profundidade}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, overflow: 'hidden' },
  imageWrap: { height: hp(14) },
  image: { width: '100%', height: '100%' },
  heart: { position: 'absolute', right: 8, top: 8, padding: 6, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.15)' },
  info: { padding: wp(3) },
  name: { fontSize: fs(14), fontWeight: '600' },
  subtitle: { marginTop: 2, fontSize: fs(12) },
  specs: { marginTop: 6, fontSize: fs(11) }
})