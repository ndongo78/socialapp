import { createSlice , createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, loginUser } from "../middlewares/user";
import jwt_decode from "jwt-decode";

const initialState:{
    user:any,
    islogin:boolean
    isLoading:boolean
    token:string,
    receiver: any,
    userss:any,
}={
    user:null,
    islogin:false,
    isLoading:false,
    token:"",
    receiver:null,
    userss:[],
    
}

export const signIn:any = createAsyncThunk(
    "loginUser",
    loginUser
)
export const getUsers:any = createAsyncThunk(
    "getUsers",
    getAllUsers
)



const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setCurrentUser:(state,action) => {
            state.user=action.payload
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(signIn.pending,(state,action)=>{
          
            return {
                ...state,
                isLoading:true,
            }
        })
        builder.addCase(signIn.fulfilled,(state,action)=>{
            const userdec:any= jwt_decode(action.payload.token)
            console.log(userdec);
            return {
                ...state,
                user: userdec.user,
                token:action.payload,
                isLoading:false,
                islogin:true
            }
        });
        builder.addCase(signIn.rejected,(state,action)=>{
            return {
                ...state,
                user:null,
                isLoading:false,
                islogin:false
            }
        });
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            return {
                ...state,
                userss:action.payload
            }
        });
    }
})

export const userState=(state: { user: any; })=>state.user
export const {setCurrentUser}=userSlice.actions
export default userSlice.reducer