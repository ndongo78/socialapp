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
import { setCallAccept, userState } from "../redux/slicers/userSlice";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationState, getMystream, getOnlineUsers, updateMsg } from "../redux/slicers/converMessageSlice";
import { io } from "socket.io-client"
import VideoCall from "../components/VideoCall";
import Peer from 'simple-peer';
import { SocketContext } from "../redux/socket/SocketProvider";
import NotificationCall from "../components/NotificationCall";
//const socket=io("http://localhost:5000/")
const SERVER:string | undefined |any =process.env.REACT_APP_SOCKECT_SERVER

const Home = () => {
    const {acceptedCall,islogin }=useSelector(userState)
    const {category,onlineUsers}=useSelector(conversationState)
   
    const navigate=useNavigate()
    const [socketId, setsocketId] = useState("")
    const [newMessage, setnewMessage] = useState<any>()
    const dispatch=useDispatch()
    const {callAccepted,callEnded,userVideo,myVideo,connectionRef,
      setMyStream,mystream,call,setCallAccepted,socket,isReceivingCall
    }=useContext(SocketContext)
   

   
   
    
  useEffect(() => {
    if (!islogin) {
      navigate("/")
     }
  }, [islogin])

  useEffect(()=>{
    if(isReceivingCall && !acceptedCall){
      navigate("/videoCall")
    }
  },[isReceivingCall])

  
  

  
 const displayComponent=()=>{
   if(category ==="audioCall"){
    return <Message />
   }else if(category ==="videoCall"){
    return <VideoCall  />
   }else{
    return <Message />
   }
 }
 
  

  
  
  return (
    <>
   
    <div className="home contain">
      {/* <Drawer /> */}
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
          {displayComponent()}
        </div>
        {
          category ==="" &&
        <ChatInput  />
        }
      </div>
      <div className="detail">
        <h2 className="text-white text-3xl font-bold p-3 mt-8">Historiques</h2>
      </div>
    </div>
    </>
  );
};

export default Home;

