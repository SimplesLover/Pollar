import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PieceDiagram({ imageUri, markers = [], onMarkerPress }) {
  return (
    <View style={styles.wrap}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      {markers.map((m) => (
        <TouchableOpacity
          key={`${m.partCode}-${m.x}-${m.y}`}
          onPress={() => onMarkerPress?.(m)}
          style={[styles.marker, { left: `${m.x * 100}%`, top: `${m.y * 100}%` }]}>
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 180, borderRadius: 12, overflow: 'hidden', backgroundColor: '#eee', marginTop: 12 },
  image: { width: '100%', height: '100%' },
  marker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -12,
    marginTop: -12,
    borderWidth: 2,
    borderColor: '#fff',
  },
});