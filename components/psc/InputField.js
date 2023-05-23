//Import ---------------------------------------------------
//  Native
import { View, TextInput, StyleSheet } from "react-native";

//Definition Component ---------------------------------------------------
function InputField({placeholder, maxLength, onChangeText, keyboardType='default', value})
{
    return(
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={placeholder} keyboardType={keyboardType} 
            maxLength={maxLength} onChangeText={onChangeText} 
            autoCapitalize='none' value={value} />
        </View>
    );
}

export default InputField;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    container : {
        width : '99%',
        paddingBottom : 6,
        overflow : 'hidden',
        marginBottom : 20,
        elevation: 2,
        shadowColor: '#dddddd',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        fontFamily : 'NanumGothic-Bold',
        fontcolor : 'grey',
        
    },
    input : {
        width : '80%',
        height : 65,
        alignSelf : 'center',
        paddingHorizontal : 16,
        borderRadius : 16,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 20,
        fontFamily : 'NanumGothic-Bold',
        color : 'grey',
    },
});