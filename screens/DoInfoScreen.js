import {Pressable, StyleSheet, View, Text} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
const TabBar = createMaterialTopTabNavigator();
function DoInfoScreen({route, navigation}) {
    return (

        <View style={Style.container}>
            <Text>두 정보 화면</Text>
        </View>
    );
};
const Style = StyleSheet.create({
    container: {
        container: {
            flexDirection: 'column',
            flex: 1
        }
    }
});
export default DoInfoScreen;