//react
import { useState,useEffect } from "react";
import {Pressable, StyleSheet, View, Text, FlatList} from "react-native";

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



function DoInfoScreen({route, navigation}) {
    //console.log("from do info screen : " + route.params.id);
    //do에 대한 정보
    const [place, setPlace] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description,setDescription] = useState('');
    const [token,setToken] = useState('');
    //do Schedule에 대한 정보
    const [scheduleDate,setScheduleDate] = useState('');
    const [schedulePlace,setSchedulePlace] = useState('');
    const [scheduleCost,setScheduleCost] = useState('');
    const getDoParticipantsNum = () => {
        return 3;
    }
    if(route.params.id == null){
        navigation.goBack();
    }
    useEffect(() => {
        AsyncStorage.getItem("access_token",(err,result) => {
            //console.log(result)
            setToken(result);
            API.get(`/api/do/${0}`).then((response) => {
                //console.log(response.data);
                //setCategory(response.data.category);
                setPlace(response.data.place);
                setImage(response.data.image);
                setDescription(response.data.description);
            });
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
                duration: Toast.durations.LONG,
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
                duration: Toast.durations.LONG,
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
        console.log('file',image.uri);
        console.log('file',image.name);
        console.log('file',image.type);
        const formData = new FormData();
        formData.append("files",image);
        //타이틀 이미지를 
        API.post(
            `http://${localIpAddress}:${portNumber}/api/image/upload/${route.params.id}`,
            formData,
            {headers:{"Content-Type": `multipart/form-data`,}})
            .then((response)=>{console.log(response.status);}).catch((err)=>{console.log(err)})
    }
    const handleShowAllParcitipants = () => {

    }
    const handleShowNotice = () => {

    }
    return (
        <View style={Style.container}>
            <Pressable style={Style.do_title_img} onPress={handleDoImagePress}>
                <Image 
                    style={{
                        width:"100%",
                        height:"100%"
                    }} 
                    source={{
                        uri:`http://${localIpAddress}:${portNumber}/api/image/download/${route.params.id}/${image}?${Date.now()}`,
                        headers:{ 
                            Authorization : `Bearer ${token}`
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
        overflow:'hidden',
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