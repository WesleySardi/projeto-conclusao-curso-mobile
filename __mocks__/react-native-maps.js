// __mocks__/react-native-maps.js

import React from 'react';
import { View } from 'react-native';

// Mock da função fitToCoordinates
export const fitToCoordinatesMock = jest.fn();

// Mock do MapView
const MockMapView = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    fitToCoordinates: fitToCoordinatesMock,
  }), []);
  return <View {...props} testID="map-view">{props.children}</View>;
});

// Mock do Marker
export const Marker = (props) => (
  <View {...props} testID="marker">{props.children}</View>
);

// Mock do Circle
export const Circle = (props) => (
  <View {...props} testID="circle">{props.children}</View>
);

export default MockMapView;
