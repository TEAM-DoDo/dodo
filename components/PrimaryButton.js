//Import ---------------------------------------------------
//  Cores
import { Pressable, View, Text, StyleSheet } from "react-native";

//  Colors
import Colors from "../constants/Colors";

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
        borderRadius : 20,
        width : '80%',
        alignSelf : 'center',
        overflow : 'hidden',
    },
    innerContainer : {
        backgroundColor : Colors.button.mainBackgroundColor,
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