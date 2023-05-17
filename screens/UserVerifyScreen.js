//Import ---------------------------------------------------
//  React
import { useState } from "react";

//  Native
import { View, StyleSheet } from "react-native";

//  Components
import PrimaryButton from "../components/psc/PrimaryButton";
import LogoIconImage from "../components/psc/LogoIconImage";
import InputField from "../components/psc/InputField";
import API from "../api/API";
import { HttpStatusCode } from "axios";

//Definition Component ---------------------------------------------------
function UserVerifyScreen({navigation})
{
    const [phoneNumber, setPhoneNumber] = useState('');
    const [checkNumber, setCheckNumber] = useState('');

    function PhoneNumberInputHandler(enteredNumber)
    {
        setPhoneNumber(enteredNumber.toString());
    }

    function CheckNumberInputHandler(enteredNumber)
    {
        setCheckNumber(enteredNumber.toString());
    }

    function CheckUserExistInDB()
    {
        //전화번호를 통해 이미 가입된 유저인지 신규유저인지 판별하고 navigate함수 안 이동할 screen의 이름 분기 처리 해야함.
    }

    function MoveToNextScreen()
    {
        //이곳에 인증번호 확인 로직 필요

        //유저 가입 확인 로직 추가
        API.get("/api/user/check",{params:{phoneNumber:phoneNumber}}).then((response) => {
            console.log(response.data);
            //제대로 된 응답 안에는 토큰이 포함됨
            navigation.navigate('BottomTabNavigatorScreen');
        }).catch((response) => {
            console.log(response);
            navigation.navigate('GenerateIDScreen',{
                phoneNumber, //가입 페이지로 이동 시 핸드폰 번호를 두번 입력하지 않도록 데이터를 넘겨줌
            });
        });

    }

    return (
        <View style={styles.rootScreen}>
            <LogoIconImage style={styles.logoIcon} />
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
    rootScreen : {
        flex : 1,
        alignItems : 'center',
    },
    logoIcon : {
        marginTop : '20%',
        marginBottom : 50,
    },
    textInputContainer : {
        width : '100%',
        marginBottom : '20%',
    },
});