import { FlatList, Pressable, StyleSheet, Text, View, } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { useState,useEffect } from "react";
import API, { localIpAddress, portNumber } from "../../api/API";
import CircleUserImage from "./CircleUserImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
function DoButton({navigation,onDoButtonPress,doId = 0}){
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [token,setToken] = useState('');
    if(doId == null){
        return null;
    }
    const test = () =>{
        navigation.navigate("DoScreen");
    }
    useEffect(() => {
        API.get(`/api/do/${doId}`).then((response) => {
            //console.log(response.data);
            setName(response.data.name);
            setCategory(response.data.category);
            setAddress(response.data.address);
            setImage(response.data.image);
        });
        AsyncStorage.getItem("access_token",(err,result) => {
            //console.log(result)
            setToken(result);
        });
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
      }, []);

    return(
        <Pressable style={DoButtonStyle.container} onPress={test}>
            <Image style={DoButtonStyle.do_image} source={{
                uri:`http://${localIpAddress}:${portNumber}/api/image/download/${doId}/${image}`,
                headers:{ 
                    Authorization : `Bearer ${token}`
                }
            }}/>
            <View style={DoButtonStyle.do_info_holder}>
                <Text style={DoButtonStyle.do_title}>{name}</Text>
                <Text style={DoButtonStyle.do_small_info}>카테고리 : {category}</Text>
                <View>
                    <Text style={DoButtonStyle.do_small_info}>참여자</Text>
                    <FlatList
                        horizontal={true}
                        data={[0]}
                        keyExtractor={(item) => item}
                        renderItem={({item}) => <CircleUserImage mode='tiny' margin={2} index={item}/>}/>
                </View>

                <View style={DoButtonStyle.do_pos_date_holder}>
                    <View flexDirection='row' alignItems='center'>
                        <FontAwesome name="map-marker" size={18} color="gray"/>
                        <Text style={[DoButtonStyle.do_small_info,{marginStart:5}]}>{address}</Text>
                    </View>
                    {/* <Text style={DoButtonStyle.do_small_info}>{moment(date).format("YYYY.MM.DD")}</Text> */}
                </View>
            </View>
        </Pressable>
    );
}
const DoButtonStyle = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginVertical:10,
        height:150,
        borderRadius:30,
        backgroundColor:"white",
        flex:1,
        flexDirection:'row',
        overflow:'hidden',
        elevation:2,
        shadowColor : 'black', //only work for ios
        shadowOffset : {width : 2, height : 2}, //only work for ios
        shadowOpacity : 1, //only work for ios
        shadowRadius : 6, //only work for ios
    },
    do_image:{
        backgroundColor:'gray',
        width:'40%',
        height:'100%',
    },
    do_info_holder:{
        backgroundColor:'#fdfdfd',
        flex:1,
        padding:10,
        justifyContent:'space-between'
    },
    do_title:{
        fontFamily:'NanumGothic-ExtraBold',
        color:'#969696',
        fontSize:16
    },
    do_small_info:{
        fontFamily:'NanumGothic-Bold',
        color:'#969696',
        fontSize:14,
        paddingVertical:2,
    },
    do_pos_date_holder:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
        //backgroundColor:'gray'
    },
});
export default DoButton;