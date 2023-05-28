import { StyleSheet,View } from "react-native";
import TopBar from "../components/hgp/TopBar";

function SchduleInfoScreen({ navigation,route }) {
    const onGoBackPressed = () => {
        navigation.goBack();
    }
    return (
        <View style={Style.container}>
            <TopBar title="스케줄 정보" onGoBackPressed={onGoBackPressed} enableAlarmButton={false} />

        </View>
    );
}
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
export default SchduleInfoScreen;