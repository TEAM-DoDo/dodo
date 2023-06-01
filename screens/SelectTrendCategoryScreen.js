//Import ---------------------------------------------------
//  React
import { useState } from "react";


//  Native
import { TouchableOpacity, View, Text, Button, StyleSheet, Pressable, FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


// Components
import PrimaryButton from "../components/psc/PrimaryButton";
import API from "../api/API";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../store/user-store";


//Definition Component ---------------------------------------------------
function SelectTrendCategoryScreen({ route, navigation }) {
    const userInfo = route.params.userInfo;
    const [selectedTrendIcons, setSelectedTrendIcons] = useState([]);

    const dispatch = useDispatch();

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
        userInfo.trendCategory = JSON.stringify(selectedTrendIcons);
        //생성된 유저 정보를 서버로 전송
        API.post(`/api/users/${userInfo.id}/modify`, userInfo).then((response) => {
                //받아온 정보를 토대로 유저 정보 저장
                const data = {
                    address: response.data.address,
                    dateOfBirth: response.data.dateOfBirth,
                    phoneNumber: response.data.phoneNumber,
                    gender: response.data.gender,
                    nickname: response.data.nickname,
                    category: response.data.category,
                    imagePath : null,
                    id: userInfo.id,
                };
                data.category = JSON.parse(data.category);
                if (response.status == 200) {
                    dispatch(addUserInfo({ data : data }));
                    navigation.navigate('BottomTabNavigatorScreen');
                }
            });
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
            <Text style={styles.titleText}>{"🔥요즘뜨는 키워드"}</Text>
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
        fontSize: 38,
        marginHorizontal: 16,
        marginVertical: 20,
        paddingVertical: 24,
        paddingHorizontal: 1,
        fontFamily : 'NanumGothic-Bold',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 7,
        padding: 9,
        borderRadius: 10,
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
