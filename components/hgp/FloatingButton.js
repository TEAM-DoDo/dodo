import { FlatList, Image, Pressable, StyleSheet, Text, View, } from "react-native";
import { Entypo  } from '@expo/vector-icons'; 
import * as Notification from 'expo-notifications';
/***
 * 화면 : 플로팅 버튼
 * 제작자 :홍기표
 * 분리 부분은 나중에 컴포넌트로 만들어 분리할 예정
 */
function FloatingButton({onFloatingButtonPress}){
    if (Platform.OS === 'android') {
		Notification.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notification.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}
    const test = () =>{
        console.warn("알림 받았다");
    };
    Notification.addNotificationReceivedListener(test);
    const testEvent = async () => {
        //푸시알림 테스트용 함수
        console.log("푸시알림 보내는 중");
        await Notification.scheduleNotificationAsync({
            content:{
                title:"Test",
                body:"this is test noti.", 
            },
            trigger:{seconds : 5},
        });
    }
    return(
        <Pressable style={FloatingButtonStyle.conatiner} onPress={onFloatingButtonPress}>
            <Entypo name="plus" size={40} color="white" />
        </Pressable>
    );
}
const FloatingButtonStyle = StyleSheet.create({
    conatiner:{
        position:'absolute',
        width:60,
        height:60,
        right: 15,
        bottom: 15,
        borderRadius:200,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#84004E'
    }
});
export default FloatingButton;