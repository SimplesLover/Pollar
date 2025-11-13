import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export default function FavoriteButton({ type, code, active }) {
  const { addFavoriteModel, removeFavoriteModel, addFavoritePart, removeFavoritePart } = useData();
  const { palette } = useTheme();

  const toggle = () => {
    if (type === 'model') {
      active ? removeFavoriteModel(code) : addFavoriteModel(code);
    } else {
      active ? removeFavoritePart(code) : addFavoritePart(code);
    }
  };

  return (
    <TouchableOpacity onPress={toggle} style={{ paddingHorizontal: 6, paddingVertical: 6 }}>
      <Ionicons name={active ? 'heart' : 'heart-outline'} size={20} color={active ? (palette.error || '#d81b60') : palette.textSecondary} />
    </TouchableOpacity>
  );
}