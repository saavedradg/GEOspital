import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { theme } from '@/constants/theme';
import { facilityTypeConfig, FacilityType } from '@/services/mockData';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

export default function FilterChips({ options, activeFilter, onFilterChange }: FilterChipsProps) {
  const getChipColor = (id: string) => {
    if (id === 'todos') return theme.primary;
    if (id === 'favoritos') return '#F59E0B';
    const config = facilityTypeConfig[id as FacilityType];
    return config ? config.color : theme.primary;
  };

  const handlePress = (id: string) => {
    Haptics.selectionAsync();
    onFilterChange(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((option) => {
          const isActive = activeFilter === option.id;
          const chipColor = getChipColor(option.id);
          return (
            <Pressable
              key={option.id}
              onPress={() => handlePress(option.id)}
              style={[
                styles.chip,
                isActive
                  ? { backgroundColor: chipColor }
                  : { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 },
              ]}
            >
              {option.id !== 'todos' && option.id !== 'favoritos' && (
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: isActive ? '#FFFFFF' : chipColor },
                  ]}
                />
              )}
              {option.id === 'favoritos' && (
                <Text style={{ fontSize: 12, marginRight: 4 }}>
                  {isActive ? '★' : '☆'}
                </Text>
              )}
              <Text
                style={[
                  styles.chipText,
                  { color: isActive ? '#FFFFFF' : theme.textPrimary },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
