import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

function AlarmBox({title,context}){
    return(
        <Pressable style={({pressed}) => [Style.alarm_box,pressed?Style.opacityWhenPressed:null]}>

            <Text style={Style.alarm_title}>{title}</Text>
            <Text>{context}</Text>

        </Pressable>
    );
}
const Style = StyleSheet.create({
    alarm_box:{
        padding:10,
        marginHorizontal:10,
        marginVertical:5,
        backgroundColor:'#D9D9D9',
        borderRadius:15,
        elevation:5,
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
    },
    alarm_title:{
        fontWeight:'bold',
        fontSize:15
    },
    opacityWhenPressed : {
        backgroundColor:'#C7C7C7'
    },
});
export default AlarmBox;