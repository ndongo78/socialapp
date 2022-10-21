import { createSlice , createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { createMessages, getAllUsers, getConversations, getMessages, loginUser, userConversation } from "../middlewares/user";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client"

const SERVER:string | undefined |any =process.env.REACT_APP_SOCKECT_SERVER

const initialState:{
    conversations:any,
    islogin:boolean
    isLoading:boolean
    token:string,
    receiver: any,
    messages:any,
    success:string,
    userChat:null,
    serverSocket:any
}={
    conversations:[],
    islogin:false,
    isLoading:false,
    token:"",
    receiver:null,
    messages:null,
    success:"",
    userChat:null,
    serverSocket:io(SERVER)
}

export const createConversations = createAsyncThunk(
    "conversations",
    userConversation
)
export const currentConversation:any = createAsyncThunk(
    "getConversations",
    getConversations
)
export const currentConversationMessages:any = createAsyncThunk(
    "currentConversationMessages",
    getMessages
)
export const createConversationMessages:any = createAsyncThunk(
    "createConversationMessages",
    createMessages
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
       addMessages:(state,action)=>{
        
        state.messages=action.payload
    },
    updateMsg:(state,action)=>{
        state.messages=[...state.messages,action.payload]
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
        builder.addCase(currentConversationMessages.fulfilled,(state,action)=>{
            
            return {
                ...state,
                messages:action.payload
            }
        });
        builder.addCase(createConversationMessages.fulfilled,(state,action)=>{
            
            return {
                ...state,
                messages:action.payload
            }
        });
    }
})

export const conversationState=(state: { conversation: any; })=>state.conversation
export const {addUser,addConversation,addMessages,updateMsg} = conversationSlice.actions;
export default conversationSlice.reducer