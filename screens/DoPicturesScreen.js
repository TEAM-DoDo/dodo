import { FlatList, Image, StyleSheet, Text, View } from "react-native";
function requestImage(imageIndex){
    
    return null;
}
//두 번호를 넣으면 이미지 아이디 배열을 불러오는 함수
function getImageIndex(doIndex){
    return [1,2,3,4,5,6,7,8,9,10];
}
function DoPicturesScreen(){
    return(
        <View style={Style.conatiner}>
            <FlatList
                data={getImageIndex(1)}
                keyExtractor={(item) => item}
                numColumns={2}
                renderItem={
                    (item) =>
                    <Image style={Style.do_image} source={requestImage(item)} alt="이미지를 불러올 수 없습니다."/>
                }
            />
        </View>
    );
}
const Style = StyleSheet.create({
    conatiner:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
    },
    do_image:{
        flex:1,
        aspectRatio:1,
        backgroundColor:'#cfcfcf',
        margin:5,
        borderRadius:15,
    }
});
export default DoPicturesScreen;