import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { localIpAddress, portNumber } from '../../api/API';
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const DoSimpleBanner = ({doInfo}) => {
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
                <View style={styles.innerContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={{uri : `http://${localIpAddress}:${portNumber}/api/do/${doInfo.id}/title-image`}} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{doInfo.name}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.text}>{doInfo.place.split("로").shift()}</Text>
                            <Text style={[styles.text, styles.bar]}>|</Text>
                            <Text style={styles.text}>{doInfo.description.length >= 10 ? doInfo.description.substr(0, 7) + "..." : doInfo.description}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

export default DoSimpleBanner;

const styles = StyleSheet.create({
    outerContainer : {
        width : '100%',
        height : 120,
        backgroundColor : 'pink',
        borderRadius : 20,
        marginVertical : 5,
    },
    pressArea : {
        flex : 1,
    },
    pressOpacity : {
        opacity : 0.5,
    },
    innerContainer : {
        width : '100%',
        height : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 15,
        paddingVertical : 15,
    },
    avatarContainer: {
        width : 100,
        height : 100,
        borderRadius : 50,
        overflow : 'hidden',  
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    infoContainer : {
        flex : 1,
    },
    titleContainer : {
        alignItems : 'center',
        marginBottom : 10,
    },
    title : {
        fontSize : 20,
        fontFamily:'NanumGothic-Regular',
        fontWeight : 'bold'
    },
    detailContainer : {
        flexDirection : "row",
        justifyContent : 'center',
    },
    text : {
        fontSize : 15,
        fontWeight : 'bold',
    },
    bar : {
        marginHorizontal : 10,
    },

});