import { configureStore } from "@reduxjs/toolkit";
import jwtStore from "./jwt-store";
export const store = configureStore({
    reducer : {
        jwt : jwtStore
    }
});