//Import ---------------------------------------------------
//  Axios
import axios from "axios";

//  Native
import { Platform } from "react-native";

//  Expo
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-community/async-storage";

//URL setting ------------------------------------------------------
const { manifest } = Constants;
export const localIpAddress = manifest.debuggerHost.split(":").shift(); //현재 ip주소

export const portNumber = 8080;

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
API.interceptors.request.use(
    async (config) => {
        //내부 저장소에서 토큰 정보를 가져와서 헤더에 기입
        await AsyncStorage.getItem("access_token",(err,result) => {
            if(result != null){
                config.headers.Authorization=`Bearer ${result}`;
            }
            return config;
        });
        return config;
    }
);
export default API;