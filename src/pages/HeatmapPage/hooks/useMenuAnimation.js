import { useState, useRef } from 'react';
import { Animated } from 'react-native';

const useMenuAnimation = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const menuHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return {
    menuVisible,
    toggleMenu,
    animation,
    menuHeight,
  };
};

export default useMenuAnimation;
