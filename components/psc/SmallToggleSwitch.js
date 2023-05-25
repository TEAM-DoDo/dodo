//Import ---------------------------------------------------
//  Native
import { View, StyleSheet, Pressable, TextInput, Text } from "react-native";

//  Colors
import Colors from "../../constants/Colors";

//Definition Component ---------------------------------------------------
function SmallToggleSwitch({children, handler, selectedGender,})
{
    const isSelected = selectedGender == children;

    return  (
        <View style={styles.outerContainer}>
            <Pressable style={({pressed})=>[styles.innerContainer, pressed ? styles.opacityWhenPressed : null, isSelected ? styles.selectedInnerContainer : null]} 
            // <Pressable style={({pressed})=>[styles.innerContainer, pressed ? styles.opacityWhenPressed : null, isSelected ? styles.selectedInnerContainer : null]}
            android_ripple={{color : Colors.genderToggle.rippleColor}}
            onPress={()=>handler(children)}>
                <Text style={[styles.text, isSelected ? styles.selectedTextColor : null]}>{children}</Text>
                {/* <Text style={[styles.text, isSelected ? styles.selectedTextColor : null]}>{children}</Text> */}
            </Pressable>
        </View>
    );
}

export default SmallToggleSwitch;

const styles = StyleSheet.create({
    outerContainer : {
        height:"95%",
        aspectRatio:1,
        borderRadius : 15,
        marginHorizontal:5,
        overflow : 'hidden',
        elevation : 8, //only work for android
        shadowColor : 'black', //only work for ios
        shadowOffset : {width : 2, height : 2}, //only work for ios
        shadowOpacity : 0.25, //only work for ios
        shadowRadius : 6, //only work for ios
    },
    innerContainer : {
        backgroundColor : Colors.genderToggle.nonSelectedButtonColor,
        padding : 18,
    },
    text : {
        color : Colors.genderToggle.nonSelectedTextColor,
        textAlign : 'center',
        fontFamily : 'NanumGothic-Bold',
        fontSize : 20,
    },
    opacityWhenPressed : {
        opacity : 0.9,
    },
    selectedInnerContainer : {
        backgroundColor : Colors.genderToggle.selectedButtonColor,
    },
    selectedTextColor : {
        color : Colors.genderToggle.selectedTextColor,
    },
});