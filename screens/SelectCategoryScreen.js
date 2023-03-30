//Import ---------------------------------------------------
//  React
import { useState } from "react";

//  Native
import { View, Text, StyleSheet, Pressable } from "react-native";

//Definition Component ---------------------------------------------------
function SelectCategoryScreen({route, navigation})
{
    const userInfo = route.params.userInfo;
    console.log(userInfo);

    return(
        <View>
            <Text>This is SelectCategoryScreen!</Text>
        </View>
    );
}

export default SelectCategoryScreen;