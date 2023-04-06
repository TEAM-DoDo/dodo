/***
 * 화면 : 알람창 화면
 * 제작자 :홍기표
 * 
 */
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { AlarmDummy } from "../components/hgp/DummyData";
import AlarmBox from "../components/hgp/AlarmBox";

function AlarmScreen(){
    const handleGoBack = () =>{
        console.log('안녕하세요');
    }
    return(
        <View>
            <View style={Style.top_bar}>
                <Pressable style={Style.back_button} onPress={handleGoBack}>
                    <Image style={Style.back_button_img} source={require('../assets/images/icons/back.png')}/>
                </Pressable>
                <Text style={Style.title}>알림 내역</Text>
            </View>
            <FlatList
                data={AlarmDummy}
                keyExtractor={(item) => item.index}
                numColumns={1}
                renderItem={({item}) =><AlarmBox title={item.title} context={item.context}/>}
            />
        </View>
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
    }
    ,
    top_bar:{
        width:'100%',
        height:60,
        elevation: 2,
        flexDirection:'row',
        //backgroundColor:'black',
        elevation:2,
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        alignItems:'center'
    },
    back_button:{
        position:'absolute',
        top:10,
        start:10,
    }
    ,
    back_button_img:{
        margin:5,
        width:Dimensions.get('screen').width*0.05,
        height:Dimensions.get('screen').width*0.05,
    },
    title:{
        textAlign: 'center',
        verticalAlign:'middle',
        alignSelf:'stretch',
        alignItems:'center',
        fontWeight:'bold',
        fontSize:25,
        width:'100%',
        //backgroundColor:'black',
    }
});
export default AlarmScreen;