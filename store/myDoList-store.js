import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const myDoListSlice = createSlice({
    name : "myDoList",
    initialState : {
        myDoList : [],
    },
    reducers : {
        updateMyDoList : (state, action) => {
            var data = action.payload.data;
            state.myDoList = data;
            AsyncStorage.setItem("myDoListInfo", JSON.stringify(data));
        },
        initializeMyDoList : (state) => {
            state.myDoList = [];
        },
        addNewDo : (state, action) => {
            var data = action.payload.data;
            state.myDoList.push(data);
            AsyncStorage.setItem("myDoListInfo", JSON.stringify(data)); //같은 key를 가지면 알아서 업데이트 되는지?
        }
    },
})

export const updateMyDoList = myDoListSlice.actions.updateMyDoList;
export const initializeMyDoList = myDoListSlice.actions.initializeMyDoList;
export const addNewDo = myDoListSlice.actions.addNewDo;
export default myDoListSlice.reducer;