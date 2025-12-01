import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeContext } from '../contexts/ThemeContext'
import { wp, hp, fs } from '../constants/theme'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppHeader({ title = 'Pollar', subtitle, showBack = false, onBackPress, children, bgColor }) {
  const { colors, toggleTheme, isDark } = useThemeContext()
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor || colors.primary || colors.card }]}>
      <View style={styles.rowTop}>
        <View style={styles.leftGroup}>
          {showBack ? (
            <TouchableOpacity onPress={onBackPress} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={fs(22)} color="#fff" />
            </TouchableOpacity>
          ) : null}
          <Text style={[styles.title, { color: '#fff', marginLeft: showBack ? wp(2) : 0 }]}>{title}</Text>
        </View>
        <TouchableOpacity accessibilityRole="button" onPress={toggleTheme} style={styles.button}>
          <Ionicons name={isDark ? 'sunny' : 'moon'} size={fs(22)} color="#fff" />
        </TouchableOpacity>
      </View>
      {subtitle ? (
        <View style={styles.bottomTextWrap}>
          <Text style={[styles.subtitle, { color: '#eaf2ff', marginLeft: showBack ? wp(2) : 0 }]}>{subtitle}</Text>
        </View>
      ) : null}
      {children ? <View style={styles.bottom}>{children}</View> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  rowTop: { height: hp(11), paddingHorizontal: wp(4), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0 },
  leftGroup: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: fs(20), fontWeight: '600' },
  subtitle: { fontSize: fs(12) },
  button: { padding: 8, borderRadius: 24 },
  iconBtn: { padding: 8 },
  bottomTextWrap: { paddingHorizontal: wp(4), paddingBottom: 0, marginTop: 0, width: '100%' },
  bottom: { paddingHorizontal: wp(4), paddingBottom: 5, width: '100%' }
})
