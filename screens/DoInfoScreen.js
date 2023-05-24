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

//API
import API, { localIpAddress, portNumber } from "../api/API";

//library
import moment from "moment";
import 'moment/locale/ko';
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "mime";
import Toast from "react-native-root-toast";
import DoNotice from "../components/hgp/DoNotice";
import { useSelector } from "react-redux";

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
    const [scheduleDate,setScheduleDate] = useState('');
    const [schedulePlace,setSchedulePlace] = useState('');
    const [scheduleCost,setScheduleCost] = useState('');
    const updateData = () => {
        API.get(`/api/do/${route.params.id}`).then((response) => {
            //console.log(response.data);
            //console.log(response.data);
            //setCategory(response.data.category);
            setPlace(response.data.place);
            //setImage(response.data.image);
            setDescription(response.data.description);
            setTick(Date.now());
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
    });
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
        navigation.navigate("DoScheduleAddScreen");
    }
    const handleShowAllParcitipants = () => {

    }
    const handleShowNotice = () => {
        navigation.navigate("DoNoiceScreen",{id:route.params.id});
    }
    return (
        <ScrollView style={Style.container}>
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
                <Text>{description}</Text>
            </View>
            <View style={Style.info_holder}>
                <Text style={Style.info_title}>지역</Text>
                <Text>{place}</Text>
            </View>
            <View style={Style.info_holder}>
                <View flexDirection='row' alignItems='center'>
                    <Text style={Style.info_title}>일정</Text>
                    <Pressable>
                        <Entypo name="circle-with-plus" size={16} margin={5} color="gray" />
                    </Pressable>
                </View>
                <DoSchedule isEmpty={true} onEmptySchedulepress={handleEmptyShedulePress}/>
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
                </View>
                <Pressable onPress={handleShowNotice}>
                    <DoNotice doid={route.params.id} postid="last"/>
                </Pressable>
            </View>
        </ScrollView>
    );
};
const Style = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems:'center'
    },
    do_title_img:{
        margin:10,
        alignSelf:'stretch',
        height:Dimensions.get('window').height*0.2,
        overflow:'hidden',
        backgroundColor:'#c7c7c7',
        borderRadius:15
    },
    info_holder:{
        alignSelf:'stretch',
        marginVertical:5,
        marginHorizontal:10,
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

});
export default DoInfoScreen;