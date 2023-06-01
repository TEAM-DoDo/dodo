import { View, StyleSheet, Pressable, Text,BackHandler } from "react-native";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../store/user-store";
import { removeAccessToken, removeRefreshToken } from "../../store/jwt-store";


const LogoutButton = ({navigation}) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        //dispatch(removeUserInfo())
        //dispatch(removeMyDoList());
        dispatch(removeAccessToken());
        dispatch(removeRefreshToken());
        navigation.reset({routes: [{name: "StartUpScreen"}]});
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