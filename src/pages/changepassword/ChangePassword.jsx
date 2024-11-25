import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useUser} from '../../contexts/UserContext';
import {COLORS} from '../../constants/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {updatePasswordRequest} from '../../services/services';
import BubbleBackground from '../../components/backgroundStyle/BubbleBackground';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

export default function ChangePassword({navigation}) {
  const {authToken} = useUser();
  const [textoNovaSenhaInput, setTextoNovaSenhaInput] = useState();
  const [textoRepSenhaInput, setTextoRepSenhaInput] = useState();
  const [isNovaSenhaVisible, setIsNovaSenhaVisible] = useState(false);
  const [isRepSenhaVisible, setIsRepSenhaVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeData = async () => {
    if (textoNovaSenhaInput != textoRepSenhaInput) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Info!',
        text2: 'Senhas diferentes!',
        visibilityTime: 3000,
        autoHide: true,
      });
    } else {
      setLoading(true);
      const response = await updatePasswordRequest(
        authToken,
        textoRepSenhaInput,
      );

      if (response != null) {
        setLoading(false);
        navigation.navigate('Home');
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.view1}>
      <BubbleBackground />
      <View style={styles.view2}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Alterar Senha</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.view3}>
            <Text style={styles.titleInput}>Nova senha</Text>
            <View style={styles.viewInputs}>
              <Pressable
                onPress={
                  isNovaSenhaVisible
                    ? () => setIsNovaSenhaVisible(false)
                    : () => setIsNovaSenhaVisible(true)
                }
                style={styles.pressableVisible}>
                <FontAwesomeIcon
                  icon={isNovaSenhaVisible ? faEye : faEyeSlash}
                  color={COLORS.BLUE_MAIN}
                  style={styles.iconVisible}
                  size={height * 0.03}
                />
              </Pressable>
              <TextInput
                placeholder="Digite sua nova senha"
                placeholderTextColor={COLORS.GREY_MAIN}
                secureTextEntry={isNovaSenhaVisible ? false : true}
                onChangeText={text => setTextoNovaSenhaInput(text)}
                value={textoNovaSenhaInput}
                style={styles.input}
              />
            </View>
            <Text style={styles.titleInput}>Confirme a nova senha</Text>
            <View style={styles.viewInputs}>
              <Pressable
                onPress={
                  isRepSenhaVisible
                    ? () => setIsRepSenhaVisible(false)
                    : () => setIsRepSenhaVisible(true)
                }
                style={styles.pressableVisible}>
                <FontAwesomeIcon
                  icon={isRepSenhaVisible ? faEye : faEyeSlash}
                  color={COLORS.BLUE_MAIN}
                  style={styles.iconVisible}
                  size={height * 0.03}
                />
              </Pressable>
              <TextInput
                placeholder="Confirme a nova senha"
                placeholderTextColor={COLORS.GREY_MAIN}
                secureTextEntry={isRepSenhaVisible ? false : true}
                onChangeText={text => setTextoRepSenhaInput(text)}
                value={textoRepSenhaInput}
                style={styles.input}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.viewButton}>
          <Pressable
            disabled={loading}
            onPress={() => changeData()}
            style={() => styles.pressable(loading)}>
            <Text style={styles.titleButton}>
              {loading ? 'Carregando...' : 'Confirmar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BLUE_MAIN,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.BLACK,
    fontSize: width * 0.045,
    height: height * 0.06,
    marginBottom: '6%',
    paddingLeft: '5%',
    paddingRight: '5%',
    width: '100%',
  },
  pressable: loading => ({
    backgroundColor: loading ? COLORS.GREY_MAIN : COLORS.GREEN_MAIN,
    borderRadius: 10,
    color: COLORS.GREY_MAIN,
    padding: width * 0.02,
    justifyContent: 'center',
    width: '100%',
  }),
  scrollView: {
    marginBottom: '8%',
    marginTop: '5%',
    width: '70%',
  },
  title: {
    color: COLORS.BLUE_MAIN,
    fontSize: height * 0.029,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleButton: {
    color: COLORS.WHITE,
    fontSize: height * 0.029,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleInput: {
    color: COLORS.BLUE_MAIN,
    fontSize: height * 0.023,
    fontWeight: 'thin',
    marginTop: '3%',
    marginBottom: '3%',
    width: '80%',
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
  },
  view2: {
    alignItems: 'center',
    height: '65%',
  },
  viewButton: {
    alignItems: 'center',
    borderTopColor: COLORS.GREY_MAIN,
    borderTopWidth: 1,
    height: '18%',
    justifyContent: 'center',
    width: '70%',
  },
  viewInput: {
    alignItems: 'center',
    width: '100%',
  },
  viewTitle: {
    borderBottomColor: COLORS.GREY_MAIN,
    borderBottomWidth: 1,
    height: '12%',
    justifyContent: 'center',
    width: '70%',
  },
  viewInputs: {
    alignItems: 'flex-end',
    width: '100%',
  },
  pressableVisible: {
    height: height * 0.06,
    paddingRight: '5%',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
  },
});
