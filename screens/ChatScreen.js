import { FlatList, StyleSheet, Text, View } from "react-native";
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
function ChatScreen ({navigation}){
    const handleClip = () =>{
        //클립 버튼을 눌렀을 때 이벤트
    }
    const handleEmoji = () => {
        //이모티콘 버튼을 눌렀을 때 이벤트
    }
    const handleCamera = () => {
        //카메라 버튼을 눌렀을 때 이벤트
    }
    return (
        <View style={ChatScreenStyle.container}>
            <View style={ChatScreenStyle.participants_holder}>
                <Text>채팅 참여자</Text>
                <FlatList
                    horizontal={true}
                    data={ChatParticipantsDummy}
                    keyExtractor={(item) => item}
                    alignItems='center'
                    renderItem={({item}) => <CircleUserImage mode='expand' margin={5} index={item}/>}
                />
            </View>
            <FlatList
                data={ChatDummy}
                keyExtractor={(item) => item.chatNum}
                numColumns={1}
                renderItem={({item}) =>
                <ChatBox
                    index={item.index}
                    context={item.context}
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
                        placeholder="메세지를 입력하세요" >
                    </TextInput>
                    <Pressable style={ChatScreenStyle.button_style} onPress={handleEmoji}>
                        <FontAwesome5 name="laugh-beam" size={20} color="black" />
                    </Pressable>
                    <Pressable style={ChatScreenStyle.button_style} onPress={handleCamera}>
                        <AntDesign name="camerao" size={20} color="black" />
                    </Pressable>
                </View>
                <Pressable style={ChatScreenStyle.send_button}>
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