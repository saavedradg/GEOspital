import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/hooks/useTheme';
import { useResponsive } from '@/hooks/useResponsive';
import { facilities, facilityTypeConfig } from '@/services/mockData';
import { useApp } from '@/contexts/AppContext';

export default function FacilityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, shadow } = useTheme();
  const { isFavorite, toggleFavorite } = useApp();
  const { maxWidth, isDesktop } = useResponsive();

  const facility = facilities.find(f => f.id === id);

  const handleBack = useCallback(() => {
    Haptics.selectionAsync();
    router.back();
  }, [router]);

  const handleToggleFavorite = useCallback(() => {
    if (facility) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      toggleFavorite(facility.id);
    }
  }, [facility, toggleFavorite]);

  const handleCall = useCallback(() => {
    if (facility) {
      Haptics.selectionAsync();
      const phoneUrl = `tel:${facility.phone.replace(/\s/g, '')}`;
      Linking.canOpenURL(phoneUrl).then(supported => {
        if (supported) Linking.openURL(phoneUrl);
        else Alert.alert('Llamar', `Contactar al ${facility.phone}`);
      });
    }
  }, [facility]);

  const handleDirections = useCallback(() => {
    if (facility) {
      Haptics.selectionAsync();
      const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Cómo llegar', `${facility.address}, ${facility.comuna}, Santiago`);
      });
    }
  }, [facility]);

  if (!facility) {
    return (
      <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color={colors.textSecondary} />
          <Text style={[styles.errorTitle, { color: colors.textPrimary }]}>Centro no encontrado</Text>
          <Pressable style={[styles.errorButton, { backgroundColor: colors.primary }]} onPress={handleBack}>
            <Text style={styles.errorButtonText}>Volver</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const typeConfig = facilityTypeConfig[facility.type];
  const favorite = isFavorite(facility.id);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: typeConfig.color }}>
        <View style={[styles.header, { backgroundColor: typeConfig.color }]}>
          <Pressable onPress={handleBack} style={styles.headerButton} hitSlop={12}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
          <Pressable onPress={handleToggleFavorite} style={styles.headerButton} hitSlop={12}>
            <MaterialIcons
              name={favorite ? 'star' : 'star-border'}
              size={24}
              color={favorite ? '#FCD34D' : '#FFFFFF'}
            />
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={[styles.banner, { backgroundColor: typeConfig.color }]}>
        <View style={styles.bannerBadge}>
          <MaterialIcons name={typeConfig.icon as any} size={14} color={typeConfig.color} />
          <Text style={[styles.bannerBadgeText, { color: typeConfig.color }]}>{typeConfig.label}</Text>
        </View>
        <Text style={styles.bannerName}>{facility.name}</Text>
        <Text style={styles.bannerComuna}>{facility.comuna}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          { paddingBottom: insets.bottom + 100 },
          maxWidth ? { maxWidth, alignSelf: 'center', width: '100%' } : undefined,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.quickInfoRow, isDesktop ? { maxWidth: 500 } : undefined]}>
          <View style={[styles.quickInfoCard, shadow.small, { backgroundColor: colors.surface }]}>
            <MaterialIcons name="schedule" size={22} color={colors.primary} />
            <Text style={[styles.quickInfoLabel, { color: colors.textSecondary }]}>Horario</Text>
            <Text style={[styles.quickInfoValue, { color: colors.textPrimary }]}>{facility.hours}</Text>
          </View>
          <View style={[styles.quickInfoCard, shadow.small, { backgroundColor: colors.surface }]}>
            <MaterialIcons name="emergency" size={22} color={facility.urgencia ? '#DC2626' : colors.textSecondary} />
            <Text style={[styles.quickInfoLabel, { color: colors.textSecondary }]}>Urgencia</Text>
            <Text style={[styles.quickInfoValue, { color: facility.urgencia ? '#DC2626' : colors.textSecondary }]}>
              {facility.urgencia ? 'Disponible' : 'No disponible'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>VALORACIÓN Y AFLUENCIA</Text>
          <View style={[styles.reviewsCard, shadow.small, { backgroundColor: colors.surface }]}>
            <View style={styles.reviewsTop}>
              <View style={styles.ratingBig}>
                <Text style={[styles.ratingBigNumber, { color: colors.textPrimary }]}>{facility.googleRating.toFixed(1)}</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <MaterialIcons
                      key={star}
                      name={
                        facility.googleRating >= star
                          ? 'star'
                          : facility.googleRating >= star - 0.7
                          ? 'star-half'
                          : 'star-border'
                      }
                      size={18}
                      color="#F59E0B"
                    />
                  ))}
                </View>
                <Text style={[styles.reviewCountText, { color: colors.textSecondary }]}>
                  {facility.googleReviews.toLocaleString()} reseñas en Google
                </Text>
              </View>
              <View style={styles.attendanceContainer}>
                <View style={[styles.attendanceIconCircle, { backgroundColor: typeConfig.lightColor }]}>
                  <MaterialIcons name="people" size={24} color={typeConfig.color} />
                </View>
                <Text style={[styles.attendanceLabel, { color: colors.textSecondary }]}>Afluencia</Text>
                <Text style={[styles.attendanceValue, { color: typeConfig.color }]}>{facility.attendanceRate}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>INFORMACIÓN</Text>
          <Pressable style={[styles.infoCard, shadow.small, { backgroundColor: colors.surface }]} onPress={handleDirections}>
            <View style={[styles.infoIconContainer, { backgroundColor: '#DBEAFE' }]}>
              <MaterialIcons name="place" size={22} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Dirección</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{facility.address}, {facility.comuna}</Text>
            </View>
            <MaterialIcons name="directions" size={22} color={colors.primary} />
          </Pressable>
          <Pressable style={[styles.infoCard, shadow.small, { backgroundColor: colors.surface }]} onPress={handleCall}>
            <View style={[styles.infoIconContainer, { backgroundColor: '#D1FAE5' }]}>
              <MaterialIcons name="phone" size={22} color="#059669" />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Teléfono</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{facility.phone}</Text>
            </View>
            <MaterialIcons name="call" size={22} color={colors.primary} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SERVICIOS</Text>
          <View style={[styles.servicesCard, shadow.small, { backgroundColor: colors.surface }]}>
            <View style={styles.servicesGrid}>
              {facility.services.map((service, index) => (
                <View key={index} style={[styles.serviceChip, { backgroundColor: colors.background }]}>
                  <MaterialIcons name="check-circle" size={14} color={typeConfig.color} />
                  <Text style={[styles.serviceText, { color: colors.textPrimary }]}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>DESCRIPCIÓN</Text>
          <View style={[styles.descriptionCard, shadow.small, { backgroundColor: colors.surface }]}>
            <Text style={[styles.descriptionText, { color: colors.textPrimary }]}>{facility.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomActions, shadow.large, { backgroundColor: colors.surface, paddingBottom: insets.bottom + 16, borderTopColor: colors.border }, maxWidth ? { maxWidth, alignSelf: 'center', width: '100%' } : undefined]}>
        <Pressable style={[styles.actionButtonSecondary, { borderColor: typeConfig.color, backgroundColor: colors.surface }]} onPress={handleCall}>
          <MaterialIcons name="phone" size={20} color={typeConfig.color} />
          <Text style={[styles.actionButtonSecondaryText, { color: typeConfig.color }]}>Llamar</Text>
        </Pressable>
        <Pressable style={[styles.actionButtonPrimary, { backgroundColor: typeConfig.color }]} onPress={handleDirections}>
          <MaterialIcons name="directions" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonPrimaryText}>Cómo llegar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  headerButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  banner: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 28, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  bannerBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFFFFF', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginBottom: 12 },
  bannerBadgeText: { fontSize: 12, fontWeight: '700' },
  bannerName: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  bannerComuna: { fontSize: 15, fontWeight: '500', color: 'rgba(255,255,255,0.85)' },
  scrollView: { flex: 1 },
  quickInfoRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: -14, marginBottom: 20 },
  quickInfoCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  quickInfoLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 6 },
  quickInfoValue: { fontSize: 14, fontWeight: '700', marginTop: 2, textAlign: 'center' },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  infoCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginBottom: 10, gap: 12 },
  infoIconContainer: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  servicesCard: { borderRadius: 14, padding: 16 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  serviceChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  serviceText: { fontSize: 13, fontWeight: '500' },
  descriptionCard: { borderRadius: 14, padding: 16 },
  descriptionText: { fontSize: 14, lineHeight: 22 },
  reviewsCard: { borderRadius: 14, padding: 16 },
  reviewsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingBig: { flex: 1 },
  ratingBigNumber: { fontSize: 36, fontWeight: '700', marginBottom: 2 },
  starsRow: { flexDirection: 'row', gap: 2, marginBottom: 4 },
  reviewCountText: { fontSize: 12 },
  attendanceContainer: { alignItems: 'center', paddingLeft: 16 },
  attendanceIconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  attendanceLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  attendanceValue: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  bottomActions: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingTop: 16, borderTopWidth: 1 },
  actionButtonSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, borderWidth: 2 },
  actionButtonSecondaryText: { fontSize: 15, fontWeight: '700' },
  actionButtonPrimary: { flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12 },
  actionButtonPrimaryText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  errorTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 20 },
  errorButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  errorButtonText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
});
