import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

function TopBar({title='탑바 제목',enableAlarmButton=true,onAlarmPressed,onGoBackPressed}){
    return(
        <View style={Style.top_bar}>
        <Pressable style={Style.back_button} onPress={onGoBackPressed}>
            <AntDesign style={Style.back_button_img} size={24} name="back" color='black'/>
        </Pressable>
        <Text style={Style.title}>{title}</Text>
        <Pressable style={Style.back_button} onPress={enableAlarmButton?onAlarmPressed:null}>
            <MaterialCommunityIcons name="alarm-light-outline" size={24} color={enableAlarmButton?'black':'transparent'} />
        </Pressable>
    </View>
    );
}
const Style = StyleSheet.create({
    container:{
        container:{
            flexDirection:'column',
            flex:1,
        },
    },
    top_bar:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10,
    },
    back_button:{
        padding:10,
        borderRadius:15
    },
    button_pressed:{
        //버튼 눌렸을 때 이벤트
    }
    ,
    title:{
        textAlign: 'center',
        verticalAlign:'middle',
        alignSelf:'stretch',
        alignItems:'center',
        fontWeight:'bold',
        fontSize:25,
        //backgroundColor:'black',
    }
});
export default TopBar;