import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Text,
    TextInput,
    Dimensions,
    ScrollView
} from 'react-native';

import BubbleBackground from '../components/BubbleBackground';

import { COLORS } from '../constants/constants';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'

import { useUser } from '../contexts/UserContext';

const { width, height } = Dimensions.get('window');

const fontSize_Small = width * 0.035;
const fontSize_Normal = width * 0.045;
const fontSize_Big = width * 0.055;
const fontSize_Gigantic = width * 0.065;

const borderRadius_Main = width * 0.03;

export default function Registration({ navigation }) {
    const [startAnimation, setStartAnimation] = useState(false)

    const [cpfValue, setCpfValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [idadeValue, setIdadeValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [telValue, setTelValue] = useState('');

    const [passwordValue, setPasswordValue] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [confPasswordValue, setConfPasswordValue] = useState('');
    const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

    useEffect(() => {
        setStartAnimation(true)
    }, [])

    return (
        <View style={styles.view1}>
            <BubbleBackground></BubbleBackground>
            <View style={styles.view2}>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>Cadastrar</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.viewInputs}>
                        <Text style={styles.titleInput}>CPF</Text>
                        <TextInput placeholder='Cpf' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='numeric' onChangeText={(text) => setCpfValue(text)} value={cpfValue} style={styles.input} />
                    </View>
                    <View style={styles.viewInputs}>
                        <Text style={styles.titleInput}>Nome</Text>
                        <TextInput placeholder='Nome' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='default' autoCapitalize='words' onChangeText={(text) => setNameValue(text)} value={nameValue} style={styles.input} />
                    </View>
                    <View style={styles.viewInputs}>
                        <Text style={styles.titleInput}>Idade</Text>
                        <TextInput placeholder='Idade' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='numeric' onChangeText={(text) => setIdadeValue(text)} value={idadeValue} style={styles.input} />
                    </View>
                    <View style={styles.viewInputs}>
                        <Text style={styles.titleInput}>Telefone</Text>
                        <TextInput placeholder='Telefone' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='numeric' onChangeText={(text) => setTelValue(text)} value={telValue} style={styles.input} />
                    </View>
                    <View style={styles.viewInputs}>
                        <Text style={styles.titleInput}>E-mail</Text>
                        <TextInput placeholder='E-mail' placeholderTextColor={COLORS.GREY_MAIN} keyboardType='email-address' onChangeText={(text) => setEmailValue(text)} value={emailValue} style={styles.input} />
                    </View>
                    <View style={styles.viewInputs}>
                        <Text style={styles.titleInput}>Senha</Text>
                        <View style={styles.viewVisibility}>
                            <Pressable onPress={isPasswordVisible ? () => setIsPasswordVisible(false) : () => setIsPasswordVisible(true)} style={styles.pressableVisible}>
                                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} color='#33A1DE' style={styles.iconVisible} size={height * 0.030} />
                            </Pressable>
                        </View>
                        <TextInput placeholder='Senha' placeholderTextColor={COLORS.GREY_MAIN} secureTextEntry={isPasswordVisible ? false : true} onChangeText={(text) => setPasswordValue(text)} value={passwordValue} style={styles.input} />
                    </View>
                    <View style={styles.viewInputs}>
                        <Text style={styles.titleInput}>Confirmar senha</Text>
                        <View style={styles.viewVisibility}>
                            <Pressable onPress={isConfPasswordVisible ? () => setIsConfPasswordVisible(false) : () => setIsConfPasswordVisible(true)} style={styles.pressableVisible}>
                                <FontAwesomeIcon icon={isConfPasswordVisible ? faEye : faEyeSlash} color='#33A1DE' style={styles.iconVisible} size={height * 0.030} />
                            </Pressable>
                        </View>
                        <TextInput placeholder='Confirmar senha' placeholderTextColor={COLORS.GREY_MAIN} secureTextEntry={isConfPasswordVisible ? false : true} onChangeText={(text) => setConfPasswordValue(text)} value={confPasswordValue} style={styles.input} />
                    </View>
                </ScrollView>
                <View style={styles.viewButton}>
                    <Pressable style={styles.pressable}>
                        <Text style={styles.titleButton}>Confirmar</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: COLORS.BLUE_MAIN,
        borderRadius: borderRadius_Main,
        borderWidth: 1,
        color: COLORS.GREY_MAIN,
        fontSize: fontSize_Small,
        height: height * 0.06,
        paddingLeft: '4%',
        marginBottom: '5%',
        backgroundColor: COLORS.WHITE,
        width: '80%',
    },
    pressable: {
        backgroundColor: COLORS.GREEN_MAIN,
        borderRadius: borderRadius_Main,
        height: height * 0.06,
        justifyContent: 'center',
        width: '100%',
    },
    scrollView: {
        marginBottom: '5%',
        marginTop: '5%',
        width: '70%'
    },
    title: {
        color: COLORS.BLUE_MAIN,
        fontSize: fontSize_Big,
        fontWeight: '600',
        textAlign: 'center'
    },
    titleButton: {
        color: COLORS.WHITE,
        fontSize: fontSize_Big,
        fontWeight: '600',
        textAlign: 'center',
    },
    titleInput: {
        color: COLORS.BLUE_MAIN,
        fontSize: fontSize_Normal,
        fontWeight: 'thin',
        marginTop: '3%',
        marginBottom: '3%',
        width: '80%',
    },
    view1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.WHITE
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
    viewInputs: {
        alignItems: 'center',
        width: '100%',
    },
    viewVisibility: {
        alignItems: 'flex-end',
        width: '80%',
    },
    pressableVisible: {
        height: height * 0.06,
        paddingRight: '5%',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
    },
    viewTitle: {
        borderBottomColor: COLORS.GREY_MAIN,
        borderBottomWidth: 1,
        height: '12%',
        justifyContent: 'center',
        width: '70%',
    },
    viewZloBandStyle: {
        alignItems: "center"
    },
    titleNfcNear: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.BLACK
    },
    zloBandStyle: {
        marginBottom: 20,
        width: 300,
        height: 300,
    }
});