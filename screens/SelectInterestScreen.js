import { useEffect, useState } from "react";

//  Native
import { View, Text, Button, StyleSheet, Pressable, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';


// Components
import PrimaryButton from "../components/psc/PrimaryButton";


//Definition Component ---------------------------------------------------
function SelectInterestScreen({navigation}) {
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

    

    const icons = [
        { name: 'airplane', title: '여행' },
        { name: 'brush', title: '공예' },
        { name: 'beer', title: '술' },
        { name: 'musical-notes', title: '음악/춤' },
        { name: 'fitness', title: '운동/스포츠' },
        { name: 'book', title: '스터디' },
        { name: 'paw', title: '애완동물' },
        { name: 'globe', title: '문화' },
        { name: 'restaurant', title: '맛집' },
        { name: 'people-circle', title: '사교' },
        { name: 'game-controller', title: '게임' },
        { name: 'ellipsis-horizontal', title: '기타' },
    ];

    function renderIcon({ item }) {
        const isSelected = selectedIcons.includes(item.name);
        return (
            <Pressable
                style={[
                    styles.button,
                    isSelected ? styles.selectedButton : null,
                ]}
                onPress={() => toggleIconSelection(item.name)}
            >
                <Ionicons name={item.name} size={24} color={isSelected ? '#008D62' : '#E30A8B'} />
                <Text style={[styles.buttonTitle, isSelected ? styles.selectedTitle : null]}>
                    {item.title}
                </Text>
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{"키워드 ✅"}</Text>
            <FlatList
                data={icons}
                numColumns={4}
                renderItem={renderIcon}
                keyExtractor={(item) => item.name}
            />
          
        </View>
    );
}

export default SelectInterestScreen;

//style ---------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleText: {
        color: '#E30A8B',
        fontSize: 30,
        marginHorizontal: 16,
        marginVertical: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
    }

});