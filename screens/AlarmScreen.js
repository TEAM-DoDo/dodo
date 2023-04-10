/***
 * 화면 : 알람창 화면
 * 제작자 :홍기표
 * 
 */
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { AlarmDummy } from "../components/hgp/DummyData";
import AlarmBox from "../components/hgp/AlarmBox";
import TopBar from "../components/hgp/TopBar";

function AlarmScreen({navigation}){
    const handleGoBack = () =>{
        console.log('알림 화면에서 나갑니다.');
        navigation.goBack()
    }
    return(
        <View style={Style.conatiner}>
            <TopBar title="알림 내역" onGoBackPressed={handleGoBack} enableAlarmButton={false} />
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
    conatiner:{
        backgroundColor:'white',
        flex:1
    },
});
export default AlarmScreen;