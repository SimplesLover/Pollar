// Light palette (default)
export const light = {
  // Brand
  primary: '#6a9eda', // azul pastel médio
  primaryDark: '#5086c1', // azul mais profundo
  secondary: '#84b6f4', // azul claro para gradientes e realces

  // Semantic
  success: '#2E7D32',
  error: '#C62828',
  warning: '#F59E0B',

  // Surfaces
  background: '#dcffff', // fundo muito claro (azul água)
  surface: '#b2dafa', // cartões/inputs com leve tom azul
  border: '#84b6f4', // bordas suaves dentro da paleta

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#2c4b70', // azul acinzentado para texto secundário
  muted: '#5086c1', // placeholders e ícones menos destacados
};

// Dark palette
export const dark = {
  // Brand (slightly brighter to pop on dark surfaces)
  primary: '#84b6f4',
  primaryDark: '#6a9eda',
  secondary: '#b2dafa',

  // Semantic
  success: '#4CAF50',
  error: '#EF4444',
  warning: '#F59E0B',

  // Surfaces
  background: '#0B1220',
  surface: '#111827',
  border: '#17304a',

  // Text
  textPrimary: '#E5E7EB',
  textSecondary: '#9CB3D4',
  muted: '#84b6f4',
};

// Backwards compatibility: existing imports of `colors` get the light palette
const colors = light;
export default colors;
export { colors };