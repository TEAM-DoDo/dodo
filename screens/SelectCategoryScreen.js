//Import ---------------------------------------------------
//  React
import { useState } from "react";
import React, { Component } from "react";

//  Native
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

//Definition Component ---------------------------------------------------
function SelectCategoryScreen({ route, navigation }) {
    const userInfo = route.params.userInfo;
    console.log(userInfo);

    return (
        <View>
            <Text>This is SelectCategoryScreen!</Text>
        </View>
    );
}

export default SelectCategoryScreen;