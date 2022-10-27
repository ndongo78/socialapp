import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { conversationState, getMystream, setCategory } from '../redux/slicers/converMessageSlice';
import "../styles/Video.scss"
import {ImPhoneHangUp} from 'react-icons/im'
import { SocketContext } from '../redux/socket/SocketProvider';
import Peer from "simple-peer"
import { setCallAccept, userState } from '../redux/slicers/userSlice';
import NotificationCall from './NotificationCall';

const VideoCall = () => {
    const {conversations,userChat,messages}=useSelector(conversationState)
    const {callAccepted,callEnded,myVideo,connectionRef,
      setMyStream,mystream,call,setCallAccepted,socket,isReceivingCall,setisReceivingCall
    }=useContext(SocketContext)
    const userVideo=useRef<any>()
   const {acceptedCall ,islogin}=useSelector(userState)
   
    const dispatch =useDispatch()
    const [isIn, setisIn] = useState(false)
    const navigate=useNavigate()
    //  console.log("conversations",conversations.room[0]._id)
    useEffect(() => {
      if (!islogin) {
        navigate("/")
       }
    }, [islogin])

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
          setMyStream(mediaStream);
          myVideo.current.srcObject = mediaStream;
      }).catch(err => console.log("err: ", err));
      
    }, [myVideo])
    const answerCall = () => {
      setisReceivingCall(false)
      dispatch(setCallAccept())
      setCallAccepted(true);
      const peer = new Peer({ initiator: false, trickle: false, stream:mystream });
      peer.on('signal', (data) => {
          socket.current.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        console.log("call.signal",call.signal)
        peer.signal(call.signal);
        connectionRef.current = peer;
  };
   

    console.log("userVideo",userVideo)
    console.log("callAccepted",acceptedCall)
  
  return (
<>
<div className="modale"
  >
    {
    isReceivingCall &&
    <NotificationCall answerCall={answerCall} />
    }
  <div className="userto">
    <h3> {userChat?.username} </h3>
    <p>Appel en cour</p>
  </div>
  <div className=' flex'>
  {
    mystream &&
  <video playsInline  ref={myVideo}  autoPlay className="video" />
  }
   
   <div className=' bg-yellow-50'>
    {
      callAccepted && !callEnded &&
    <video playsInline  ref={userVideo}  autoPlay className="video" />
    }
   </div>
  </div>
  
  
  <div className="btn-container">
    <ImPhoneHangUp size={50}/>
  </div>
</div>
</>
  )
}

export default VideoCall