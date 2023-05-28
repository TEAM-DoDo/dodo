import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';

const SimpleCategory = ({text}) => {
    console.log("관심사", text);
    return(
        <View>
            <Text>{text}</Text>
        </View>
    );
}

export default SimpleCategory;

const styles = StyleSheet.create({

});