import { configureStore } from "@reduxjs/toolkit";
import jwtStore from "./jwt-store";
import userStore from "./user-store";
import myDoListStore from "./myDoList-store";

export const store = configureStore({
    reducer : {
        jwt : jwtStore,
        userInfo : userStore,
        myDoList : myDoListStore,
    }
});