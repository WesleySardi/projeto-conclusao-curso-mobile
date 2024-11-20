import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const BubbleBackground = ({children}) => {
  const [bubbleCoordinates, setBubbleCoordinates] = useState([]);

  const generateBubbleCoordinates = () => {
    const {width, height} = Dimensions.get('window');
    const coordinates = [];

    const numSections = 10;
    const sectionWidth = width / numSections;
    const sectionHeight = height / numSections;

    for (let i = 0; i < 20; i++) {
      const sectionX = Math.floor(Math.random() * numSections);
      const sectionY = Math.floor(Math.random() * numSections);

      const x = sectionX * sectionWidth + Math.random() * sectionWidth;
      const y = sectionY * sectionHeight + Math.random() * sectionHeight;

      const size = Math.random() * 20 + 10;

      coordinates.push({x, y, size});
    }

    setBubbleCoordinates(coordinates);
  };

  useEffect(() => {
    generateBubbleCoordinates();
  }, []);

  return (
    <View style={styles.container}>
      {bubbleCoordinates.map((bubble, index) => (
        <View
          key={index}
          style={[
            styles.bubble,
            {
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            },
          ]}
        />
      ))}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderRadius: 100,
  },
});

export default BubbleBackground;
