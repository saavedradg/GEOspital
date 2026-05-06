import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/hooks/useTheme';
import { useResponsive } from '@/hooks/useResponsive';
import { config } from '@/constants/config';
import { facilities, Facility, facilityTypeConfig } from '@/services/mockData';
import { useApp } from '@/contexts/AppContext';
import FilterChips from '@/components/FilterChips';
import FacilityCard from '@/components/FacilityCard';

export default function ListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, shadow } = useTheme();
  const { favorites, isFavorite } = useApp();
  const { isDesktop, isTablet, maxWidth } = useResponsive();

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

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { total: facilities.length };
    facilities.forEach(f => {
      counts[f.type] = (counts[f.type] || 0) + 1;
    });
    return counts;
  }, []);

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
        <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Sin resultados</Text>
        <Text style={[styles.emptyDescription, { color: colors.textSecondary }]}>
          No se encontraron centros de salud con los filtros aplicados.
        </Text>
        <Pressable
          style={[styles.emptyButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            setSearchQuery('');
            setActiveFilter('todos');
          }}
        >
          <Text style={styles.emptyButtonText}>Limpiar filtros</Text>
        </Pressable>
      </View>
    ),
    [colors]
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.listHeader}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
          {Object.entries(facilityTypeConfig).map(([key, cfg]) => (
            <View key={key} style={[styles.statCard, { backgroundColor: cfg.lightColor }]}>
              <Text style={[styles.statValue, { color: cfg.color }]}>
                {typeCounts[key] || 0}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]} numberOfLines={1}>{cfg.label}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
          {filteredFacilities.length} de {facilities.length} centros
        </Text>
      </View>
    ),
    [filteredFacilities.length, typeCounts, colors]
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.innerContainer, maxWidth ? { maxWidth, alignSelf: 'center', width: '100%' } : undefined]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Centros de Salud</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Santiago Metropolitano</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, shadow.small, { backgroundColor: colors.surface }]}>
          <MaterialIcons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Buscar por nombre, dirección o comuna..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
              <MaterialIcons name="close" size={20} color={colors.textSecondary} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <FilterChips
        options={config.filterOptions as any}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <View style={styles.listContainer}>
        <FlashList
          data={filteredFacilities}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          estimatedItemSize={110}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: insets.bottom + 16 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          numColumns={isDesktop ? 2 : 1}
        />
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, fontWeight: '500', marginTop: 2 },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 14, height: 48, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  listContainer: { flex: 1, marginTop: 8 },
  listHeader: { paddingHorizontal: 16, marginBottom: 12 },
  statsScroll: { gap: 8, paddingBottom: 12 },
  statCard: { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, minWidth: 80 },
  statValue: { fontSize: 24, fontWeight: '700' },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  resultsCount: { fontSize: 13, fontWeight: '500' },
  emptyContainer: { alignItems: 'center', paddingHorizontal: 40, paddingTop: 40 },
  emptyImage: { width: 120, height: 120, marginBottom: 20 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  emptyDescription: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  emptyButton: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 9999 },
  emptyButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});
