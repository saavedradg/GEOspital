import { Platform } from 'react-native';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  hospitalPublico: string;
  hospitalPublicoLight: string;
  clinicaPrivada: string;
  clinicaPrivadaLight: string;
  cesfam: string;
  cesfamLight: string;
  sapu: string;
  sapuLight: string;
  sar: string;
  sarLight: string;
  cosam: string;
  cosamLight: string;
  cecof: string;
  cecofLight: string;
  aseguradora: string;
  aseguradoraLight: string;
  mutual: string;
  mutualLight: string;
  hospitalUniversitario: string;
  hospitalUniversitarioLight: string;
  success: string;
  error: string;
  warning: string;
}

export const lightColors: ThemeColors = {
  primary: '#0D9488',
  primaryLight: '#99F6E4',
  primaryDark: '#0F766E',
  background: '#F8FAFC',
  backgroundSecondary: '#F1F5F9',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  hospitalPublico: '#DC2626',
  hospitalPublicoLight: '#FEE2E2',
  clinicaPrivada: '#7C3AED',
  clinicaPrivadaLight: '#EDE9FE',
  cesfam: '#059669',
  cesfamLight: '#D1FAE5',
  sapu: '#EA580C',
  sapuLight: '#FFEDD5',
  sar: '#D97706',
  sarLight: '#FEF3C7',
  cosam: '#4F46E5',
  cosamLight: '#E0E7FF',
  cecof: '#0891B2',
  cecofLight: '#CFFAFE',
  aseguradora: '#2563EB',
  aseguradoraLight: '#DBEAFE',
  mutual: '#9333EA',
  mutualLight: '#F3E8FF',
  hospitalUniversitario: '#0369A1',
  hospitalUniversitarioLight: '#E0F2FE',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

export const darkColors: ThemeColors = {
  primary: '#2DD4BF',
  primaryLight: '#134E4A',
  primaryDark: '#5EEAD4',
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  hospitalPublico: '#F87171',
  hospitalPublicoLight: '#451A1A',
  clinicaPrivada: '#A78BFA',
  clinicaPrivadaLight: '#2E1065',
  cesfam: '#34D399',
  cesfamLight: '#064E3B',
  sapu: '#FB923C',
  sapuLight: '#431407',
  sar: '#FBBF24',
  sarLight: '#451A03',
  cosam: '#818CF8',
  cosamLight: '#1E1B4B',
  cecof: '#22D3EE',
  cecofLight: '#083344',
  aseguradora: '#60A5FA',
  aseguradoraLight: '#1E3A5F',
  mutual: '#C084FC',
  mutualLight: '#3B0764',
  hospitalUniversitario: '#38BDF8',
  hospitalUniversitarioLight: '#0C4A6E',
  success: '#34D399',
  error: '#F87171',
  warning: '#FBBF24',
};

export const shadow = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
  }) as object,
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
  }) as object,
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
    },
    android: { elevation: 8 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
    },
  }) as object,
};

export const shadowDark = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
  }) as object,
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
  }) as object,
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
    },
    android: { elevation: 8 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
    },
  }) as object,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  full: 9999,
};
