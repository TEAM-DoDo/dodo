//Import ---------------------------------------------------
//  React
import { useEffect, useState } from "react";
import API from "../api/API";
import {LinearGradient} from 'react-native-linear-gradient';


//  Native
import { TouchableOpacity, View, Text, button, StyleSheet, Pressable, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';



// Components
import PrimaryButton from "../components/psc/PrimaryButton";


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
            userInfo.category = JSON.stringify(selectedIcons);
            
            console.log("SelectCategoryScreen에서 다음 내용을 업데이트 함:", userInfo);
            navigation.navigate('SelectTrendCategoryScreen', {userInfo : userInfo});
        } else {
            alert("키워드를 최소 2개 이상 선택해주세요.");
        }
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
                <Ionicons name={item.name} size={32} color={isSelected ? '#008D62' : '#E30A8B'} />
                <Text style={[styles.buttonTitle, isSelected ? styles.selectedTitle : null]}>
                    {item.title}
                </Text>
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{"관심 키워드"}</Text>
            <FlatList
                data={icons}
                numColumns={4}
                renderItem={renderIcon}
                keyExtractor={(item) => item.name}
            />
          <PrimaryButton onPress={moveToSelectTrendCategoryScreen}>다음으로</PrimaryButton>
        </View>
    );
}

export default SelectCategoryScreen;

//style ---------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily : 'NanumGothic-Bold',
        
    },
    titleText: {
        justifyContent : 'center',
        color: '#E30A8B',
        fontSize: 38,
        marginHorizontal: 16,
        marginVertical: 20,
        paddingVertical: 24,
        paddingHorizontal: 2,
        fontFamily : 'NanumGothic-Bold',
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 7,
        padding: 9,
        borderRadius: 10,
        // borderRadius: 8,
        borderWidth: 1,
        fontFamily : 'NanumGothic-Bold',
        borderColor : '#FBFBFB',
        backgroundColor : '#FBFAF2',
        shadowColor : 'black',
        shadowOffset : { width: 0.1, height: 0.1, },
        shadowOpacity : 0.2,
        elevation : 6,

    },

    buttonTitle: {
        fontSize: 13,
        paddingTop: 10,

    }
});
