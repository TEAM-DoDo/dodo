//Import ---------------------------------------------------
//  React
import { useState } from "react";


//  Native
import { TouchableOpacity, View, Text, Button, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';


//Definition Component ---------------------------------------------------
function SelectCategoryScreen({ route, navigation }) {
    const userInfo = route.params.userInfo;
    console.log("SelectCategoryScreen에서 출력 : ", userInfo);
    const [selectedIcons, setSelectedIcons] = useState([]);


    function toggleIconSelection(iconName) {
        setSelectedIcons((prevState) => {
            if (prevState.includes(iconName)) {
                return prevState.filter((name) => name !== iconName);
            } else {
                return [...prevState, iconName];
            }
        });
    }

    function moveToSelectTrendCategoryScreen() {
        if (selectedIcons.length >= 2) {
            navigation.navigate("SelectTrendCategoryScreen", { selectedIcons });
        } else {
            alert("Please select at least two icons.");
        }
    }
    
    function pressHandler(){
        console.log('Pressed!');
    }

    return (
        <View style = {styles.container}>
            <Text>키워드</Text>
            <Pressable style={styles.button} onPress={pressHandler}>
                <Ionicons name="airplane" size={24} color="white"/>
            </Pressable>
        </View>
    );
}

export default SelectCategoryScreen;

//style ---------------------------------------------------

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#72063c',
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    }

});
