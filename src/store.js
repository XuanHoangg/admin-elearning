import { configureStore } from "@reduxjs/toolkit";
import auth from './Slice/authSlice'
import userSlice from "./Slice/userSlice";
import productsSlice from "./Slice/productsSlice";
const store = configureStore({
    reducer: {
        auth,
        userSlice,
        productsSlice,
    },
});

export default store;
