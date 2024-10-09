import React, {useState, useLayoutEffect} from 'react';
import {View, Image, Pressable, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';

function Header() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  const [showIcon, setShowIcon] = useState(false); // Defina o estado inicial como false
  const [currentScreen, setCurrentScreen] = useState('');

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('state', state => {
      // Verifique se state.data.state está definido antes de tentar acessar suas propriedades
      if (state.data.state && state.data.state.routes.length > 0) {
        const newScreen = state.data.state.routes[state.data.state.index].name;
        if (newScreen !== currentScreen) {
          setCurrentScreen(newScreen);
          const screensWithoutIcon = ['Home', 'Login'];
          setShowIcon(!screensWithoutIcon.includes(newScreen));
        }
      }
    });

    return unsubscribe;
  }, [navigation, currentScreen]);

  const backgroundStyle = {
    backgroundColor: COLORS.BLUE_MAIN,
    alignItems: 'center',
    flexDirection: 'row',
    width: windowWidth,
    height: windowHeight * 0.1,
    position: 'absolute',
  };

  const viewImage = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imgStyleLogo = {
    width: windowWidth * 0.145,
    height: windowHeight * 0.145,
    resizeMode: 'contain',
    position: 'absolute',
    left: windowWidth * 0.5 - (windowWidth * 0.145) / 2,
  };

  const iconStyle = {
    position: 'absolute',
    left: windowWidth * 0.033,
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    height: windowHeight * 0.055,
    width: windowWidth * 0.10,
    marginTop: -(windowWidth * 0.0475),
  };

  return (
    <View style={backgroundStyle}>
      {showIcon && (
        <Pressable onPress={() => currentScreen == "Register" ? navigation.navigate('Login') : navigation.navigate('Home')} style={iconStyle}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            color={COLORS.WHITE}
            size={windowWidth * 0.06}
          />
        </Pressable>
      )}
      <View style={viewImage}>
        <Image
          source={require('../assets/imgs/ZloLogoIcon.png')}
          style={imgStyleLogo}
          tintColor={COLORS.WHITE}
        />
      </View>
    </View>
  );
}

export default Header;
