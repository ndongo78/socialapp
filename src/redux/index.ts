import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicers/userSlice"
import conversationReducer from "./slicers/converMessageSlice"

export const store =configureStore({
    reducer:{
      user:userReducer,
      conversation:conversationReducer
    }
})