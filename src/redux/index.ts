import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from "./slicers/userSlice"
import conversationReducer from "./slicers/converMessageSlice"

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})


export const store =configureStore({
    reducer:{
      user:userReducer,
      conversation:conversationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})