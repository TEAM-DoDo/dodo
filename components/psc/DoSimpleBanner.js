import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { localIpAddress, portNumber } from '../../api/API';
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const DoSimpleBanner = ({id, name, description, place, bannerImagePath}) => {
    const navigation = useNavigation();
    const moveToDoScreen = () =>
    {
        navigation.navigate("DoScreen", {id});
    }

    return(
        <View style={styles.outerContainer}>
            <Pressable onPress={moveToDoScreen} style={({pressed}) => [styles.pressArea, pressed ? styles.pressOpacity : null]} android_ripple={{color : Colors.button.rippleColor}}>
                <View style={avatarContainer}>
                    <Image style={avatar} source={{uri : `http://${localIpAddress}:${portNumber}/api/do/${id}/title-image`}} />
                </View>
                <View style={innerContainer}>
                    <View>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={infoContainer}>
                        <Text>{place}</Text>
                        <Text>|</Text>
                        <Text>{description}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

export default DoSimpleBanner;

const styles = StyleSheet.create({
    outerContainer : {
        flex : 1,
        flexDirection : 'row',
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