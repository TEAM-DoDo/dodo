import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { IconData } from '../../data/IconData';

const SimpleCategory = ({text}) => {
    return(
        <View style={styles.contentContainer}>
            <Text style={styles.content}>{text in IconData?IconData[text]:text}</Text>
        </View>
    );
}

export default SimpleCategory;

const styles = StyleSheet.create({
    contentContainer : {
        flexBasis: '24%',
        backgroundColor : '#FAEBD7',
        height : 30,
        borderRadius : 14,
        justifyContent : 'center',
        alignItems : 'center',

        // IOS shadow
        shadowColor : '#c5c5c5',
        shadowOffset : { height : 3, },
        shadowOpacity : 1,
        // Android shadow
        elevation : 10,
    },
    content : {
        fontFamily:'NanumGothic-ExtraBold',
        fontWeight : 'bold',
        fontSize : 15,
        color : 'black',
        letterSpacing : 1.5
    },
});