import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { Facility, FacilityType, facilityTypeConfig } from '@/services/mockData';
import { config } from '@/constants/config';

export interface HealthMapRef {
  recenter: () => void;
}

interface HealthMapProps {
  facilities: Facility[];
  selectedFacilityId: string | null;
  onMarkerPress: (facility: Facility) => void;
  onMapPress: () => void;
}

const getMarkerColor = (type: FacilityType): string => facilityTypeConfig[type].color;

const HealthMap = forwardRef<HealthMapRef, HealthMapProps>(
  ({ facilities, selectedFacilityId, onMarkerPress, onMapPress }, ref) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const leafletMapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const [ready, setReady] = useState(false);

    useImperativeHandle(ref, () => ({
      recenter: () => {
        if (leafletMapRef.current) {
          leafletMapRef.current.setView(
            [config.santiago.latitude, config.santiago.longitude],
            12,
            { animate: true }
          );
        }
      },
    }));

    // Inject Leaflet CSS + JS
    useEffect(() => {
      if (typeof document === 'undefined') return;

      const existing = document.getElementById('leaflet-css');
      if (!existing) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const existingScript = document.getElementById('leaflet-js');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => setReady(true);
        document.head.appendChild(script);
      } else {
        if ((window as any).L) setReady(true);
        else existingScript.addEventListener('load', () => setReady(true));
      }
    }, []);

    // Initialize map
    useEffect(() => {
      if (!ready || !mapContainerRef.current || leafletMapRef.current) return;

      const L = (window as any).L;
      if (!L) return;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView(
        [config.santiago.latitude, config.santiago.longitude],
        12
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      map.on('click', () => onMapPress());

      leafletMapRef.current = map;

      // Force resize after mount
      setTimeout(() => map.invalidateSize(), 200);

      return () => {
        map.remove();
        leafletMapRef.current = null;
      };
    }, [ready]);

    // Update markers
    useEffect(() => {
      if (!leafletMapRef.current) return;
      const L = (window as any).L;
      if (!L) return;

      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      facilities.forEach((facility) => {
        const color = getMarkerColor(facility.type);
        const isSelected = facility.id === selectedFacilityId;
        const size = isSelected ? 38 : 30;

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:${size}px;height:${size}px;border-radius:50%;
            background:${color};border:2.5px solid #fff;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 2px 6px rgba(0,0,0,0.3);
            transition:all 0.2s;
          "><svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
          </svg></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([facility.latitude, facility.longitude], {
          icon,
        })
          .addTo(leafletMapRef.current)
          .on('click', (e: any) => {
            e.originalEvent?.stopPropagation?.();
            onMarkerPress(facility);
          });

        markersRef.current.push(marker);
      });
    }, [facilities, selectedFacilityId, ready, onMarkerPress]);

    // Update onMapPress handler
    useEffect(() => {
      if (!leafletMapRef.current) return;
      leafletMapRef.current.off('click');
      leafletMapRef.current.on('click', () => onMapPress());
    }, [onMapPress]);

    return (
      <View style={styles.container}>
        <div
          ref={(el) => {
            mapContainerRef.current = el;
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </View>
    );
  }
);

HealthMap.displayName = 'HealthMap';
export default HealthMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});
