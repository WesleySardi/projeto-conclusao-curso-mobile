import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Text,
    TextInput,
    Dimensions
} from 'react-native';

import { COLORS } from '../constants/constants'

import getFunctions from '../functions/getFunctions'

const { width, height } = Dimensions.get('window');

export default function CodeCheck() {
    const [smsValue, setSmsValue] = useState();

    const [smsData] = useState({
        'sendDate': '',
        'cpfDep': '',
        'phoneUser': ''
    })

    useEffect(() => {
        fillData();
    }, []);

    const fillData = () => {
        smsData.sendDate = getFunctions.generateTimestamp()
        smsData.phoneUser = ''; // Adicionar o telefone que será enviado o SMS
        smsData.cpfDep = '';    // Adicionar o CPF do RESPONSÁVEL
        smsHandlerFunction()
    }

    const smsHandlerFunction = async () => {
        try {
            const response = await axios.post('http://IPv4:8080/api/smshandler/', smsData);
            // if (response) return alert('SMS reenviado com sucesso!')
        } catch (error) {
            // console.error(error);
            // alert('Erro ao reenviar SMS!')
        }
    }

    const smsVerifyFunction = async (smsCode) => {
        try {
            const response = await axios.get(`http://IPv4:8080/api/smshandler/verifySmsCode?smsCode=${smsCode}&returnDate=${getFunctions.generateTimestamp()}&cpfDep=${smsData.cpfDep}`);
            // if (response) return navigate('/dependentData')
        } catch (error) {
            // console.error(error);
            // alert('Valor inválido. Tente novamente ou reenvie o código SMS caso necessário.')
        }
    }

    return (
        <View style={styles.view1}>
            <View style={styles.view2}>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>Insira o código</Text>
                </View>
                <View style={styles.view3}>
                    <View>
                        <TextInput placeholder='Código SMS' keyboardType='numeric' onChangeText={(text) => setSmsValue(text)} value={smsValue} style={styles.input} />
                        <View style={styles.viewSendCodeAgain}>
                            <Pressable onPress={fillData} style={styles.pressableSendCodeAgain}>
                                <Text style={styles.titleSendCodeAgain}>Reenviar código</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.viewButton}>
                    <Pressable onPress={() => {
                        if (smsValue.length == 0) {
                            // alert('Digite o código enviado ao seu celular.')
                        } else {
                            if (smsValue.length >= 7 && smsValue.length < 9) {
                                smsVerifyFunction(smsValue)
                            } else {
                                // alert('O Você deve digitar um código de 7 ou 8 números.')
                            }
                        }
                    }} style={styles.pressable}>
                        <Text style={styles.titleButton}>Confirmar</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.WHITE,
        borderColor: COLORS.BLUE_MAIN,
        borderRadius: 10,
        borderWidth: 1,
        color: COLORS.GREY_MAIN,
        fontSize: width * 0.045,
        height: height * 0.06,
        marginBottom: '5%',
        marginTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        textAlign: 'left'
    },
    pressable: {
        backgroundColor: COLORS.GREEN_MAIN,
        borderRadius: 10,
        color: COLORS.GREY_MAIN,
        padding: width * 0.02,
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        color: COLORS.BLUE_MAIN,
        fontSize: width * 0.06,
        fontWeight: '600'
    },
    titleButton: {
        color: COLORS.WHITE,
        fontSize: width * 0.06,
        fontWeight: '600',
        textAlign: 'center'
    },
    titleSendCodeAgain: {
        color: COLORS.BLUE_MAIN,
        fontSize: width * 0.04,
        fontWeight: 'bold',
        margin: 4,
        textAlign: 'right'
    },
    view1: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    view2: {
        alignItems: 'center',
        width: '60%'
    },
    view3: {
        marginBottom: height * 0.03,
        marginTop: height * 0.03,
        width: '100%'
    },
    viewButton: {
        width: '100%'
    },
    viewTitle: {
        alignItems: 'center',
        width: '100%'
    }
});

