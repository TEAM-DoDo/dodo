import {View,FlatList,Text,StyleSheet, Pressable} from 'react-native';
import { useState } from 'react';
import TopBar from '../components/hgp/TopBar';
import CircleUserImage from '../components/hgp/CircleUserImage';

function UserListScreen({navigation,route}){
    const [userList,setUserList] = useState([]);
    const onGoBackPressed = () => {
        navigation.goBack();
    }
    useState(() => {
        setUserList(route.params.data);
        return(()=>{
            setUserList([]);
        });
    },[]);
    return(
        <View style={Style.container}>
            <TopBar title="유저 목록" onGoBackPressed={onGoBackPressed} enableAlarmButton={false}/>
            <FlatList
                style={Style.list_container}
                data={userList}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return(
                        <UserItem id={item.id} name={item.nickname}/>
                    );
                }}
            />
        </View>
    );
}
const Style = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems:'center'
        backgroundColor:'white',
    },
    list_container: {
        flex: 1,
    }
});
function UserItem({id,name}){
    const onUserItemPress = () => {
        console.log(id + " 의 유저를 클릭했습니다.");
    }
    return(
        <Pressable style={UserItemStlye.container} onPress={onUserItemPress}>
            <CircleUserImage id={id} mode='expand'/>
            <Text style={UserItemStlye.username_text}>{name}</Text>
        </Pressable>
    );
}
const UserItemStlye = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        padding:10,
        borderRadius:10,
        backgroundColor:'#efefef',
        marginVertical:5,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        margin:10,
    },
    username_text: {
        fontSize: 16,
        marginHorizontal: 10,
        textAlignVertical:'center',
        fontFamily:'NanumGothic-Bold',
    },
});
export default UserListScreen;