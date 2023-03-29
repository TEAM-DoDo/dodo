//Import ---------------------------------------------------
//  Native
import { View, StyleSheet } from "react-native";

//  Components
import PrimaryButton from "../components/PrimaryButton";
import LogoIconImage from "../components/LogoIconImage";
import InputField from "../components/InputField";

//Definition Component ---------------------------------------------------
function GenerateIDScreen({route, navigation})
{
    const phoneNumber = route.params.phoneNumber;

    function MoveToNextScreen()
    {
        navigation.navigate('SelectCategoryScreen', 
        {
            phoneNumber,
            nickname,
            birthdate,
            gender,
            address, 
        });
    }

    return (
        <View style={styles.rootScreen}>
            <LogoIconImage style={styles.logoIcon} />
            <View style={styles.textInputContainer}>
                <InputField placeholder={"전화번호"} maxLength={11} />
                <View>
                    {/* 날짜피커, 토글 구현 */}
                </View>
                <InputField placeholder={"인증번호"} maxLength={4} />
            </View>
            <PrimaryButton onPress={MoveToNextScreen}>다음으로</PrimaryButton>
        </View>
    );
}

export default GenerateIDScreen;

//Style ---------------------------------------------------
const styles = StyleSheet.create({
    rootScreen : {
        flex : 1,
        alignItems : 'center',
    },
    logoIcon : {
        marginTop : '20%',
        marginBottom : 100,
    },
    textInputContainer : {
        width : '100%',
        marginBottom : '20%',
    },
});