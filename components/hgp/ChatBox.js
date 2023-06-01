import { View,Image, StyleSheet, Dimensions,Text } from "react-native";
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import CircleUserImage from "./CircleUserImage";
import { useSelector } from "react-redux";
import API from "../../api/API";
import { useState,useEffect } from "react";
let nameDict = {};
function ChatBox({chatUserId,time, content}) {
    const userId = useSelector(state => state.userInfo.id);
    const [chatUserNickname,setChatUserNickname] = useState(nameDict[chatUserId]);
    const [userImage,setUserImage] = useState(null);
    //console.log(nameDict);
    useEffect(()=>{
        API.get(`/api/users/${chatUserId}`).then((response) => {
            //console.log(response.data.user.nickname);
            //console.log("name reloaded");
            nameDict[chatUserId] = response.data.user.nickname;
            setUserImage(response.data.user.profileImagePath);
            setChatUserNickname(nameDict[chatUserId]);
        }).catch((err)=>{
            console.log(err);
        });
        return (() => {  
            });
    },[]);


    var d = new Date(0);
    d.setUTCSeconds(time);
    if(chatUserId !== userId){
        return ( 
            <View style={ChatStyle.chat}>
                <View style={ChatStyle.image_holder}>
                    <CircleUserImage mode='chat' id={chatUserId} imagePath={userImage}/>
                </View>
                <View style={ChatStyle.chat_holder}>
                    <Text style={[ChatStyle.chat_opponent_name]}>{chatUserNickname}</Text>
                    <View style={ChatStyle.chat_box_holder} flexDirection='row'>
                        <Text style={[ChatStyle.chat_opponent_box,ChatStyle.chat_box_standard]}>{content}</Text>
                        <View style={ChatStyle.time_text_holder}>
                            <Text style={ChatStyle.time_text}>{moment(d).format('YYYY-MM-DD')}</Text>
                            <Text style={ChatStyle.time_text}>{moment(d).format('LT')}</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={ChatStyle.chat}>
            <View style={ChatStyle.chat_holder}>
                <View style={ChatStyle.chat_box_holder} flexDirection='row-reverse'>
                    <Text style={[ChatStyle.chat_my_box,ChatStyle.chat_box_standard]}>{content}</Text>
                    <View style={ChatStyle.time_text_holder}>
                        <Text style={ChatStyle.time_text}>{moment(d).format('YYYY-MM-DD')}</Text>
                        <Text style={ChatStyle.time_text}>{moment(d).format('LT')}</Text>
                    </View>
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
    },
    //색상지정
    chat_opponent_box:{
        // backgroundColor:'#FBFAF2',
        // backgroundColor:'#D9D9D9',
        backgroundColor:'#F7FBDA',
        alignSelf:'flex-start',
        // IOS shadow
        shadowColor : '#c5c5c5',
        shadowOffset : { height : 5, },
        shadowOpacity : 1,
        // Android shadow
        elevation : 20,
    },
    chat_box_holder:{
        flex:1,
        alignItems:'flex-end'
    },
    chat_my_box:{
        backgroundColor:'#FBFAF2',
        // backgroundColor:'#E3A1A1',
        fontFamily:'NanumGothic-Bold',
        alignSelf:'flex-end',
        // IOS shadow
        shadowColor : '#c5c5c5',
        shadowOffset : { height : 5, },
        shadowOpacity : 1,
        // Android shadow
        elevation : 20,
        
    },
    //형태지정
    chat_box_standard:{
        padding:10,
        borderRadius:10,
        overflow:'hidden',
        marginTop:10,
        maxWidth:'70%',
    },
    time_text:{
        color:'#707070',
        fontSize:11,

    },
    time_text_holder:{
        paddingHorizontal:4,
    }
});
export default ChatBox;