import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { theme } from '@/constants/theme';
import { config } from '@/constants/config';
import { facilities, Facility, FacilityType, facilityTypeConfig } from '@/services/mockData';
import { useApp } from '@/contexts/AppContext';
import FilterChips from '@/components/FilterChips';
import FacilityCard from '@/components/FacilityCard';

export default function ListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favorites, isFavorite } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const filteredFacilities = useMemo(() => {
    let results = facilities;

    if (activeFilter === 'favoritos') {
      results = results.filter(f => isFavorite(f.id));
    } else if (activeFilter !== 'todos') {
      results = results.filter(f => f.type === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(
        f =>
          f.name.toLowerCase().includes(query) ||
          f.address.toLowerCase().includes(query) ||
          f.comuna.toLowerCase().includes(query) ||
          f.typeLabel.toLowerCase().includes(query)
      );
    }

    return results;
  }, [activeFilter, searchQuery, favorites, isFavorite]);

  const handleFacilityPress = useCallback(
    (facility: Facility) => {
      Haptics.selectionAsync();
      router.push(`/${facility.id}`);
    },
    [router]
  );

  const typeCounts = useMemo(() => ({
    total: facilities.length,
    hospital_publico: facilities.filter(f => f.type === 'hospital_publico').length,
    cesfam: facilities.filter(f => f.type === 'cesfam').length,
    clinica_privada: facilities.filter(f => f.type === 'clinica_privada').length,
  }), []);

  const renderItem = useCallback(
    ({ item }: { item: Facility }) => (
      <FacilityCard
        facility={item}
        onPress={() => handleFacilityPress(item)}
        isFavorite={isFavorite(item.id)}
      />
    ),
    [handleFacilityPress, isFavorite]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Image
          source={require('@/assets/images/empty-search.png')}
          style={styles.emptyImage}
          contentFit="contain"
        />
        <Text style={styles.emptyTitle}>Sin resultados</Text>
        <Text style={styles.emptyDescription}>
          No se encontraron centros de salud con los filtros aplicados.
        </Text>
        <Pressable
          style={styles.emptyButton}
          onPress={() => {
            setSearchQuery('');
            setActiveFilter('todos');
          }}
        >
          <Text style={styles.emptyButtonText}>Limpiar filtros</Text>
        </Pressable>
      </View>
    ),
    []
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.listHeader}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: facilityTypeConfig.hospital_publico.lightColor }]}>
            <Text style={[styles.statValue, { color: facilityTypeConfig.hospital_publico.color }]}>
              {typeCounts.hospital_publico}
            </Text>
            <Text style={styles.statLabel}>H. Públicos</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: facilityTypeConfig.cesfam.lightColor }]}>
            <Text style={[styles.statValue, { color: facilityTypeConfig.cesfam.color }]}>
              {typeCounts.cesfam}
            </Text>
            <Text style={styles.statLabel}>CESFAM</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: facilityTypeConfig.clinica_privada.lightColor }]}>
            <Text style={[styles.statValue, { color: facilityTypeConfig.clinica_privada.color }]}>
              {typeCounts.clinica_privada}
            </Text>
            <Text style={styles.statLabel}>C. Privadas</Text>
          </View>
        </View>

        <Text style={styles.resultsCount}>
          {filteredFacilities.length} de {facilities.length} centros
        </Text>
      </View>
    ),
    [filteredFacilities.length, typeCounts]
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Centros de Salud</Text>
        <Text style={styles.subtitle}>Santiago Metropolitano</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, theme.shadow.small]}>
          <MaterialIcons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre, dirección o comuna..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
              <MaterialIcons name="close" size={20} color={theme.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Filter Chips */}
      <FilterChips
        options={config.filterOptions as any}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Facility List */}
      <View style={styles.listContainer}>
        <FlashList
          data={filteredFacilities}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          estimatedItemSize={110}
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: insets.bottom + 16,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.textSecondary,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.textPrimary,
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
  },
  listHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.textSecondary,
    marginTop: 2,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: theme.primary,
    borderRadius: 9999,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
