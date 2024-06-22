import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import attendanceSlice from "./slices/attendanceSlice";



const store =  configureStore({
    reducer:{
        auth:authSlice,
        attendance:attendanceSlice

    },
})

export default store