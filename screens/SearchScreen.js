import { StyleSheet,View,FlatList,TextInput,Pressable,Text,Keyboard} from "react-native";
import TopBar from "../components/hgp/TopBar";
import DoButton from "../components/hgp/DoButton";
import { useState } from "react";
import API from "../api/API";
import { MultipleSelectList } from "react-native-dropdown-select-list";

function SearchScreen({ navigation }){
    const [doList, setDoList] = useState([]);
    const [searchName, setSearchNameText] = useState("");
    const [searchDescription, setSearchDescriptionText] = useState("");
    const [searchPlace, setSearchPlaceText] = useState("");
    const [searchCategory, setSearchCategoryText] = useState("");
    const [selected, setSelected] = useState([]);
    console.log(selected);
    const data = [
        {key:'1', value:'이름'},
        {key:'2', value:'설명'},
        {key:'3', value:'지역'},
    ]
    const onGoBackPressed = () => {
        dismissKeyboard();
        setTimeout(() => {navigation.goBack();}, 50);
    }
    const onPressSearch = () => {
        dismissKeyboard();
        console.log("searchText : " + searchName);
        API.get(`/api/search/do?name=${searchName}&description=${searchDescription}&place=${searchPlace}&category=${searchCategory}`).then((res) => {
            console.log(res.data);
            setDoList(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return (
        <View style={Style.container}>
            <TopBar title="검색" onGoBackPressed={onGoBackPressed} enableAlarmButton={false}/>
            <View style={Style.search_holder}>
                <View style={Style.search_box_holder}>
                    <TextInput style={Style.search_textfield} placeholder="검색어를 입력하세요." value={searchName} onChangeText={setSearchNameText}/>
                </View>
                <Pressable style={Style.search_button} onPress={onPressSearch}>
                    <Text style={Style.search_button_text}>검색</Text>
                </Pressable>
            </View>
            {/* <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    onSelect={() => {}}
                    label="Categories"/> */}
            <FlatList
                style={Style.list_holder}
                data={doList}
                keyExtractor={(item) => item}
                numColumns={1}
                renderItem={({item}) => <DoButton navigation={navigation} doId={item}/>}
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