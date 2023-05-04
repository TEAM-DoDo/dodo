//Import ---------------------------------------------------
//  React
import { useState } from "react";
import Postcode from '@actbase/react-daum-postcode';
import API from "../api/API";

//  Native
import { View, StyleSheet, Pressable, TextInput, Modal } from "react-native";

//  Components
import PrimaryButton from "../components/psc/PrimaryButton";
import LogoIconImage from "../components/psc/LogoIconImage";
import InputField from "../components/psc/InputField";
import DatePicker from "../components/psc/DatePicker";
import SmallToggleSwitch from "../components/psc/SmallToggleSwitch";

//Definition Component ---------------------------------------------------
function GenerateIDScreen({route, navigation})
{
    const phoneNumber = route.params.phoneNumber;
    
    const [address, setAddress] = useState('');
    const [nickname, setNickname] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [currentSelectedGender, setCurrentSelectedGender] = useState('남');
    
    const [visible, setVisible] = useState(false); // 날짜 피커 모달 노출 여부
    const [isModal, setIsModal] = useState(false); // 주소 모달 노출 여부
    const koreaBirthFormat = dateFormat();
    
    function onPressDate(){ // 날짜 클릭 시
        setVisible(true); // 모달 open
    };

    const onCancel = () => { // 취소 시
        setVisible(false); // 모달 close
    };

    async function MoveToNextScreen()
    {
        const userInfo = {
            address,
            birth : koreaBirthFormat,
            phoneNumber,
            gender : currentSelectedGender,
            nickname,
        };
        console.log("post 호출됨");
        await API.post('/api/user', userInfo).then((response)=>console.log(response.data)).catch((error)=>console.log(error));
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

    function nicknameHandler(enteredText)
    {
        setNickname(enteredText);
    }

    const getAddressData = data => {
        let defaultAddress = ''; // 기본주소
        if (data.buildingName === 'N') {
          defaultAddress = data.apartment;
        } else {
          defaultAddress = data.buildingName;
        }
       
        //navigation.goBack();
        setIsModal(false);
        // route.params.onSelect({
        //   zone_code: data.zonecode,
        //   default_address: data.address + ' ' + defaultAddress,
        // });
        setAddress(data.address + ' ' + defaultAddress);
    };

    function AddressModalHandler()
    {
        setIsModal(true);
    }

    return (
        <View style={styles.rootScreen}>
            <LogoIconImage style={styles.logoIcon} />
            <View style={styles.textInputContainer}>
                <InputField placeholder={"닉네임"} maxLength={11} value={nickname} onChangeText={nicknameHandler} />
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
                <Modal visible={isModal}>
                    <Postcode
                        style={{ width: 320, height: 320 }}
                        jsOptions={{ animation: true, hideMapBtn: true }}
                        onSelected={getAddressData}
                    />
                </Modal>
                <Pressable onPress={AddressModalHandler} style={styles.datePress}>
                    <TextInput
                      pointerEvents="none"
                      style={styles.textInput}
                      placeholder={'주소'}
                      placeholderTextColor="grey"
                      underlineColorAndroid="transparent"
                      editable={false}
                      value={address}
                    />
                </Pressable>
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