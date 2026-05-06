import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { getDeviceType, getContentMaxWidth, getColumns } from '@/constants/responsive';

export function useResponsive() {
  const [dimensions, setDimensions] = useState({ width: 375, height: 667 });

  useEffect(() => {
    const update = () => {
      const { width, height } = Dimensions.get('window');
      setDimensions({ width: Math.max(1, width), height: Math.max(1, height) });
    };
    update();
    const sub = Dimensions.addEventListener('change', update);
    return () => sub?.remove();
  }, []);

  const deviceType = getDeviceType(dimensions.width);
  const maxWidth = getContentMaxWidth(deviceType);
  const columns = getColumns(deviceType);
  const isDesktop = deviceType === 'desktop';
  const isTablet = deviceType === 'tablet';
  const isPhone = deviceType === 'phone';

  return {
    width: dimensions.width,
    height: dimensions.height,
    deviceType,
    maxWidth,
    columns,
    isDesktop,
    isTablet,
    isPhone,
  };
}
