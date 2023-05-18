import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useState,useEffect } from "react";
import API, { jwt, localIpAddress,portNumber } from "../api/API";
function DoPicturesScreen({doIndex = 1}){
    const [imagePathList, setImagePathList] = useState([]);
    //두 번호를 넣으면 이미지 아이디 배열을 불러오는 함수
    const getImageIndex = () => {
        API.get("/api/image/download/"+doIndex+"/list")
            .then(
                (responce) => {
                    setImagePathList(responce.data.image_id);
                })
            .catch(
                (error) => {
                    console.error(error);
                });
    }
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남');
        getImageIndex();
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
      }, []);
    return(
        <View style={Style.conatiner}>
            <FlatList
                data={imagePathList}
                keyExtractor={(item) => item}
                numColumns={2}
                renderItem={
                    (item) =>
                    <Image style={Style.do_image} source={
                        {
                            uri:`http://${localIpAddress}:${portNumber}/api/image/download/${doIndex}/${item.item}`,
                            headers:{ 
                                Authorization : `Bearer ${jwt}`
                            }
                        }
                    } alt="이미지를 불러올 수 없습니다."/>
                }
            />
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