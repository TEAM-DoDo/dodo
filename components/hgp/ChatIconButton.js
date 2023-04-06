import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

function ChatIconButton({icon,onPress}){
    return(
        <Pressable
            style={Style.button_style}
            onPress={onPress}>
            <Image
                style={Style.icon_style}
                source={icon}
                />
        </Pressable>
    )
}
const Style = StyleSheet.create({
    button_style:{
        //backgroundColor:'black',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    icon_style:{
        margin:5,
        alignItems:'center',
        justifyContent:'center'
    }
});
export default ChatIconButton;
