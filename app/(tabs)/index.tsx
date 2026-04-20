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
import { theme } from '@/constants/theme';
import { config } from '@/constants/config';
import { facilities, Facility, facilityTypeConfig } from '@/services/mockData';
import { useApp } from '@/contexts/AppContext';
import FilterChips from '@/components/FilterChips';
import HealthMap, { HealthMapRef } from '@/components/HealthMap';

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useApp();
  const mapRef = useRef<HealthMapRef>(null);

  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

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
    <View style={styles.container}>
      {/* Map Component */}
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

      {/* Recenter Button */}
      <Pressable
        style={[styles.recenterButton, theme.shadow.medium]}
        onPress={handleRecenter}
      >
        <MaterialIcons name="my-location" size={22} color={theme.primary} />
      </Pressable>

      {/* Facility Counter */}
      <View style={[styles.counterBadge, theme.shadow.small]}>
        <MaterialIcons name="local-hospital" size={14} color={theme.primary} />
        <Text style={styles.counterText}>
          {filteredFacilities.length} centros
        </Text>
      </View>

      {/* Selected Facility Bottom Card */}
      {selectedFacility ? (
        <Animated.View
          style={[
            styles.bottomCard,
            theme.shadow.large,
            { paddingBottom: insets.bottom + 80 },
            cardAnimatedStyle,
          ]}
        >
          <View style={styles.cardHandle} />
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
                color={isFavorite(selectedFacility.id) ? '#F59E0B' : theme.textSecondary}
              />
            </Pressable>
          </View>

          <Text style={styles.cardName}>{selectedFacility.name}</Text>

          <View style={styles.cardInfoRow}>
            <MaterialIcons name="place" size={16} color={theme.textSecondary} />
            <Text style={styles.cardInfoText}>
              {selectedFacility.address}, {selectedFacility.comuna}
            </Text>
          </View>

          <View style={styles.cardInfoRow}>
            <MaterialIcons name="schedule" size={16} color={theme.textSecondary} />
            <Text style={styles.cardInfoText}>{selectedFacility.hours}</Text>
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
            <Text style={styles.cardReviewsText}>
              ({selectedFacility.googleReviews.toLocaleString()})
            </Text>
            <View style={styles.cardAttendancePill}>
              <MaterialIcons name="people" size={12} color={theme.primary} />
              <Text style={styles.cardAttendanceText}>{selectedFacility.attendanceRate}</Text>
            </View>
          </View>

          <Pressable style={styles.detailButton} onPress={handleNavigateDetail}>
            <Text style={styles.detailButtonText}>Ver detalles</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  filterOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  recenterButton: {
    position: 'absolute',
    right: 16,
    bottom: 200,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.surface,
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
    backgroundColor: theme.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  counterText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  cardHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.border,
    alignSelf: 'center',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardTypeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardUrgenciaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  cardUrgenciaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DC2626',
  },
  cardName: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  cardInfoText: {
    fontSize: 14,
    color: theme.textSecondary,
    flex: 1,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    backgroundColor: theme.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  detailButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  cardStars: {
    flexDirection: 'row',
    gap: 1,
  },
  cardRatingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F59E0B',
  },
  cardReviewsText: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  cardAttendancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: theme.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 6,
  },
  cardAttendanceText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.primary,
  },
});
