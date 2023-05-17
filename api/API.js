//Import ---------------------------------------------------
//  Axios
import axios from "axios";

//  Native
import { Platform } from "react-native";

//  Expo
import Constants from 'expo-constants';

//URL setting ------------------------------------------------------
const { manifest } = Constants;
export const localIpAddress = manifest.debuggerHost.split(":").shift(); //현재 ip주소

export const portNumber = 8080;
export var jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjg0MTY3MzI4LCJleHAiOjE2ODQyNTM3Mjh9.NC24R8CLLKom5sNhq4zYUlpL4TpgLUrrSVRsbqVpk_I";
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
        Authorization : `Bearer ${jwt}`
    },
    responseType: 'json',
    withCredentials : true,
});

export default API;