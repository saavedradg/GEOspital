import { Dimensions, Platform } from 'react-native';

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1024,
  desktop: 1280,
} as const;

export function getDeviceType(width: number): 'phone' | 'tablet' | 'desktop' {
  if (width < BREAKPOINTS.phone) return 'phone';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
}

export function getContentMaxWidth(deviceType: 'phone' | 'tablet' | 'desktop'): number | undefined {
  switch (deviceType) {
    case 'desktop':
      return 960;
    case 'tablet':
      return 720;
    default:
      return undefined;
  }
}

export function getColumns(deviceType: 'phone' | 'tablet' | 'desktop'): number {
  switch (deviceType) {
    case 'desktop':
      return 3;
    case 'tablet':
      return 2;
    default:
      return 1;
  }
}

export function isWeb(): boolean {
  return Platform.OS === 'web';
}
