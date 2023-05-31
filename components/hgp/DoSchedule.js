import moment from "moment";
import { Pressable, StyleSheet, Text, View,Dimensions } from "react-native";
import {Entypo ,FontAwesome} from '@expo/vector-icons';

function DoSchedule({title,startDate,endDate,place,cost,isEmpty,onEmptySchedulepress,onSchedulePress}){
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
    const start = new Date();
    start.setTime(startDate);
    const end = new Date();
    end.setTime(endDate);
    const dday = moment(start).diff(moment(end),'days');
    //console.log(dday);
    return(
        <Pressable style={Style.container} onPress={onSchedulePress}>
            <View style={Style.date_holder}>
                <Text style={Style.do_date}>{moment(start).format('dd') + "요일"}</Text>
                <Text style={Style.do_date}>{"D" + (dday == 0?"-Day": dday)}</Text>
            </View>
            <View style={Style.do_schedule_info_holder}>
                <Text>{title}</Text>
                <View flexDirection='row' alignItems='center'>
                    <FontAwesome name="map-marker" size={16} color="black" />
                    <Text>{place}</Text>
                </View>
                <Text>비용 : {cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}</Text>
                <Text>{ "시작 시간 : "+ moment(start).format('YYYY년 MM월 DD일(dd) LT')}</Text>
                <Text>{ "종료 시간 : "+ moment(end).format('YYYY년 MM월 DD일(dd) LT')}</Text>
            </View>
        </Pressable>
    );
}
const Style = StyleSheet.create({
    container:{
        height:Dimensions.get('window').height*0.1,
        marginVertical:5,
        flexDirection:'row',
        alignSelf:'baseline'
    },
    add_do_schedule_button:{
        flex:1,
        backgroundColor:'#dfdfdf',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'
    },
    date_holder:{
        height:"100%",
        aspectRatio:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'baseline',
        padding:10,
        borderRadius:15,
        backgroundColor:'#dfdfdf'
    }
    ,
    do_date:{
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:18,
    },
    do_schedule_info_holder:{
        //flex:1,
        marginStart:5,
        justifyContent:'space-around',
        //backgroundColor:'#dfdfdf',
    }
});
export default DoSchedule;