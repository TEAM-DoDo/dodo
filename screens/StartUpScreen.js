//Import ---------------------------------------------------
//  Native
import { View, StyleSheet, Image } from "react-native";

//  Expo
import { Video } from 'expo-av';

//  Components
import PrimaryButton from "../components/psc/PrimaryButton";
import Title from '../components/psc/Title';
import LogoIconImage from "../components/psc/LogoIconImage";

//Definition Component ---------------------------------------------------
function StartUpScreen({navigation})
{
    const introVideoPath = require('../assets/videos/Intro.mp4');

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
      },
      logoContainer : {
        marginTop : '20%',
        alignItems : 'center',
      },
      buttonContainer : {
        marginBottom : '10%',
      },
      logoIcon : {
        marginBottom : 20,
      },
      title : {
        color : 'white',
      },
});