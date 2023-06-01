//react
import { useState,useEffect } from "react";
import {Pressable, StyleSheet, View, Text, FlatList, ScrollView,Dimensions} from "react-native";

//expo
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';

//component
import { ChatParticipantsDummy } from "../components/hgp/DummyData";
import CircleUserImage from "../components/hgp/CircleUserImage";
import DoSchedule from "../components/hgp/DoSchedule";
import SimpleUserInfo from "../components/psc/SimpleUserInfo";

//API
import API, { localIpAddress, portNumber } from "../api/API";

//library
import moment from "moment";
import 'moment/locale/ko';
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "mime";
import Toast from "react-native-root-toast";
import DoNotice from "../components/hgp/DoNotice";
import { useSelector, useDispatch } from "react-redux";
import FloatingButton from "../components/hgp/FloatingButton";
import { DoOfUser } from "../data/DoOfUser";

import { addNewDo } from "../store/myDoList-store";

function DoInfoScreen({route, navigation}) {
    //console.log("from do info screen : " + route.params.id);
    //이미지 새로고침을 위한 시간
    const [tick,setTick] = useState(Date.now());
    //do에 대한 정보
    const [place, setPlace] = useState('');
    const [category, setCategory] = useState('');
    const [description,setDescription] = useState('');
    const accessToken = useSelector((state) => state.jwt.access_token);
    //do Schedule에 대한 정보
    const [doSchedule, setDoSchedule] = useState(null);
    const [isParticipant, setIsParticipant] = useState(false);
    const [participants, setParticipants] = useState([]);
    //user에 대한 정보
    const userId = useSelector((state) => state.userInfo.id);
    const dispatch = useDispatch();

    const updateData = () => {
        API.get(`/api/do/${route.params.id}`).then((response) => {
            setPlace(response.data.place);
            setDescription(response.data.description);
            //console.log(response.data);
            setTick(Date.now());
        });
        API.get(`/api/do-of-user/${route.params.id}`).then((response) => {
            setParticipants(response.data);
            for(let i=0;i<response.data.length;i++){
                if(response.data[i].id === userId){
                    setIsParticipant(true);
                    break;
                }
            }
        }).catch((error) => {
            console.log(error);
        });
        API.get(`/api/do/${route.params.id}/schedules`).then((response) => {
            setDoSchedule(response.data);
        }).catch((error) => {
            console.log("data not found");
        });
    };
    const getDoParticipantsNum = () => {
        return 3;
    };
    if(route.params.id == null){
        navigation.goBack();
    }
    useEffect(() => {
        navigation.addListener('focus',() => {
            updateData();
        });
        return(() => {

        });
    },[]);
    //do image가 선택되었을 때 이벤트
    //타이틀 화면을 바꿀 수 있도록 한다
    const handleDoImagePress = async () => {
        //자기 자신이 이미지 교체 권한이 있는지 확인하는 코드를 만들어야함 일단 true로 설정
        var isAdmin = true;
        if(!isAdmin){
            return;
        }
        //이후 이미지 접촉 권한 확인
        var isGetImageAllowed = await ImagePicker.getMediaLibraryPermissionsAsync();
        if(!isGetImageAllowed){
            //이미지 권한이 거부되면 toast를 띄워줘야함
            Toast.show('이미지 권한이 존재하지 않습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.25,
          });
        if(result.canceled){
            //이미지가 선택되지 않았다는 toast 띄워야함
            Toast.show('이미지가 선택되지 않았습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }
        const image = {
           uri: '',
           type: 'image/jpeg',
           name: 'test',
        };
        image.uri = result.assets[0].uri;
        image.name = image.uri.split("/").pop();
        image.type = mime.getType(image.uri);
        const formData = new FormData();
        formData.append("files",image);
        //타이틀 이미지를 서버에 전송하여 설정
        API.post(
            `/api/do/${route.params.id}/title-image`,
            formData,
            {headers:{"Content-Type": `multipart/form-data`,}})
            .then((response)=>{setTick(Date.now());})
            .catch((err)=>{console.log(err)});
    }
    const handleEmptyShedulePress = () =>{
        navigation.navigate("DoScheduleAddScreen",{id:route.params.id});
    }
    const handleShowAllParcitipants = () => {
        navigation.navigate('UserListScreen',{id:route.params.id , data:participants});
    }
    const handleShowNotice = () => {
        navigation.navigate("DoNoticeScreen",{id:route.params.id});
    }
    const handleOnSchedulePress = () => {
        navigation.navigate("DoScheduleInfoScreen",{data : doSchedule});
    }
    const handleOnParticipatePress = () => {
        let data = new DoOfUser({
            doId:route.params.id,
            userId:userId,
        });
        API.post(`/api/do-of-user`,data).then((response) => {
            console.log(response.data);
            setIsParticipant(true);
            updateData();
        }).catch((error) => {
            console.log(error);
        });
        API.get(`api/do/${route.params.id}`).then(response => {
            const newDo = response.data;
            console.log("방금 참가한 do의 정보 : ", newDo);
            dispatch(addNewDo({data : newDo}));
        }).catch(err => console.log("DoInfoScreen.js에서 발생. do 참가 후 get do에 실패했습니다."))
    }        
    return (
        <View style={Style.container}>
        <ScrollView style={Style.scroll_container}>
            <Pressable style={Style.do_title_img} onPress={handleDoImagePress}>
                <Image 
                    style={{
                        width:"100%",
                        height:"100%"
                    }} 
                    source={{
                        uri:`http://${localIpAddress}:${portNumber}/api/do/${route.params.id}/title-image?${tick}`,
                        headers:{ 
                            Authorization : `Bearer ${accessToken}`
                        }
                    }}/>
            </Pressable>
            <View style={Style.info_holder}>
                <Text style={Style.info_title}>정보</Text>
                <Text style={Style.description}>{description}</Text>
            </View>
            <View style={Style.info_holder}>
                <Text style={Style.info_title}>지역</Text>
                <Text style={Style.place}>{place}</Text>
            </View>
            <View style={Style.info_holder}>
                <View flexDirection='row' alignItems='center'>
                    <Text style={Style.info_title}>일정</Text>
                    <Pressable>
                        <Entypo name="circle-with-plus" size={16} margin={5} color="gray" />
                    </Pressable>
                </View>
                <DoSchedule 
                    isEmpty={(doSchedule==null)} onEmptySchedulepress={handleEmptyShedulePress}
                    onSchedulePress={handleOnSchedulePress}
                    startDate={doSchedule?.startTime} endDate={doSchedule?.endTime}
                    title={doSchedule?.title} description={doSchedule?.detail}
                    cost={doSchedule?.cost} place={doSchedule?.place}
                />
            </View>
            <View style={Style.info_holder}>
                <View flexDirection='row' alignItems='center'>
                    <Text style={Style.info_title}>참여 멤버 ({participants.length})</Text>
                    <Pressable onPress={handleShowAllParcitipants}>
                        <AntDesign name="right" size={10} color="gray" padding={5}/>
                    </Pressable>
                </View>
                <View style={{flexDirection : 'row', flexWrap : 'wrap', gap : 3}}>
                    {participants.map((user, i) => <SimpleUserInfo key={i} userInfo={user} />)}
                </View>
                <FlatList
                    marginVertical={10}
                    horizontal={true}
                    data={participants}
                    keyExtractor={(item) => item.id}
                    alignItems='center'
                    renderItem={({item}) => <CircleUserImage mode='tiny' margin={5} index={item.id}/>}
                />
            </View>
        </ScrollView>
            {isParticipant?
                    null:
                    <Pressable style={Style.float_text_button} onPress={handleOnParticipatePress}>
                        <Text style={Style.float_text}>참여하기</Text>
                    </Pressable>
            }
        </View>
    );
};
function Test({child}){
    return(
        <>
        {child}
        </>
    );
}
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        //alignItems:'center'
    },
    scroll_container:{
        flex:1,
        alignSelf:'stretch',
    },
    do_title_img:{
        margin:10,
        alignSelf:'stretch',
        height:Dimensions.get('window').height*0.24,
        overflow:'hidden',
        backgroundColor:'white',
        // backgroundColor:'#c7c7c7',
        borderRadius:15
    },
    info_holder:{
        alignSelf:'stretch',
        marginVertical:5,
        marginHorizontal:10,
    },
    info_title:{
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:21,
        padding : 6,
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
    float_text_button:{
        position:'absolute',
        padding:15,
        right: 15,
        bottom: 15,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#84004E'
    },
    float_text:{
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:15,
        color:'white'
    },
    description:{
        fontFamily:'NanumGothic-Regular',
        fontSize:14,
        marginLeft:6,
        
    },
    place:{
        fontFamily:'NanumGothic-Regular',
        fontSize:14,
        marginLeft:6,
    }

});
export default DoInfoScreen;