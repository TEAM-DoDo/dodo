import {View,FlatList,Text,StyleSheet} from 'react-native';
import TopBar from '../components/hgp/TopBar';

function UserListScreen({navigation,route}){
    const onGoBackPressed = () => {
        navigation.goBack();
    }
    return(
        <View style={Style.container}>
            <TopBar title="유저 목록" onGoBackPressed={onGoBackPressed} enableAlarmButton={false}/>
            <FlatList
                data={[
                    {id:'1',name:'김현준',nickname:'김현준',profileImage:'https://cdn.discordapp.com/attachments/871329509909534464/871329541796653588/unknown.png'},
                    {id:'2',name:'김현준',nickname:'김현준',profileImage:'https://cdn.discordapp.com/attachments/871329509909534464/871329541796653588/unknown.png'},
                    {id:'3',name:'김현준',nickname:'김현준',profileImage:'https://cdn.discordapp.com/attachments/871329509909534464/871329541796653588/unknown.png'},
                ]}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <Text>{item.name}</Text>}
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
});
function UserItem({id,name,profileImage}){
    return(
        <View style={UserItemStlye.container}>
            <Text>{name}</Text>
        </View>
    );
}
const UserItemStlye = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    }
});
export default UserListScreen;