export const handleItemPress = (coordinate, toggleMenu, mapRef) => {
  toggleMenu();
  if (mapRef.current) {
    mapRef.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  }
};

export const handleMarkerPress = (coordinate, mapRef) => {
  if (mapRef.current) {
    mapRef.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  }
};
