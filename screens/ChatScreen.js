import { FlatList, StyleSheet, Text, View } from "react-native";
import { useState,useEffect } from "react";
import axios from 'axios';
import { ChatDummy, ChatParticipantsDummy } from "../components/hgp/DummyData";
import ChatBox from "../components/hgp/ChatBox";
import CircleUserImage from "../components/hgp/CircleUserImage";
import { TextInput } from "react-native";
import { Dimensions } from "react-native";
import { Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { localIpAddress,portNumber } from "../api/API";
import { useSelector } from "react-redux";
import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import { Chat } from "../data/Chat";
import moment from "moment";
var client;
function ChatScreen ({navigation,route}){
    const [chatText, setChatText] = useState('');
    const [chatList, setChats] = useState([]);
    const accessToken = useSelector((state) => state.jwt.access_token);
    useEffect(()=>{
        client = Stomp.over(() => {
            const sock = new SockJS(`http://${localIpAddress}:${portNumber}/api/chat`);
            return sock;
        });
        client.connect({
            Authorization: `Bearer ${accessToken}`
        },null);
        client.debug = (str) => {return;};
        const messageCallback = function (message) {
            // called when the client receives a STOMP message from the server
            var data = JSON.parse(message.body);
            var chat = new Chat({
                id:data.id,
                username:data.username,
                content:data.content,
                date: data.date
            });
            setChats(chatList => [chat,...chatList]);
          };
        client.onConnect = (frame) => {
            //console.log("connected");
            client.subscribe(`/app/${route.params.id}/enter`,(message) => {
                //console.log(message.body);
                setChats(JSON.parse(message.body));
            });
            client.subscribe(`/topic/room/${route.params.id}`,messageCallback);
        };
        client.activate();
        return () => {
            
        };
    }, []);
    const handleClip = () =>{
        //클립 버튼을 눌렀을 때 이벤트
    }
    const handleEmoji = () => {
        //이모티콘 버튼을 눌렀을 때 이벤트
    }
    const handleCamera = () => {
        //카메라 버튼을 눌렀을 때 이벤트
    }
    const handleSendChat = () => {
        let chat = new Chat({
            username:"임시",
            content:chatText
        });
        let data = JSON.stringify(chat);
        //console.log("sending data : " + data);
        client.publish({
            destination: `/app/${route.params.id}`,
            body: data
          });
        setChatText('');
    }
    return (
        <View style={ChatScreenStyle.container}>
            <FlatList
                inverted={true}
                data={chatList}
                keyExtractor={(item) => item.id}
                numColumns={1}
                renderItem={({item}) =>
                <ChatBox
                    name={item.username}
                    time={item.date}
                    content={item.content}
                />}
            />
            <View style={ChatScreenStyle.chat_input_holder}>
                <View style={ChatScreenStyle.input_holder}>
                    <Pressable style={ChatScreenStyle.button_style} onPress={handleClip}>
                        <SimpleLineIcons name="paper-clip" size={20} color="black" />
                    </Pressable>
                    <TextInput
                        style={ChatScreenStyle.chat_text_input_style}
                        placeholderTextColor="#545454"
                        placeholder="메세지를 입력하세요"
                        onChangeText={text => setChatText(text)}
                        value={chatText}/>
                    <Pressable style={ChatScreenStyle.button_style} onPress={handleEmoji}>
                        <FontAwesome5 name="laugh-beam" size={20} color="black" />
                    </Pressable>
                    <Pressable style={ChatScreenStyle.button_style} onPress={handleCamera}>
                        <AntDesign name="camerao" size={20} color="black" />
                    </Pressable>
                </View>
                <Pressable style={ChatScreenStyle.send_button} onPress={handleSendChat}>
                    <Feather name="send" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    );
}
const ChatScreenStyle = StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        backgroundColor:'white'
    },
    participants_holder:{
        margin:10,
        minHeight:Dimensions.get('window').width*0.25,
        maxHeight:Dimensions.get('window').width*0.25,
        borderRadius:15,
        backgroundColor:'#E3A1A1',
        padding:10
    },
    chat_input_holder:{
        //backgroundColor:'black',
        height:60,
        padding:10,
        flexDirection:"row",
        justifyContent:"center",
        marginStart:10,
        marginEnd:10
    },
    input_holder:{
        padding:5,
        backgroundColor:'#E3A1A1',
        width:'80%',
        flexDirection:"row",
        alignItems:"center",
        borderRadius:15,
    },
    chat_text_input_style:{
        flex:1,
        minHeight:50,
        fontSize:16,
        fontFamily:'NanumGothic-Bold',
    }
    ,
    send_button:{
        marginStart:10,
        backgroundColor:'#DF5C5C',
        width:50,
        borderRadius:15,
        justifyContent:"center",
        alignItems:'center',
    },
    send_button_icon:{
        width:'50%',
        height:'50%'
    },
    button_style:{
        //backgroundColor:'gray',
        height:'80%',
        borderRadius:15,
        aspectRatio:1,
        alignItems:'center',
        justifyContent:'center'
    },
    icon_style:{
        margin:5,
        alignItems:'center',
        justifyContent:'center'
    }
});
export default ChatScreen;