import React, {useState, useEffect} from 'react';
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
import {COLORS} from '../../constants/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {useUser} from '../../contexts/UserContext';
import {
  attCurrentResponsible,
  deleteDependentRequest,
  findDependentByCpfDepRequest,
} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';

const {width, height} = Dimensions.get('window');
const imageHeight = height * 0.07;
const imageWidth = width * 0.15;
const fontSize_Small = width * 0.035;
const fontSize_Normal = width * 0.045;
const fontSize_Big = width * 0.055;
const fontSize_Gigantic = width * 0.065;
const borderRadius_Main = width * 0.03;

export default function Home({navigation}) {
  const {
    authToken,
    setIsCreate,
    setCurrentRes,
    idRes,
    setIdRes,
    nomeRes,
    setNomeRes,
    emergePhone,
    setEmergePhone,
    emailRes,
  } = useUser();

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
  const textStyle = {color: COLORS.DARK_BLUE, fontWeight: 'bold'};

  const findCurrentResponsible = async () => {
    const response = await attCurrentResponsible(emailRes, authToken);

    if (response?.contentResponse != null && response.isOk) {
      setCurrentRes(response.contentResponse);
      setIsCreate(true);
      setIdRes(response.contentResponse.cpfRes);
      setNomeRes(response.contentResponse.nomeRes);
      setEmergePhone(response.contentResponse.contato1Res);
    }
  };

  const searchData = async () => {
    try {
      const response = await findDependentByCpfDepRequest(idRes, authToken);

      if (response.contentResponse.content.length > 0) {
        setUserData(response.contentResponse.content);
        setListData(response.contentResponse.content);
        setUserDataToBeShown(response.contentResponse.content[0]);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Erro: ', error);
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

    if (!isList) {
      if (indices[0] == undefined) return setValueToShowData(0);
      else return setValueToShowData(indices[0]);
    } else {
      if (indices[0] == undefined) return setValuesToShowData([]);
      else return setValuesToShowData(indices);
    }
  };

  const handlePress = async (type, id = null) => {
    if (type === 'register') {
      setCurrentRes({});
      setIsCreate(true);
    } else if (type === 'change') {
      setCurrentRes(userDataToBeShown);
      setIsCreate(false);
    } else if (type === 'delete') {
      const response = await deleteDependentRequest(
        userDataToBeShown.cpfDep,
        authToken,
      );

      if (response.contentResponse != null) {
        searchData();
      }

      setIdRes(idRes);
      setNomeRes(nomeRes);
      setEmergePhone(emergePhone);
      setIsList(false);

      return;
    } else {
      setCurrentRes(userData[id]);
      setIsCreate(false);
    }
    setIdRes(idRes);
    setNomeRes(nomeRes);
    setEmergePhone(emergePhone);
    setIsList(false);

    navigation.navigate('RegisterOrChangeUser');
  };

  const changeDependent = type => {
    if (!changeDependentColor) {
      setChangeDependentColor(true);
    } else {
      setChangeDependentColor(false);
    }

    if (type === 'forward') {
      setTimeout(() => {
        setIsPressedForward(false);
      }, 300);
    } else {
      setTimeout(() => {
        setIsPressedBackward(false);
      }, 300);
    }

    setTextoInput('');

    if (type === 'forward') {
      setValueToShowData(
        (valueToShowData + 1) % (!userData ? 0 : userData.length),
      );
      setIsPressedForward(true);
    } else {
      setValueToShowData(
        (valueToShowData - 1 + userData.length) %
          (!userData ? 0 : userData.length),
      );
      setIsPressedBackward(true);
    }
  };

  const changeDependentNavigation = () => {
    setTextoInput('');
    if (!isList) {
      setListData(userData);
      setIsList(true);
    } else {
      setValueToShowData(0);
      setIsList(false);
    }
  };

  useEffect(() => {
    searchData();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      searchData();
      findCurrentResponsible();
    });
  }, [navigation]);

  useEffect(() => {
    if (valuesToShowData.length >= 0 && (!userData ? 0 : userData.length) > 0) {
      setListData(valuesToShowData.map(indice => userData[indice]));
      setUserDataToBeShown(userData[valueToShowData]);
    }
  }, [valueToShowData, valuesToShowData, userData]);

  useEffect(() => {
    search(textoInput);
  }, [textoInput]);

  return (
    <View style={styles.mainView}>
      <BubbleBackground />
      <View>
        <View
          style={[
            styles.viewWelcome,
            {
              bottom: !userData ? height * 0.2 : height * 0.025,
            },
          ]}>
          <View style={styles.viewWelcomeTexts}>
            <Text style={styles.textHello}>Olá,</Text>
            <Text style={styles.textName}>{nomeRes}</Text>
          </View>
        </View>

        {!userData ? (
          <View style={styles.viewNoDependents}>
            <Pressable
              onPress={() => handlePress('register')}
              style={styles.pressableNoDependents}>
              <Text style={styles.textDependentsButton}>
                Cadastrar dependente
              </Text>
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
                    style={[
                      styles.searchInput,
                      {borderColor: COLORS.GREY_MAIN},
                    ]}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    color={COLORS.GREY_MAIN}
                    style={styles.searchIcon}
                    size={width * 0.06}
                  />
                </View>
                <View style={styles.viewSearchRightView}>
                  <Pressable
                    style={[
                      styles.buttonChangeDependentNavigation,
                      {
                        backgroundColor: isList
                          ? COLORS.GREY_MAIN
                          : COLORS.BLACK,
                      },
                    ]}
                    onPress={() => changeDependentNavigation()}>
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
            {isList ? (
              <View style={styles.list_centralizationView}>
                <View style={styles.list_viewDependentsInfoBackground}>
                  <Text style={styles.list_dependentsTotalText}>
                    Você é responsável por:{' '}
                    <Text style={{color: COLORS.RED_MAIN, fontWeight: 'bold'}}>
                      {!userData ? 0 : userData.length}
                    </Text>{' '}
                    dependentes.
                  </Text>
                  <ScrollView
                    style={styles.list_scrollView}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {listData.map((dependents, index) => (
                      <View key={index} style={styles.list_viewDependentsInfo}>
                        <View style={styles.list_viewDependent}>
                          <Image
                            style={styles.list_image}
                            source={require('../../assets/imgs/IconePerfilAnonimo.jpg')}
                          />
                          <Text style={styles.list_textNameDep}>
                            {dependents.nomeDep}
                          </Text>
                        </View>
                        <View style={styles.list_viewEditButton}>
                          <Pressable
                            onPress={() => handlePress('find', index)}
                            style={styles.list_pressableEdit}>
                            <FontAwesomeIcon
                              icon={faEdit}
                              color={COLORS.DARK_BLUE}
                              style={styles.list_iconEdit}
                              size={height * 0.03}
                            />
                          </Pressable>
                          <Pressable
                            onPress={() => handlePress('delete')}
                            style={styles.list_pressableDelete}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              color={COLORS.DARK_BLUE}
                              style={styles.list_iconDelete}
                              size={height * 0.03}
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
                  onPress={() => changeDependent('backward')}
                  style={styles.arrows}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    color={
                      isPressedBackward ? COLORS.DARK_BLUE : COLORS.GREY_MAIN
                    }
                    style={styles.arrowsIcon}
                    size={width * (isPressedBackward ? 0.1 : 0.09)}
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
                        {userDataToBeShown?.nomeDep}
                      </Text>
                      <Text style={styles.text}>
                        ID: {userDataToBeShown?.cpfDep}
                      </Text>
                    </View>
                    <Image
                      style={styles.image}
                      source={require('../../assets/imgs/IconePerfilAnonimo.jpg')}
                    />
                  </View>
                  <View style={styles.viewDependentInfo}>
                    <View style={styles.infoDep}>
                      <Text style={[styles.textInfoDep, styles.spaceBottom]}>
                        <Text style={textStyle}>Idade:</Text>{' '}
                        {userDataToBeShown?.idadeDep}
                      </Text>
                      <Text style={[styles.textInfoDep, styles.spaceTopBottom]}>
                        <Text style={textStyle}>Gênero:</Text>{' '}
                        {userDataToBeShown?.generoDep}
                      </Text>
                      <Text style={[styles.textInfoDep, styles.spaceTop]}>
                        <Text style={textStyle}>Tipo Sanguíneo:</Text>{' '}
                        {userDataToBeShown?.tipoSanguineo}
                      </Text>
                    </View>
                    <View style={styles.viewEditButton}>
                      <Pressable
                        onPress={() => handlePress('change')}
                        style={styles.pressableEdit}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          color={COLORS.WHITE}
                          style={styles.iconEdit}
                          size={height * 0.05}
                        />
                      </Pressable>
                      <Pressable
                        onPress={() => handlePress('delete')}
                        style={styles.pressableDelete}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          color={COLORS.WHITE}
                          style={styles.iconDelete}
                          size={height * 0.05}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() => changeDependent('forward')}
                  style={styles.arrows}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    color={
                      isPressedForward ? COLORS.DARK_BLUE : COLORS.GREY_MAIN
                    }
                    style={styles.arrowsIcon}
                    size={isPressedForward ? width * 0.1 : width * 0.09}
                  />
                </Pressable>
              </View>
            )}
            <View style={styles.viewNewDependent}>
              <Pressable
                onPress={() => handlePress('register')}
                style={styles.pressableNewDependent}>
                <Text style={styles.textDependentsButton}>
                  Cadastrar dependente
                </Text>
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
    position: 'absolute',
    right: width * 0.05,
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
    alignItems: 'center',
  },
  viewSearch: {
    flexDirection: 'row',
    marginBottom: width * 0.02,
    width: '80%',
  },
  viewSearchLeftView: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSearchRightView: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChangeDependentNavigation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: width * 0.12,
    borderRadius: borderRadius_Main,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
  },
  viewArrows: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  arrows: {
    alignItems: 'center',
    width: '10%',
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
    height: '30%',
  },
  viewDependentInfoBackground: {
    borderColor: COLORS.WHITE,
    borderRadius: borderRadius_Main,
    borderWidth: 1,
    padding: width * 0.02,
    width: '80%',
    height: height * 0.4,
  },
  viewDependentInfo: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '70%',
  },
  infoDep: {
    backgroundColor: COLORS.LIGHT_GREY,
    borderBottomStartRadius: borderRadius_Main,
    padding: width * 0.03,
    justifyContent: 'center',
    width: '60%',
    height: '100%',
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: width * 0.4,
    width: '40%',
    height: '100%',
  },
  textInfoDep: {
    fontWeight: 'thin',
    color: COLORS.BLACK,
    fontSize: fontSize_Small,
  },
  pressableDelete: {},
  list_centralizationView: {
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: width * 0.02,
  },
  list_dependentsTotalText: {
    fontSize: fontSize_Small,
    color: COLORS.BLACK,
    padding: width * 0.02,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.DARK_BLUE,
    backgroundColor: COLORS.LIGHT_BLUE,
    width: '100%',
    borderTopLeftRadius: borderRadius_Main,
    borderTopRightRadius: borderRadius_Main,
  },
  list_scrollView: {
    width: '100%',
    backgroundColor: COLORS.LIGHT_BLUE,
    borderBottomLeftRadius: borderRadius_Main,
    borderBottomRightRadius: borderRadius_Main,
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
    justifyContent: 'space-between',
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
    paddingLeft: width * 0.02,
  },
  list_viewEditButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list_pressableEdit: {
    marginRight: 10,
  },
  list_pressableDelete: {
    marginRight: 5,
  },
  list_iconEdit: {},
});
