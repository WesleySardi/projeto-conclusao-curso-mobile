import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Pressable, Keyboard, Dimensions} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons/faCircleUser';
import {faBell} from '@fortawesome/free-solid-svg-icons/faBell';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faStreetView} from '@fortawesome/free-solid-svg-icons/faStreetView';
import Drawer from './Drawer';
import {useNavigation} from '@react-navigation/native';

import {useUser} from '../contexts/UserContext';

import { COLORS } from '../constants/constants';

const {width, height} = Dimensions.get('window');

export default function Footer() {
  const {userType, updateUserType} = useUser();
  const [showFooter, setShowFooter] = useState(userType[2]);

  const [drawerValue, setDrawerValue] = useState(0);
  const [drawerButtonValue, setDrawerButtonValue] = useState(0);
  const [animacaoAtiva, setAnimacaoAtiva] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setShowFooter(userType[2]);
  }, [userType]);

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
    <View style={styles.view1}>
      {drawerValue === 1 && (
        <Drawer state={animacaoAtiva} handleDrawer={handleDrawer} />
      )}
      {showFooter != '' && (
        <View style={styles.view2}>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('Home');
            }}>
            <FontAwesomeIcon
              icon={faHome}
              color={COLORS.WHITE}
              style={styles.image}
              size={height * 0.035}
            />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <FontAwesomeIcon
              icon={faBell}
              color={COLORS.WHITE}
              style={styles.imageMiddle}
              size={height * 0.04}
            />
          </Pressable>
          <Pressable
            style={styles.pressableMain}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('FindDependentLocally');
            }}>
            <FontAwesomeIcon
              icon={faStreetView}
              color={COLORS.WHITE}
              style={styles.imageMain}
              size={height * 0.045}
            />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <FontAwesomeIcon
              icon={faCircleUser}
              color={COLORS.WHITE}
              style={styles.imageMiddle}
              size={height * 0.04}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              handleDrawer();
            }}
            style={styles.pressable}>
            <FontAwesomeIcon
              icon={faBars}
              color={drawerButtonValue == 0 ? COLORS.WHITE : COLORS.YELLOW_MAIN}
              style={styles.image}
              size={height * 0.035}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: height * 0.035,
    width: height * 0.035,
  },
  imageMain: {
    height: height * 0.045,
    padding: 15,
    width: height * 0.045,
  },
  imageMiddle: {
    height: height * 0.04,
    marginBottom: 8,
    width: height * 0.04,
  },
  pressable: {
    justifyContent: 'center',
    padding: 15,
  },
  pressableMain: {
    backgroundColor: COLORS.DARK_BLUE,
    borderColor: COLORS.WHITE,
    borderRadius: width * 0.5,
    borderWidth: 3,
    bottom: 20,
    padding: 15,
  },
  view1: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  view2: {
    backgroundColor: COLORS.BLUE_MAIN,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
