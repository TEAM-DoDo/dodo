//Import ---------------------------------------------------
//  React
import { useState } from "react";

//  Native
import { View, StyleSheet, Pressable, TextInput } from "react-native";

//  Components
import PrimaryButton from "../components/PrimaryButton";
import LogoIconImage from "../components/LogoIconImage";
import InputField from "../components/InputField";
import DatePicker from "../components/DatePicker";
import SmallToggleSwitch from "../components/SmallToggleSwitch";

//Definition Component ---------------------------------------------------
function GenerateIDScreen({route, navigation})
{
    const [birthdate, setBirthdate] = useState(new Date());
    const [visible, setVisible] = useState(false); // 모달 노출 여부
    const [currentSelectedGender, setCurrentSelectedGender] = useState('남');
    const koreaBirthFormat = dateFormat();
    const phoneNumber = route.params.phoneNumber;
    
    function onPressDate(){ // 날짜 클릭 시
        setVisible(true); // 모달 open
    };

    const onCancel = () => { // 취소 시
        setVisible(false); // 모달 close
    };

    function MoveToNextScreen()
    {
        const userInfo = {
            phoneNumber,
            birthdate : koreaBirthFormat,
            gender : currentSelectedGender,
        };
        navigation.navigate('SelectCategoryScreen', {userInfo});
    }

    function onPressDatePickerConfirm(selectedDate)
    {
        setBirthdate(selectedDate);
    }

    function dateFormat()
    {
        if(birthdate){
            const year = birthdate.getFullYear();
            const month = birthdate.getMonth() + 1;
            const date = birthdate.getDate();
            const delimeter = '-';
            const finalDate = [year, month, date].join(delimeter);
            return finalDate;
        }
        return '';
    }
    
    function SelectGenderHandler(genderID)
    {
        if(genderID != currentSelectedGender)
        {
            setCurrentSelectedGender(genderID);
        }
    }

    return (
        <View style={styles.rootScreen}>
            <LogoIconImage style={styles.logoIcon} />
            <View style={styles.textInputContainer}>
                <InputField placeholder={"닉네임"} maxLength={11} />
                <View style={styles.pickerContainer}>
                    <Pressable onPress={onPressDate} style={styles.datePress}>
                        <TextInput
                          pointerEvents="none"
                          style={styles.textInput}
                          placeholder={'생년월일'}
                          placeholderTextColor="grey"
                          underlineColorAndroid="transparent"
                          editable={false}
                          value={koreaBirthFormat}
                        />
                    </Pressable>
                    <DatePicker dataMoveToScreen={onPressDatePickerConfirm} visible={visible} onCancel={onCancel} />
                    <View style={styles.genderButtonsContainer}>
                        <SmallToggleSwitch handler={SelectGenderHandler} selectedGender={currentSelectedGender}>남</SmallToggleSwitch>
                        <SmallToggleSwitch handler={SelectGenderHandler} selectedGender={currentSelectedGender}>여</SmallToggleSwitch>
                    </View>
                </View>
                <InputField placeholder={"거주지"} maxLength={4} />
            </View>
            <PrimaryButton onPress={MoveToNextScreen}>다음으로</PrimaryButton>
        </View>
    );
}

export default GenerateIDScreen;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    rootScreen : {
        flex : 1,
        alignItems : 'center',
    },
    logoIcon : {
        marginTop : '10%',
        marginBottom : 30,
    },
    textInputContainer : {
        width : '100%',
        marginBottom : '10%',
    },
    pickerContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
        width : '80%',
        alignSelf : 'center',
        marginBottom : 20,
    },
    datePress : {
        width : '60%',
        marginRight : 5,
    },
    textInput : {
        paddingVertical : 17,
        borderRadius : 16,
        paddingHorizontal : 16,
        borderColor : 'grey',
        borderWidth : 1,
        fontSize : 23,
        fontFamily : 'NanumGothic-Bold',
    },
    genderButtonsContainer : {
        width : '40%',
        flexDirection : "row",
    },
});