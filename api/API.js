//Import ---------------------------------------------------
import axios from "axios";
import { Platform } from "react-native";
import Constants from 'expo-constants';

const { manifest } = Constants;
const localIpAddress = manifest.debuggerHost.split(":").shift();

const portNumber = 8080;
const platformHTTP = Platform.select({
    android : "http",
    ios : "https",
});
const baseURL = `${platformHTTP}://${localIpAddress}:${portNumber}`;

const API = axios.create({
    baseURL,
    headers : {
        "Content-Type" : "application/json",
    },
    responseType: 'json',
    withCredentials : true,
});

export default API;