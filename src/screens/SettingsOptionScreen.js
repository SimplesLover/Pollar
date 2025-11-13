import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Text from '../components/Text';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';

export default function SettingsOptionScreen({ navigation, route }) {
  const { palette } = useTheme();
  const { title, options, selectedValue, onSelect } = route.params;

  const OptionItem = ({ option, isSelected }) => (
    <TouchableOpacity 
      style={[
        styles.optionItem, 
        { backgroundColor: palette.surface },
        isSelected && { backgroundColor: palette.primary + '20' }
      ]} 
      onPress={() => onSelect(option.value)}
    >
      <View style={styles.optionLeft}>
        <Text style={[styles.optionText, { color: palette.textPrimary }]}>
          {option.label}
        </Text>
      </View>
      {isSelected && (
        <Ionicons name="checkmark" size={24} color={palette.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: palette.textPrimary }]}>{title}</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <OptionItem 
            key={option.value} 
            option={option} 
            isSelected={option.value === selectedValue}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
  },
  optionsContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.xs,
    ...shadows.low,
  },
  optionLeft: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: typography.weight.regular,
  },
});