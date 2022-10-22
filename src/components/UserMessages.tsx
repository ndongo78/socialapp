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
 
  const dispatch = useDispatch()

  useEffect(() => {
    if(userChat){
      getConversations(userChat._id,token.token)
      .then((data) => {
        dispatch(addConversation(data))
        setConversat(data)
      })
      .catch((error) => {
        console.log("error: ",error.response.data)
      })
    }
  }, [userChat,token])
 
  useEffect(() => {
    dispatch(getUsers(token.token))
  },[token,dispatch])


  const handleSelect=(userTo:any)=>{
       dispatch(addUser(userTo)) 
         const discution={
          room:[
            `${user._id}` ,
            `${userTo._id}`
          ]
         }
         getConversations(userTo._id,token.token)
         .then((data) => {
          // console.log("data",data)
          if(data.length > 0) {
           return dispatch(addConversation(data))
          }else{
            userConversation(discution,token.token)
            .then(data=>{
              dispatch(addConversation(data))
            })
            .catch(err=>{
              alert(JSON.stringify(err.response.data))
              console.log("err",err);
            });
          }
       
         })
         .catch((error) => {
           console.log("error: ",error.response.data)
         })

         
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
