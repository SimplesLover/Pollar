import React from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ImageModal({ visible, onClose, uri }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.close} onPress={onClose}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent: 'center' },
  close: { position: 'absolute', top: 40, right: 20 },
  image: { width: '90%', height: '70%' },
});