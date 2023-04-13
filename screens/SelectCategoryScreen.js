//Import ---------------------------------------------------
//  React
import { useState } from "react";


//  Native
import { TouchableOpacity, View, Text, Button, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


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

    function pressHandler() {
        console.log('Pressed!');
    }

    return (
        <View>
            <Text style={styles.titleText}>{"키워드🔥"}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Pressable style={styles.button} onPress={pressHandler}>
                    <Ionicons name="airplane" size={24} color="white" />
                    <Text style={styles.buttonTitle}>{"여행"}</Text>
                </Pressable>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Pressable style={styles.button} onPress={pressHandler}>
                    <MaterialIcons name="brush" size={24} color="white" />
                    <Text style={styles.buttonTitle}>{"공예"}</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default SelectCategoryScreen;

//style ---------------------------------------------------

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#72063c',
        borderRadius: 28,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    buttonTitle: {
        color: 'white',
        textAlign: 'center'
    },
    titleText: {
        color: "#E30A8B",
        fontSize: 30,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingVertical: 16,
        paddingHorizontal: 16
    }

});
