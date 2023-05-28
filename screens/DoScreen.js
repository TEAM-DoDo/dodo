import { SafeAreaView, StyleSheet, View } from "react-native";
import { useEffect,useState } from "react";
import DoScreenHolder from "../components/hgp/DoScreenHolder";
import TopBar from "../components/hgp/TopBar";
import API from "../api/API";

function DoScreen({navigation,route}){
    const handleGoBack = () =>{
        navigation.goBack();
    }
    const handleAlarmButton = () => {
        navigation.navigate("AlarmScreen");
    }
    return(
        <SafeAreaView style={Style.container}>
            <TopBar title={route.params.title} onGoBackPressed={handleGoBack} enableAlarmButton={false}/>
            <DoScreenHolder doId={route.params.id}/>
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