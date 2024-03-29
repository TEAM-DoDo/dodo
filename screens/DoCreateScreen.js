import { View,StyleSheet,Dimensions,Modal,Pressable,TextInput,Text,Keyboard,SafeAreaView } from "react-native";
import { useState } from "react";
import TopBar from "../components/hgp/TopBar";
import Postcode from "@actbase/react-daum-postcode";
import API from "../api/API";
import Toast from "react-native-root-toast";
import { useSelector, useDispatch } from "react-redux";
import { addNewDo } from "../store/myDoList-store";
import AddressModal from "../components/hgp/AddressModal";

function DoCreateScreen({navigation}){
    const [isModal,setIsModal] = useState(false);
    const [address,setAddress] = useState("");
    const [name,setName] = useState("");
    const [des,setDes] = useState("");
    const userId = useSelector(state => state.userInfo.id);
    const dispatch = useDispatch();
    const onGoBackPressed = () =>{
        dismissKeyboard();
        setTimeout(() => {navigation.goBack();}, 50);
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
            userId : userId
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
            const createdDoInfo = response.data;
            console.log("post response로 받은 do info : ", createdDoInfo);
            dispatch(addNewDo({data : createdDoInfo}))
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
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }
    return(
        <Pressable style={Style.container} onPress={dismissKeyboard}>
            <TopBar title="Do 만들기" onGoBackPressed={onGoBackPressed} enableAlarmButton={false}/>
            <TextInput style={Style.input_container} placeholder={"Do 이름"} placeholderTextColor={'gray'} onChangeText={setName} value={name} />
            <TextInput style={Style.input_container} placeholder={"Do 지역"} placeholderTextColor={'gray'} onChangeText={setAddress} value={address} onPressIn={onAddressPartSelected}/>
            <Text style={Style.input_title}>소개하는 말</Text>
            <TextInput style={Style.input_box} multiline={true} placeholder={"소개하는 말을 적어주세요."} placeholderTextColor={'gray'} onChangeText={setDes} value={des}/>
            <Pressable style={Style.create_button} onPress={onCreateButtonPressed}>
                <Text style={Style.create_button_text}>만들기</Text>
            </Pressable>
            <AddressModal isVisible={isModal} onAdressSelected={getAddressData} onCancel={()=>{setIsModal(false)}}/>
        </Pressable>
    );
}
const Style = StyleSheet.create({
    container:{
        flex:1,
    
    },
    TopBar: {
        fontFamily:'NanumGothic-ExtraBold',
        color: '#E30A8B',
        fontSize: 30,

    },
    conatiner_horizontal:{
        flexDirection:'row'
    },
    input_title:{
        marginTop : 20,
        marginHorizontal:20,
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:24,
        padding : 10,
    },
    input_box : {
        flex:1,
        alignSelf : 'stretch',
        padding: 13,
        marginHorizontal:25,
        overflow:'scroll',
        marginVertical:7,
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 15,
        fontFamily : 'NanumGothic-Bold',
        textAlignVertical: 'top',
        marginTop : 10,
        // marginBottom : 60,
    },
    input_container : {
        marginTop : 30,
        height : 50,
        alignSelf : 'stretch',
        padding: 11,
        marginHorizontal:25,
        overflow:'scroll',
        marginVertical:1,
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 15,
        fontFamily : 'NanumGothic-Bold',
    
    },
    create_button:{
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        margin:55,
        backgroundColor:'#E30A8B',
        marginHorizontal:25,
        
    },
    create_button_text:{
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:20,
        textAlign:'center',
        textAlignVertical:'center',
        color:'white',
    }
});
export default DoCreateScreen;