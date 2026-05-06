import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useResponsive } from '@/hooks/useResponsive';
import { facilities, facilityTypeConfig } from '@/services/mockData';

const features = [
  { icon: 'map', title: 'Mapa Interactivo', description: 'Visualiza todos los centros de salud en un mapa dinámico con filtros por tipo' },
  { icon: 'search', title: 'Búsqueda Avanzada', description: 'Encuentra centros por nombre, dirección, comuna o tipo de establecimiento' },
  { icon: 'star', title: 'Valoraciones', description: 'Consulta calificaciones de Google, reseñas y tasas de afluencia en tiempo real' },
  { icon: 'directions', title: 'Navegación', description: 'Obtén indicaciones para llegar a cualquier centro de salud con un toque' },
  { icon: 'dark-mode', title: 'Modo Oscuro', description: 'Interfaz adaptable con modo claro, oscuro y automático según tu preferencia' },
  { icon: 'local-hospital', title: '195 Centros', description: 'Base de datos verificada con direcciones oficiales de toda la Región Metropolitana' },
];

export default function LandingScreen() {
  const router = useRouter();
  const { colors, shadow, isDark } = useTheme();
  const { isDesktop, isTablet, isPhone, width } = useResponsive();

  const totalFacilities = facilities.length;
  const communeCount = new Set(facilities.map(f => f.comuna)).size;
  const typesCount = Object.keys(facilityTypeConfig).length;

  const handleEnterApp = () => {
    router.push('/(tabs)');
  };

  const heroMaxWidth = isDesktop ? 960 : isTablet ? 720 : undefined;
  const featureColumns = isDesktop ? 3 : isTablet ? 2 : 1;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          heroMaxWidth ? { alignItems: 'center' } : undefined,
        ]}
      >
        {/* Header / Navbar */}
        <View style={[styles.navbar, heroMaxWidth ? { maxWidth: heroMaxWidth, width: '100%' } : undefined]}>
          <View style={styles.navBrand}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.navLogo}
              contentFit="contain"
            />
            <Text style={[styles.navTitle, { color: colors.textPrimary }]}>GEOspital</Text>
          </View>
          {!isPhone ? (
            <Pressable
              style={[styles.navButton, { backgroundColor: colors.primary }]}
              onPress={handleEnterApp}
            >
              <Text style={styles.navButtonText}>Abrir Mapa</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" />
            </Pressable>
          ) : null}
        </View>

        {/* Hero Section */}
        <View style={[
          styles.heroSection,
          heroMaxWidth ? { maxWidth: heroMaxWidth, width: '100%' } : undefined,
          (isDesktop || isTablet) ? styles.heroSectionRow : undefined,
        ]}>
          <View style={[
            styles.heroContent,
            (isDesktop || isTablet) ? { flex: 1, paddingRight: 32 } : undefined,
          ]}>
            <View style={[styles.heroBadge, { backgroundColor: colors.primaryLight }]}>
              <MaterialIcons name="verified" size={14} color={colors.primary} />
              <Text style={[styles.heroBadgeText, { color: colors.primary }]}>
                Datos verificados MINSAL 2026
              </Text>
            </View>
            <Text style={[
              styles.heroTitle,
              { color: colors.textPrimary },
              isDesktop ? { fontSize: 42, lineHeight: 50 } : isTablet ? { fontSize: 36, lineHeight: 44 } : undefined,
            ]}>
              Encuentra tu centro de salud en Santiago
            </Text>
            <Text style={[
              styles.heroSubtitle,
              { color: colors.textSecondary },
              (isDesktop || isTablet) ? { fontSize: 17, lineHeight: 26 } : undefined,
            ]}>
              Localizador completo de hospitales, clínicas, CESFAM y más en las 52 comunas de la Región Metropolitana.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.heroButton,
                { backgroundColor: colors.primary },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
                (isDesktop || isTablet) ? { alignSelf: 'flex-start', paddingHorizontal: 32 } : undefined,
              ]}
              onPress={handleEnterApp}
            >
              <MaterialIcons name="map" size={22} color="#FFFFFF" />
              <Text style={styles.heroButtonText}>Explorar el Mapa</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={[
            styles.heroImageContainer,
            (isDesktop || isTablet) ? { flex: 1 } : undefined,
          ]}>
            <Image
              source={require('@/assets/images/hero-landing.png')}
              style={[
                styles.heroImage,
                (isDesktop || isTablet) ? { height: 320 } : undefined,
              ]}
              contentFit="cover"
              transition={300}
            />
          </View>
        </View>

        {/* Stats */}
        <View style={[
          styles.statsRow,
          heroMaxWidth ? { maxWidth: heroMaxWidth, width: '100%' } : undefined,
        ]}>
          <View style={[styles.statCard, shadow.small, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{totalFacilities}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Centros</Text>
          </View>
          <View style={[styles.statCard, shadow.small, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{communeCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Comunas</Text>
          </View>
          <View style={[styles.statCard, shadow.small, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{typesCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tipos</Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={[
          styles.featuresSection,
          heroMaxWidth ? { maxWidth: heroMaxWidth, width: '100%' } : undefined,
        ]}>
          <Text style={[
            styles.featuresSectionTitle,
            { color: colors.textPrimary },
            (isDesktop || isTablet) ? { fontSize: 24, textAlign: 'center' } : undefined,
          ]}>
            Funcionalidades
          </Text>
          <Text style={[
            styles.featuresSectionSubtitle,
            { color: colors.textSecondary },
            (isDesktop || isTablet) ? { textAlign: 'center', maxWidth: 500, alignSelf: 'center' } : undefined,
          ]}>
            Todo lo que necesitas para localizar centros de salud
          </Text>
          <View style={[
            styles.featuresGrid,
            featureColumns > 1 ? { flexDirection: 'row', flexWrap: 'wrap' } : undefined,
          ]}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={[
                  styles.featureCard,
                  shadow.small,
                  { backgroundColor: colors.surface },
                  featureColumns > 1 ? {
                    width: `${(100 / featureColumns) - 2}%`,
                    marginHorizontal: '1%',
                  } : undefined,
                ]}
              >
                <View style={[styles.featureIconCircle, { backgroundColor: colors.primaryLight }]}>
                  <MaterialIcons name={feature.icon as any} size={22} color={colors.primary} />
                </View>
                <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>{feature.title}</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Facility Type Preview */}
        <View style={[
          styles.typesSection,
          heroMaxWidth ? { maxWidth: heroMaxWidth, width: '100%' } : undefined,
        ]}>
          <Text style={[
            styles.featuresSectionTitle,
            { color: colors.textPrimary },
            (isDesktop || isTablet) ? { fontSize: 24, textAlign: 'center' } : undefined,
          ]}>
            Tipos de Centros
          </Text>
          <View style={styles.typesGrid}>
            {Object.entries(facilityTypeConfig).map(([key, cfg]) => {
              const count = facilities.filter(f => f.type === key).length;
              return (
                <View key={key} style={[styles.typeCard, { backgroundColor: cfg.lightColor, borderColor: cfg.color }]}>
                  <MaterialIcons name={cfg.icon as any} size={20} color={cfg.color} />
                  <Text style={[styles.typeCardLabel, { color: cfg.color }]}>{cfg.label}</Text>
                  <Text style={[styles.typeCardCount, { color: cfg.color }]}>{count}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* CTA */}
        <View style={[
          styles.ctaSection,
          { backgroundColor: colors.primary },
          heroMaxWidth ? { maxWidth: heroMaxWidth, width: '100%' } : undefined,
        ]}>
          <MaterialIcons name="local-hospital" size={36} color="#FFFFFF" />
          <Text style={styles.ctaTitle}>Comienza ahora</Text>
          <Text style={styles.ctaSubtitle}>
            Explora los {totalFacilities} centros de salud en el mapa interactivo
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && { opacity: 0.9 },
            ]}
            onPress={handleEnterApp}
          >
            <Text style={[styles.ctaButtonText, { color: colors.primary }]}>Ver Mapa Interactivo</Text>
            <MaterialIcons name="arrow-forward" size={18} color={colors.primary} />
          </Pressable>
        </View>

        {/* Footer */}
        <View style={[
          styles.footer,
          heroMaxWidth ? { maxWidth: heroMaxWidth, width: '100%' } : undefined,
        ]}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            GEOspital v1.0.0 - Localizador de Centros de Salud
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Región Metropolitana de Santiago, Chile
          </Text>
          <Text style={[styles.footerSmall, { color: colors.textSecondary }]}>
            Datos verificados mediante MINSAL, Google Maps y fuentes oficiales
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  navLogo: { width: 36, height: 36, borderRadius: 8 },
  navTitle: { fontSize: 20, fontWeight: '700' },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  navButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  heroSection: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  heroSectionRow: { flexDirection: 'row', alignItems: 'center' },
  heroContent: {},
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: { fontSize: 12, fontWeight: '700' },
  heroTitle: { fontSize: 28, fontWeight: '800', lineHeight: 36, marginBottom: 12 },
  heroSubtitle: { fontSize: 15, lineHeight: 22, marginBottom: 24 },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  heroButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  heroImageContainer: { marginTop: 24, borderRadius: 16, overflow: 'hidden' },
  heroImage: { width: '100%', height: 200, borderRadius: 16 },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
  },
  statValue: { fontSize: 28, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  featuresSection: { paddingHorizontal: 20, marginBottom: 32 },
  featuresSectionTitle: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  featuresSectionSubtitle: { fontSize: 14, lineHeight: 20, marginBottom: 20 },
  featuresGrid: { gap: 12 },
  featureCard: { borderRadius: 14, padding: 18, marginBottom: 0 },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  featureDescription: { fontSize: 13, lineHeight: 19 },
  typesSection: { paddingHorizontal: 20, marginBottom: 32 },
  typesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  typeCardLabel: { fontSize: 13, fontWeight: '600' },
  typeCardCount: { fontSize: 13, fontWeight: '800' },
  ctaSection: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
  ctaTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginTop: 12, marginBottom: 8 },
  ctaSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaButtonText: { fontSize: 15, fontWeight: '700' },
  footer: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 20 },
  footerText: { fontSize: 13, marginBottom: 4 },
  footerSmall: { fontSize: 11, marginTop: 8 },
});
