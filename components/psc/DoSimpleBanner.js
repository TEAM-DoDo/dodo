import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { localIpAddress, portNumber } from '../../api/API';
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';

const DoSimpleBanner = ({doInfo, tick}) => {
    // const tick = Date.now();
    const navigation = useNavigation();
    const moveToDoScreen = () =>
    {
        navigation.navigate("DoScreen", {
            id : doInfo.id,
            title : doInfo.name,
        });
    }

    const title = doInfo.name.length >= 10 ? doInfo.name.substr(0, 15) + "..." : doInfo.name;
    const place = doInfo.place.length >= 10 ? doInfo.place.substr(0, 15) + "..." : doInfo.place;
    const description = doInfo.description.length >= 10 ? doInfo.description.substr(0, 15) + "..." : doInfo.description;

    return(
        <View style={styles.outerContainer}>
            <Pressable onPress={moveToDoScreen} style={({pressed}) => [styles.pressArea, pressed ? styles.pressOpacity : null]} android_ripple={{color : Colors.button.rippleColor}}>
                <View style={styles.innerContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={{uri : `http://${localIpAddress}:${portNumber}/api/do/${doInfo.id}/title-image?${tick}`}} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.place}>{place}</Text>
                            <Text style={styles.description}>{description}</Text>
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
        marginLeft : 15,
        justifyContent : 'center',
    },
    titleContainer : {
        marginBottom : 10,
        justifyContent : 'center',
    },
    title : {
        fontSize : 25,
        fontFamily:'NanumGothic-Regular',
        fontWeight : 'bold'
    },
    detailContainer : {
        
    },
    place : {
        fontSize : 17,
        fontWeight : 'bold',
    },
    description : {
        fontSize : 13,
        marginTop : 3,
    }
});