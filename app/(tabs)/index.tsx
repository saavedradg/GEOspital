import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/hooks/useTheme';
import { ThemeMode } from '@/contexts/ThemeContext';
import { config } from '@/constants/config';
import { facilities, Facility, facilityTypeConfig } from '@/services/mockData';
import { useApp } from '@/contexts/AppContext';
import FilterChips from '@/components/FilterChips';
import HealthMap, { HealthMapRef } from '@/components/HealthMap';

const themeModes: { mode: ThemeMode; icon: string; label: string }[] = [
  { mode: 'light', icon: 'light-mode', label: 'Claro' },
  { mode: 'dark', icon: 'dark-mode', label: 'Oscuro' },
  { mode: 'auto', icon: 'brightness-auto', label: 'Auto' },
];

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, shadow, mode, setMode, isDark } = useTheme();
  const { isFavorite, toggleFavorite } = useApp();
  const mapRef = useRef<HealthMapRef>(null);

  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const cardTranslateY = useSharedValue(300);

  const filteredFacilities = (() => {
    if (activeFilter === 'todos') return facilities;
    if (activeFilter === 'favoritos') return facilities.filter(f => isFavorite(f.id));
    return facilities.filter(f => f.type === activeFilter);
  })();

  const handleMarkerPress = useCallback((facility: Facility) => {
    Haptics.selectionAsync();
    setSelectedFacility(facility);
    cardTranslateY.value = withSpring(0, { damping: 18, stiffness: 280 });
  }, []);

  const handleMapPress = useCallback(() => {
    setSelectedFacility(null);
    cardTranslateY.value = withSpring(300, { damping: 18, stiffness: 280 });
  }, []);

  const handleRecenter = useCallback(() => {
    Haptics.selectionAsync();
    mapRef.current?.recenter();
  }, []);

  const handleNavigateDetail = useCallback(() => {
    if (selectedFacility) {
      Haptics.selectionAsync();
      router.push(`/${selectedFacility.id}`);
    }
  }, [selectedFacility, router]);

  const handleToggleFavorite = useCallback(() => {
    if (selectedFacility) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      toggleFavorite(selectedFacility.id);
    }
  }, [selectedFacility, toggleFavorite]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HealthMap
        ref={mapRef}
        facilities={filteredFacilities}
        selectedFacilityId={selectedFacility?.id ?? null}
        onMarkerPress={handleMarkerPress}
        onMapPress={handleMapPress}
      />

      {/* Filter Chips Overlay */}
      <View style={[styles.filterOverlay, { top: insets.top + 12 }]}>
        <FilterChips
          options={config.filterOptions as any}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </View>

      {/* Theme Toggle */}
      <Pressable
        style={[styles.themeButton, shadow.medium, { backgroundColor: colors.surface, top: insets.top + 64 }]}
        onPress={() => {
          Haptics.selectionAsync();
          setShowThemePicker(prev => !prev);
        }}
      >
        <MaterialIcons
          name={isDark ? 'dark-mode' : mode === 'auto' ? 'brightness-auto' : 'light-mode'}
          size={20}
          color={colors.primary}
        />
      </Pressable>

      {showThemePicker ? (
        <View style={[styles.themePickerContainer, shadow.large, { backgroundColor: colors.surface, top: insets.top + 110 }]}>
          {themeModes.map(tm => (
            <Pressable
              key={tm.mode}
              style={[
                styles.themeOption,
                mode === tm.mode && { backgroundColor: colors.primaryLight },
              ]}
              onPress={() => {
                Haptics.selectionAsync();
                setMode(tm.mode);
                setShowThemePicker(false);
              }}
            >
              <MaterialIcons
                name={tm.icon as any}
                size={18}
                color={mode === tm.mode ? colors.primary : colors.textSecondary}
              />
              <Text style={[styles.themeOptionText, { color: mode === tm.mode ? colors.primary : colors.textPrimary }]}>
                {tm.label}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {/* Recenter Button */}
      <Pressable
        style={[styles.recenterButton, shadow.medium, { backgroundColor: colors.surface }]}
        onPress={handleRecenter}
      >
        <MaterialIcons name="my-location" size={22} color={colors.primary} />
      </Pressable>

      {/* Counter */}
      <View style={[styles.counterBadge, shadow.small, { backgroundColor: colors.surface }]}>
        <MaterialIcons name="local-hospital" size={14} color={colors.primary} />
        <Text style={[styles.counterText, { color: colors.textPrimary }]}>
          {filteredFacilities.length} centros
        </Text>
      </View>

      {/* Bottom Card */}
      {selectedFacility ? (
        <Animated.View
          style={[
            styles.bottomCard,
            shadow.large,
            { backgroundColor: colors.surface, paddingBottom: insets.bottom + 80 },
            cardAnimatedStyle,
          ]}
        >
          <View style={[styles.cardHandle, { backgroundColor: colors.border }]} />
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <View
                style={[
                  styles.cardTypeBadge,
                  { backgroundColor: facilityTypeConfig[selectedFacility.type].lightColor },
                ]}
              >
                <MaterialIcons
                  name={facilityTypeConfig[selectedFacility.type].icon as any}
                  size={12}
                  color={facilityTypeConfig[selectedFacility.type].color}
                />
                <Text
                  style={[
                    styles.cardTypeBadgeText,
                    { color: facilityTypeConfig[selectedFacility.type].color },
                  ]}
                >
                  {facilityTypeConfig[selectedFacility.type].label}
                </Text>
              </View>
              {selectedFacility.urgencia ? (
                <View style={styles.cardUrgenciaBadge}>
                  <Text style={styles.cardUrgenciaText}>Urgencia 24h</Text>
                </View>
              ) : null}
            </View>
            <Pressable onPress={handleToggleFavorite} hitSlop={12}>
              <MaterialIcons
                name={isFavorite(selectedFacility.id) ? 'star' : 'star-border'}
                size={24}
                color={isFavorite(selectedFacility.id) ? '#F59E0B' : colors.textSecondary}
              />
            </Pressable>
          </View>

          <Text style={[styles.cardName, { color: colors.textPrimary }]}>{selectedFacility.name}</Text>

          <View style={styles.cardInfoRow}>
            <MaterialIcons name="place" size={16} color={colors.textSecondary} />
            <Text style={[styles.cardInfoText, { color: colors.textSecondary }]}>
              {selectedFacility.address}, {selectedFacility.comuna}
            </Text>
          </View>

          <View style={styles.cardInfoRow}>
            <MaterialIcons name="schedule" size={16} color={colors.textSecondary} />
            <Text style={[styles.cardInfoText, { color: colors.textSecondary }]}>{selectedFacility.hours}</Text>
          </View>

          <View style={styles.cardRatingRow}>
            <View style={styles.cardStars}>
              {[1, 2, 3, 4, 5].map(star => (
                <MaterialIcons
                  key={star}
                  name={
                    selectedFacility.googleRating >= star
                      ? 'star'
                      : selectedFacility.googleRating >= star - 0.7
                      ? 'star-half'
                      : 'star-border'
                  }
                  size={14}
                  color="#F59E0B"
                />
              ))}
            </View>
            <Text style={styles.cardRatingText}>
              {selectedFacility.googleRating.toFixed(1)}
            </Text>
            <Text style={[styles.cardReviewsText, { color: colors.textSecondary }]}>
              ({selectedFacility.googleReviews.toLocaleString()})
            </Text>
            <View style={[styles.cardAttendancePill, { backgroundColor: colors.background }]}>
              <MaterialIcons name="people" size={12} color={colors.primary} />
              <Text style={[styles.cardAttendanceText, { color: colors.primary }]}>{selectedFacility.attendanceRate}</Text>
            </View>
          </View>

          <Pressable style={[styles.detailButton, { backgroundColor: colors.primary }]} onPress={handleNavigateDetail}>
            <Text style={styles.detailButtonText}>Ver detalles</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterOverlay: { position: 'absolute', left: 0, right: 0, zIndex: 10 },
  themeButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
  },
  themePickerContainer: {
    position: 'absolute',
    right: 16,
    borderRadius: 12,
    padding: 6,
    zIndex: 12,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  themeOptionText: { fontSize: 13, fontWeight: '600' },
  recenterButton: {
    position: 'absolute',
    right: 16,
    bottom: 200,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBadge: {
    position: 'absolute',
    left: 16,
    bottom: 200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  counterText: { fontSize: 13, fontWeight: '600' },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  cardHandle: { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTypeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  cardTypeBadgeText: { fontSize: 12, fontWeight: '700' },
  cardUrgenciaBadge: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: '#FEF2F2', borderRadius: 8 },
  cardUrgenciaText: { fontSize: 11, fontWeight: '600', color: '#DC2626' },
  cardName: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  cardInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  cardInfoText: { fontSize: 14, flex: 1 },
  detailButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, paddingVertical: 14, borderRadius: 12 },
  detailButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  cardRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  cardStars: { flexDirection: 'row', gap: 1 },
  cardRatingText: { fontSize: 13, fontWeight: '700', color: '#F59E0B' },
  cardReviewsText: { fontSize: 12 },
  cardAttendancePill: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 6 },
  cardAttendanceText: { fontSize: 11, fontWeight: '600' },
});
