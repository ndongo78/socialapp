import { createSlice , createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { createMessages, getAllUsers, getConversations, getMessages, loginUser, userConversation } from "../middlewares/user";
import jwt_decode from "jwt-decode";
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
    serverSocket:any,
    onlineUsers:any,
    category:string,
    myStream:any,
    isReceiver:boolean
}={
    conversations:null,
    islogin:false,
    isLoading:false,
    token:"",
    receiver:null,
    messages:null,
    success:"",
    userChat:null,
    serverSocket:null,
    onlineUsers:[],
    category:"",
    myStream:null,
    isReceiver:false
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
    getOnlineUsers:(state,action)=>{
        state.onlineUsers=action.payload
    },
    setCategory:(state,action)=>{
        state.category=action.payload
    },
    getMystream:(state,action)=>{
        state.myStream=action.payload
    },
    setReceiver:(state,action)=>{
        state.isReceiver=true
    },
    callUser:(state,action)=>{

    }
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
export const {addUser,addConversation,addMessages,updateMsg,getOnlineUsers,setCategory,getMystream} = conversationSlice.actions;
export default conversationSlice.reducer