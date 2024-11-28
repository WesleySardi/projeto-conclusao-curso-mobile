import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons/faCircleHalfStroke';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../constants/constants';
import styled from 'styled-components/native';

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
    <View1>
      <Animatable.View style={[{opacity: opacity}, styles.blur]}>
        <Animatable.View style={{opacity: opacity}}>
          <View2>
            <Pressable>
              <FontAwesomeIcon
                icon={faCircleHalfStroke}
                color={COLORS.WHITE}
                style={styles.icon}
                size={height * 0.035}
              />
            </Pressable>
          </View2>
        </Animatable.View>
      </Animatable.View>
    </View1>
  );
}

const View1 = styled.View`
  position: absolute;
  bottom: 0;
  height: ${height}px;
  width: ${width}px;
`;

const View2 = styled.View`
  background-color: ${COLORS.BLUE_MAIN};
  border-bottom-start-radius: 30px;
  height: ${height * 0.35}px;
  width: ${width * 0.15}px;
  justify-content: flex-end;
`;

const Pressable = styled.Pressable`
  padding-bottom: ${width * 0.05}px;
  align-items: center;
`;

const styles = {
  blur: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
  icon: {
    margin: 0,
  },
};
