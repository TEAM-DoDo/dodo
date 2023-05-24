//Import ---------------------------------------------------
//  React
import { useState,useEffect } from "react";

//  Native
import { View, StyleSheet,Pressable,Keyboard,Text} from "react-native";

//  Components
import PrimaryButton from "../components/psc/PrimaryButton";
import LogoIconImage from "../components/psc/LogoIconImage";
import InputField from "../components/psc/InputField";
import API from "../api/API";
import { HttpStatusCode } from "axios";
import RNExitApp from "react-native-exit-app";
// Plugin
import * as Permissions from 'expo-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addAccessToken,addRefreshToken } from "../store/jwt-store";
//Definition Component ---------------------------------------------------
function UserVerifyScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [checkNumber, setCheckNumber] = useState('');
    const accessToken = useSelector((state) => state.jwt.access_token);
    const refreshToken = useSelector((state) => state.jwt.refresh_token);
    // console.log(accessToken);
    // console.log(refreshToken);

    const dispatch = useDispatch();
    //Redux에서 토큰 
    const sendVerificationCode = async () => {
        try {
            console.log("this is sendVerificationCode");
            //await auth().signInWithPhoneNumber(phoneNumber);
            // 인증 코드를 전송하고 결과를 확인
            // 필요에 따라 사용자 인터페이스를 업데이트하거나 다음 단계로 이동
        } catch (error) {
            console.error(error);
        }
    };

    function PhoneNumberInputHandler(enteredNumber) {
        setPhoneNumber(enteredNumber.toString());
    }

    function CheckNumberInputHandler(enteredNumber) {
        setCheckNumber(enteredNumber.toString());
    }

    function CheckUserExistInDB() {
        //전화번호를 통해 이미 가입된 유저인지 신규유저인지 판별하고 navigate함수 안 이동할 screen의 이름 분기 처리 해야함.
    }
    function MoveToNextScreen() {
        // navigation.navigate('GenerateIDScreen', //유저 가입여부 확인 로직이 없어 일단은 회원가입 창으로 이동하게 함
        //     {
        //         phoneNumber, //가입 페이지로 이동 시 핸드폰 번호를 두번 입력하지 않도록 데이터를 넘겨줌
        //     });
        // return;
        //유저 가입 확인 로직 추가
        const userInfo = {
            address : "",
            birth : "",
            phoneNumber,
            gender : 1,
            nickname : "",
        };
        API.post("/api/users/check",{phoneNumber : phoneNumber,certNumber:"14632"}).then((response) => {
            //제대로 된 응답 안에는 토큰이 포함됨
            //토큰을 내부 저장소에 저장
            console.log(response.data);
            dispatch(addAccessToken({ access_token : `${response.data.accessToken}`}));
            dispatch(addRefreshToken({ refresh_token : `${response.data.refreshToken}`}));
            navigation.navigate('BottomTabNavigatorScreen',{userInfo});
        }).catch((response) => {
            console.log(response);
            navigation.navigate('GenerateIDScreen',{
                phoneNumber, //가입 페이지로 이동 시 핸드폰 번호를 두번 입력하지 않도록 데이터를 넘겨줌
            });
        });

    }
    const dismissKeyboard = () => {
        console.log("dismiss keyboard");
        Keyboard.dismiss();
    };
    return (
        <View style={styles.rootScreen}>
            <LogoIconImage style={styles.logoIcon} />
            <View style={styles.buttonContainer}>
                <Pressable onPress={sendVerificationCode} style={styles.button}>
                    <Text style={styles.buttonText}>인증번호발급</Text>
                </Pressable>
            </View>
            <View style={styles.textInputContainer}>
                <InputField placeholder={"전화번호"} maxLength={11} onChangeText={PhoneNumberInputHandler} keyboardType='number-pad' />
                <InputField placeholder={"인증번호"} maxLength={4} onChangeText={CheckNumberInputHandler} keyboardType='number-pad' />
            </View>
            <PrimaryButton onPress={MoveToNextScreen}>다음으로</PrimaryButton>
        </View>
    );
}

export default UserVerifyScreen;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        alignItems: 'center',
    },
    logoIcon: {
        marginTop: '20%',
        marginBottom: 50,
    },
    textInputContainer: {
        width: '100%',
        marginBottom: '20%',
    },
    buttonContainer: {
        alignItems: 'flex-end',
        width: '78%',
        marginBottom: 1,
    
    },
    buttonText: {
        color: 'white',
        textDecorationLine: 'underline',
    },
    button: {
        alignItems: 'flex-end',
        backgroundColor: '#E30A8B',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
});