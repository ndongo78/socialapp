import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { conversationState, getMystream, setCategory } from '../redux/slicers/converMessageSlice';
import "../styles/Video.scss"
import {ImPhoneHangUp} from 'react-icons/im'
import { SocketContext } from '../redux/socket/SocketProvider';

const VideoCall = () => {
    const {conversations,userChat,messages}=useSelector(conversationState)
    const {stream,callAccepted,callEnded,userVideo,myVideo,setStream}=useContext(SocketContext)
   // const myVideo=useRef<any>()
    const dispatch =useDispatch()
    const [isIn, setisIn] = useState(false)
    const navigate=useNavigate()
    //  console.log("conversations",conversations.room[0]._id)
      console.log("userch",stream)
   
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
           setStream(currentStream);
            dispatch(getMystream(currentStream))
            myVideo.current.srcObject = currentStream;
        });
       }, [myVideo])

    //  useEffect(()=>{
    //     const isIn=conversations.room.some((user:any)=> user._id==userChat._id)
    //     setisIn(isIn)
    //  },[conversations,userChat])
     
   console.log("myVideo",myVideo);

   
  return (

<div className="modale"
  >
  <div className="userto">
    <h3> {userChat?.username} </h3>
    <p>Appel en cour</p>
  </div>
  {
  myVideo &&
  <video playsInline muted ref={myVideo}  autoPlay className="video" />
  }
  {
    callAccepted && !callEnded &&
    <video playsInline muted ref={userVideo}  autoPlay className="video" />
  }
  <div className="btn-container">
    <ImPhoneHangUp size={50}/>
  </div>
</div>
  )
}

export default VideoCall