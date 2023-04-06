//Import ---------------------------------------------------
//  Native
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

//Definition Component ---------------------------------------------------
function Title({children, style}) //Intro화면의 title을 위해 style을 받음
{
    return(
        <View style={styles.container}>
            <Text style={[styles.text, style]}>{children}</Text>
        </View>
    );
}

export default Title;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    container : {
        padding : 6,
    },
    text : {
        color : Colors.title.titleColor,
        fontSize : 40,
        fontFamily : 'NanumGothic-Bold',
        textAlign : 'center',
    },
});