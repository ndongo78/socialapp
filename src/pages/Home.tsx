import {
  AiOutlineSearch,
} from "react-icons/ai";
import "../styles/Message.scss";
import Message from "../components/Message";
import Users from "../components/Users";
import Drawer from "../components/Drawer";
import UserProfil from "../components/UserProfil";
import UserMessages from "../components/UserMessages";
import CurrentChatUser from "../components/CurrentChatUser";
import ChatInput from "../components/ChatInput";
import { Navigate, useNavigate } from "react-router-dom";
import { userState } from "../redux/slicers/userSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationState, getOnlineUsers, updateMsg } from "../redux/slicers/converMessageSlice";
import { io } from "socket.io-client"

//const socket=io("http://localhost:5000/")
const SERVER:string | undefined |any =process.env.REACT_APP_SOCKECT_SERVER

const Home = () => {
    const {user,islogin }=useSelector(userState)
    const {serverSocket,onlineUsers}=useSelector(conversationState)
    const navigate=useNavigate()
    const [socketId, setsocketId] = useState("")
    const [newMessage, setnewMessage] = useState<any>()
    const dispatch=useDispatch()
    let socket=useRef<any>()

   console.log("users",onlineUsers)
   
    
  useEffect(() => {
    if (!islogin) {
      navigate("/")
     }
  }, [islogin])

  useEffect(() => {
     if(islogin){
      socket.current=io(SERVER)
      socket.current.on("connection",(data:string)=>{
        console.log("on connection",data)
        setsocketId(socketId)
        socket.current.emit("register-new-user",{...user,socketId:data})
      })
      
      socket.current.on('user-connected',(users:any)=>{
        
        dispatch(getOnlineUsers(users))
     })

     socket.current.on("messages",(data:any)=>{
      console.log("messages",data)
      dispatch(updateMsg(data)) 
      setnewMessage(data)
    })
    socket.current.on("disconnect",()=>{
      socket.current.on('getUsers',(users:any)=>{
        dispatch(getOnlineUsers(users))
      })
    })
  }
  }, [islogin])


 console.log("newMessage",newMessage);
  
 
  

  
  
  return (
    <div className="home contain">
      <Drawer />
      <div className="user">
        <div className="profile flex items-center justify-between">
          <UserProfil />
        </div>
        <div className="divider" />
        <div className="input flex self-center w-96 m-auto pt-6">
          <AiOutlineSearch className="search" />
          <input
            type="text"
            placeholder="recherche un ami"
            className=" h-10 w-ful"
          />
        </div>
        <Users />
        <div className="messages">
          <h2 className="text-white text-3xl font-bold p-3 mt-8 mb-8">
            Messages
          </h2>
          <UserMessages />
        </div>
      </div>
      <div className="chat">
        <CurrentChatUser />
        <div className="chat-messages">
          <Message />
        </div>
        <ChatInput socket={socket.current} />
      </div>
      <div className="detail">
        <h2 className="text-white text-3xl font-bold p-3 mt-8">Historiques</h2>
      </div>
    </div>
  );
};

export default Home;

