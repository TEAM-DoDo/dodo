import { Image, StyleSheet, View, Dimensions, Pressable } from "react-native";

function getUserImage(index){
    return require('../../assets/images/user_img_dummy.png');
}
function CircleUserImage({index,mode,onPress,margin=0}){
    const handleUserImagePress = () => {
        console.log(index + '번 유저 이미지가 클릭되었습니다.')
        return onPress;
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
            <Image style={st} source={getUserImage(index)} width={100}/>
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
        width:Dimensions.get('window').width*0.05,
        height:Dimensions.get('window').width*0.05,
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