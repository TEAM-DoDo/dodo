//Import ---------------------------------------------------
//  React
import { useState } from "react";

//  Native
import { View, StyleSheet } from "react-native";

//  Components
import PrimaryButton from "../components/PrimaryButton";
import LogoIconImage from "../components/LogoIconImage";
import InputField from "../components/InputField";

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
        navigation.navigate('GenerateIDScreen', //유저 가입여부 확인 로직이 없어 일단은 회원가입 창으로 이동하게 함
        {
            phoneNumber, //가입 페이지로 이동 시 핸드폰 번호를 두번 입력하지 않도록 데이터를 넘겨줌
        });
    }

    return (
        <View style={styles.rootScreen}>
            <LogoIconImage style={styles.logoIcon} />
            <View style={styles.textInputContainer}>
                <InputField placeholder={"전화번호"} maxLength={11} onChangeText={PhoneNumberInputHandler} />
                <InputField placeholder={"인증번호"} maxLength={4} onChangeText={CheckNumberInputHandler} />
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
        marginBottom : 100,
    },
    textInputContainer : {
        width : '100%',
        marginBottom : '20%',
    },
});