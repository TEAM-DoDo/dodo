import { View, StyleSheet, Pressable, Text } from "react-native";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNExitApp from 'react-native-exit-app';

const LogoutButton = () => {
    const handleLogout = () => {
        AsyncStorage.removeItem("myDoListInfo");
        AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem("access_token");
        AsyncStorage.removeItem("refresh_token");
        RNExitApp.exitApp();
    }

    return(
        <View style={styles.rootContainer}>
            <Pressable onPress={handleLogout} android_ripple={{color : Colors.button.ripleColor}} 
            style={({pressed}) => [styles.pressArea, pressed ? styles.pressOpacity : null]} >
                <Text style={styles.text}>Logout</Text>
            </Pressable>
        </View>
    )
}

export default LogoutButton;

const styles = StyleSheet.create({
    rootContainer : {
        position : "absolute",
        top : 0,
        right : 0,
        width : 80,
        height : 40,
        backgroundColor : 'tomato',
        borderRadius : 10,
        overflow :'hidden',
    },
    pressArea : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    pressOpacity : {
        opacity : 0.5,
    },
    text : {
        fontSize : 20,
        fontWeight : 'bold',
        color : 'white',
    },
});