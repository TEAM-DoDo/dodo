import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { localIpAddress, portNumber } from '../../api/API';
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const DoSimpleBanner = ({doInfo}) => {
    console.log("do simple banner 정보 : ", doInfo);
    const navigation = useNavigation();
    const moveToDoScreen = () =>
    {
        navigation.navigate("DoScreen", {
            id : doInfo.id,
            title : doInfo.name,
        });
    }

    return(
        <View style={styles.outerContainer}>
            <Pressable onPress={moveToDoScreen} style={({pressed}) => [styles.pressArea, pressed ? styles.pressOpacity : null]} android_ripple={{color : Colors.button.rippleColor}}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{uri : `http://${localIpAddress}:${portNumber}/api/do/${doInfo.id}/title-image`}} />
                </View>
                <View style={styles.innerContainer}>
                    <View>
                        <Text>{doInfo.name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{doInfo.place}</Text>
                        <Text>|</Text>
                        <Text>{doInfo.description}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

export default DoSimpleBanner;

const styles = StyleSheet.create({
    outerContainer : {
        flexDirection : 'row',
        height : 50,
        width : '100%',
    },
    pressArea : {
        flex : 1,
    },
    pressOpacity : {
        opacity : 0.5,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    innerContainer : {

    },
    title : {
        fontSize : 30,
        fontFamily:'NanumGothic-Regular',
    },
    infoContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
    },
});