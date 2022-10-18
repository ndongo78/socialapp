import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicers/userSlice"

export const store =configureStore({
    reducer:{
      user:userReducer,
    }
})