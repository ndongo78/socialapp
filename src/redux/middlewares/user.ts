import axios from 'axios';


const url:string | undefined |any  =process.env.REACT_APP_API_URL

export const loginUser=async(user:{email:string,password:string}) => {
   const response=await axios.post(url+"users/login",user)
   return response.data
}

export const getAllUsers = async(token:string) => {
   const response=await axios.get(url+"users",{headers:{ Authorization: `Bearer ${token}`}})
   return response.data
}