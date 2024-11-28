import React, {useState} from 'react';
import {Keyboard, Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons/faCircleUser';
import {faBell} from '@fortawesome/free-solid-svg-icons/faBell';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faStreetView} from '@fortawesome/free-solid-svg-icons/faStreetView';
import Drawer from '../drawer/Drawer';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../../contexts/UserContext';
import {COLORS} from '../../constants/constants';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

export default function Footer() {
  const {currentScreen} = useUser();
  const [drawerValue, setDrawerValue] = useState(0);
  const [drawerButtonValue, setDrawerButtonValue] = useState(0);
  const [animacaoAtiva, setAnimacaoAtiva] = useState(false);
  const navigation = useNavigation();

  const handleDrawer = () => {
    if (drawerValue === 0) {
      setDrawerValue(1);
      setDrawerButtonValue(1);
      alternarAnimacao(anterior => !anterior);
      Keyboard.dismiss();
    } else {
      alternarAnimacao(anterior => !anterior);
      setDrawerValue(0);
      setDrawerButtonValue(0);
      Keyboard.dismiss();
    }
  };

  const alternarAnimacao = state => {
    setAnimacaoAtiva(state);
  };

  return (
    <View1>
      {drawerValue === 1 && (
        <Drawer state={animacaoAtiva} handleDrawer={handleDrawer} />
      )}
      {currentScreen !== 'AccessRecovery' &&
        currentScreen !== 'Register' &&
        currentScreen !== 'Login' && (
          <View2>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Home');
              }}>
              <FontAwesomeIcon
                icon={faHome}
                color={
                  currentScreen === 'Home' ? COLORS.YELLOW_MAIN : COLORS.WHITE
                }
                style={imageStyle}
                size={height * 0.035}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <FontAwesomeIcon
                icon={faBell}
                color={COLORS.WHITE}
                style={imageMiddleStyle}
                size={height * 0.04}
              />
            </Pressable>
            <PressableMain
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('FindDependentLocally');
              }}>
              <FontAwesomeIcon
                icon={faStreetView}
                color={
                  currentScreen === 'FindDependentLocally'
                    ? COLORS.YELLOW_MAIN
                    : COLORS.WHITE
                }
                style={imageMainStyle}
                size={height * 0.045}
              />
            </PressableMain>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('UserProfile');
              }}>
              <FontAwesomeIcon
                icon={faCircleUser}
                color={
                  currentScreen === 'UserProfile'
                    ? COLORS.YELLOW_MAIN
                    : COLORS.WHITE
                }
                style={imageMiddleStyle}
                size={height * 0.04}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                handleDrawer();
              }}>
              <FontAwesomeIcon
                icon={faBars}
                color={
                  drawerButtonValue === 0 ? COLORS.WHITE : COLORS.YELLOW_MAIN
                }
                style={imageStyle}
                size={height * 0.035}
              />
            </Pressable>
          </View2>
        )}
    </View1>
  );
}

const imageStyle = {
  height: height * 0.035,
  width: height * 0.035,
};

const imageMainStyle = {
  height: height * 0.045,
  padding: 15,
  width: height * 0.045,
};

const imageMiddleStyle = {
  height: height * 0.04,
  marginBottom: 8,
  width: height * 0.04,
};

const View1 = styled.View`
  bottom: 0;
  flex: 1;
  left: 0;
  position: absolute;
  right: 0;
`;

const View2 = styled.View`
  background-color: ${COLORS.BLUE_MAIN};
  border-top-end-radius: 30px;
  border-top-start-radius: 30px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Pressable = styled.Pressable`
  justify-content: center;
  padding: 15px;
`;

const PressableMain = styled.Pressable`
  background-color: ${COLORS.DARK_BLUE};
  border-color: ${COLORS.WHITE};
  border-radius: ${width * 0.5}px;
  border-width: 3px;
  bottom: 20px;
  padding: 15px;
`;
