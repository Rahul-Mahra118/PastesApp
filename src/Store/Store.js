import { configureStore } from "@reduxjs/toolkit";
import PasteReducer from '../Slice/PasteSlice'
export const Store=configureStore({
    reducer:{
        paste:PasteReducer
    }
})