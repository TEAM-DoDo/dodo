import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { localIpAddress, portNumber } from "../../api/API";
function CircleUserImage({id,mode,imagePath,onPress,margin=0}){
    const accessToken = useSelector(state => state.jwt.access_token);
    const handleUserImagePress = () => {
        console.log(id + '번 유저 이미지가 클릭되었습니다.')
        if(onPress){
            onPress();
        } 
    }
    var st = Style.standard;
    switch(mode){
        case 'standard':
            break;
        case 'chat':
            st = Style.chat;
            break;
        case 'tiny':
            st = Style.tiny;
            break;
        case 'minimize':
            st = Style.minimize;
            break;
        case 'expand':
            st = Style.expand;
            break;
    }
    return (
        <Pressable margin={margin} onPress={handleUserImagePress}>
            <Image style={st} source={
                imagePath == null ?require('../../assets/images/user_img_dummy.png'):
                {
                    uri:`http://${localIpAddress}:${portNumber}/api/users/${id}/profile-image?${new Date().getTime()}`,
                    headers:{
                        Authorization:`Bearer ${accessToken}`
                    }
                }
            } width={100}/>
        </Pressable>

    );
}
const Style = StyleSheet.create({
    chat:{
        borderRadius:200,
        //backgroundColor:'white',
        width:Dimensions.get('window').width*0.1,
        height:Dimensions.get('window').width*0.1,
        marginTop:Dimensions.get('window').width*0.025,
    },
    tiny:{
        borderRadius:200,
        //backgroundColor:'white',
        width:Dimensions.get('window').width*0.07,
        height:Dimensions.get('window').width*0.065,
    },
    minimize:{
        borderRadius:200,
        //backgroundColor:'white',
        width:Dimensions.get('window').width*0.08,
        height:Dimensions.get('window').width*0.08,
    },
    standard:{
        borderRadius:200,
        //backgroundColor:'white',
        width:Dimensions.get('window').width*0.1,
        height:Dimensions.get('window').width*0.1,
    },
    expand:{
        borderRadius:200,
        //backgroundColor:'white',
        width:Dimensions.get('window').width*0.12,
        height:Dimensions.get('window').width*0.12,
    }
});
export default CircleUserImage;