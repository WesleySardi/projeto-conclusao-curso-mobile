import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const BubbleBackground = ({ children }) => {
  const bubbleCoordinates = useRef([]);

  useEffect(() => {
    generateBubbleCoordinates();
  }, []);

  const generateBubbleCoordinates = () => {
    const { width, height } = Dimensions.get('window');
    const coordinates = [];

    const numSections = 5; // Número de seções para dividir a tela
    const sectionWidth = width / numSections;
    const sectionHeight = height / numSections;

    for (let i = 0; i < 20; i++) {
      const sectionX = Math.floor(Math.random() * numSections);
      const sectionY = Math.floor(Math.random() * numSections);

      const x = sectionX * sectionWidth + Math.random() * sectionWidth;
      const y = sectionY * sectionHeight + Math.random() * sectionHeight;

      const size = Math.random() * 20 + 10;
      const speed = (Math.random() * 4000 + 2000) * 1.5;

      coordinates.push({ x, y, size, speed });
    }

    bubbleCoordinates.current = coordinates;
  };

  useEffect(() => {
    moveBubbles();
  }, []);

  const moveBubbles = () => {
    bubbleCoordinates.current.forEach((bubble, index) => {
      const { y, speed } = bubble;
      const translateY = new Animated.Value(y);

      Animated.loop(
        Animated.timing(translateY, {
          toValue: -100,
          duration: speed,
          useNativeDriver: true,
        })
      ).start();

      bubbleCoordinates.current[index].translateY = translateY;
    });
  };

  return (
    <View style={styles.container}>
      {bubbleCoordinates.current.map((bubble, index) => {
        const { x, size } = bubble;
        const translateY = bubble.translateY;

        return (
          <Animated.View
            key={index}
            style={[
              styles.bubble,
              {
                left: x,
                width: size,
                height: size,
                transform: [{ translateY }],
              },
            ]}
          />
        );
      })}
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
