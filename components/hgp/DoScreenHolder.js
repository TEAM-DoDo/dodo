import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import ChatScreen from "../../screens/ChatScreen";
import DoInfoScreen from "../../screens/DoInfoScreen";
import DoPicturesScreen from "../../screens/DoPicturesScreen";
const TabBar = createMaterialTopTabNavigator();
function DoScreenHolder(){
    return(
        <TabBar.Navigator flex={1}
        
         screenOptions={{
            tabBarLabelStyle:{
                fontFamily:'NanumGothic-ExtraBold',
                fontSize:18
            },

        }}>
        <TabBar.Screen name="정보" component={DoInfoScreen}/>
        <TabBar.Screen name="게시글" component={DoPicturesScreen}/>
        <TabBar.Screen name="채팅" component={ChatScreen}/>
    </TabBar.Navigator>
    );
}
export default DoScreenHolder;