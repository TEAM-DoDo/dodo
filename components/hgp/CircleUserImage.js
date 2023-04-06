import { Image, StyleSheet, View, Dimensions, Pressable } from "react-native";

function getUserImage(index){
    return require('../../assets/images/user_img_dummy.png');
}
function CircleUserImage({index,mode,onPress,margin=0}){
    var st = Style.standard;
    switch(mode){
        case 'standard':
            break;
        case 'chat':
            st = Style.chat;
            break;
        case 'expand':
            st = Style.expand;
            break;
    }
    return (
        <Pressable margin={margin} onPress={onPress}>
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