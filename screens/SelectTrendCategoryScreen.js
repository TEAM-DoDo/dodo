//Import ---------------------------------------------------
//  React
import { useState } from "react";


//  Native
import { TouchableOpacity, View, Text, Button, StyleSheet, Pressable, FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


// Components
import PrimaryButton from "../components/psc/PrimaryButton";


//Definition Component ---------------------------------------------------
function SelectTrendCategoryScreen({ route, navigation }) {
    const userCategory = route.params.userCategory;
    const userInfo = route.params.userInfo;
    console.log("SelectTrendCategoryScreen에서 출력 : ", userInfo, userCategory);
    const [selectedTrendIcons, setSelectedTrendIcons] = useState([]);


    function toggleIconSelection(iconName) {
        setSelectedTrendIcons((prevState) => {
            if (prevState.includes(iconName)) {
                return prevState.filter((name) => name !== iconName);
            } else {
                return [...prevState, iconName];
            }
        });
    }

    function moveToHomeScreen() {
        const userTrendCategory = {
            selectedTrendIcons
        };
        console.log("SelectTrendCategoryScreen에서 다음 내용을 업데이트 함:", userInfo, userCategory, userTrendCategory);

        navigation.navigate('BottomTabNavigatorScreen', { selectedTrendIcons });
    }


    const ICONS = [
        { name: 'shopping-bag', title: '쇼핑' },
        { name: 'youtube-play', title: 'Vlog' },
        { name: 'bitcoin', title: '가상화폐' },
        { name: 'language', title: '언어교환' },
        { name: 'code', title: '코딩' },

    ];

    function renderIcon({ item }) {
        const isSelected = selectedTrendIcons.includes(item.name);
        return (
            <Pressable
                style={[
                    styles.button,
                    isSelected ? styles.selectedButton : null,
                ]}
                onPress={() => toggleIconSelection(item.name)}
            >
                <FontAwesome name={item.name} size={24} color={isSelected ? '#008D62' : '#E30A8B'} />
                <Text style={[styles.buttonTitle, isSelected ? styles.selectedTitle : null]}>
                    {item.title}
                </Text>
            </Pressable>
        );
    }

    return (
        //데이터 전송 확인
        /*<View>
            <Text>This is SelectTrendCategoryScreen</Text>
            <Text>{userCategory.selectedIcons}</Text>
            <Text>{userInfo.gender}</Text>
            <Text>{userInfo.address}</Text>
            <Text>{userInfo.birthdate}</Text>
        </View>*/

        <View style={styles.container}>
            <Text style={styles.titleText}>{"🔥 요즘뜨는 키워드"}</Text>
            <FlatList
                data={ICONS}
                numColumns={4}
                renderItem={renderIcon}
                keyExtractor={(item) => item.name}
            />
            <PrimaryButton onPress={moveToHomeScreen}>다음으로</PrimaryButton>
        </View>
    );
}

export default SelectTrendCategoryScreen;

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
