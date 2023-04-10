//Import ---------------------------------------------------
//  React
import { useState } from "react";


//  Native
import { TouchableOpacity, View, Text, Button, StyleSheet, Pressable } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


//Definition Component ---------------------------------------------------
function SelectCategoryScreen({ route, navigation }) {
    const userInfo = route.params.userInfo;
    console.log("SelectCategoryScreen에서 출력 : ", userInfo);
    const [selectedIcons, setSelectedIcons] = useState([]);

    const icons = [
        {
            name: "Fontisto",
            data: [
                { iconName: "paper-plane", label: "Paper plane" },
                { iconName: "baidu", label: "Baidu" },
                { iconName: "bell-alt", label: "Bell Alt" },
            ],
        },
        {
            name: "MaterialIcons",
            data: [
                { iconName: "brush", label: "Brush" },
                { iconName: "book", label: "Book" },
                { iconName: "backup", label: "Backup" },
            ],
        },
        {
            name: "FontAwesome5",
            data: [
                { iconName: "language", label: "Language" },
                { iconName: "feather-alt", label: "Feather alt" },
                { iconName: "apple-alt", label: "Apple Alt" },
            ],
        },
        {
            name: "MaterialCommunityIcons",
            data: [
                { iconName: "dance-ballroom", label: "Dance ballroom" },
                { iconName: "dumbbell", label: "Dumbbell" },
                { iconName: "bomb", label: "Bomb" },
            ],
        },
        {
            name: "Ionicons",
            data: [
                { iconName: "earth", label: "Earth" },
                { iconName: "fast-food", label: "Fast food" },
                { iconName: "ios-game-controller", label: "Ios game controller" },
            ],
        },
        {
            name: "FontAwesome",
            data: [
                { iconName: "handshake-o", label: "Handshake" },
                { iconName: "fast-food", label: "Fast food" },
                { iconName: "cafe", label: "Cafe" },
            ],
        },
        {
            name: "Entypo",
            data: [
                { iconName: "dots-three-horizontal", label: "Dots three horizontal" },
                { iconName: "archive", label: "Archive" },
                { iconName: "back-in-time", label: "Back In Time" },
            ],
        },
    ];

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

    return (
        <View>
            <Text>{userInfo.gender}</Text>
            <Text>{userInfo.address}</Text>
            <Text>{userInfo.birthdate}</Text>
        </View>
        
        
       

    );
}

export default SelectCategoryScreen;

//style ---------------------------------------------------

const styles = StyleSheet.create({
    
});
