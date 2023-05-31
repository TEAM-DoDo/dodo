import { StyleSheet,View,Text,TextInput,Pressable,Modal,Dimensions,Keyboard,ScrollView,SafeAreaView } from "react-native";
import { useState } from "react";
import moment from "moment";
import TopBar from "../components/hgp/TopBar";
import Postcode from "@actbase/react-daum-postcode";
import DatePicker from "../components/psc/DatePicker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast from "react-native-root-toast";
import API from "../api/API";
import { Schedule } from "../data/Schedule";
import PrimaryButton from "../components/psc/PrimaryButton";
import AddressModal from "../components/hgp/AddressModal";
function DoScheduleAddScreen({navigation, route}) {
    //날짜 설정 제한범위 설정
    const minDate = new Date();
    // minDate.setHours(minDate.getHours() + 1);

    //끝나는 날짜 시작 제한
    const startEndDate = new Date(minDate);
    startEndDate.setHours(startEndDate.getHours() + 1);


    //날짜 설정 제한범위 설정
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    const [startDate, setStartDate] = useState(new Date(minDate));
    const [endDate, setEndDate] = useState(new Date(startEndDate));

    const [dateMode,setDateMode] = useState("start");
    const [isDateMode,setIsDateMode] = useState(true); 
    const [isModal,setIsModal] = useState(false);
    const [name,setName] = useState("");
    const [des,setDes] = useState("");
    const [address,setAddress] = useState("");
    const [cost,setCost] = useState("");
    const [datePickerIsVisible, setDatePickerIsVisible] = useState(false); // 날짜 피커 모달 노출 여부

    // console.log(minDate);
    // console.log(startEndDate);

    //스케줄 생성시 자기 자신도 스케줄에 참여하게 되므로 자기 자신의 id를 넣어준다. 아직 처리 필요
    
    //GoBack 버튼 눌렀을 때
    const onGoBackPressed = () =>{
        dismissKeyboard();
        setTimeout(() => {navigation.goBack();}, 50);
    }
    //날짜 설정 관련 함수
    const onPressStartDate = () => { // 시작하는 날짜 클릭 시
        setIsDateMode(true);
        setDateMode("start");
        setDatePickerIsVisible(true); // 모달 open
    };
    const onPressEndDate = () => {// 끝나는 날짜 클릭 시
        setIsDateMode(true);
        setDateMode("end");
        setDatePickerIsVisible(true); // 모달 open
    }
    //시간 설정 관련 함수
    const onPressStartTime = () => { // 시작하는 날짜 클릭 시
        setIsDateMode(false);
        setDateMode("start");
        setDatePickerIsVisible(true); // 모달 open
    };
    const onPressEndTime = () => {// 끝나는 날짜 클릭 시
        setIsDateMode(false);
        setDateMode("end");
        setDatePickerIsVisible(true); // 모달 open
    }
    const onDateSelectionCanceled = () => { // 취소 시
        setDatePickerIsVisible(false); // 모달 close
    };
    const onPressDatePickerConfirm = (selectedDate) => {
        var storeDate = selectedDate;
        //이곳에 날짜 범위 설정이 들어가면 될 것 같다
        //날짜가 설정 범위 안에 없을 경우 설정 범위 안으로 포함 시킴
        if(storeDate < minDate){
            storeDate = minDate;
            Toast.show('현재 시간 이전으로 설정하실 수 없습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        }
        else if(storeDate > maxDate){
            storeDate = maxDate;
            Toast.show('지금으로 부터 한달 이내로만 설정하실 수 있습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        }
        setDatePickerIsVisible(false);
        switch(dateMode){
            case 'start':
                if(storeDate < endDate){
                    setStartDate(storeDate);
                    break;
                }
                Toast.show('종료 시간 이후로 설정되어 그 이전으로 수정되었습니다.', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                let modifiedStartDate = new Date(endDate);
                modifiedStartDate.setHours(endDate.getHours() - 1);
                setStartDate(modifiedStartDate);
                break;
            case 'end':
                if(storeDate > startDate){
                    setEndDate(storeDate);
                    break;
                }
                Toast.show('시작 시간 이전으로 설정되어 그 이후로 수정되었습니다.', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                let modifiedEndDate = new Date(startDate);
                modifiedEndDate.setHours(startDate.getHours() + 1);
                setEndDate(modifiedEndDate);
                break;
        }
    }
    //주소 입력 시 이벤트
    const getAddressData = (data) => {
        let defaultAddress = ''; // 기본주소
        if (data.buildingName === 'N') {
          defaultAddress = data.apartment;
        } else {
          defaultAddress = data.buildingName;
        }
        setIsModal(false);
        setAddress(data.address + ' ' + defaultAddress);
    };
    const onAddressPartSelected = () => {
        setIsModal(true);
    }
    //비용 설정 버튼들
    //비용에 컴마와 원 글자를 붙여서 표시해주는 함수
    const setCostByformat = () => {
        if(cost == "") {
            setCost("0원"); 
            return;
        }
        setCost(cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원");
    }
    //표시된 비용을 다시 숫자로 바꾸는 함수
    const removeFormatFromCost = () => {
        setCost(cost.replace(/,/g,"").replace(/원/g,""));
    }
    //입력된 cost, address, des, name, startDate, endDate를 이용해 Schedule 객체를 만들어서 API 객체를 이용해 서버에 전송
    const createSchedule = () => {
        if(name == ""){
            Toast.show('일정 이름을 입력해주세요.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }
        if(address == ""){
            Toast.show('주소를 입력해주세요.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }
        if(cost == ""){
            Toast.show('비용을 입력해주세요.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }
        let schedule = new Schedule({
            title: name,
            place: address,
            cost: cost,
            detail: des,
            startTime: Math.round(startDate.getTime()),
            endTime: Math.round(endDate.getTime()),
            doId: route.params.id,
            cost: cost.replace(/,/g,"").replace(/원/g,""),
        });
        console.log(schedule);
        API.post(`/api/do/${route.params.id}/schedules`,schedule).then((res) => {
            console.log(res.status);
            Toast.show('일정이 생성되었습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            navigation.goBack();
        }).catch((err) => {
            Toast.show('일정 생성에 실패하였습니다.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        });
    }
    //키보드 내리는 함수
    const dismissKeyboard = () => {
        console.log("dismiss keyboard");
        Keyboard.dismiss();
    };
    return (
        <Pressable style={Style.conatiner} onPress={dismissKeyboard}>
            <TopBar title="Do 일정 만들기" enableAlarmButton={false} onGoBackPressed={onGoBackPressed}/>
            <View style={Style.inner_container}>
            <ScrollView flex={1} width="100%">
            <TextInput style={Style.input_container} placeholder={"일정 이름"} placeholderTextColor={'gray'} onChangeText={setName} value={name}/>
            <View style={Style.horizontal_container}>
                <Text style={Style.comp_title}>
                    시작 시간
                </Text>
                <Pressable style={Style.button} onPress={onPressStartDate}>
                    <Text style={Style.date_select_button_text}>{moment(startDate).format('YYYY-MM-DD')}</Text>
                </Pressable>
                <Pressable style={Style.button} onPress={onPressStartTime}>
                    <Text style={Style.date_select_button_text}>{moment(startDate).format('LT')}</Text>
                </Pressable>
            </View>
            <View style={Style.horizontal_container}>
                <Text style={Style.comp_title}>
                    종료 시간
                </Text>
                <Pressable style={Style.button} onPress={onPressEndDate}>
                    <Text style={Style.date_select_button_text}>{moment(endDate).format('YYYY-MM-DD')}</Text>
                </Pressable>
                <Pressable style={Style.button} onPress={onPressEndTime}>
                    <Text style={Style.date_select_button_text}>{moment(endDate).format('LT')}</Text>
                </Pressable>
            </View>
            <TextInput style={Style.input_container} placeholder={"지역"} placeholderTextColor={'gray'} onChangeText={setAddress} value={address} onPressIn={onAddressPartSelected}/>
            <TextInput style={Style.input_container} placeholder={"비용"} placeholderTextColor={'gray'} onChangeText={setCost} value={cost} onEndEditing={setCostByformat} onFocus={removeFormatFromCost} keyboardType='decimal-pad'/>
            <Text style={Style.input_title}>소개하는 말</Text>
            <TextInput style={Style.input_box} multiline={true} placeholder={"소개하는 말을 적어주세요."} placeholderTextColor={'gray'} onChangeText={setDes} value={des}/>
            </ScrollView>
            <Pressable style={Style.button} onPress={createSchedule} height={60} marginVertical={10}>
                <Text style={Style.create_button}>
                    일정 만들기
                </Text>
            </Pressable>
            <AddressModal isVisible={isModal} onAdressSelected={getAddressData} onCancel={()=>{setIsModal(false)}}/>
            <DateTimePicker 
                isVisible={datePickerIsVisible}
                mode={isDateMode?"date":"time"}
                onConfirm={onPressDatePickerConfirm}
                onCancel={onDateSelectionCanceled}
                date={dateMode=="start"?startDate:endDate}
                display={isDateMode?'calendar':"spinner"}
                locale="ko_KR"
                minimumDate={minDate}
                maximumDate={maxDate}
            />
            </View>
        </Pressable>
    );
};
const Style = StyleSheet.create({
    conatiner : {
        flex:1,
        //backgroundColor:'gray',
        alignItems:'center',
    },
    inner_container:{
        flex:1,
        width:"100%",
        padding:10,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    horizontal_container : {
        alignSelf:'stretch',
        //backgroundColor:'gray',
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:5,
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    title:{
        fontFamily:'NanumGothic-ExtraBold',
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:25,
        padding:20,
    },
    comp_title:{
        fontFamily:'NanumGothic-ExtraBold',
        textAlignVertical:'center',
        fontSize:20,
        paddingVertical:5,
        width:"30%",
    },
    button : {
        backgroundColor:'#E30A8B',
        alignSelf:'stretch',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        padding:10,
        elevation:3,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
    },
    create_button:{
        width:"100%",
        color:'white',
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:20,
        textAlign:'center',
        textAlignVertical:'center',
    },
    date_select_button_text : {
        color:'white',
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:15,
        textAlign:'center',
        textAlignVertical:'center',
    },
    input_container : {
        height : 70,
        alignSelf : 'stretch',
        padding:20,
        overflow:'scroll',
        marginVertical:10,
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 20,
        fontFamily : 'NanumGothic-Bold',
    },
    input_title:{
        marginHorizontal:20,
        fontFamily:'NanumGothic-ExtraBold',
        fontSize:20,
        textAlign:'left',
        alignSelf:'stretch',
    },
    input_box : {
        minHeight : 200,
        alignSelf : 'stretch',
        padding: 10,
        overflow:'scroll',
        marginVertical:10,
        borderRadius : 20,
        borderColor : '#c5c5c5',
        borderWidth : 1,
        fontSize : 15,
        fontFamily : 'NanumGothic-Bold',
        textAlignVertical: 'top',
    },
});
export default DoScheduleAddScreen;