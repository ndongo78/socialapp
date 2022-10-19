import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConversations, userConversation } from "../redux/middlewares/user";
import { addConversation, addUser, conversationState, createConversations, currentConversation } from "../redux/slicers/converMessageSlice";
import { userState, getUsers } from "../redux/slicers/userSlice";
import { users } from "./Users";

const UserMessages = () => {
  const {userss,token,user}=useSelector(userState)
  const [conversat,setConversat]=useState<any>(null)
  // console.log("users: " ,token)
  const {conversations,userChat}=useSelector(conversationState)
  console.log("conversations: " ,conversations);
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(user != null && token != null) {
      dispatch(getUsers(token.token))
      getConversations(user._id,token.token)
      .then((data) => {
        dispatch(addConversation(data))
        setConversat(data)
      })
      .catch((error) => {
        console.log("error: ",error.response.data)
      })
      // dispatch(currentConversation(user._id,{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzMjQ4MThiYWE1YjZkY2RkZGQzMzg5YyIsInVzZXJuYW1lIjoiYmlsbHkiLCJlbWFpbCI6ImJpbGx5QHlhaG9vLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHoxbVZPL2V3TVBZS0V2ZE1xQjRURy5YZEdGUVptcC5lQWhTa0NIaXJpb3hXWmJTSnYxR0ZpIiwicGhvbmVOdW1iZXIiOjY1ODI0MTcwMCwiaXNBZG1pbiI6ZmFsc2UsImZyaWVuZEluIjpbIjYzMjQ3ZjcyYWE1YjZkY2RkZGQzMzg4OCIsIjYzMjRhNTgyZjE2ZTdlN2FkNDNhYzVlMSJdLCJmcmllbmRPdXQiOlsiNjMyNDdmNzJhYTViNmRjZGRkZDMzODg4IiwiNjMyNGE1ODJmMTZlN2U3YWQ0M2FjNWUxIl0sImNyZWF0ZWRBdCI6IjIwMjItMDktMTZUMTQ6MDA6NDMuNzkyWiIsInVwZGF0ZWRBdCI6IjIwMjItMDktMTZUMTY6Mzk6NDAuODMwWiIsIl9fdiI6MH0sImlhdCI6MTY2NjIwNTI0NCwiZXhwIjoxNjY2MjA4ODQ0fQ.XvyReQrW7Tl1p_Uwk9HuOCZqVPXOfVoeQP0_hmBMxzQ"}))
    }
  }, [user,token,dispatch])

  useEffect(() => {
    if (userChat == null && userss.length != 0) {  
      dispatch(addUser(userss[0].username))
    }
    }, [userChat,userss])


  const handleSelect=(userTo:any)=>{
       dispatch(addUser(userTo)) 
         const discution={
          room:[
            `${user._id}` ,
            `${userTo._id}`
          ]
         }
         if(conversat == null){
         userConversation(discution,token.token)
         .then(data=>{
          console.log(data);
         })
         .catch(err=>{
           console.log("err",err);
         });
        }
  }

  
  return (
    <div className="online flex gap-10 flex-col cursor-pointer">
      {userss.map((user:any) => (
        <div className="users flex flex-row items-center justify-between hover:bg-current" onClick={()=>handleSelect(user)}>
          <div className="user-message flex flex-row items-center ">
            <img
              src={`https://picsum.photos/200/`}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                padding: 10,
              }}
              alt=""
            />
            <div className="user-message flex flex-col items-center ">
              <p className="text-white text-2xl font-semibold"> {user.username} </p>
              <p className="text-lg text-yellow-50 mt-1">Hello john</p>
            </div>
          </div>
          <p className="text-md text-yellow-50 mr-3">10:00 PM</p>
        </div>
      ))}
    </div>
  );
};

export default UserMessages;
