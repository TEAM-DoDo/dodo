import { FlatList, Pressable, StyleSheet, Text, View, } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { useState,useEffect } from "react";
import API, { localIpAddress, portNumber } from "../../api/API";
import CircleUserImage from "./CircleUserImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
function DoButton({navigation,doId = 0}){
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const accessToken = useSelector((state) => state.jwt.access_token);
    if(doId == null){
        return null;
    }
    const onDoButtonPress = () =>{
        navigation.navigate("DoScreen",{id : doId, title : name});
    }
    useEffect(() => {
        API.get(`/api/do/${doId}`).then((response) => {
            //console.log(response.data);
            setName(response.data.name);
            //setCategory(response.data.category);
            setAddress(response.data.place);
            setImage(response.data.image);
        });
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
      }, []);

    return(
        <Pressable style={DoButtonStyle.container} onPress={onDoButtonPress}>
            <View style={DoButtonStyle.do_image}>
                <Image width="100%" height="100%" source={{
                uri:`http://${localIpAddress}:${portNumber}/api/do/${doId}/title-image?${Date.now()}`,
                headers:{ 
                    Authorization : `Bearer ${accessToken}`
                }
                }}/>
            </View>

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
        width:"100%",
        aspectRatio:2,
        backgroundColor:'white',
        marginVertical:10,
        borderRadius:30,
        flex:1,
        flexDirection:'row',
        //overflow:'hidden',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        // background color must be set
    },
    do_image:{
        backgroundColor:'gray',
        width:'40%',
        height:'100%',
        overflow:'hidden',
        borderBottomLeftRadius:30,
        borderTopLeftRadius:30
    },
    do_info_holder:{
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