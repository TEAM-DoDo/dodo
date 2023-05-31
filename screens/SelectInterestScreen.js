import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-root-toast";
import { addUserInfo } from "../store/user-store";
import API from "../api/API";

function SelectInterestScreen({ navigation, route }) {
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    function toggleSubjectSelection(iconName) {
        setSelectedSubjects((prevState) => {
            if (prevState.includes(iconName)) {
                return prevState.filter((name) => name !== iconName);
            } else {
                return [...prevState, iconName];
            }
        });
    }

    useEffect(()=>{
        setSelectedSubjects(userInfo.category);
    }, [])

    const countrySubjects = [
        { name: "America", title: "미국🇺🇸" },
        { name: "Australia", title: "호주🇦🇺" },
        { name: "Brazil", title: "브라질🇧🇷" },
        { name: "Canada", title: "캐나다🇨🇦" },
        { name: "China", title: "중국🇨🇳" },
        { name: "France", title: "프랑스🇫🇷" },
        { name: "Hongkong", title: "홍콩🇭🇰" },
        { name: "India", title: "인도🇮🇳" },
        { name: "Japan", title: "일본🇯🇵" },
        { name: "Korea", title: "한국🇰🇷" },
        { name: "Spain", title: "스페인🇪🇸" },
        { name: "UK", title: "영국🇬🇧" },
        { name: "Southafrica", title: "남아공🇿🇦" },
        { name: "Germany", title: "독일🇩🇪" },
        { name: "Russia", title: "러시아🇷🇺" },
        { name: "Belgium", title: "벨기에🇧🇪" },
        { name: "Egypt", title: "이집트🇪🇬" },
        { name: "Poland", title: "폴란드🇵🇱" },
        { name: "Turkey", title: "튀르키예🇹🇷" },
        { name: "Ukraine", title: "우크라이나🇺🇦" },
        { name: "Iran", title: "이란🇮🇷" },
        { name: "Indonesia", title: "인도네시아🇮🇩" },
        { name: "Switzerland", title: "스위스🇨🇭" },
        { name: "Saudiarabia", title: "사우디🇸🇦" },
        { name: "Mongole", title: "몽골🇲🇳" },
        { name: "Mexico", title: "멕시코🇲🇽" },
        { name: "Taiwan", title: "대만🇹🇼" },
        { name: "Italy", title: "이탈리아🇮🇹" },
        { name: "Portugal", title: "포르투갈🇵🇹" },
    ];

    const sportsSubjects = [
        { name: "Badminton", title: "배드민턴🏸" },
        { name: "Baseball", title: "야구⚾️" },
        { name: "Basketball", title: "농구🏀" },
        { name: "Boxing", title: "복싱🥊" },
        { name: "Cycling", title: "사이클🚴🏻" },
        { name: "Football", title: "축구⚽️" },
        { name: "Golf", title: "골프🏌🏼‍♂️" },
        { name: "Icehockey", title: "아이스하키🏒" },
        { name: "Rugby", title: "럭비🏉" },
        { name: "Skateboard", title: "스케이트보드🛹" },
        { name: "Taekwondo", title: "태권도🥋" },
        { name: "Jyudo", title: "유도🥋"},
        { name: "Karate", title: "가라데🥋"},
        { name: "Jiujitsu", title: "주짓수🥋"},
        { name: "Weight", title: "웨이팅🏋🏻"},
        { name: "Pingpong", title: "탁구🏓"},
        { name: "Volleyball", title: "배구🏐" },
        { name: "Tenis", title: "테니스🎾"},
    ];

    const hobbySubjects = [
        { name: "Painting", title: "그림🎨" },
        { name: "Guitar", title: "기타🎸" },
        { name: "Game", title: "게임🎮" },
        { name: "Photo", title: "사진📷" },
        { name: "Camping", title: "캠핑🏕️" },
        { name: "Hiking", title: "하이킹🏔️" },
        { name: "Baking", title: "베이킹🍪" },
        { name: "Movie", title: "영화🍿" },
        { name: "Activity", title: "액티비티🏄‍♂️"},
        { name: "Trip", title: "여행🧳" },
        { name: "Singing", title: "노래🎤" },
        { name: "Music", title: "음악🎧" },
    ];

    const jobSubjects = [
        { name: "Office", title: "사무직📑" },
        { name: "Student", title: "학생📚" },
        { name: "Programmer", title: "개발자💻" },
        { name: "Beauty", title: "미용업💇🏻‍♀️" },
        { name: "Security", title: "경찰/보안👮🏻‍♀️" },
        { name: "Doctor", title: "의료업🩺" },
        { name: "Chef", title: "요식업🍳" },
        { name: "Seller", title: "판매업🛍️" },
        { name: "Research", title: "연구직🔬" },
        { name: "Construct", title: "건축계👷🏻‍♂️" },
        { name: "Teach", title: "교육👩🏻‍🏫"},
        { name: "Military", title: "군인🪖" },
        { name: "Artist", title: "공연예술🎭" },
    ];

    const petSubjects = [
        { name: "Dog", title: "강아지🐶" },
        { name: "Cat", title: "고양이🐱" },
        { name: "Reptile", title: "도마뱀🦎" },
        { name: "Fish", title: "열대어🐠" },
        { name: "Turtle", title: "거북이🐢" },
        { name: "Snake", title: "뱀🐍" },
        { name: "Rabbit", title: "토끼🐇" },
        { name: "Hamster", title: "햄스터🐹" },
        { name: "Parrot", title: "앵무새🦜" },
        { name: "Hedgehog", title: "고슴도치🦔" },
        { name: "Insect", title: "곤충🕷️" },
        { name: "Frog", title: "개구리🐸" },
    ];

    const mySubjects =[
        { name: "Vegetarian", title: "채식주의🥬" },
        { name: "Flex", title: "FLEX💸" },
        { name: "Christian", title: "기독교✝️" },
        { name: "Catholicism", title: "가톨릭교✝️" },
        { name: "Buddhism", title: "불교☸️" },
        { name: "Islam", title: "이슬람교☪️" },
        { name: "Hinduism", title: "힌두교🕉️" },
        { name: "Atheist", title: "무신론자🙅🏻" },
        { name: "Nightpeople", title: "야행성🌙" },
        { name: "Echoism", title: "환경주의🌳" },
        { name: "Dating", title: "데이트 앱💖" },
        { name: "Facebook", title: "Facebook📱"},
        { name: "Instagram", title: "Instagram📱"},
        { name: "Netflix", title: "Netflix🍿"},
        { name: "Tiktok", title: "TikTok🎶"},
        { name: "Youtube", title: "YouTube🎥"},
        { name: "Gamer", title: "게이머🕹️"},
        { name: "Prtypeople", title: "파티피플🪩"},
        { name: "Mystery", title: "미스테리🔮"},
        { name: "Stock", title: "주식📈"},
        { name: "Nosmoking", title: "금연중🚬"},
        { name: "Alchol", title: "애주가🍻" },
    ];

    function renderSubjectButtons(subjects) {
        return subjects.map((item) => (
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
        ));
    }

    async function saveSelectedSubjects() {
        //아무것도 선택하지 않았다면
        if(selectedSubjects.length <= 0)
        {
            const message = "아무것도 선택하지 않으셨습니다."
            Toast.show(message, 
            {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            })
            navigation.goBack();
            return;
        }

        //리덕스 유저 정보에 저장
        userInfo.category = selectedSubjects;
        dispatch(addUserInfo({data : userInfo}));
        //갱신된 유저 정보 서버에 전송
        const obj = {
            id : userInfo.id,
            phoneNumber : userInfo.phoneNumber,
            nickname : userInfo.nickname,
            dateOfBirth : userInfo.dateOfBirth,
            address : userInfo.address,
            gender : userInfo.gender,
            category : JSON.stringify(selectedSubjects), //DTO에서 String으로 받으므로 JSON 문자열로 변환 후 전송 
            imagePath : userInfo.imagePath,
        };
        await API.post(`api/users/${userInfo.id}/modify`, obj).then((response)=>console.log(response.data)).catch((err) => console.log(err));

        // Logic to save selected subjects and navigate back to ProfileScreen
        // You can pass the selectedSubjects to ProfileScreen using navigation or other state management approach
        navigation.goBack(); // Example: Navigating back to ProfileScreen
    }


    return(
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.titleText}>{"관심사❤️‍🔥"}</Text>
                <Text style={styles.subjectText}>{"출신 국가🌎"}</Text>
                <View style={styles.buttonContainer}>
                    {renderSubjectButtons(countrySubjects)}
                </View>
            </View>
            <View>
                <Text style={styles.subjectText}>{"스포츠🤸🏻‍♂️"}</Text>
                <View style={styles.buttonContainer}>
                    {renderSubjectButtons(sportsSubjects)}
                </View>
            </View>
            <View>
                <Text style={styles.subjectText}>{"취미🥰"}</Text>
                <View style={styles.buttonContainer}>
                    {renderSubjectButtons(hobbySubjects)}
                </View>
            </View>
            <View>
                <Text style={styles.subjectText}>{"직업💼"}</Text>
                <View style={styles.buttonContainer}>
                    {renderSubjectButtons(jobSubjects)}
                </View>
            </View>
            <View>
                <Text style={styles.subjectText}>{"동물🐾"}</Text>
                <View style={styles.buttonContainer}>
                    {renderSubjectButtons(petSubjects)}
                </View>
            </View>
            <View>
                <Text style={styles.subjectText}>{"개성🕶️"}</Text>
                <View style={styles.buttonContainer}>
                    {renderSubjectButtons(mySubjects)}
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
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginVertical: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    subjectText: {
        color: '#E30A8B',
        fontSize: 18,
        fontWeight: 'bold',
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
        color: '#000',
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
