import { StyleSheet,View,Text,TextInput,Pressable } from "react-native";
import { useState } from "react";
import moment from "moment";
import TopBar from "../components/hgp/TopBar";
import InputField from "../components/psc/InputField";
function DoScheduleAddScreen({navigation, route}) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const onGoBackPressed = () =>{
        navigation.goBack();
    };
    return (
        <View style={Style.conatiner}>
            <TopBar title="Do 일정 만들기" enableAlarmButton={false} onGoBackPressed={onGoBackPressed}/>
            <View style={Style.horizontal_container}>
                <Text style={Style.comp_title}>
                    날짜
                </Text>
                <Pressable style={Style.date_select_button}>
                    <Text style={Style.date_select_button_text}>{moment(date).format('YYYY-MM-DD')}</Text>
                </Pressable>
                <Pressable style={Style.date_select_button}>
                    <Text style={Style.date_select_button_text}>{moment(time).format('LT')}</Text>
                </Pressable>
            </View>
            <Text style={Style.comp_title}>
                위치
            </Text>
            <InputField placeholder={"비용"}/>
        </View>
    );
};
const Style = StyleSheet.create({
    conatiner : {
        flex:1,
        //backgroundColor:'gray',
        alignItems:'center'
    },
    horizontal_container : {
        width:"80%",
        //backgroundColor:'gray',
        flexDirection:'row',
        padding:10,
    },
    title:{
        fontFamily:'NanumGothic-ExtraBold',
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:25,
        padding:20,
    },
    comp_title:{
        fontFamily:'NanumGothic-Bold',
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:20,
        flex:1,
    },
    date_select_button : {
        backgroundColor:'#E30A8B',
        borderRadius:10,
        padding:10,
        marginHorizontal:5,
    },
    date_select_button_text : {
        color:'white',
        fontFamily:'NanumGothic-Bold',
        fontSize:15,
        textAlign:'center',
        textAlignVertical:'center',
    },
});
export default DoScheduleAddScreen;