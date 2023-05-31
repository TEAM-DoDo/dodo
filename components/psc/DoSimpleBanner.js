import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { localIpAddress, portNumber } from '../../api/API';
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { useSelector } from 'react-redux';

const DoSimpleBanner = ({doInfo, tick}) => {
    // const tick = Date.now();
    const navigation = useNavigation();
    const accessToken = useSelector((state) => state.jwt.access_token);
    const moveToDoScreen = () =>
    {
        navigation.navigate("DoScreen", {
            id : doInfo.id,
            title : doInfo.name,
        });
    }

    const title = doInfo.name;
    const place = doInfo.place;
    const description = doInfo.description.length >= 30 ? doInfo.description.substr(0, 30) + "..." : doInfo.description;

    return(
        <View style={styles.outerContainer}>
            <Pressable onPress={moveToDoScreen} style={({pressed}) => [styles.pressArea, pressed ? styles.pressOpacity : null]} android_ripple={{color : Colors.button.rippleColor}}>
                <View style={styles.innerContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} 
                            source={
                                {
                                    uri : `http://${localIpAddress}:${portNumber}/api/do/${doInfo.id}/title-image?${tick}`,
                                    headers : {
                                        //jwt 토근을 헤더에 포함시켜서 보내야 함
                                        Authorization : `Bearer ${accessToken}`
                                    }
                                }
                            } 
                            />
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
        paddingHorizontal : 7,
        paddingVertical : 7,
    },
    avatarContainer: {
        height : "100%",
        aspectRatio : 1,
        borderRadius : 15,
        overflow : 'hidden',  
    },
    avatar: {
        width: '100%',
        height: '100%',
        backgroundColor : 'grey',
    },
    infoContainer : {
        flex : 1,
        height : '100%',
        marginHorizontal : 5,
        justifyContent : 'flex-start',
        //backgroundColor : 'white',
    },
    titleContainer : {
        justifyContent : 'center',
    },
    title : {
        fontSize : 18,
        fontFamily:'NanumGothic-Regular',
        fontWeight : 'bold'
    },
    detailContainer : {
        overflow : 'hidden',
    },
    place : {
        fontSize : 15,
        fontWeight : 'bold',
    },
    description : {
        fontSize : 13,
        marginTop : 3,
    }
});