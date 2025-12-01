import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export const wp = p => (SCREEN_WIDTH * p) / 100
export const hp = p => (SCREEN_HEIGHT * p) / 100
export const fs = size => Math.round(PixelRatio.roundToNearestPixel(size))

try {
  const g = typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : undefined)
  if (g) {
    if (!g.wp) g.wp = wp
    if (!g.hp) g.hp = hp
    if (!g.fs) g.fs = fs
  }
} catch (e) {}

export const lightColors = {
  primaryDark: '#4e80c9',
  primary: '#6aa0df',
  primaryLight: '#92b9ee',
  secondary: '#cbe2ff',
  tertiary: '#e6f0ff',
  background: '#f2f7ff',
  card: '#e6f0ff',
  text: '#1f2937',
  textSecondary: '#475569',
  border: '#c5d8f6',
  highlight: '#84b6f4'
}

export const darkColors = {
  background: '#0b1220',
  backgroundSecondary: '#0f172a',
  card: '#0f172a',
  primary: '#6aa0df',
  highlight: '#92b9ee',
  text: '#e5eaf5',
  textSecondary: '#9fb3d0',
  border: '#1e2a44'
}

export const getColors = theme => (theme === 'dark' ? darkColors : lightColors)