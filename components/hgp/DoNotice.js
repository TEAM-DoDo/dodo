import { View,StyleSheet,Text } from "react-native";
import { useState,useEffect } from "react";
import CircleUserImage from "./CircleUserImage";
import moment from "moment";
function DoNotice({doid = -1,postid = -1}){
    if(doid < 0 || postid < 0){
        return null;
    }
    const [date,setDate] = useState(new Date());
    const [content,setContent] = useState('임시로 적히는 데이터');
    useEffect(()=>{
        return(()=>{

        });
    },[])
    return (
    <View style={Style.container}>
        {/* 향후 해당 부분은 컴포넌트화 하여 유저 리스트 표시창 제작시 사용할 예정 유저 정보를 받아서 표시하는 부분 컴포넌트로 분화해야함 */}
        <View flexDirection='row' alignItems='center' marginVertical={10}>
            <CircleUserImage mode='minimize' index={1}/>
            <Text style={Style.notice_writer}>공지사항 작성자</Text>
        </View>
        {/* 여기까지 */}
        {/* 향후 해당 부분은 컴포넌트화 하여 공지사항을 보여주는 리스트 제작시 사용할 예정 */}
        <View>
            <Text style={Style.notice_context}>{content}</Text>
            <Text style={Style.notice_date}>{moment(date).format('YYYY년 MM월 DD일 hh:mm 작성됨')}</Text>
        </View>
        {/* 좋아요 부분인데 사용 안함*/}
        {/* <View>
            <Pressable style={Style.like_button}>
                <AntDesign name="heart" size={20} color="red" />
                <Text style={Style.like_button_text}>좋아요</Text>
                <Text style={[Style.like_button_text,{color:'red'}]}>2</Text>
            </Pressable>
        </View> */}
    </View>
    );
}
const Style = StyleSheet.create({
    container:{
        backgroundColor:'#e6e6e6',
        padding:5,
        borderRadius:20,
        marginVertical:5,
    }
});
export default DoNotice;