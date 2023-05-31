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
        flexBasis: '30%',
        backgroundColor : '#E30A8B',
        height : 40,
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