import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import AlarmScreen from "../../screens/AlarmScreen";
import ChatScreen from "../../screens/ChatScreen";
import DoInfoScreen from "../../screens/DoInfoScreen";
const TabBar = createMaterialTopTabNavigator();
function DoScreenHolder(){
    return(
        <TabBar.Navigator>
        <TabBar.Screen flex={1} name="정보" component={DoInfoScreen}/>
        <TabBar.Screen name="게시글" component={AlarmScreen}/>
        <TabBar.Screen name="채팅" component={ChatScreen}/>
    </TabBar.Navigator>
    );
}
export default DoScreenHolder;