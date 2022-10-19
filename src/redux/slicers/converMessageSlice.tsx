import { createSlice , createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getConversations, loginUser, userConversation } from "../middlewares/user";
import jwt_decode from "jwt-decode";

const initialState:{
    conversations:any,
    islogin:boolean
    isLoading:boolean
    token:string,
    receiver: any,
    messages:any,
    success:string,
    userChat:null
}={
    conversations:null,
    islogin:false,
    isLoading:false,
    token:"",
    receiver:null,
    messages:[],
    success:"",
    userChat:null
}

export const createConversations = createAsyncThunk(
    "conversations",
    userConversation
)
export const currentConversation:any = createAsyncThunk(
    "getConversations",
    getConversations
)



const conversationSlice=createSlice({
    name:"conversations",
    initialState,
    reducers:{
        addUser:(state,action)=>{
              state.userChat= action.payload
        },
       addConversation:(state,action)=>{
           state.conversations= action.payload
       },
    },
    extraReducers:(builder)=>{
        builder.addCase(createConversations.pending,(state,action)=>{
            
            return {
                ...state,
                isLoading:true,
                
            }
        })
        builder.addCase(createConversations.fulfilled,(state,action)=>{
            return {
                ...state,
                success:action.payload,
                isLoading:false,
            }
        });
        builder.addCase(createConversations.rejected,(state,action)=>{
            return {
                ...state,
                conversations:null,
                isLoading:false,
            }
        });
        builder.addCase(currentConversation.fulfilled,(state,action)=>{
            
            return {
                ...state,
                conversations:action.payload
            }
        });
    }
})

export const conversationState=(state: { conversation: any; })=>state.conversation
export const {addUser,addConversation} = conversationSlice.actions;
export default conversationSlice.reducer