import { useEffect, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { RiMic2Fill } from "react-icons/ri";
import { SiUploaded } from "react-icons/si";
import {AiOutlineSend} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addMessages, conversationState, createConversationMessages, createConversations, updateMsg } from "../redux/slicers/converMessageSlice";
import { userState } from "../redux/slicers/userSlice";
import { createMessages } from "../redux/middlewares/user";

const ChatInput = () => {  
  const {conversations,userChat,serverSocket,onlineUsers}=useSelector(conversationState)
  const {userss,token,user}=useSelector(userState)
  const [mgs, setmgs] = useState<string>("")
  const [recever, setrecever] = useState<any>(null)
  const dispatch = useDispatch()
  console.log("receide",recever)
 

  useEffect(() => {
     if(userChat) {
      setrecever(onlineUsers.find((user:any)=>console.log("first",user)))
     }
  }, [recever,userChat])
    

 const handleSubmit = ()=>{
  if(conversations){
     const mgsTo={
        conversationId:conversations[0]._id,
        senderId:user._id,
        receiverId:userChat._id,
        content:mgs,
        //socketId:recever.socketId
      }
      serverSocket.emit("sendMessage",mgsTo)
      createMessages(mgsTo,token.token)
      .then(data=>{
        dispatch(updateMsg(data)) 
        setmgs("")
      })
      .catch(err=>{
        console.log(err)
      })
  }
     
      
 }

  return (
    <div className="chat-footer bg-slate-800 w-full">
      <div>
        <SiUploaded className="iconsChat" />
      </div>
      <input
        type="text"
        className="chat-input w-8/12 h-11"
        placeholder="envoyer un a john ..."
        onChange={(e)=>setmgs(e.target.value)}
        value={mgs}
      />
      <div className="flex gap-5">
        <RiMic2Fill className="iconsChat" />
        <BsEmojiSmile className="iconsChat" />
        {
          mgs != "" && <AiOutlineSend className="iconsChat save" onClick={handleSubmit} />
        }
      </div>
    </div>
  );
};

export default ChatInput;

