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

    const countrySubjects = [
        { name: "america", title: "미국🇺🇸" },
        { name: "australia", title: "호주🇦🇺" },
        { name: "canada", title: "캐나다🇨🇦" },
        { name: "china", title: "중국🇨🇳" },
        { name: "hongkong", title: "홍콩🇭🇰" },
        { name: "india", title: "인도🇮🇳" },
        { name: "japan", title: "일본🇯🇵" },
        { name: "korea", title: "한국🇰🇷" },
        // Add more subjects here
    ];

    const sportsSubjects = [
        { name: "baseball", title: "야구" },
        { name: "football", title: "축구" },
        { name: "basketball", title: "농구" },
        { name: "boxing", title: "복싱🥊" },
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
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.titleText}>{"관심사❤️‍🔥"}</Text>
                <Text style={styles.subjectText}>{"출신 국가🌎"}</Text>
                <View style={styles.buttonContainer}>
                    {countrySubjects.map((item) => (
                        <TouchableOpacity
                            key={item.name}
                            style={[
                                styles.button,
                                selectedSubjects.includes(item.name) ? styles.selectedSubject : null,
                            ]}
                            onPress={() => toggleSubjectSelection(item.name)}
                        >
                            <Text
                                style={[
                                    styles.buttonTitle,
                                    selectedSubjects.includes(item.name) ? styles.selectedTitle : null,
                                ]}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View>
                <Text style={styles.subjectText}>{"스포츠🤸🏻‍♂️"}</Text>
                <View style={styles.buttonContainer}>
                    {sportsSubjects.map((item) => (
                        <TouchableOpacity
                            key={item.name}
                            style={[
                                styles.button,
                                selectedSubjects.includes(item.name) ? styles.selectedSubject : null,
                            ]}
                            onPress={() => toggleSubjectSelection(item.name)}
                        >
                            <Text
                                style={[
                                    styles.buttonTitle,
                                    selectedSubjects.includes(item.name) ? styles.selectedTitle : null,
                                ]}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={saveSelectedSubjects}>
                <Text style={styles.saveButtonText}>저장하기</Text>
            </TouchableOpacity>
        </ScrollView>
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
    subjectText: {
        color: '#E30A8B',
        fontSize: 15,
        marginHorizontal: 8,
        marginVertical: 4,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
        marginHorizontal: 4,
    },
    button: {
        flexBasis: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        marginHorizontal: 6,
        paddingVertical: 4,
        paddingHorizontal: 2,
        borderRadius: 8,
        borderWidth: 1,
    },
    selectedSubject: {
        backgroundColor: '#008D62',
        borderColor: '#008D62',
    },
    buttonTitle: {
        color: '#E30A8B',
        fontSize: 10,
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
