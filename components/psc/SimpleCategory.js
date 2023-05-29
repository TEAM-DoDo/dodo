import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';

const SimpleCategory = ({text}) => {
    return(
        <View style={styles.contentContainer}>
            <Text style={styles.content}>{text}</Text>
        </View>
    );
}

export default SimpleCategory;

const styles = StyleSheet.create({
    contentContainer : {
        backgroundColor : 'tomato',
        width : 85,
        height : 30,
        borderRadius : 10,
        justifyContent : 'center',
        alignItems : 'center',
    },
    content : {
        fontWeight : 'bold',
        fontSize : 15,
        color : 'white',
        letterSpacing : 1.5
    },
});