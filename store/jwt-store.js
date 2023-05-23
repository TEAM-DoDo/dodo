import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { setAccessToken, setRefreshToken } from "../api/API";
const jwtSlice = createSlice({
    name:'jwt',
    initialState:{
        access_token: null,
        refresh_token: null
    },
    reducers:{
        addAccessToken : (state,action) => {
            state.access_token = action.payload.access_token;
            setAccessToken(action.payload.access_token);
            AsyncStorage.setItem("access_key",action.payload.access_token);
        },
        removeAccessToken : (state) => {
            state.access_token = null;
            setAccessToken("");
            AsyncStorage.removeItem("access_key");
        },
        addRefreshToken : (state,action) => {
            state.refresh_token = action.payload.refresh_token;
            setRefreshToken(action.payload.refresh_token);
            AsyncStorage.setItem("refresh_token",action.payload.refresh_token);
        },
        removeRefreshToken : (state) => {
            state.refresh_token = null;
            setRefreshToken("");
            AsyncStorage.removeItem("refresh_token");
        },
    },
});

export const addAccessToken = jwtSlice.actions.addAccessToken;
export const addRefreshToken = jwtSlice.actions.addRefreshToken;
export const removeAccessToken = jwtSlice.actions.removeAccessToken;
export const removeRefreshToken = jwtSlice.actions.removeRefreshToken;
export default jwtSlice.reducer;