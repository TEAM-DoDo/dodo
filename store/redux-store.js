import { configureStore } from "@reduxjs/toolkit";
import jwtStore from "./jwt-store";
import userStore from "./user-store";
export const store = configureStore({
    reducer : {
        jwt : jwtStore,
        userInfo : userStore
    }
});