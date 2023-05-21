import { View,StyleSheet, FlatList } from "react-native";
import { useState , useEffect } from "react";
import TopBar from "../components/hgp/TopBar";
import DoNotice from "../components/hgp/DoNotice";

function DoNoticeScreen({navigation,route}){
    const [noticeId,setNoticeId] = useState([1,2,3,4]);
    useEffect(() => {
        //이곳에 do의 공지사항을 가져오는 코드 작성
        return(()=>{

        });
    },[]);
    const onGoBackPressed = () =>{
        navigation.goBack();
    }
    return(
        <View style={Style.container}>
            <TopBar title="Do 공지사항" onGoBackPressed={onGoBackPressed} enableAlarmButton={false}/>
            <FlatList
                style={Style.list_container}
                data={noticeId}
                keyExtractor={(item) => item}
                numColumns={1}
                renderItem={
                    (item) => 
                    <DoNotice doid={route.params.id} postid={item}/>
                }
            />
        </View>
    );
}
const Style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    list_container:{
        marginHorizontal:10,
    }
});
export default DoNoticeScreen;