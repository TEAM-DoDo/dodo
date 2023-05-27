import { FlatList, Image, Pressable, StyleSheet, Text, View, } from "react-native";
import { FontAwesome, MaterialCommunityIcons,Entypo  } from '@expo/vector-icons'; 
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from "form-data";
import mime from "mime";
import * as Location from "expo-location" // yarn add expo-location expo-task-manager
import { useState,useEffect } from "react";
import API, { localIpAddress, portNumber } from "../api/API";
import FloatingButton from "../components/hgp/FloatingButton";
import DoButton from "../components/hgp/DoButton";
/***
 * 화면 : 홈 화면
 * 제작자 :홍기표
 * 분리 부분은 나중에 컴포넌트로 만들어 분리할 예정
 */
//리스트 항목 부분
//홈화면
function HomeScreen({navigation}){
    var [doList,setDoList] = useState([]);
    const updateDoData = () => {
        API.get("/api/do/list").then((response) => {
            setDoList(response.data.do_id);
        });
    }
    useEffect(() => {
        navigation.addListener('focus',() => {
            updateDoData();
        });
        updateDoData();
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
      }, []);
    const handleAlarmButton = () => {

    }
    const handleSearchButton = () => {

    }
    const handleFloatingButton = async () => {
        navigation.navigate("DoCreateScreen");
    }
    const moveToDoScreen = (doIndex) => {
        
    };

    // const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    // const handleCurrentLocation = async () => {
    //     let { status } = await getLastNotificationResponseAsync.requestForegroundPermissionAsync();
    //     if (status !== 'granted'){
    //         // handle permission denied
    //         return;
    //     }


    const handleCurrentLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
        if (status !== 'granted') {
          // handle permission denied
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
    }

    return(
        <View style={Style.container}>
            <View style={Style.top_bar}>
                <Pressable style={Style.pos_show_button} onPress={handleCurrentLocation}>
                    <FontAwesome name="map-marker" size={36} color="black" />
                    <Text style={Style.post_show_text}>현재 위치</Text>
                </Pressable>
                
                <View style={Style.pos_show_button}>
                    <Pressable style={Style.icon_button} onPress={handleSearchButton}>
                        <FontAwesome name="search" size={34} color='black'/>
                    </Pressable>
                    <Pressable style={Style.icon_button} onPress={handleAlarmButton}>
                        <MaterialCommunityIcons name="alarm-light-outline" size={36} color='black'/>
                    </Pressable>
                </View>

            </View>
            <FlatList
                style={Style.list_holder}
                data={doList}
                keyExtractor={(item) => item}
                numColumns={1}
                renderItem={({item}) => <DoButton navigation={navigation} doId={item}/>}
                render={handleCurrentLocation}
            />
            <FloatingButton onFloatingButtonPress={handleFloatingButton}/>
        </View>
        
    );
}
const Style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    top_bar:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10,
        height:60,
        //backgroundColor:'gray'
    },
    list_holder:{
        padding:10,
    },
    pos_show_button:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    post_show_text:{
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:28,
        marginStart:5,
        color:'#E30A8B',
    },
    icon_button:{
        margin:5
    }
});
export default HomeScreen;