import { StyleSheet,View,FlatList,TextInput,Pressable,Text,Keyboard} from "react-native";
import TopBar from "../components/hgp/TopBar";
import DoButton from "../components/hgp/DoButton";
import { useState } from "react";
import API from "../api/API";
import ListSelectModal from "../components/hgp/ListSelectModal";

function SearchScreen({ navigation }){
    const [searchTypeModalVisible, setSearchTypeModalVisible] = useState(false);
    const [searchType, setSearchType] = useState("이름"); // ["이름","설명","지역"
    const [doList, setDoList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategoryText] = useState("");
    const onGoBackPressed = () => {
        dismissKeyboard();
        setTimeout(() => {navigation.goBack();}, 50);
    }
    const onPressSearch = () => {
        dismissKeyboard();
        API.get(`/api/search/do?name=${searchType=="이름"?searchText:""}&description=${searchType=="설명"?searchText:""}&place=${searchType=="지역"?searchText:""}&category=${searchCategory}`).then((res) => {
            console.log(res.data);
            setDoList(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const onPressSearchType = () => {
        setSearchTypeModalVisible(true);
    }
    const onSelectSearchType = (type) => {
        setSearchType(type);
        setSearchTypeModalVisible(false);
    }
    const onCancelSearchType = () => {
        setSearchTypeModalVisible(false);
    }
    return (
        <View style={Style.container}>
            <TopBar title="검색" onGoBackPressed={onGoBackPressed} enableAlarmButton={false}/>
            <View style={Style.search_holder}>
                <View style={Style.search_box_holder}>
                    <Pressable style={Style.search_type_button} onPress={onPressSearchType}>
                        <Text style={Style.search_type_style}>{searchType}</Text>
                    </Pressable>
                    <TextInput style={Style.search_textfield} placeholder="검색어를 입력하세요." value={searchText} onChangeText={setSearchText}/>
                </View>
                <Pressable style={Style.search_button} onPress={onPressSearch}>
                    <Text style={Style.search_button_text}>검색</Text>
                </Pressable>
            </View>
            <FlatList
                style={Style.list_holder}
                data={doList}
                keyExtractor={(item) => item}
                numColumns={1}
                renderItem={({item}) => <DoButton navigation={navigation} doId={item}/>}
            />
            <ListSelectModal
                data={["이름","설명","지역"]}
                onSelect={onSelectSearchType}
                onCancel={onCancelSearchType} 
                isVisible={searchTypeModalVisible}
                />
        </View>
    );
}
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    search_holder:{
        padding:10,
        height:60,
        flexDirection:'row',
        //backgroundColor: 'grey',
    },
    list_holder:{
        padding:10,
        flex:1,
        marginBottom:10,
        //backgroundColor: 'grey',
    },
    search_box_holder:{
        flex:8,
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        flexDirection:'row',
        alignItems:'center',
        //backgroundColor: 'grey',
    },
    search_type_style : {
        fontSize : 12,
        fontFamily : 'NanumGothic-ExtraBold',
        color:"gray",
    },
    search_type_button : {
        width:50,
        alignSelf:'stretch',
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        margin:5,
        justifyContent:'center',
        alignItems:'center',
    },
    search_textfield : {
        flex:1,
        textAlignVertical:'center',
        //backgroundColor:'grey',
        padding:8,
        fontSize : 14,
        fontFamily : 'NanumGothic-Bold',
    },
    search_button : {
        flex:2,
        height:"100%",
        padding:8,
        marginStart:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius : 20,
        backgroundColor:'#E30A8B'
    },
    search_button_text : {
        fontSize : 16,
        fontFamily : 'NanumGothic-ExtraBold',
        color:'white'
    },
});
export default SearchScreen;