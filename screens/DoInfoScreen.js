import {Pressable, StyleSheet, View, Text, Image, FlatList} from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { ChatParticipantsDummy } from "../components/hgp/DummyData";
import CircleUserImage from "../components/hgp/CircleUserImage";
import moment from "moment";
import 'moment/locale/ko';
import DoSchedule from "../components/hgp/DoSchedule";
function getDoParticipantsNum(doIndex){
    return 4;
}
function getDoImage(doIndex){
    return null;
}
function DoInfoScreen({route, navigation}) {
    const handleShowAllParcitipants = () => {

    }
    const handleShowNotice = () => {

    }
    return (
        <View style={Style.container}>
            <Image style={Style.do_title_img} source={getDoImage(4)} alt="Do 타이틀 이미지"/>
            <View style={Style.info_holder}>
                <Text style={Style.info_title}>지역</Text>
                <Text>지역에 대한 내용이 표시되는 장소</Text>
            </View>
            <View style={Style.info_holder}>
                <View flexDirection='row' alignItems='center'>
                    <Text style={Style.info_title}>일정</Text>
                    <Pressable>
                        <Entypo name="circle-with-plus" size={16} margin={5} color="gray" />
                    </Pressable>
                </View>
                <DoSchedule date={new Date()} place='을지로 입구' cost={30000} isEmpty={false}/>
            </View>
            <View style={Style.info_holder}>
                <View flexDirection='row' alignItems='center'>
                    <Text style={Style.info_title}>참여 멤버 ({getDoParticipantsNum(3)})</Text>
                    <Pressable onPress={handleShowAllParcitipants}>
                        <AntDesign name="right" size={10} color="gray" padding={5}/>
                    </Pressable>
                </View>
                <FlatList
                    marginVertical={10}
                    horizontal={true}
                    data={ChatParticipantsDummy}
                    keyExtractor={(item) => item}
                    alignItems='center'
                    renderItem={({item}) => <CircleUserImage mode='minimize' margin={5} index={item}/>}
                />
            </View>
            <View style={Style.info_holder}>
                <View flexDirection='row' alignItems='center'>
                    <Text style={Style.info_title}>공지사항</Text>
                    <Pressable onPress={handleShowNotice}>
                        <AntDesign name="right" size={10} color="gray" padding={5}/>
                    </Pressable>
                </View>
                {/* 향후 해당 부분은 컴포넌트화 하여 유저 리스트 표시창 제작시 사용할 예정 */}
                <View flexDirection='row' alignItems='center' marginVertical={10}>
                    <CircleUserImage mode='minimize' index={1}/>
                    <Text style={Style.notice_writer}>공지사항 작성자</Text>
                </View>
                {/* 여기까지 */}
                {/* 향후 해당 부분은 컴포넌트화 하여 공지사항을 보여주는 리스트 제작시 사용할 예정 */}
                <View>
                    <Text style={Style.notice_context}>공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용</Text>
                    <Text style={Style.notice_date}>{moment().format('YYYY년 MM월 DD일 hh:mm 작성됨')}</Text>
                </View>
                {/* 여기까지 */}
                <View>
                    <Pressable style={Style.like_button}>
                        <AntDesign name="heart" size={20} color="red" />
                        <Text style={Style.like_button_text}>좋아요</Text>
                        <Text style={[Style.like_button_text,{color:'red'}]}>2</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center'
    },
    do_title_img:{
        margin:10,
        alignSelf:'stretch',
        height:'20%',
        backgroundColor:'#c7c7c7',
        borderRadius:15
    },
    info_holder:{
        alignSelf:'stretch',
        marginVertical:5,
        marginHorizontal:10,
        //backgroundColor:'gray'
    },
    info_title:{
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:20
    },
    notice_writer:{
        fontFamily:'NanumGothic-Bold',
        fontSize: 14,
        margin:10,
        height:'80%',
        textAlign:'center',
        verticalAlign:'middle',
        //backgroundColor:'gray'
    },
    notice_context:{
        fontFamily:'NanumGothic-Regular',
        fontSize: 14,
    },
    notice_date:{
        marginVertical:5,
        color:'gray',
        fontSize: 14,
    },
    like_button:{
        backgroundColor:'#cfcfcf',
        flexDirection:'row',
        padding:5,
        borderRadius:10,
        alignItems:'center',
        alignSelf:'baseline',
    }
    ,
    like_button_text:{
        fontFamily:'NanumGothic-Bold',
        fontWeight:'bold',
        fontSize:14,
        margin:3
    },
    do_container:{
        marginVertical:5,
        flexDirection:'row'
    },
    do_date:{
        fontFamily:'NanumGothic-Regular',
        fontWeight:'bold',
        fontSize:18,
    }
});
export default DoInfoScreen;