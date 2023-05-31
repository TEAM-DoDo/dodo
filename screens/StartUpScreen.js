//Import ---------------------------------------------------
//  Native
import { View, StyleSheet, Image } from "react-native";
import { useEffect } from "react";

//  Expo
import { Video } from 'expo-av';

//  Redux Storage
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Components
import PrimaryButton from "../components/psc/PrimaryButton";
import Title from '../components/psc/Title';
import LogoIconImage from "../components/psc/LogoIconImage";
import { addAccessToken, addRefreshToken } from "../store/jwt-store";
import { addUserInfo } from "../store/user-store";
import { updateMyDoList } from "../store/myDoList-store";
import API from "../api/API";

//Definition Component ---------------------------------------------------
function StartUpScreen({navigation})
{
    const introVideoPath = require('../assets/videos/Intro.mp4');
    const dispatch = useDispatch();
    //기본 토큰 정보 로딩 및 유저 정보 로딩
    //토큰 유효성 검사
    const checkPastLogin = async () => {
      try {
        //데이터 검증 후 순차적으로 데이터를 불러온다.
        var accessToken = await AsyncStorage.getItem('access_token');
        if (accessToken == null) {
          AsyncStorage.clear();
          return;
        }
        var refreshToken = await AsyncStorage.getItem('refresh_token');
        if (refreshToken == null) {
          AsyncStorage.clear();
          return;
        }
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo == null) {
          AsyncStorage.clear();
          return;
        }
        //모든 정보가 존재하면 토큰과 전화번호를 검증한다
        const authData = {
          accessToken : accessToken,
          refreshToken : refreshToken,
          phoneNumber : JSON.parse(userInfo).phoneNumber,
        }
        API.post('/api/auth/refresh', authData).then((res) => {
          console.log("토큰 재발급" + res.data);
          if (res.status == 200) {
            //토큰이 유효하면 받은 토큰으로 기존 토큰을 교체한다.
            dispatch(addAccessToken({ access_token : res.data.accessToken}));
            dispatch(addRefreshToken({ refresh_token : res.data.refreshToken}));
            dispatch(addUserInfo({ data : JSON.parse(userInfo)}));
            API.get("api/users/doList", {params : {id : userInfo.id}}).then(response => {
              const list = response.data.doResponseDTOList;
              dispatch(updateMyDoList({data : list}));
            }).catch(err => console.log("do list가져오는데 실패했습니다.")).finally(()=>console.log("do list get 처리 끝"));
            navigation.navigate("BottomTabNavigatorScreen");//저장된 유저 정보가 있고 토큰도 있으면 바로 메인 화면으로 이동
          }
        }).catch((err) => {
          //토큰이 유효하지 않으면 기존 토큰을 삭제한다.
          console.log("토큰 재발급 실패 재로그인 필요 : " + err);
          AsyncStorage.clear();
        });
      } catch (error) {
        // Error retrieving data
      }
    }

    useEffect(() => {
      checkPastLogin();
    }, []);
    
    function MoveToUserVerifyScreen()
    {
        navigation.navigate("UserVerifyScreen");
    }

    return (
        <View style={styles.rootScreen}>
            <Video
                source={introVideoPath}
                resizeMode={'cover'}
                isLooping={true}
                isMuted={true}
                shouldPlay={true}
                style={styles.backgroundVideo}
                useNativeControls={false}
                usePoster={true}
            />
            <View style={styles.outerContainer}>
                <View style={styles.logoContainer}>
                    <LogoIconImage style={styles.logoIcon} />
                    <Title style={styles.title}>Do에 참여하세요</Title>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={MoveToUserVerifyScreen}>Let's Do!</PrimaryButton>
                </View>
            </View>
        </View>
    );
}

export default StartUpScreen;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    rootScreen : {
        flex : 1,
    },
    backgroundVideo: {
        width : '100%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity : 0.7,
      },
      outerContainer : {
        flex : 1,
        justifyContent : 'space-between',
        alignItems : 'center',
      },
      logoContainer : {
        marginTop : '20%',
        alignItems : 'center',
      },
      buttonContainer : {
        width : '80%',
        marginBottom : '10%',
      },
      logoIcon : {
        marginBottom : 20,
      },
      title : {
        color : 'white',
      },
});