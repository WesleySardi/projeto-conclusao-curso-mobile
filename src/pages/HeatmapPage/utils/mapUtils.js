export const calculateRegion = (data) => {
    if (!data || data.length === 0) {
      return {
        latitude: -22.9068,
        longitude: -43.1729,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
    }
  
    const latitudes = data.map((p) => p.latitude);
    const longitudes = data.map((p) => p.longitude);
  
    const minLatitude = Math.min(...latitudes);
    const maxLatitude = Math.max(...latitudes);
    const minLongitude = Math.min(...longitudes);
    const maxLongitude = Math.max(...longitudes);
  
    return {
      latitude: (minLatitude + maxLatitude) / 2,
      longitude: (minLongitude + maxLongitude) / 2,
      latitudeDelta: Math.max(maxLatitude - minLatitude, 0.1),
      longitudeDelta: Math.max(maxLongitude - minLongitude, 0.1),
    };
  };
  