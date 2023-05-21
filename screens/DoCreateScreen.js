import { View,StyleSheet,Dimensions,Modal,Pressable,TextInput,Text } from "react-native";
import { useState } from "react";
import TopBar from "../components/hgp/TopBar";
import InputField from "../components/psc/InputField";
import Postcode from "@actbase/react-daum-postcode";
import API from "../api/API";
import Toast from "react-native-root-toast";

function DoCreateScreen({navigation}){
    const [isModal,setIsModal] = useState(false);
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [des,setDes] = useState("");
    const onGoBackPressed = () =>{
        navigation.goBack();
    }
    const getAddressData = (data) => {
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
    const onAddressPartSelected = () => {
        setIsModal(true);
    }
    const onCreateButtonPressed = () => {
        const data = {
            doName : name,
            description : des,
            place : address,
        }
        API.post("/api/do/create",data).then((response) => {
            Toast.show('Do가 생성되었습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            navigation.goBack();
        }).catch((err)=>{
            Toast.show('Do가 생성되지 않았습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        });
    }
    return(
        <View style={Style.container}>
            <TopBar title="Do 만들기" onGoBackPressed={onGoBackPressed} enableAlarmButton={false}/>
            <TextInput style={Style.input_container} placeholder={"Do 이름"} onChangeText={setName} value={name} />
            <TextInput style={Style.input_container} placeholder={"Do 지역"} onChangeText={setAddress} value={address} onPressIn={onAddressPartSelected}/>
            <Text style={Style.input_title}>소개하는 말</Text>
            <TextInput style={Style.input_box} multiline={true} placeholder={"소개하는 말을 적어주세요."} onChangeText={setDes} value={des}/>
            <Pressable style={Style.create_button} onPress={onCreateButtonPressed}>
                <Text style={Style.create_button_text}>만들기</Text>
            </Pressable>
            <Modal visible={isModal}>
                <Postcode
                    style={{ width: Dimensions.get('window').width, height:  Dimensions.get('window').height}}
                    jsOptions={{ animation: true, hideMapBtn: true }}
                    onSelected={getAddressData}
                    />
            </Modal>
        </View>
    );
}
const Style = StyleSheet.create({
    container:{
        flex:1,
    },
    conatiner_horizontal:{
        flexDirection:'row'
    },
    input_title:{
        marginHorizontal:20,
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:20
    },
    input_container : {
        height : 70,
        alignSelf : 'stretch',
        padding: 10,
        marginHorizontal:20,
        overflow:'scroll',
        marginVertical:10,
        borderRadius : 20,
        borderColor : 'grey',
        borderWidth : 1,
        fontSize : 15,
        fontFamily : 'NanumGothic-Bold',
    },
    input_box : {
        height:Dimensions.get('window').height * 0.48,
        alignSelf : 'stretch',
        padding: 10,
        marginHorizontal:20,
        overflow:'scroll',
        marginVertical:10,
        borderRadius : 20,
        borderColor : 'grey',
        borderWidth : 1,
        fontSize : 15,
        fontFamily : 'NanumGothic-Bold',
        textAlignVertical: 'top',
    },
    create_button:{
        flex:1,
        borderRadius:30,
        margin:15,
        backgroundColor:'#E30A8B'
    },
    create_button_text:{
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:20,
        width:"100%",
        height:"100%",
        textAlign:'center',
        textAlignVertical:'center',
        color:'white',
    }
});
export default DoCreateScreen;