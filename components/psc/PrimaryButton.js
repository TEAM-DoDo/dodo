//Import ---------------------------------------------------
//  Cores
import { Pressable, View, Text, StyleSheet } from "react-native";

//  Colors
import Colors from "../../constants/Colors";

//Definition Component ---------------------------------------------------
function PrimaryButton({children, onPress})
{
    return(
        <View style={styles.outerContainer}>
            <Pressable onPress={onPress} style={({pressed}) => [styles.innerContainer, pressed ? styles.opacityWhenPressed : null]} 
            android_ripple={{color : Colors.button.rippleColor}}>
                <Text style={styles.text}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    outerContainer : {
        width : '80%',
        alignSelf : 'center',
        elevation : 8, //only work for android
        shadowColor : 'black', //only work for ios
        shadowOffset : {width : 2, height : 2}, //only work for ios
        shadowOpacity : 0.25, //only work for ios
        shadowRadius : 6, //only work for ios
        marginTop : '-5%',
        marginBottom : '16%',
    },
    innerContainer : {
        backgroundColor : Colors.button.mainBackgroundColor,
        borderRadius : 20,
        paddingVertical : 16,
    },
    text : {
        color : Colors.button.textColor,
        textAlign : 'center',
        fontFamily : 'NanumGothic-Bold',
        fontSize : 30,
        letterSpacing : 1,
    },
    opacityWhenPressed : {
        opacity : 0.9,
    },
});