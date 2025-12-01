import React, { useMemo } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import AppHeader from '../components/AppHeader'
import { useRoute, useNavigation } from '@react-navigation/native'
import { MODELOS } from '../data/modelos'
import { useFavoritos } from '../contexts/FavoritosContext'
import { useThemeContext } from '../contexts/ThemeContext'
import SpecificationTable from '../components/SpecificationTable'
import { Ionicons } from '@expo/vector-icons'
import { wp, hp, fs } from '../constants/theme'

export default function TelaDetalheModelo() {
  const route = useRoute()
  const nav = useNavigation()
  const id = route.params?.modeloId
  const modelo = useMemo(() => MODELOS.find(m => m.id === id), [id])
  const { colors } = useThemeContext()
  const { isFavorito, toggleFavorito } = useFavoritos()
  if (!modelo)
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <AppHeader />
        <View style={{ padding: wp(4) }}>
          <Text style={{ fontSize: fs(16), color: colors.text }}>Modelo não encontrado</Text>
        </View>
      </View>
    )
  const fav = isFavorito(modelo.id)
  const handleBack = () => {
    if (nav.canGoBack()) nav.goBack()
    else nav.navigate('TelaInicial')
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppHeader showBack title={`Detalhes do Modelo`} onBackPress={handleBack} />
      <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.headerWrap, { backgroundColor: colors.card }] }>
        <Image source={{ uri: modelo.imagem }} style={styles.headerImage} />
        <TouchableOpacity style={styles.headerHeart} onPress={() => toggleFavorito(modelo.id)}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={fs(20)} color={fav ? '#e74c3c' : colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.headerName, { color: colors.text }]}>{modelo.nome}</Text>
          <Text style={[styles.headerCode, { color: colors.textSecondary }]}>{modelo.codigo} • {modelo.tipo}</Text>
        </View>
      </View>
      <View style={{ padding: wp(4) }}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Componentes do Sistema</Text>
        <View style={[styles.specBox, { borderColor: colors.border }] }>
          {Object.entries(modelo.componentes || {}).map(([k, v]) => (
            <Text key={k} style={[styles.specItem, { color: colors.text }]}>{k.charAt(0).toUpperCase() + k.slice(1)}: {v || 'Não especificado'}</Text>
          ))}
        </View>
        <SpecificationTable temperaturas={modelo.temperaturas} />
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: hp(2) }]}>Especificações Técnicas</Text>
        <View style={[styles.specBox, { borderColor: colors.border }] }>
          <Text style={[styles.specItem, { color: colors.text }]}>Voltagem: {modelo.especificacoes.voltagem}</Text>
          <Text style={[styles.specItem, { color: colors.text }]}>Consumo: {modelo.especificacoes.consumo}</Text>
          <Text style={[styles.specItem, { color: colors.text }]}>Dimensões: {modelo.especificacoes.dimensoes.altura}, {modelo.especificacoes.dimensoes.largura}, {modelo.especificacoes.dimensoes.profundidade}</Text>
          {modelo.especificacoes.peso && <Text style={[styles.specItem, { color: colors.text }]}>Peso: {modelo.especificacoes.peso}</Text>}
          {modelo.especificacoes.capacidade && <Text style={[styles.specItem, { color: colors.text }]}>Capacidade: {modelo.especificacoes.capacidade}</Text>}
          {modelo.especificacoes.classeEnergetica && <Text style={[styles.specItem, { color: colors.text }]}>Classe energética: {modelo.especificacoes.classeEnergetica}</Text>}
        </View>
        {modelo.particularidades?.length ? (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: hp(2) }]}>Características Especiais</Text>
            <View style={[styles.specBox, { borderColor: colors.border }] }>
              {modelo.particularidades.map(p => (
                <Text key={p} style={[styles.specItem, { color: colors.text }]}>{p}</Text>
              ))}
            </View>
          </>
        ) : null}
        <View style={{ height: 24 }} />
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  headerWrap: { margin: wp(4), borderRadius: 12, overflow: 'hidden' },
  headerImage: { width: '100%', height: hp(30) },
  headerHeart: { position: 'absolute', right: 10, top: 10, padding: 8, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.15)' },
  headerText: { padding: wp(3) },
  headerName: { fontSize: fs(18), fontWeight: '700' },
  headerCode: { fontSize: fs(13), marginTop: 4 },
  sectionTitle: { fontSize: fs(16), fontWeight: '700', marginBottom: 8 },
  specBox: { borderWidth: 1, borderRadius: 12, padding: wp(3), marginBottom: hp(1.5) },
  specItem: { fontSize: fs(13), marginVertical: 2 }
})
