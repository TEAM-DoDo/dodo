import { FlatList, Image, Pressable, StyleSheet, Text, View, } from "react-native";
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { ChatDummy, ChatParticipantsDummy, DoInfoDummy } from "../components/hgp/DummyData";
import ChatBox from "../components/hgp/ChatBox";
import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import moment from "moment/moment";
import CircleUserImage from "../components/hgp/CircleUserImage";
import axios from 'axios';
import FormData from "form-data";
import mime from "mime";
import * as Location from "expo-location" // yarn add expo-location expo-task-manager
import { useState, useEffect } from "react";
import { localIpAddress, portNumber } from "../api/API";

/***
 * 화면 : 홈 화면
 * 제작자 :홍기표
 * 분리 부분은 나중에 컴포넌트로 만들어 분리할 예정
 */

//플로팅 버튼 부분
function FloatingButton({ onFloatingButtonPress }) {
    if (Platform.OS === 'android') {
        Notification.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notification.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    const test = () => {
        console.warn("알림 받았다");
    };
    Notification.addNotificationReceivedListener(test);
    const testEvent = async () => {
        //푸시알림 테스트용 함수
        console.log("푸시알림 보내는 중");
        await Notification.scheduleNotificationAsync({
            content: {
                title: "Test",
                body: "this is test noti.",
            },
            trigger: { seconds: 5 },
        });
    }
    return (
        <Pressable style={FloatingButtonStyle.conatiner} onPress={onFloatingButtonPress}>
            <Entypo name="plus" size={40} color="white" />
        </Pressable>
    );
}
const FloatingButtonStyle = StyleSheet.create({
    conatiner: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 15,
        bottom: 15,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#84004E'
    }
});

//리스트 항목 부분
function DoButton({ category = "카테고리 정보", date = new Date(), pos = "do 위치", onDoButtonPress }) {
    return (
        <Pressable style={DoButtonStyle.container}>
            <Image style={DoButtonStyle.do_image} />
            <View style={DoButtonStyle.do_info_holder}>
                <Text style={DoButtonStyle.do_title}>Do 제목 입니다</Text>
                <Text style={DoButtonStyle.do_small_info}>카테고리 : {category}</Text>
                <View>
                    <Text style={DoButtonStyle.do_small_info}>참여자</Text>
                    <FlatList
                        horizontal={true}
                        data={ChatParticipantsDummy}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => <CircleUserImage mode='tiny' margin={2} index={item} />} />
                </View>

                <View style={DoButtonStyle.do_pos_date_holder}>
                    <View flexDirection='row' alignItems='center'>
                        <FontAwesome name="map-marker" size={18} color="gray" />
                        <Text style={[DoButtonStyle.do_small_info, { marginStart: 5 }]}>{pos}</Text>
                    </View>
                    <Text style={DoButtonStyle.do_small_info}>{moment(date).format("YYYY.MM.DD")}</Text>
                </View>
            </View>
        </Pressable>
    );
}
const DoButtonStyle = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        height: 150,
        borderRadius: 30,
        backgroundColor: "white",
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 2,
        shadowColor: 'black', //only work for ios
        shadowOffset: { width: 2, height: 2 }, //only work for ios
        shadowOpacity: 1, //only work for ios
        shadowRadius: 6, //only work for ios
    },
    do_image: {
        backgroundColor: 'gray',
        width: '40%',
        height: '100%',
    },
    do_info_holder: {
        backgroundColor: '#fdfdfd',
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    do_title: {
        fontFamily: 'NanumGothic-ExtraBold',
        color: '#969696',
        fontSize: 16
    },
    do_small_info: {
        fontFamily: 'NanumGothic-Bold',
        color: '#969696',
        fontSize: 14,
        paddingVertical: 2,
    },
    do_pos_date_holder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
        //backgroundColor:'gray'
    },
});
//홈화면
function HomeScreen({ navigation }) {
    const handleAlarmButton = () => {

    }
    const handleSearchButton = () => {

    }
    const handleFloatingButton = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const image = {
            uri: '',
            type: 'image/jpeg',
            name: 'test',
        };
        image.uri = result.assets[0].uri;
        image.name = image.uri.split("/").pop();
        image.type = mime.getType(image.uri);
        console.log('file', image.uri);
        console.log('file', image.name);
        console.log('file', image.type);
        const formData = new FormData();
        formData.append("files", image);
        axios.post(
            `http://${localIpAddress}:${portNumber}/api/image/upload/1`,
            formData,
            { headers: { "Content-Type": `multipart/form-data`, } }).then((response) => { console.log(response.status); }).catch((err) => { console.log(err) })
    }

    // const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    // const handleCurrentLocation = async () => {
    //     let { status } = await getLastNotificationResponseAsync.requestForegroundPermissionAsync();
    //     if (status !== 'granted'){
    //         // handle permission denied
    //         return;
    //     }
    useEffect(() => {
        getLocationPermission();
    }, []);

    const getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Location permission denied");
        }
    };

    const handleCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Location permission denied");
            return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log(currentLocation);
    };

    return (
        <View style={Style.container}>
            <View style={Style.top_bar}>
                <Pressable style={Style.pos_show_button} onPress={handleCurrentLocation}>
                    <FontAwesome name="map-marker" size={36} color="black" />
                    <Text style={Style.post_show_text}>현재 위치</Text>
                </Pressable>

                <View style={Style.pos_show_button}>
                    <Pressable style={Style.icon_button} onPress={handleSearchButton}>
                        <FontAwesome name="search" size={34} color='black' />
                    </Pressable>
                    <Pressable style={Style.icon_button} onPress={handleAlarmButton}>
                        <MaterialCommunityIcons name="alarm-light-outline" size={36} color='black' />
                    </Pressable>
                </View>

            </View>
            <FlatList
                data={DoInfoDummy}
                keyExtractor={(item) => item.index}
                numColumns={1}
                renderItem={({ item }) => <DoButton />}
                render={handleCurrentLocation}
            />
            <FloatingButton onFloatingButtonPress={handleFloatingButton} />
        </View>

    );
}
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    top_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 60,
        backgroundColor: 'gray'
    },
    pos_show_button: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    post_show_text: {
        fontFamily: 'NanumGothic-ExtraBold',
        fontSize: 28,
        marginStart: 5,
        color: '#E30A8B',
    },
    icon_button: {
        margin: 5
    }
});
export default HomeScreen;