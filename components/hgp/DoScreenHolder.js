import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import ChatScreen from "../../screens/ChatScreen";
import DoInfoScreen from "../../screens/DoInfoScreen";
import DoPicturesScreen from "../../screens/DoPicturesScreen";
const TabBar = createMaterialTopTabNavigator();
function DoScreenHolder({doId}){
    console.log("from do screen holder : " + doId);
    return(
        <TabBar.Navigator flex={1}
         screenOptions={{
            tabBarLabelStyle:{
                fontFamily:'NanumGothic-ExtraBold',
                fontSize:18
            },
        }}>
        <TabBar.Screen name="정보" component={DoInfoScreen} initialParams={{id : doId}}/>
        <TabBar.Screen name="사진" component={DoPicturesScreen} initialParams={{id : doId}}/>
        <TabBar.Screen name="채팅" component={ChatScreen} initialParams={{id : doId}}/>
    </TabBar.Navigator>
    );
}
export default DoScreenHolder;