import { View,Image, StyleSheet, Dimensions,Text } from "react-native";
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import CircleUserImage from "./CircleUserImage";
function getName(index){
    //닉네임을 쿼리해 가져오는 코드가 필요 일단 스위치 문으로 대체
    var name = '이름';
    switch(index){
        case 1:
            name = '우희준';
            break;
        case 2:
            name = '심수민';
            break;
        case 3:
            name = '박성찬';
            break;
        case 4:
            name = '홍기표';
            break;
    }
    return name;
}
function isMyIndex(index){
    var num = Number(index);
    return num !== 1;
}
function ChatBox({time, index, context}) {
    var isOpponent = isMyIndex(index);
    if(isOpponent){
        return (
            <View style={ChatStyle.chat}>
                <View style={ChatStyle.image_holder}>
                    <CircleUserImage mode='chat' index={index}/>
                </View>
                <View style={ChatStyle.chat_holder}>
                    <Text style={[ChatStyle.chat_opponent_name]}>{getName(index)}</Text>
                    <View style={ChatStyle.chat_box_holder} flexDirection='row'>
                        <Text style={[ChatStyle.chat_opponent_box,ChatStyle.chat_box_standard]}>{context}</Text>
                        <Text style={ChatStyle.time_text}>{moment(new Date()).format('LT')}</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={ChatStyle.chat}>
            <View style={ChatStyle.chat_holder}>
                <View style={ChatStyle.chat_box_holder} flexDirection='row-reverse'>
                    <Text style={[ChatStyle.chat_my_box,ChatStyle.chat_box_standard]}>{context}</Text>
                    <Text style={ChatStyle.time_text}>{moment(new Date()).format('LT')}</Text>
                </View>
            </View>
        </View>
    )

}
const ChatStyle = StyleSheet.create({
    chat:{
        marginStart:3,
        marginEnd:3,
        flexDirection:'row',
        //backgroundColor:'yellow'
    },
    image_holder:{
        width:'10%',
        //backgroundColor:'gray'
    },
    chat_holder:{
        margin:10,
        //backgroundColor:'gray',
        flex:1
    },
    chat_opponent_name:{
        alignSelf:'flex-start'
    }
    ,
    chat_opponent_box:{
        backgroundColor:'#D9D9D9',
        alignSelf:'flex-start',
    },
    chat_box_holder:{
        flex:1,
        alignItems:'flex-end'
    },
    chat_my_box:{
        backgroundColor:'#E3A1A1',
        alignSelf:'flex-end'
    },
    chat_box_standard:{
        padding:10,
        borderRadius:10,
        marginTop:10,
        flex:1,
        maxWidth:'70%',
    },
    time_text:{
        color:'#707070',
        margin:5
    }
});
export default ChatBox;