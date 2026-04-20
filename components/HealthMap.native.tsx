import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
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

const HealthMap = forwardRef<HealthMapRef, HealthMapProps>(
  ({ facilities, selectedFacilityId, onMarkerPress, onMapPress }, ref) => {
    const mapRef = useRef<MapView>(null);

    useImperativeHandle(ref, () => ({
      recenter: () => {
        mapRef.current?.animateToRegion(config.santiago, 500);
      },
    }));

    const getMarkerColor = (type: FacilityType): string => {
      return facilityTypeConfig[type].color;
    };

    return (
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={config.santiago}
        onPress={onMapPress}
        showsUserLocation={false}
        showsCompass={true}
        showsScale={true}
      >
        {facilities.map((facility) => (
          <Marker
            key={facility.id}
            coordinate={{
              latitude: facility.latitude,
              longitude: facility.longitude,
            }}
            onPress={() => onMarkerPress(facility)}
            tracksViewChanges={false}
          >
            <View
              style={[
                styles.marker,
                { backgroundColor: getMarkerColor(facility.type) },
                selectedFacilityId === facility.id && styles.markerSelected,
              ]}
            >
              <MaterialIcons
                name={facilityTypeConfig[facility.type].icon as any}
                size={14}
                color="#FFFFFF"
              />
            </View>
            <View
              style={[
                styles.markerArrow,
                { borderTopColor: getMarkerColor(facility.type) },
              ]}
            />
          </Marker>
        ))}
      </MapView>
    );
  }
);

HealthMap.displayName = 'HealthMap';
export default HealthMap;

const styles = StyleSheet.create({
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  markerSelected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
    marginTop: -2,
  },
});
