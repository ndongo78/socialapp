import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../redux/middlewares/user";
import { addMessages, conversationState, currentConversationMessages } from "../redux/slicers/converMessageSlice";
import { userState } from "../redux/slicers/userSlice";
import "../styles/Message.scss";
import { MessageChat } from "./MessageChat";

const Message = () => {
  const {conversations,userChat,messages}=useSelector(conversationState)
  const {userss,token,user}=useSelector(userState)
  //const [messages, setmessages] = useState<any>([])
  const [isloaded, setisloaded] = useState(false)
  // console.log(conversations)
  const dispatch= useDispatch()

   useEffect(() => {

    if(conversations.length > 0 && userChat){
      getMessages(conversations[0]._id,token.token)
      .then((data:any) =>{ 
        dispatch(addMessages(data))
        //setmessages(data)
        setisloaded(true)
      })
      .catch(err => console.log(err))
      //dispatch(currentConversationMessages(conversations[0]._id,token.token))
   }
   }, [userChat,conversations,token.token])
   


  return (
    <div className="messages">
    {
      messages != null && userChat != null &&
      messages.map((message:any, index:number) => <MessageChat message={message} />)
    }
    </div>
  );
};

export default Message;
