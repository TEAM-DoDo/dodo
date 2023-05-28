import { StyleSheet,View,Text } from "react-native";
import TopBar from "../components/hgp/TopBar";
import moment from "moment";

function SchduleInfoScreen({ navigation,route }) {
    //console.log(route.params.data);
    const startTime = new Date();
    startTime.setTime(route.params.data.startTime);
    const endTime = new Date(route.params.data.endTime);
    endTime.setTime(route.params.data.endTime);
    const data = {
        cost : route.params.data.cost,
        title: route.params.data.title,
        place : route.params.data.place,
        detail : route.params.data.detail,
        id : route.params.data.id
    }
    const onGoBackPressed = () => {
        navigation.goBack();
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
                    <Text style={Style.time_holder}>{moment(startTime).format("YYYY-MM-DD LT")}</Text>
                    <Text>~</Text>
                    <Text style={Style.time_holder}>{moment(startTime).format("YYYY-MM-DD LT")}</Text>
                </View>
                <Text style={Style.schedule_info_title}>일정 위치</Text>
                <Text style={Style.schedule_info}>{data.place}</Text>
                <Text style={Style.schedule_info_title}>일정 비용</Text>
                <Text style={Style.schedule_info}>{data.cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}</Text>
                <Text style={Style.schedule_info_title}>일정 상세</Text>
                <Text style={Style.input_box}>{data.detail}</Text>
            </View>
        </View>
    );
}
const Style = StyleSheet.create({
    container : {
        flex:1,
        alignItems:'center',
    },
    inner_container:{
        flex:1,
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
        backgroundColor:'#E30A8B',
        alignSelf:'stretch',
        justifyContent:'center',
        color:'white',
        borderRadius:15,
        fontSize:13,
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight:'bold',
        padding:10,
        elevation:3,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
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

});
export default SchduleInfoScreen;