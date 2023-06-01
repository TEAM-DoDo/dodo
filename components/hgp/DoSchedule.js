import moment from "moment";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { Entypo, FontAwesome } from '@expo/vector-icons';

function DoSchedule({ title, startDate, endDate, place, cost, isEmpty, onEmptySchedulepress, onSchedulePress }) {
    //비어있는 두 일정을 클릭했을 경우 알림을 띄우거나 관리자일경우 일정 생성 가능
    if (isEmpty) {
        return (
            <Pressable style={Style.container} onPress={onEmptySchedulepress}>
                <View style={Style.add_do_schedule_button}>
                    <Entypo name="circle-with-plus" size={16} color="gray" />
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
    const today = moment().startOf('day');
    const dday = moment(end).diff(today, 'days');
    const ddayText = dday === 0 ? "+Day" : (dday > 0 ? "-" + dday : dday);
    //console.log(dday);
    return (
        <Pressable style={Style.container} onPress={onSchedulePress}>
            <View style={Style.date_holder}>
                <Text style={Style.do_date}>{moment(start).format('dd') + "요일"}</Text>
                <Text style={Style.do_date}>{"D" + ddayText}</Text>
            </View>
            <View style={Style.do_schedule_info_holder}>
                <Text style={Style.do_title_text}>{title}</Text>
                <View flexDirection='row' alignItems='center'>
                    <Text style={Style.do_place_text}>{place}</Text>
                </View>
                <Text style={Style.do_cost}>비용 : {cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}</Text>
                <Text style={Style.do_start}>{"시작 시간 : " + moment(start).format('YYYY년 MM월 DD일(dd) LT')}</Text>
                <Text style={Style.do_end}>{"종료 시간 : " + moment(end).format('YYYY년 MM월 DD일(dd) LT')}</Text>
            </View>
        </Pressable>
    );
}
const Style = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.1,
        marginVertical: 5,
        flexDirection: 'row',
        alignSelf: 'baseline'
    },
    add_do_schedule_button: {
        flex: 1,
        backgroundColor: '#dbdbdb',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    date_holder: {
        height: "120%",
        aspectRatio: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'baseline',
        padding: 6,
        borderRadius: 15,
        backgroundColor: 'white',

    },
    do_date: {
        fontFamily: 'NanumGothic-ExtraBold',
        fontSize: 19,
    },
    do_schedule_info_holder: {
        //flex:1,
        marginStart: 9,
        justifyContent: 'space-around',
        //backgroundColor:'#dfdfdf',
    },
    do_title_text: {
        fontFamily: 'NanumGothic-ExtraBold',
        fontSize: 20,
        padding: 2,
    },
    do_place_text: {
        fontFamily: 'NanumGothic-Bold',
        fontSize: 14,
        padding: 5,

    },
    do_cost: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 13,
        padding: 4,

    },
    do_start: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 13,
        padding: 4,

    },
    do_end: {
        fontFamily: 'NanumGothic-Regular',
        fontSize: 13,
        padding: 4,

    }
});
export default DoSchedule;