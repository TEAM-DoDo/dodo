import { SafeAreaView, StyleSheet, View } from "react-native";
import DoScreenHolder from "../components/hgp/DoScreenHolder";
import TopBar from "../components/hgp/TopBar";

function DoScreen({navigation}){
    const handleGoBack = () =>{

    }
    const handleAlarmButton = () => {
        navigation.navigate("AlarmScreen");
    }
    return(
        <SafeAreaView style={Style.container}>
            <TopBar title="Do 제목" onGoBackPressed={handleGoBack} onAlarmPressed={handleAlarmButton}/>
            <DoScreenHolder/>
        </SafeAreaView>

    );
}
const Style = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex: 1
    }
});
export default DoScreen;