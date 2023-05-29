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

//Definition Component ---------------------------------------------------
function StartUpScreen({navigation})
{
    const introVideoPath = require('../assets/videos/Intro.mp4');
    const dispatch = useDispatch();
    //기본 토큰 정보 로딩 및 유저 정보 로딩
    
    // useEffect(() => {
    //   AsyncStorage.getItem("access_token",(err,result) => {
    //     console.log(result);
    //     if(result != null){
    //       dispatch(addAccessToken({ access_token : result}))
    //       AsyncStorage.getItem("refresh_token",(err,data) => {
    //         console.log(data);
    //         if(data != null) dispatch(addRefreshToken({ refresh_token : data}));
    //       });
    //       AsyncStorage.getItem("userInfo",(err,userdata) => {
    //         console.log(userdata);
    //         if(userdata != null) {
    //           dispatch(addUserInfo({ data : JSON.parse(userdata)}));
    //           navigation.navigate("BottomTabNavigatorScreen");//저장된 유저 정보가 있고 토큰도 있으면 바로 메인 화면으로 이동
    //         }
    //       });
    //     }
    //   });
    // }, []);
    
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