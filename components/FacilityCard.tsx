import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { Facility, facilityTypeConfig } from '@/services/mockData';

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.3;
  const stars = [];
  for (let i = 0; i < full; i++) stars.push('star');
  if (half) stars.push('star-half');
  while (stars.length < 5) stars.push('star-border');
  return stars;
};

interface FacilityCardProps {
  facility: Facility;
  onPress: () => void;
  isFavorite?: boolean;
}

export default function FacilityCard({ facility, onPress, isFavorite }: FacilityCardProps) {
  const typeConfig = facilityTypeConfig[facility.type];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        theme.shadow.small,
        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
      ]}
    >
      <View style={[styles.typeStrip, { backgroundColor: typeConfig.color }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.typeBadge, { backgroundColor: typeConfig.lightColor }]}>
              <Text style={[styles.typeBadgeText, { color: typeConfig.color }]}>
                {typeConfig.label}
              </Text>
            </View>
            {facility.urgencia && (
              <View style={styles.urgenciaBadge}>
                <Text style={styles.urgenciaBadgeText}>Urgencia 24h</Text>
              </View>
            )}
          </View>
          {isFavorite && (
            <MaterialIcons name="star" size={18} color="#F59E0B" />
          )}
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {facility.name}
        </Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="place" size={14} color={theme.textSecondary} />
          <Text style={styles.infoText} numberOfLines={1}>
            {facility.address}, {facility.comuna}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="schedule" size={14} color={theme.textSecondary} />
          <Text style={styles.infoText}>{facility.hours}</Text>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.starsContainer}>
            {renderStars(facility.googleRating).map((icon, i) => (
              <MaterialIcons key={i} name={icon as any} size={13} color="#F59E0B" />
            ))}
          </View>
          <Text style={styles.ratingText}>{facility.googleRating.toFixed(1)}</Text>
          <Text style={styles.reviewsText}>({facility.googleReviews.toLocaleString()})</Text>
          <View style={styles.attendancePill}>
            <MaterialIcons name="people" size={11} color={theme.primary} />
            <Text style={styles.attendanceText}>{facility.attendanceRate}</Text>
          </View>
        </View>
      </View>
      <View style={styles.chevronContainer}>
        <MaterialIcons name="chevron-right" size={22} color={theme.textSecondary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  typeStrip: {
    width: 4,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  urgenciaBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
  },
  urgenciaBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  infoText: {
    fontSize: 13,
    color: theme.textSecondary,
    flex: 1,
  },
  chevronContainer: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  reviewsText: {
    fontSize: 11,
    color: theme.textSecondary,
  },
  attendancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: theme.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 4,
  },
  attendanceText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.primary,
  },
});
