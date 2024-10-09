import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import BubbleBackground from '../components/BubbleBackground';

import { COLORS } from '../constants/constants';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';

import { useUser } from '../contexts/UserContext';

const { width, height } = Dimensions.get('window');

const imageHeight = height * 0.07;
const imageWidth = width * 0.15;

const fontSize_Small = width * 0.035;
const fontSize_Normal = width * 0.045;
const fontSize_Big = width * 0.055;
const fontSize_Gigantic = width * 0.065;

const borderRadius_Main = width * 0.03;

export default function Home({ navigation }) {
  const { userType, updateUserType } = useUser();

  const [textoInput, setTextoInput] = useState('');
  const [userData, setUserData] = useState({});
  const [userDataToBeShown, setUserDataToBeShown] = useState({});
  const [valueToShowData, setValueToShowData] = useState(0);
  const [valuesToShowData, setValuesToShowData] = useState([]);
  const [listData, setListData] = useState([]);

  const [isPressedBackward, setIsPressedBackward] = useState(false);
  const [isPressedForward, setIsPressedForward] = useState(false);

  const [changeDependentColor, setChangeDependentColor] = useState(false);

  const [isList, setIsList] = useState(false);

  useEffect(() => {
    searchData();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      searchData();
    })
  }, [navigation]);

  useEffect(() => {
    if (valueToShowData >= 0 && userData.length > 0) {
      setUserDataToBeShown(userData[valueToShowData]);
    }
  }, [valueToShowData, userData]);

  useEffect(() => {
    if (valuesToShowData.length >= 0 && userData.length > 0) {
      setListData(valuesToShowData.map(indice => userData[indice]))

      console.log(valuesToShowData)
    }
  }, [valuesToShowData]);

  useEffect(() => {
    search(textoInput);
  }, [textoInput]);

  const searchData = async () => {
    try {
      const response = await axios.get(
        `http://IPv4:8080/api/dependents/findDependentsByCpfRes/${userType[2]}`,
      );
      if (response) {
        setUserData(response.data._embedded.dependentVOes);
        setListData(response.data._embedded.dependentVOes)
        setUserDataToBeShown(response.data._embedded.dependentVOes[0]);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const search = nome => {
    const arrayData = Object.values(userData);

    const indices = arrayData.reduce((acc, objeto, indice) => {
      if (
        objeto &&
        objeto.nomeDep &&
        typeof objeto.nomeDep === 'string' &&
        objeto.nomeDep.toLowerCase().includes(nome.toLowerCase())
      ) {
        acc.push(indice);
      }
      return acc;
    }, []);

    if (isList == false) {
      if (indices[0] == undefined) return setValueToShowData(0);
      else return setValueToShowData(indices[0]);
    } else {
      if (indices[0] == undefined) return setValuesToShowData([]);
      else return setValuesToShowData(indices);
    }
  };

  const handlePressNewDependentButton = () => {
    updateUserType([{}, true, userType[2], userType[3], userType[4]]);
    navigation.navigate('RegisterOrChangeUser');
  };

  const handlePressChangeDependentButton = () => {
    updateUserType([userDataToBeShown, false, userType[2], userType[3], userType[4]]);
    navigation.navigate('RegisterOrChangeUser');
  };

  const handlePressGetDependentByList = (id) => {
    updateUserType([userData[id], false, userType[2], userType[3], userType[4]]);
    navigation.navigate('RegisterOrChangeUser');
  }

  const changeDependentBackwards = () => {
    if (changeDependentColor == false) {
      setChangeDependentColor(true);
    } else {
      setChangeDependentColor(false);
    }
    setTimeout(() => {
      setIsPressedBackward(false);
    }, 300);
    setTextoInput('');
    setValueToShowData(
      (valueToShowData - 1 + userData.length) % userData.length,
    );
    setIsPressedBackward(true);
  };

  const changeDependentForward = () => {
    if (changeDependentColor == false) {
      setChangeDependentColor(true);
    } else {
      setChangeDependentColor(false);
    }
    setTimeout(() => {
      setIsPressedForward(false);
    }, 300);
    setTextoInput('');
    setValueToShowData((valueToShowData + 1) % userData.length);
    setIsPressedForward(true);
  };

  const changeDependentNavigation = () => {
    setTextoInput('')
    setListData(userData)
    setValueToShowData(0)
    if (isList == false) {
      setIsList(true);
    } else {
      setIsList(false);
    }
  }

  return (
    <View style={styles.mainView}>
      <BubbleBackground></BubbleBackground>
      <View>
        <View
          style={[
            styles.viewWelcome,
            {
              bottom:
                userData.length == undefined ? height * 0.2 : height * 0.025,
            },
          ]}>
          <View style={styles.viewWelcomeTexts}>
            <Text style={styles.textHello}>Olá,</Text>
            <Text style={styles.textName}>{userType[3]}</Text>
          </View>
        </View>

        {userData.length == undefined ? (
          <View style={styles.viewNoDependents}>
            <Pressable
              onPress={() => handlePressNewDependentButton()}
              style={styles.pressableNoDependents}>
              <Text style={styles.textDependentsButton}>Cadastrar dependente</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <View style={styles.viewSearchBackground}>
              <View style={styles.viewSearch}>
                <View style={styles.viewSearchLeftView}>
                  <TextInput
                    placeholder="Pesquisar dependente"
                    placeholderTextColor={COLORS.GREY_MAIN}
                    onChangeText={text => setTextoInput(text)}
                    value={textoInput}
                    style={[styles.searchInput, { borderColor: COLORS.GREY_MAIN }]}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    color={COLORS.GREY_MAIN}
                    style={styles.searchIcon}
                    size={width * 0.06}
                  />
                </View>
                <View style={styles.viewSearchRightView}>
                  <Pressable style={[styles.buttonChangeDependentNavigation, { backgroundColor: isList == true ? COLORS.GREY_MAIN : COLORS.BLACK }]} onPress={() => changeDependentNavigation()}>
                    <FontAwesomeIcon
                      icon={faList}
                      color={COLORS.WHITE}
                      style={styles.iconChangeDependentNavigation}
                      size={width * 0.06}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
            {isList == true ? (
              <View style={styles.list_centralizationView}>
                <View style={styles.list_viewDependentsInfoBackground}>
                  <Text style={styles.list_dependentsTotalText}>Você é responsável por: <Text style={{ color: COLORS.RED_MAIN, fontWeight: "bold" }}>{userData.length}</Text> dependentes.</Text>
                  <ScrollView
                    style={styles.list_scrollView}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    {listData.map((dependents, index) => (
                      <View key={index} style={styles.list_viewDependentsInfo}>
                        <View style={styles.list_viewDependent}>
                          <Image
                            style={styles.list_image}
                            source={require('../assets/imgs/IconePerfilAnonimo.jpg')}
                          />
                          <Text style={styles.list_textNameDep}>{dependents.nomeDep}</Text>
                        </View>
                        <View style={styles.list_viewEditButton}>
                          <Pressable
                            onPress={() => handlePressGetDependentByList(index)}
                            style={styles.list_pressableEdit}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              color={COLORS.DARK_BLUE}
                              style={styles.list_iconEdit}
                              size={height * 0.040}
                            />
                          </Pressable>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            ) : (
              <View style={styles.viewArrows}>
                <Pressable
                  onPress={() => changeDependentBackwards()}
                  style={styles.arrows}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    color={isPressedBackward ? COLORS.DARK_BLUE : COLORS.GREY_MAIN}
                    style={styles.arrowsIcon}
                    size={isPressedBackward ? width * 0.1 : width * 0.09}
                  />
                </Pressable>
                <View
                  style={[
                    styles.viewDependentInfoBackground,
                    {
                      backgroundColor: changeDependentColor
                        ? COLORS.PACIFIC_BLUE
                        : COLORS.BLUE_MAIN,
                    },
                  ]}>
                  <View style={styles.viewDependentId}>
                    <View>
                      <Text style={styles.textTitle}>
                        {userDataToBeShown.nomeDep}
                      </Text>
                      <Text style={styles.text}>ID: {userDataToBeShown.cpfDep}</Text>
                    </View>
                    <Image
                      style={styles.image}
                      source={require('../assets/imgs/IconePerfilAnonimo.jpg')}
                    />
                  </View>
                  <View style={styles.viewDependentInfo}>
                    <View style={styles.infoDep}>
                      <Text style={[styles.textInfoDep, styles.spaceBottom]}><Text style={{ color: COLORS.DARK_BLUE, fontWeight: "bold" }}>Idade:</Text> {userDataToBeShown.idadeDep}</Text>
                      <Text style={[styles.textInfoDep, styles.spaceTopBottom]}><Text style={{ color: COLORS.DARK_BLUE, fontWeight: "bold" }}>Gênero:</Text> {userDataToBeShown.generoDep}</Text>
                      <Text style={[styles.textInfoDep, styles.spaceTop]}><Text style={{ color: COLORS.DARK_BLUE, fontWeight: "bold" }}>Tipo Sanguíneo:</Text> {userDataToBeShown.tipoSanguineo}</Text>
                    </View>
                    <View style={styles.viewEditButton}>
                      <Pressable
                        onPress={handlePressChangeDependentButton}
                        style={styles.pressableEdit}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          color={COLORS.WHITE}
                          style={styles.iconEdit}
                          size={height * 0.060}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() => changeDependentForward()}
                  style={styles.arrows}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color={isPressedForward ? COLORS.DARK_BLUE : COLORS.GREY_MAIN}
                    style={styles.arrowsIcon}
                    size={isPressedForward ? width * 0.1 : width * 0.09}
                  />
                </Pressable>
              </View>
            )}
            <View style={styles.viewNewDependent}>
              <Pressable
                onPress={() => handlePressNewDependentButton()}
                style={styles.pressableNewDependent}>
                <Text style={styles.textDependentsButton}>Cadastrar dependente</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  image: {
    borderRadius: width * 1,
    height: imageHeight,
    width: imageWidth,
  },

  searchIcon: {
    position: "absolute",
    right: width * 0.05
  },
  searchInput: {
    backgroundColor: COLORS.WHITE,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    paddingLeft: width * 0.04,
    color: COLORS.GREY_MAIN,
    fontSize: fontSize_Small,
    width: '100%',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: fontSize_Small,
  },
  textTitle: {
    color: COLORS.WHITE,
    fontSize: fontSize_Normal,
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
  },
  viewSearchBackground: {
    alignItems: 'center'
  },
  viewSearch: {
    flexDirection: 'row',
    marginBottom: width * 0.02,
    width: '80%',
  },
  viewSearchLeftView: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  viewSearchRightView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonChangeDependentNavigation: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: width * 0.12,
    borderRadius: borderRadius_Main,
    borderColor: COLORS.WHITE,
    borderWidth: 1
  },
  viewArrows: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  arrows: {
    alignItems: 'center',
    width: '10%'
  },
  viewNoDependents: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: height * 0.05,
  },
  pressableNoDependents: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.DARK_BLUE,
    borderColor: COLORS.WHITE,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    width: '80%',
    height: width * 0.15,
  },
  viewNewDependent: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  pressableNewDependent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.DARK_BLUE,
    borderColor: COLORS.WHITE,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    color: COLORS.GREY_MAIN,
    width: '80%',
    height: width * 0.15,
  },
  textDependentsButton: {
    color: COLORS.WHITE,
    fontSize: fontSize_Big,
    fontWeight: 'thin',
  },
  viewWelcome: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewWelcomeTexts: {
    width: '80%',
    borderColor: COLORS.GREY_MAIN,
    borderBottomWidth: 1,
    paddingBottom: height * 0.02,
  },
  textHello: {
    color: COLORS.BLACK,
    fontSize: fontSize_Big,
    fontWeight: '500',
  },
  textName: {
    color: COLORS.DARK_BLUE,
    fontSize: fontSize_Gigantic,
    fontWeight: 'bold',
  },
  viewDependentId: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.LIGHT_BLUE,
    borderTopEndRadius: borderRadius_Main,
    borderTopStartRadius: borderRadius_Main,
    padding: width * 0.03,
    height: "30%"
  },
  viewDependentInfoBackground: {
    borderColor: COLORS.WHITE,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    padding: width * 0.02,
    width: '80%',
    height: height * 0.4
  },
  viewDependentInfo: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: "70%"
  },
  infoDep: {
    backgroundColor: COLORS.LIGHT_GREY,
    borderBottomStartRadius: borderRadius_Main,
    padding: width * 0.03,
    justifyContent: "center",
    width: "60%",
    height: "100%"
  },
  spaceTop: {
    paddingTop: height * 0.02,
  },
  spaceTopBottom: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.02,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLORS.GREY_MAIN,
  },
  spaceBottom: {
    paddingBottom: height * 0.02,
  },
  viewEditButton: {
    backgroundColor: COLORS.DARK_BLUE,
    borderBottomEndRadius: borderRadius_Main,
    justifyContent: "space-evenly",
    alignItems: "center",
    height: width * 0.4,
    width: "40%",
    height: "100%"
  },
  textInfoDep: {
    fontWeight: "thin",
    color: COLORS.BLACK,
    fontSize: fontSize_Small
  },
  list_centralizationView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  list_viewDependentsInfoBackground: {
    backgroundColor: COLORS.BLUE_MAIN,
    height: height * 0.4,
    borderColor: COLORS.WHITE,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: width * 0.02
  },
  list_dependentsTotalText: {
    fontSize: fontSize_Small,
    color: COLORS.BLACK,
    padding: width * 0.02,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.DARK_BLUE,
    backgroundColor: COLORS.LIGHT_BLUE,
    width: "100%",
    borderTopLeftRadius: borderRadius_Main,
    borderTopRightRadius: borderRadius_Main,
  },
  list_scrollView: {
    width: "100%",
    backgroundColor: COLORS.LIGHT_BLUE,
    borderBottomLeftRadius: borderRadius_Main,
    borderBottomRightRadius: borderRadius_Main
  },
  list_viewDependentsInfo: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GREY_MAIN,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    padding: width * 0.02,
    margin: width * 0.02,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list_viewDependent: {
    flexDirection: 'row',
  },
  list_image: {
    borderRadius: width * 0.1,
    height: imageHeight * 0.7,
    width: imageWidth * 0.7,
  },
  list_textNameDep: {
    color: COLORS.BLACK,
    alignSelf: 'center',
    fontSize: fontSize_Normal,
    paddingLeft: width * 0.02
  },
  list_viewEditButton: {

  },
  list_pressableEdit: {

  },
  list_iconEdit: {

  }
});
