import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/hooks/useTheme';
import { ThemeMode } from '@/contexts/ThemeContext';
import { facilities, facilityTypeConfig } from '@/services/mockData';

const themeModes: { mode: ThemeMode; icon: string; label: string; description: string }[] = [
  { mode: 'light', icon: 'light-mode', label: 'Claro', description: 'Interfaz clara siempre' },
  { mode: 'dark', icon: 'dark-mode', label: 'Oscuro', description: 'Interfaz oscura siempre' },
  { mode: 'auto', icon: 'brightness-auto', label: 'Automático', description: 'Sigue la configuración del sistema' },
];

export default function SettingsScreen() {
  const { colors, shadow, mode, setMode, isDark } = useTheme();

  const totalFacilities = facilities.length;
  const typeCounts = Object.entries(facilityTypeConfig).map(([key, cfg]) => ({
    key,
    label: cfg.label,
    color: cfg.color,
    count: facilities.filter(f => f.type === key).length,
  }));

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Configuración</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>GEOspital v1.0.0</Text>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>APARIENCIA</Text>
          <View style={[styles.card, shadow.small, { backgroundColor: colors.surface }]}>
            {themeModes.map((tm, index) => (
              <React.Fragment key={tm.mode}>
                <Pressable
                  style={[
                    styles.themeOption,
                    mode === tm.mode && { backgroundColor: colors.primaryLight },
                  ]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setMode(tm.mode);
                  }}
                >
                  <View style={[styles.themeIconCircle, { backgroundColor: mode === tm.mode ? colors.primary : colors.backgroundSecondary }]}>
                    <MaterialIcons
                      name={tm.icon as any}
                      size={20}
                      color={mode === tm.mode ? '#FFFFFF' : colors.textSecondary}
                    />
                  </View>
                  <View style={styles.themeTextContainer}>
                    <Text style={[styles.themeLabel, { color: colors.textPrimary }]}>{tm.label}</Text>
                    <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>{tm.description}</Text>
                  </View>
                  {mode === tm.mode ? (
                    <MaterialIcons name="check-circle" size={22} color={colors.primary} />
                  ) : (
                    <MaterialIcons name="radio-button-unchecked" size={22} color={colors.border} />
                  )}
                </Pressable>
                {index < themeModes.length - 1 ? (
                  <View style={[styles.separator, { backgroundColor: colors.border }]} />
                ) : null}
              </React.Fragment>
            ))}
          </View>
          <Text style={[styles.sectionFooter, { color: colors.textSecondary }]}>
            Modo actual: {isDark ? 'Oscuro' : 'Claro'}
          </Text>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ESTADÍSTICAS DE LA BASE DE DATOS</Text>
          <View style={[styles.card, shadow.small, { backgroundColor: colors.surface }]}>
            <View style={styles.totalRow}>
              <MaterialIcons name="local-hospital" size={24} color={colors.primary} />
              <Text style={[styles.totalText, { color: colors.textPrimary }]}>
                {totalFacilities} centros de salud
              </Text>
            </View>
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            {typeCounts.map((tc, index) => (
              <React.Fragment key={tc.key}>
                <View style={styles.statRow}>
                  <View style={[styles.statDot, { backgroundColor: tc.color }]} />
                  <Text style={[styles.statLabel, { color: colors.textPrimary }]}>{tc.label}</Text>
                  <Text style={[styles.statCount, { color: colors.textSecondary }]}>{tc.count}</Text>
                </View>
                {index < typeCounts.length - 1 ? (
                  <View style={[styles.separatorThin, { backgroundColor: colors.border }]} />
                ) : null}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>INFORMACIÓN</Text>
          <View style={[styles.card, shadow.small, { backgroundColor: colors.surface }]}>
            <View style={styles.infoRow}>
              <MaterialIcons name="info" size={20} color={colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: colors.textPrimary }]}>Versión</Text>
                <Text style={[styles.infoValue, { color: colors.textSecondary }]}>1.0.0</Text>
              </View>
            </View>
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            <View style={styles.infoRow}>
              <MaterialIcons name="place" size={20} color={colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: colors.textPrimary }]}>Cobertura</Text>
                <Text style={[styles.infoValue, { color: colors.textSecondary }]}>52 comunas de la Región Metropolitana</Text>
              </View>
            </View>
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            <View style={styles.infoRow}>
              <MaterialIcons name="verified" size={20} color={colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: colors.textPrimary }]}>Fuentes</Text>
                <Text style={[styles.infoValue, { color: colors.textSecondary }]}>MINSAL, Google Maps, SSMC, sitios oficiales</Text>
              </View>
            </View>
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            <View style={styles.infoRow}>
              <MaterialIcons name="devices" size={20} color={colors.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={[styles.infoLabel, { color: colors.textPrimary }]}>Plataforma</Text>
                <Text style={[styles.infoValue, { color: colors.textSecondary }]}>
                  {Platform.OS === 'android' ? 'Android' : Platform.OS === 'ios' ? 'iOS' : 'Web'} - {Platform.Version}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            GEOspital - Localizador de Centros de Salud
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Región Metropolitana de Santiago, Chile
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, fontWeight: '500', marginTop: 2 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  sectionFooter: { fontSize: 12, marginTop: 8, paddingHorizontal: 4 },
  card: { borderRadius: 14, overflow: 'hidden' },
  themeOption: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  themeIconCircle: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  themeTextContainer: { flex: 1 },
  themeLabel: { fontSize: 15, fontWeight: '600' },
  themeDescription: { fontSize: 12, marginTop: 2 },
  separator: { height: 1, marginHorizontal: 16 },
  separatorThin: { height: StyleSheet.hairlineWidth, marginHorizontal: 16 },
  totalRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  totalText: { fontSize: 17, fontWeight: '700' },
  statRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 10 },
  statDot: { width: 10, height: 10, borderRadius: 5 },
  statLabel: { flex: 1, fontSize: 14, fontWeight: '500' },
  statCount: { fontSize: 14, fontWeight: '700' },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 14, fontWeight: '600' },
  infoValue: { fontSize: 12, marginTop: 2 },
  footer: { alignItems: 'center', paddingVertical: 24 },
  footerText: { fontSize: 12, marginBottom: 2 },
});
