import moment from "moment";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {Entypo } from '@expo/vector-icons';

function DoSchedule({date,place,cost,isEmpty,onEmptySchedulepress,onSchedulePress}){
    //비어있는 두 일정을 클릭했을 경우 알림을 띄우거나 관리자일경우 일정 생성 가능
    if(isEmpty){
        return(
            <Pressable style={Style.container} onPress={onEmptySchedulepress}>
                <View style={Style.add_do_schedule_button}>
                    <Entypo name="circle-with-plus" size={16} color="gray"/>
                </View>
            </Pressable>
        );
    }
    //이미 할당되어 있는 두 일정을 클릭했을 경우 두 일정을 전반적으로 확인할 수 있는 화면으로 이동? 혹은 편집 창으로 이동
    const handleDoSchedulePress = () => {
        console.log('일정을 클릭하셨습니다.');
    }
    return(
        <Pressable style={Style.container} onPress={onSchedulePress}>
            <View style={Style.date_holder}>
                <Text style={Style.do_date}>화요일</Text>
                <Text style={Style.do_date}>D-5</Text>
            </View>
            <View style={Style.do_schedule_info_holder}>
                <Text>{moment(date).format('YYYY년 MM월 DD일(dd) LT')}</Text>
                <Text>장소 : {place}</Text>
                <Text>비용 : {cost}원</Text>
            </View>
        </Pressable>
    );
}
const Style = StyleSheet.create({
    container:{
        marginVertical:5,
        flexDirection:'row',
        alignSelf:'baseline'
    },
    add_do_schedule_button:{
        flex:1,
        backgroundColor:'#dfdfdf',
        height:100,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    date_holder:{
        flexDirection:'column',
        alignItems:'center',
        alignSelf:'baseline',
        padding:10,
        borderRadius:15,
        backgroundColor:'#dfdfdf'
    }
    ,
    do_date:{
        fontFamily:'NanumGothic-Regular',
        fontWeight:'bold',
        fontSize:18,
    },
    do_schedule_info_holder:{
        flex:1,
        marginStart:5,
        justifyContent:'space-around',
        //backgroundColor:'#dfdfdf',
    }
});
export default DoSchedule;