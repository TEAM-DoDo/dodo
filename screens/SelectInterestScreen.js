import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";


function SelectInterestScreen({ navigation }) {
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    function toggleSubjectSelection(iconName) {
        setSelectedSubjects((prevState) => {
            if (prevState.includes(iconName)) {
                return prevState.filter((name) => name !== iconName);
            } else {
                return [...prevState, iconName];
            }
        });
    }

    const subjects = [
        { name: "physics", title: "물리 치료" },
        { name: "gender", title: "성별" },
        { name: "university", title: "대학교" },
        { name: "love", title: "사랑" },
        // Add more subjects here
    ];

    function renderSubjectButton({ item }) {
        const isSelected = selectedSubjects.includes(item.name);
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    isSelected ? styles.selectedSubject : null,
                ]}
                onPress={() => toggleSubjectSelection(item.name)}
            >
                <Text style={[styles.buttonTitle, isSelected ? styles.selectedTitle : null]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }

    function saveSelectedSubjects() {
        // Logic to save selected subjects and navigate back to ProfileScreen
        // You can pass the selectedSubjects to ProfileScreen using navigation or other state management approach
        navigation.goBack(); // Example: Navigating back to ProfileScreen
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{"관심사❤️‍🔥"}</Text>
            <FlatList
                data={subjects}
                numColumns={5} // Adjust the number of columns as per your design preference
                renderItem={renderSubjectButton}
                keyExtractor={(item) => item.name}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveSelectedSubjects}>
                <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    },
    selectedSubject: {
        backgroundColor: '#008D62',
        borderColor: '#008D62',
    },
    buttonTitle: {
        color: '#E30A8B',
        fontSize: 16,
    },
    selectedTitle: {
        color: '#fff',
    },
    saveButton: {
        margin: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#E30A8B',
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default SelectInterestScreen;
