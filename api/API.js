//Import ---------------------------------------------------
//  Axios
import axios from "axios";

//  Native
import { Platform } from "react-native";

//  Expo
import Constants from 'expo-constants';

//URL setting ------------------------------------------------------
const { manifest } = Constants;
const localIpAddress = manifest.debuggerHost.split(":").shift(); //현재 ip주소

const portNumber = 8080;
const platformHTTP = Platform.select({
    android : "http",
    ios : "http",
});
const baseURL = `${platformHTTP}://${localIpAddress}:${portNumber}`;

//Cretae axios module ------------------------------------------------------
const API = axios.create({
    baseURL,
    headers : {
        "Content-Type" : "application/json",
    },
    responseType: 'json',
    withCredentials : true,
});

export default API;