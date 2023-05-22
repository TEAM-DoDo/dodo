import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
const jwtSlice = createSlice({
    name:'jwt',
    initialState:{
        access_token: null,
        refresh_token: null
    },
    reducers:{
        addAccessToken : (state,action) => {
            AsyncStorage.setItem("access_key",action.payload.access_token);
            state.access_token = action.payload.access_token;
        },
        removeAccessToken : (state) => {
            AsyncStorage.removeItem("access_key");
            state.access_token = null;
        },
        addRefreshToken : (state,action) => {
            AsyncStorage.setItem("refresh_token",action.payload.refresh_token);
            state.refresh_token = action.payload.refresh_token;
        },
        removeRefreshToken : (state) => {
            AsyncStorage.removeItem("refresh_token");
            state.refresh_token = null;
        },
    },
});

export const addAccessToken = jwtSlice.actions.addAccessToken;
export const addRefreshToken = jwtSlice.actions.addRefreshToken;
export const removeAccessToken = jwtSlice.actions.removeAccessToken;
export const removeRefreshToken = jwtSlice.actions.removeRefreshToken;
export default jwtSlice.reducer;