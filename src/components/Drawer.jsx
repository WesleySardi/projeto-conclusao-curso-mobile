import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Pressable, Animated, Dimensions} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons/faCircleHalfStroke';

import * as Animatable from 'react-native-animatable';

import { COLORS } from '../constants/constants'

const {width, height} = Dimensions.get('window');

export default function Drawer({state}) {
  const [animacaoAtiva] = useState(state);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: animacaoAtiva ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [animacaoAtiva]);

  return (
    <View style={styles.view1}>
      <Animatable.View style={[{opacity: opacity}, styles.blur]}>
        <Animatable.View style={{opacity: opacity}}>
          <View style={styles.view2}>
            <Pressable style={styles.pressable}>
              <FontAwesomeIcon
                icon={faCircleHalfStroke}
                color={COLORS.WHITE}
                style={styles.icon}
                size={height * 0.035}
              />
            </Pressable>
          </View>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  blur: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
  pressable: {
    paddingTop: width * 0.02,
    alignItems: 'center',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: height * 0.025,
    fontWeight: '500',
  },
  view1: {
    position: 'absolute',
    bottom: 0,
    height: height,
    width: width,
  },
  view2: {
    backgroundColor: COLORS.BLUE_MAIN,
    borderBottomStartRadius: 30,
    height: height * 0.35,
    width: width * 0.15,
  },
});
