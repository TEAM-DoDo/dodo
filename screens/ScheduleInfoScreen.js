import { StyleSheet,View,Text,Pressable } from "react-native";
import TopBar from "../components/hgp/TopBar";
import moment from "moment";
import { useSelector } from "react-redux";
import { useState } from "react";
import API from "../api/API";
import { ScheduleEnter } from "../data/ScheduleEnter";
import { useEffect } from "react";

function SchduleInfoScreen({ navigation,route }) {
    const data = {
        cost : route.params.data.cost,
        title: route.params.data.title,
        place : route.params.data.place,
        detail : route.params.data.detail,
        id : route.params.data.id
    }
    const [scheduleParticipants,setScheduleParticipants] = useState([]);
    const [isParticipantOfSchedule,setIsParticipantOfSchedule] = useState(false);
    const userId = useSelector(state => state.userInfo.id);
    //console.log(route.params.data);
    const startTime = new Date();
    startTime.setTime(route.params.data.startTime);
    const endTime = new Date(route.params.data.endTime);
    endTime.setTime(route.params.data.endTime);
    useEffect(() => {
        navigation.addListener('focus', () => {
            updateData();
        });
        
    },[]);
    //유저 참여 정보를 가져오는 함수
    const updateData = () => {
        API.get("/api/schedule-of-user/"+data.id).then(
            res => {
                //console.log(res.data);
                setScheduleParticipants(res.data);
                res.data.forEach(element => {
                    if(element.id == userId){
                        setIsParticipantOfSchedule(true);
                    }
                });
            }).catch(err => {
            //console.log(err);
        });
    }

    const onGoBackPressed = () => {
        navigation.goBack();
    }
    const onScheduleParticipatePressed = () => {
        //console.log("참여하기 버튼 눌림");
        //console.log(scheduleParticipants);
        var scheduleDTO = new ScheduleEnter({
            userId : userId,
            scheduleId : data.id
        });
        API.post("/api/schedule-of-user",scheduleDTO).then(
            res => {
                //console.log(res);
                //setIsParticipantOfSchedule(true);
                updateData();
            }).catch(err => {
                //console.log(err);
            });
    }
    const onShowParticipantsPressed = () => {
        //console.log("참여자 보기 버튼 눌림");
        //console.log(scheduleParticipants);
        navigation.navigate("UserListScreen",{
            data : scheduleParticipants
        });
    }
    
    /** 스케줄 정보를 보여주는 컴포넌트를 만들어야함
             * 1. route를 통해 받아온 스케줄 정보를 이용하여 만들어야함
             * 2. 스케줄에 참여할 수 있는 버튼을 absolute로 만들어야함
             * 3. borderRadius를 이용하여 둥근 모서리를 만들어야함
             */
    return (
        <View style={Style.container}>
            <TopBar title="스케줄 정보" onGoBackPressed={onGoBackPressed} enableAlarmButton={false} />
            <View style={Style.inner_container}>
                <Text style={Style.schedule_info_title}>일정 이름</Text>
                <Text style={Style.schedule_info}>{data.title}</Text>
                <Text style={Style.schedule_info_title}>일정 기간</Text>
                <View style={Style.horizontal_container}>
                    <View style={Style.time_holder}>
                    <Text style={Style.time_text}>{moment(startTime).format("YYYY-MM-DD LT")}</Text>
                    </View>
                    <Text>~</Text>
                    <Text style={Style.time_text}>{moment(startTime).format("YYYY-MM-DD LT")}</Text>
                </View>
                <Text style={Style.schedule_info_title}>일정 위치</Text>
                <Text style={Style.schedule_info}>{data.place}</Text>
                <Text style={Style.schedule_info_title}>일정 비용</Text>
                <Text style={Style.schedule_info}>{data.cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}</Text>
                <Text style={Style.schedule_info_title}>일정 상세</Text>
                <Text style={Style.input_box}>{data.detail}</Text>
                <Pressable style={Style.button_container} onPress={!isParticipantOfSchedule?onScheduleParticipatePressed:onShowParticipantsPressed}>
                    <Text style={Style.button_text}>{!isParticipantOfSchedule?"일정 참여하기":"일정 참여 인원 보기"}</Text>
                </Pressable>
            </View>
        </View>
    );
}
const Style = StyleSheet.create({
    container : {
        flex:1,
        alignItems:'center',
        backgroundColor:'white',
    },
    inner_container:{
        flex:1,
        alignSelf:'stretch',
        margin:10,
        justifyContent:'flex-start',
    },
    horizontal_container : {
        alignSelf:'stretch',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        
    },
    time_title:{
        fontFamily:'NanumGothic-ExtraBold',
        textAlignVertical:'center',
        fontSize:14,
        paddingVertical:5,
        width:"30%",
    },
    time_holder : {
        justifyContent:'center',
        borderRadius:15,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    time_text : {
        backgroundColor:'#E30A8B',
        color:'white',
        borderRadius:15,
        overflow:'hidden',
        fontSize:13,
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight:'bold',
        padding:10,
        elevation:3,

    },
    schedule_info_title : {
        alignSelf : 'stretch',
        textAlignVertical:'center',
        padding:5,
        fontSize : 12,
        fontFamily : 'NanumGothic-Bold',
    },
    schedule_info : {
        alignSelf : 'stretch',
        textAlignVertical:'center',
        padding:15,
        marginBottom:10,
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 18,
        fontFamily : 'NanumGothic-Bold',
    },
    input_box : {
        flex:1,
        alignSelf : 'stretch',
        padding: 10,
        overflow:'scroll',
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 15,
        fontFamily : 'NanumGothic-Bold',
        textAlignVertical: 'top',
    },
    button_container : {
        height:60,
        alignSelf : 'stretch',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderRadius : 20,
        backgroundColor : '#E30A8B',
        marginTop:10,
        marginBottom:20,
    },
    button_text : {
        color:'white',
        fontSize:20,
        fontFamily:'NanumGothic-ExtraBold',
    },
});
export default SchduleInfoScreen;