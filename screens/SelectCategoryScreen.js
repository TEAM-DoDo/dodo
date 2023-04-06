//Import ---------------------------------------------------
//  React
import { useState } from "react";

//  Native
import { View, Text, StyleSheet, Pressable } from "react-native";

//Definition Component ---------------------------------------------------
function SelectCategoryScreen({route, navigation})
{
    const userInfo = route.params.userInfo;
    console.log("SelectCategoryScreen에서 출력 : ", userInfo);

    return(
        <View>
            <Text>This is SelectCategoryScreen</Text>
            <Text>{userInfo.gender}</Text>
            <Text>{userInfo.address}</Text>
            <Text>{userInfo.birthdate}</Text>
        </View>
    );
}

export default SelectCategoryScreen;