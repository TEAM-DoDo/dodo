import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:'user',
    initialState:{
        id : null,
        nickname : null,
        dateOfBirth : null,
        phoneNumber : null,
        address : null,
        gender : null,
        category : null,
    },
    reducers:{
        addUserInfo : (state,action) => {
            var data = action.payload.data;
            state.id = data.id;
            state.nickname = data.nickname;
            state.phoneNumber = data.phoneNumber;
            state.dateOfBirth = data.dateOfBirth;
            state.address = data.address;
            state.gender = data.gender;
            state.category = data.category;
            AsyncStorage.setItem("userInfo",JSON.stringify(data));
        },
        removeUserInfo : (state) => {
            state.id = null;
            state.nickname = null;
            state.phoneNumber = null;
            state.dateOfBirth = null;
            state.address = null;
            state.gender = null;
            state.category = null;
            AsyncStorage.removeItem("userInfo");
        }
    },
});
export const addUserInfo = userSlice.actions.addUserInfo;
export const removeUserInfo = userSlice.actions.removeUserInfo;
export default userSlice.reducer;