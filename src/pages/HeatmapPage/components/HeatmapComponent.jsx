import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import PropTypes from 'prop-types';
import { calculateRegion } from '../utils/mapUtils';

export const HeatmapComponent = ({ originalPoints, onMarkerPress, mapRef }) => {
  const region = calculateRegion(originalPoints);

  useEffect(() => {
    if (originalPoints.length > 0 && mapRef.current) {
      const coordinates = originalPoints.map((point) => ({
        latitude: point.latitude,
        longitude: point.longitude,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [originalPoints, mapRef]);

  return (
    <MapView ref={mapRef} style={styles.map} initialRegion={region}>
      {/* Renderizando Markers */}
      {originalPoints.map((point, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: point.latitude, longitude: point.longitude }}
          pinColor="red"
          onPress={() => onMarkerPress({ latitude: point.latitude, longitude: point.longitude })}
        />
      ))}

      {/* Renderizando Círculos */}
      {originalPoints.map((point, index) => (
        <React.Fragment key={`circle-${index}`}>
          {/* Círculo Externo - Azul */}
          <Circle
            center={{ latitude: point.latitude, longitude: point.longitude }}
            radius={600}
            strokeColor="rgba(0, 0, 255, 0.15)" // Azul claro com menor opacidade
            fillColor="rgba(0, 0, 255, 0.05)" // Azul com ainda menor opacidade
          />
          {/* Círculo Intermediário - Verde */}
          <Circle
            center={{ latitude: point.latitude, longitude: point.longitude }}
            radius={400}
            strokeColor="rgba(0, 255, 0, 0.15)" // Verde com menor opacidade
            fillColor="rgba(0, 255, 0, 0.1)" // Verde com opacidade reduzida
          />
          {/* Círculo Interno - Vermelho */}
          <Circle
            center={{ latitude: point.latitude, longitude: point.longitude }}
            radius={200}
            strokeColor="rgba(255, 0, 0, 0.15)" // Vermelho com menor opacidade
            fillColor="rgba(255, 0, 0, 0.15)" // Vermelho com opacidade consistente
          />
        </React.Fragment>
      ))}
    </MapView>
  );
};

HeatmapComponent.propTypes = {
  originalPoints: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      scanDateTime: PropTypes.number,
    })
  ).isRequired,
  onMarkerPress: PropTypes.func.isRequired,
  mapRef: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
