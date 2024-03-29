//Import ---------------------------------------------------
//  React
import { useState } from "react";
import Postcode from '@actbase/react-daum-postcode';
import API from "../api/API";

//  Native
import { View, StyleSheet, Pressable, TextInput, Modal,Dimensions,Keyboard } from "react-native";

//  Components
import PrimaryButton from "../components/psc/PrimaryButton";
import LogoIconImage from "../components/psc/LogoIconImage";
import InputField from "../components/psc/InputField";
import DatePicker from "../components/psc/DatePicker";
import SmallToggleSwitch from "../components/psc/SmallToggleSwitch";
import AddressModal from "../components/hgp/AddressModal";

//Definition Component ---------------------------------------------------
function GenerateIDScreen({route, navigation})
{
    const [address, setAddress] = useState('');
    const [nickname, setNickname] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [currentSelectedGender, setCurrentSelectedGender] = useState("남");
    
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
            id : route.params.id,
            address : address,
            dateOfBirth : koreaBirthFormat,
            phoneNumber : route.params.phoneNumber,
            gender : currentSelectedGender,
            nickname : nickname,
        };
        console.log("post 호출됨");
        //await API.post('/api/users', userInfo).then((response)=>console.log(response.data)).catch((error)=>console.log(error));
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

    const AddressModalHandler = () =>
    {
        setIsModal(true);
    }
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return (
        <Pressable style={styles.rootScreen} onPress={dismissKeyboard}>
            <LogoIconImage/>
            
            <View style={styles.comp_component}>
                <InputField placeholder={"닉네임"} maxLength={11} value={nickname} onChangeText={nicknameHandler} />
                <View style={styles.pickerContainer}>
                    <Pressable onPress={onPressDate} style={styles.datePress}>
                        <TextInput
                          width="100%"
                          pointerEvents="none"
                          style={styles.textInput}
                          placeholder={'생년월일'}
                          placeholderTextColor="grey"
                          underlineColorAndroid="transparent"
                          editable={false}
                          value={koreaBirthFormat}
                        />
                    </Pressable>
                    <View style={styles.genderButtonsContainer}>
                        <SmallToggleSwitch
                            handler={SelectGenderHandler}
                            selectedGender={currentSelectedGender}>
                                남
                                </SmallToggleSwitch>

                        <SmallToggleSwitch 
                            handler={SelectGenderHandler}
                            selectedGender={currentSelectedGender}>
                                여
                                </SmallToggleSwitch>
                    </View>
                </View>
                <Pressable onPress={AddressModalHandler} style={styles.address_container}>
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
                <PrimaryButton onPress={MoveToNextScreen}>다음으로</PrimaryButton>
            </View>
            <View height="5%"/>
            <AddressModal isVisible={isModal} onAdressSelected={getAddressData} onCancel={()=>{setIsModal(false)}}/>
            <DatePicker dataMoveToScreen={onPressDatePickerConfirm} visible={visible} onCancel={onCancel} />
        </Pressable>
    );
}

export default GenerateIDScreen;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    rootScreen : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'space-around',
    },
    comp_component:{
        width:"90%",
    },
    textInputContainer : {
        flexDirection : 'column', 
        alignItems : 'center',
        alignSelf:'stretch',
    },
    pickerContainer : {
        justifyContent : 'space-between',
        flexDirection : "row",
        height: 60,
        marginBottom : 20,
    },
    datePress : {
        flex : 1,
    },
    textInput : {
        alignSelf:'stretch',
        paddingVertical : 17,
        borderRadius : 16,
        paddingHorizontal : 16,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 23,
        fontFamily : 'NanumGothic-Bold',
    },
    genderButtonsContainer : {
        height : "100%",
        flexDirection : "row",
    },
    address_container : {
        width:"100%",
        height: 60,
        alignSelf : 'center',
        marginBottom : 30,
    },
});