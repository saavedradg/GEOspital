import { Platform } from 'react-native';

export const theme = {
  primary: '#0D9488',
  primaryLight: '#99F6E4',
  primaryDark: '#0F766E',

  background: '#F8FAFC',
  backgroundSecondary: '#F1F5F9',
  surface: '#FFFFFF',

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

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  shadow: {
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
  },

  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    full: 9999,
  },
};
