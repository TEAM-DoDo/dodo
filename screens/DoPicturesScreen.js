import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useState,useEffect } from "react";
import API, { jwt, localIpAddress,portNumber } from "../api/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import FloatingButton from "../components/hgp/FloatingButton";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-root-toast";
import mime from "mime";
import { useSelector } from "react-redux";
function DoPicturesScreen({navigation,route}){
    const [isUpdated, setIsUpdated] = useState(false);
    const [imagePathList, setImagePathList] = useState([]);
    const accessToken = useSelector((state) => state.jwt.access_token);
    const addNewPicture = async () => {
        //Do 구성원이 아니면 새로운 사진을 추가할 수 없게 해야함 혹은 버튼이 보이지 않도록 해야함
        var isDoParticipants = true;
        if(!isDoParticipants){
            return;
        }
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
        const formData = new FormData();
        for(var i = 0; i < result.assets.length;i++){
            let image = {
            uri: '',
            type: 'image/jpeg',
            name: 'test',
            };
            image.uri = result.assets[0].uri;
            image.name = image.uri.split("/").pop();
            image.type = mime.getType(image.uri);
            formData.append("files",image);
        }
        API.post(
            `/api/image/upload/${route.params.id}`,
            formData,
            {headers:{"Content-Type": `multipart/form-data`,}})
            .then(
                (response)=>{
                    updateData();
                })
            .catch((err)=>{console.log(err)})
    }
    const updateData = () => {
        //console.log("Update from do picture screen")
        API.get("/api/image/download/"+route.params.id+"/list")
        .then((responce) => {
                setImagePathList(responce.data.image_id);
                
            })
        .catch((error) => {
                console.error(error);
            });
        setIsUpdated(false);
    }
    useEffect(() => {
        //console.log('컴포넌트가 화면에 나타남');
        //두 번호를 넣으면 이미지 아이디 배열을 불러오는 함수
        updateData();
        return () => {
          //console.log('컴포넌트가 화면에서 사라짐');
        };
      }, []);
    return(
        <View style={Style.conatiner}>
            <FlatList
                refreshControl = {
                    <RefreshControl
                        refreshing= {isUpdated}
                        onRefresh={updateData}
                    />
                }
                data={imagePathList}
                keyExtractor={(item) => item}
                numColumns={2}
                renderItem={
                    (item) => {
                        //console.log(`Bearer ${token}`);
                        return(
                            <Image style={Style.do_image} source={
                                {
                                    uri:`http://${localIpAddress}:${portNumber}/api/image/download/${route.params.id}/${item.item}`,
                                    headers:{ 
                                        Authorization : `Bearer ${accessToken}`
                                    }
                                }
                            } alt="이미지를 불러올 수 없습니다."/>
                        );
                    }
                }
            />
            <FloatingButton onFloatingButtonPress={addNewPicture}/>
        </View>
    );
}
const Style = StyleSheet.create({
    conatiner:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
    },
    do_image:{
        flex:1,
        aspectRatio:1,
        backgroundColor:'#cfcfcf',
        margin:5,
        borderRadius:15,
    }
});
export default DoPicturesScreen;