//Import ---------------------------------------------------
//  Native
import { View, TextInput, StyleSheet } from "react-native";

//Definition Component ---------------------------------------------------
function InputField({placeholder, maxLength, onChangeText, keyboardType='default'})
{
    return(
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={placeholder} keyboardType={keyboardType} 
            maxLength={maxLength} onChangeText={onChangeText} 
            autoCapitalize='none' />
        </View>
    );
}

export default InputField;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    container : {
        width : '100%',
        paddingBottom : 6,
        overflow : 'hidden',
        marginBottom : 20,
        elevation: 2,
        shadowColor: '#dddddd',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
    },
    input : {
        width : '80%',
        height : 70,
        alignSelf : 'center',
        paddingHorizontal : 16,
        borderRadius : 16,
        borderColor : 'grey',
        borderWidth : 1,
        fontSize : 20,
        fontFamily : 'NanumGothic-Bold',
    },
});